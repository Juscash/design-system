"use strict";

/**
 * Code Review Agent
 * ─────────────────
 * Bot de revisão automática de Pull Requests. Baixa o diff do PR, envia para a
 * API do Claude (Anthropic) aplicando as regras de `.code-review.json` e publica
 * um comentário inline por violação encontrada. Ao final, posta um comentário
 * extra com um prompt pronto para ser usado em assistentes de IA para correção
 * automática.
 *
 * Invocação: via GitHub Actions em `.github/workflows/code-review-agent.yml`,
 * disparado em eventos `pull_request` (opened, synchronize, reopened).
 *
 * Variáveis de ambiente obrigatórias:
 *   - GITHUB_TOKEN        Token do GitHub Actions (injetado automaticamente)
 *   - ANTHROPIC_API_KEY   Chave da API Anthropic (secret do repositório)
 *   - PR_NUMBER           Número do PR (injetado pelo workflow)
 *   - REPO_OWNER          Dono do repositório (injetado pelo workflow)
 *   - REPO_NAME           Nome do repositório (injetado pelo workflow)
 *
 * Nota: os console.log ao longo do script são intencionais — servem como
 * rastreabilidade de passos nos logs do GitHub Actions.
 */

import fs from "fs";
import path from "path";

const { GITHUB_TOKEN, ANTHROPIC_API_KEY, PR_NUMBER, REPO_OWNER, REPO_NAME } = process.env;

// ─── Constantes ────────────────────────────────────────────────────

const REQUIRED_ENV_VARS = ["GITHUB_TOKEN", "ANTHROPIC_API_KEY", "PR_NUMBER", "REPO_OWNER", "REPO_NAME"];

const BOT_COMMENT_MARKER = "<!-- code-review-agent -->";
const CONFIG_FILE = ".code-review.json";
// Conservador em relação ao contexto do modelo: limita o diff para evitar timeouts e custos elevados em PRs grandes.
const MAX_DIFF_CHARS = 80_000;

// GitHub API
const GITHUB_API_VERSION = "2022-11-28";
const GITHUB_PAGE_SIZE = 100;

// Claude API — modelo verificado em 2026-04-22
const CLAUDE_MODEL = "claude-sonnet-4-6";
const CLAUDE_MAX_OUTPUT_TOKENS = 8096;
const CLAUDE_MAX_VIOLATIONS = 10;
const CLAUDE_API_VERSION = "2023-06-01";
const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

const SKIP_PATTERNS = [
  /package-lock\.json$/,
  /yarn\.lock$/,
  /\.lock$/,
  /dist\//,
  /build\//,
  /generated\//,
  /\.next\//,
  /node_modules\//,
  /\.test\.(ts|tsx|js|jsx)$/,
  /\.spec\.(ts|tsx|js|jsx)$/,
  /__tests__\//,
  /migrations\//,
  // O agente não deve revisar a si mesmo — gera ruído meta infinito
  /\.github\/scripts\/code-review-agent\.js$/,
  /\.github\/workflows\/code-review-agent\.yml$/,
];

// ─── Validação de ambiente ─────────────────────────────────────────

/**
 * Verifica se todas as variáveis de ambiente obrigatórias estão definidas.
 * Encerra o processo com exit(1) e lista as variáveis ausentes caso alguma falte.
 */
function validateEnv() {
  const missing = REQUIRED_ENV_VARS.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    console.error(`❌ Variáveis de ambiente obrigatórias ausentes: ${missing.join(", ")}`);
    process.exit(1);
  }
}

// ─── Config ────────────────────────────────────────────────────────

/**
 * Carrega e parseia o `.code-review.json` da raiz do projeto.
 *
 * @returns {object} Configuração parseada com regras, ignores e padrões.
 * @throws Encerra com exit(0) se o arquivo não existir e exit(1) em erro de parse.
 */
function loadConfig() {
  const configPath = path.resolve(process.cwd(), CONFIG_FILE);

  if (!fs.existsSync(configPath)) {
    console.log(`⚠️  ${CONFIG_FILE} não encontrado. Abortando.`);
    process.exit(0);
  }

  try {
    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch (err) {
    console.error(`❌ Erro ao parsear ${CONFIG_FILE}:`, err.message);
    process.exit(1);
  }
}

// ─── HTTP helpers ──────────────────────────────────────────────────

/**
 * Wrapper de `fetch` que retorna o JSON da resposta e lança erro em status não-2xx.
 *
 * @param {string} url URL completa da requisição.
 * @param {RequestInit} [options] Opções do fetch (method, headers, body).
 * @returns {Promise<any|null>} JSON da resposta ou `null` para 204 No Content.
 * @throws {Error} Quando a resposta não é 2xx, incluindo status e corpo na mensagem.
 */
async function apiCall(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} — ${url}\n${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

/** Retorna os headers padrão para chamadas à API do GitHub. */
function githubHeaders() {
  return {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
    "Content-Type": "application/json",
  };
}

// ─── GitHub API ────────────────────────────────────────────────────

/**
 * Busca todas as páginas de um endpoint paginado da API do GitHub.
 *
 * @param {string} baseUrl URL do endpoint sem query string de paginação.
 * @returns {Promise<Array<object>>} Todos os itens coletados.
 */
async function fetchAllPages(baseUrl) {
  const items = [];
  let page = 1;
  let batch;

  do {
    batch = await apiCall(`${baseUrl}?per_page=${GITHUB_PAGE_SIZE}&page=${page}`, { headers: githubHeaders() });
    items.push(...batch);
    page++;
  } while (batch.length === GITHUB_PAGE_SIZE);

  return items;
}

/**
 * Busca todos os arquivos alterados no PR.
 *
 * @returns {Promise<Array<object>>} Lista de arquivos contendo `filename`, `patch` etc.
 */
async function getPRFiles() {
  return fetchAllPages(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls/${PR_NUMBER}/files`);
}

/** Retorna o SHA do commit de topo do PR. */
async function getPRHeadSHA() {
  const pr = await apiCall(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls/${PR_NUMBER}`, { headers: githubHeaders() });
  return pr.head.sha;
}

/** Lista os comentários de issue (nível de PR). */
async function getIssueComments() {
  return apiCall(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues/${PR_NUMBER}/comments`, { headers: githubHeaders() });
}

/** Lista todos os review comments inline do PR. */
async function getReviewComments() {
  return fetchAllPages(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls/${PR_NUMBER}/comments`);
}

/** Deleta um issue comment pelo ID. */
async function deleteIssueComment(id) {
  await apiCall(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues/comments/${id}`, {
    method: "DELETE",
    headers: githubHeaders(),
  });
}

/** Deleta um review comment inline pelo ID. */
async function deleteReviewComment(id) {
  await apiCall(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls/comments/${id}`, {
    method: "DELETE",
    headers: githubHeaders(),
  });
}

/** Cria um comentário no nível do PR (não inline). */
async function createIssueComment(body) {
  return apiCall(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues/${PR_NUMBER}/comments`, {
    method: "POST",
    headers: githubHeaders(),
    body: JSON.stringify({ body }),
  });
}

/** Cria um review comment inline em uma linha específica do diff. */
async function createInlineComment(commitId, filePath, line, body) {
  return apiCall(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls/${PR_NUMBER}/comments`, {
    method: "POST",
    headers: githubHeaders(),
    body: JSON.stringify({
      commit_id: commitId,
      path: filePath,
      line,
      side: "RIGHT",
      body,
    }),
  });
}

// ─── Cleanup ───────────────────────────────────────────────────────

/** Remove todos os comentários antigos do bot (issue + inline) identificados por BOT_COMMENT_MARKER. */
async function cleanupBotComments() {
  const [issueComments, reviewComments] = await Promise.all([getIssueComments(), getReviewComments()]);

  const oldIssue = issueComments.filter((c) => c.body?.includes(BOT_COMMENT_MARKER));
  const oldReview = reviewComments.filter((c) => c.body?.includes(BOT_COMMENT_MARKER));

  await Promise.all([
    ...oldIssue.map((c) => deleteIssueComment(c.id).catch(() => {})),
    ...oldReview.map((c) => deleteReviewComment(c.id).catch(() => {})),
  ]);

  const total = oldIssue.length + oldReview.length;
  if (total > 0) console.log(`🧹 ${total} comentário(s) antigo(s) removido(s)`);
}

// ─── Diff ──────────────────────────────────────────────────────────

/**
 * Concatena os patches dos arquivos relevantes em um único diff textual,
 * truncando em MAX_DIFF_CHARS caso exceda o limite.
 *
 * @param {Array<object>} files Arquivos retornados por `getPRFiles()`.
 * @returns {{ diff: string, count: number }} Diff concatenado e número de arquivos considerados.
 */
function buildDiff(files) {
  const relevant = files.filter((f) => !SKIP_PATTERNS.some((p) => p.test(f.filename)));

  const diff = relevant.map((f) => `--- ${f.filename}\n${f.patch ?? "(arquivo binário ou sem patch disponível)"}`).join("\n\n");

  const truncated = diff.length > MAX_DIFF_CHARS ? diff.slice(0, MAX_DIFF_CHARS) + "\n\n[...diff truncado por tamanho]" : diff;

  return { diff: truncated, count: relevant.length };
}

// ─── Claude API ────────────────────────────────────────────────────

/**
 * Monta o prompt enviado ao Claude a partir do diff e da config do repositório.
 *
 * @param {string} diff Diff concatenado do PR.
 * @param {object} config Config carregada de `.code-review.json`.
 * @returns {string} Prompt textual pronto para envio.
 */
function buildReviewPrompt(diff, config) {
  const configJson = JSON.stringify(config, null, 2);

  return `You are a SKEPTICAL senior code reviewer. Your default behavior is to APPROVE the PR. Most PRs are correct and production-ready — reporting zero violations is a perfectly valid and expected outcome. Only report a problem when you are absolutely certain that an explicit rule from the config below was violated in code ADDED in this PR.

REPOSITORY CONFIGURATION (single source of truth for rules):
\`\`\`json
${configJson}
\`\`\`

PULL REQUEST DIFF:
\`\`\`diff
${diff}
\`\`\`

---

MANDATORY RULES — a violation can only be reported if it meets ALL criteria:

1. The violated line MUST be marked with "+" in the diff (code added/modified in this PR). Never report context lines (no prefix or with "-").
2. You MUST identify the exact rule path in the JSON above (e.g., "rules.env_variables.flag_hardcoded_secrets"). If you cannot cite the rule, DO NOT report.
3. Only report severity "error" or "warning". Completely ignore any "info" severity items.
4. The violation must be concrete and objective — not an opinion or stylistic preference.

---

DO NOT REPORT — forbidden anti-patterns:

- Rename suggestions when the current name is already clear and understandable
- Suggestions to extract code into separate functions or files (opinionated refactor)
- Suggestions to add explanatory comments to already readable code
- Formatting preferences (line breaks, spacing, import ordering)
- "Consider using X instead of Y" without direct violation of a config rule
- Any observation about the CI/CD agent's own files (.github/)
- Violations on lines not marked with "+" in this diff

---

EXAMPLES:

Example 1 — diff with no real violations:
Diff:
\`\`\`diff
--- src/utils/formatDate.ts
@@ -0,0 +1,3 @@
+export function formatDate(date: Date): string {
+  return date.toISOString().split('T')[0];
+}
\`\`\`
Correct output: {"has_violations": false, "violations_by_file": []}
Reason: code uses TypeScript correctly, clear name, no secrets — no rule violated.

Example 2 — concrete rule violation (note how "problem" and "suggestion" are written in Portuguese):
Diff:
\`\`\`diff
--- src/services/database.ts
@@ -8,6 +8,8 @@
+const DB_PASSWORD = 'my_secret_pass';
+const client = new Client({ password: DB_PASSWORD });
\`\`\`
Correct output:
{
  "has_violations": true,
  "violations_by_file": [
    {
      "file": "src/services/database.ts",
      "violations": [
        {
          "severity": "error",
          "rule_path": "rules.env_variables.flag_hardcoded_secrets",
          "lines": "9",
          "problem": "Senha hardcoded diretamente no código-fonte.",
          "suggestion": "Mova para variável de ambiente: process.env.DB_PASSWORD",
          "example": {
            "language": "ts",
            "before": "const DB_PASSWORD = 'my_secret_pass';",
            "after": "const DB_PASSWORD = process.env.DB_PASSWORD;"
          }
        }
      ]
    }
  ]
}

---

OUTPUT LANGUAGE: the "problem" and "suggestion" fields in your response MUST be written in Brazilian Portuguese (pt-BR). All other fields (severity, rule_path, lines, file, language, before, after) remain in their original form.

Respond EXCLUSIVELY with valid JSON, no text before or after:

{
  "has_violations": true,
  "violations_by_file": [
    {
      "file": "path/to/file.ts",
      "violations": [
        {
          "severity": "error | warning",
          "rule_path": "rules.<category>.<rule_name>",
          "lines": "13-14",
          "problem": "descrição clara e objetiva do problema (em pt-BR)",
          "suggestion": "como corrigir de forma prática (em pt-BR)",
          "example": {
            "language": "ts",
            "before": "código com o problema (opcional)",
            "after": "código corrigido"
          }
        }
      ]
    }
  ]
}`;
}

/**
 * Extrai e parseia o JSON retornado pelo Claude dentro do texto da resposta.
 *
 * @param {object} apiResponse Resposta completa da API Anthropic.
 * @returns {object} Objeto parseado com a análise.
 * @throws {Error} Se o retorno não contiver um JSON válido.
 */
function parseClaudeResponse(apiResponse) {
  const content = apiResponse.content[0].text.trim();
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`Claude não retornou JSON válido:\n${content}`);
  return JSON.parse(jsonMatch[0]);
}

/**
 * Envia o diff para o Claude e retorna a análise estruturada.
 *
 * @param {string} diff Diff concatenado do PR.
 * @param {object} config Config carregada de `.code-review.json`.
 * @returns {Promise<object>} Objeto com `has_violations` e `violations_by_file`.
 * @throws {Error} Quando a API falha ou a resposta não é JSON válido.
 */
async function analyzeWithClaude(diff, config) {
  const prompt = buildReviewPrompt(diff, config);

  const res = await fetch(CLAUDE_API_URL, {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": CLAUDE_API_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: CLAUDE_MAX_OUTPUT_TOKENS,
      temperature: 0,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`Claude API: ${res.status} — ${await res.text()}`);

  const data = await res.json();
  return parseClaudeResponse(data);
}

// ─── Comment builder ───────────────────────────────────────────────

/** Mapeia a severidade para um emoji visual no comentário. */
function severityEmoji(severity) {
  return { error: "🔴", warning: "🟡", info: "🔵" }[severity] ?? "⚪";
}

/**
 * Monta o corpo markdown de um comentário para uma única violação.
 *
 * @param {object} v Objeto de violação retornado pelo Claude.
 * @returns {string} Corpo formatado em markdown.
 */
function buildViolationBody(v) {
  const lines = [
    `${BOT_COMMENT_MARKER}`,
    `${severityEmoji(v.severity)} **${v.severity.toUpperCase()}** — linhas \`${v.lines}\``,
    ...(v.rule_path ? [`**Regra:** \`${v.rule_path}\``] : []),
    ``,
    `**Problema:** ${v.problem}`,
    ``,
    `**Correção sugerida:** ${v.suggestion}`,
  ];

  if (v.example) {
    const { language = "ts", before, after } = v.example;
    if (before) {
      lines.push(``, `\`\`\`${language}`, `// antes`, before, `// depois`, after, `\`\`\``);
    } else {
      lines.push(``, `\`\`\`${language}`, after, `\`\`\``);
    }
  }

  return lines.join("\n");
}

/**
 * Monta o comentário final com o prompt de correção para uso em assistentes de IA.
 *
 * @param {object} analysis Resultado completo da análise do Claude.
 * @returns {string} Corpo markdown do comentário.
 */
/**
 * @param {object} analysis Resultado filtrado da análise.
 * @param {boolean} capped Indica se o cap de comentários foi atingido.
 */
function buildFixPromptBody(analysis, capped) {
  const instructions = [];

  for (const fileResult of analysis.violations_by_file) {
    for (const v of fileResult.violations) {
      const suggestion = v.suggestion?.trim() ?? "";
      const normalized = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
      instructions.push(`No arquivo \`${fileResult.file}\` linha ${v.lines} ${normalized}`);
    }
  }

  const capNote = capped
    ? `\n> ⚠️ **Limite atingido**: foram exibidas apenas as ${CLAUDE_MAX_VIOLATIONS} violações mais críticas. Corrija-as e faça um novo push para uma análise completa.\n`
    : "";

  return `${BOT_COMMENT_MARKER}
## 🤖 Prompt sugerido para correção automática
${capNote}
Copie e cole o bloco abaixo em seu assistente de IA (Claude, Cursor, Copilot etc.) para corrigir todos os problemas apontados de uma vez:

\`\`\`text
Corrija os seguintes problemas apontados pelo Code Review Agent:

${instructions.join("\n\n---\n\n")}
\`\`\`

---
*Prompt gerado automaticamente — atualizado a cada push*`;
}

// ─── Priorização de violações ──────────────────────────────────────

/**
 * Filtra violações de severidade 'info', ordena por criticidade (error > warning)
 * e aplica cap de CLAUDE_MAX_VIOLATIONS por PR.
 *
 * @param {object} analysis Resultado bruto da análise do Claude.
 * @returns {{ filtered: object, capped: boolean }}
 */
function prioritizeViolations(analysis) {
  const SEVERITY_ORDER = { error: 0, warning: 1 };

  const allViolations = [];
  for (const fileResult of analysis.violations_by_file ?? []) {
    for (const v of fileResult.violations) {
      if (v.severity !== "info") {
        allViolations.push({ file: fileResult.file, violation: v });
      }
    }
  }

  allViolations.sort((a, b) => (SEVERITY_ORDER[a.violation.severity] ?? 99) - (SEVERITY_ORDER[b.violation.severity] ?? 99));

  const capped = allViolations.length > CLAUDE_MAX_VIOLATIONS;
  const selected = allViolations.slice(0, CLAUDE_MAX_VIOLATIONS);

  const byFile = new Map();
  for (const { file, violation } of selected) {
    if (!byFile.has(file)) byFile.set(file, []);
    byFile.get(file).push(violation);
  }

  const violations_by_file = [...byFile.entries()].map(([file, violations]) => ({
    file,
    violations,
  }));

  return {
    filtered: { ...analysis, has_violations: violations_by_file.length > 0, violations_by_file },
    capped,
  };
}

// ─── Post violations ───────────────────────────────────────────────

/**
 * Publica as violações de um único arquivo como comentários no PR.
 * Usa inline comment quando a linha está no diff, com fallback para
 * issue comment (com o nome do arquivo no rodapé) caso contrário.
 *
 * @param {object} fileResult Objeto `{ file, violations }` vindo do Claude.
 * @param {string} commitId SHA do commit de topo do PR.
 * @returns {Promise<{ inline: number, fallback: number }>} Contadores de publicações.
 */
async function publishFileViolations(fileResult, commitId) {
  let inline = 0;
  let fallback = 0;

  for (const v of fileResult.violations) {
    const body = buildViolationBody(v);
    const firstLine = parseInt(v.lines?.split(/[-,]/)[0], 10);

    if (!isNaN(firstLine)) {
      try {
        await createInlineComment(commitId, fileResult.file, firstLine, body);
        inline++;
        continue;
      } catch (err) {
        console.warn(`⚠️  Inline comment falhou (${fileResult.file}:${firstLine}): ${err.message}`);
        // Line not in diff or GitHub API error — fall through to issue comment
      }
    }

    const fallbackBody = `${body}\n\n> **Arquivo:** \`${fileResult.file}\``;
    await createIssueComment(fallbackBody).catch(() => {});
    fallback++;
  }

  return { inline, fallback };
}

/**
 * Fluxo principal de publicação: limpa comentários antigos, publica um
 * comentário por violação e, ao fim, o comentário com prompt de correção.
 *
 * @param {object} analysis Resultado da análise do Claude.
 * @returns {Promise<number>} Total de comentários de violação publicados.
 */
async function postViolations(analysis) {
  await cleanupBotComments();

  if (!analysis.has_violations || !analysis.violations_by_file?.length) {
    await createIssueComment(
      `${BOT_COMMENT_MARKER}\n## Revisão automática de código\n\nNenhum problema encontrado. O PR está aderente aos padrões definidos no \`.code-review.json\`.\n\n---\n*Análise gerada automaticamente — atualizado a cada push*`
    );
    return 0;
  }

  const { filtered, capped } = prioritizeViolations(analysis);

  if (!filtered.has_violations) {
    await createIssueComment(
      `${BOT_COMMENT_MARKER}\n## Revisão automática de código\n\nNenhum problema encontrado. O PR está aderente aos padrões definidos no \`.code-review.json\`.\n\n---\n*Análise gerada automaticamente — atualizado a cada push*`
    );
    return 0;
  }

  if (capped) {
    console.log(`⚠️  Cap de ${CLAUDE_MAX_VIOLATIONS} comentários atingido — publicando apenas as violações mais críticas`);
  }

  const commitId = await getPRHeadSHA();
  let inlineCount = 0;
  let fallbackCount = 0;

  for (const fileResult of filtered.violations_by_file) {
    const { inline, fallback } = await publishFileViolations(fileResult, commitId);
    inlineCount += inline;
    fallbackCount += fallback;
  }

  console.log(`💬 ${inlineCount} inline + ${fallbackCount} fallback publicados`);

  const total = inlineCount + fallbackCount;
  if (total > 0) {
    const promptBody = buildFixPromptBody(filtered, capped);
    await createIssueComment(promptBody).catch((err) => console.warn("⚠️  Falha ao publicar prompt de correção:", err.message));
    console.log("📝 Prompt de correção publicado");
  }

  return total;
}

// ─── Main ──────────────────────────────────────────────────────────

/**
 * Ponto de entrada do script. Orquestra o fluxo completo:
 * valida o ambiente → carrega a config → baixa o diff do PR →
 * envia para o Claude → publica comentários de violação e prompt de correção.
 */
async function main() {
  validateEnv();

  console.log(`\n🔍 Iniciando code review — PR #${PR_NUMBER} em ${REPO_OWNER}/${REPO_NAME}`);

  const config = loadConfig();
  console.log(`⚙️  Config carregada: ${CONFIG_FILE}`);

  const files = await getPRFiles();
  const { diff, count } = buildDiff(files);
  console.log(`📦 ${count} arquivo(s) relevante(s) no diff (${diff.length} chars)`);

  if (count === 0) {
    console.log("ℹ️  Nenhum arquivo relevante no diff. Encerrando.");
    return;
  }

  console.log("🤖 Enviando para Claude...");
  const analysis = await analyzeWithClaude(diff, config);

  const totalViolations = analysis.violations_by_file?.reduce((acc, f) => acc + f.violations.length, 0) ?? 0;
  console.log(`✅ Análise concluída — ${totalViolations} violação(ões) encontrada(s)`);

  await postViolations(analysis);
}

main().catch((err) => {
  console.error("💥 Erro fatal:", err);
  process.exit(1);
});
