const fs = require("fs");
const path = require("path");
const readline = require("readline");

const PACKAGE_JSON_PATH = path.join(__dirname, "../package.json");
const CHANGESET_DIR = path.join(__dirname, "../.changeset");

// Mapeia a escolha digitada (número ou nome) para o tipo de bump do semver.
const BUMP_BY_CHOICE = {
  "1": "patch",
  "2": "minor",
  "3": "major",
  patch: "patch",
  minor: "minor",
  major: "major",
};

// Quantidade de dígitos ao formatar os milissegundos no nome do arquivo.
const MS_DIGITS = 3;

/**
 * Calcula a versão que ESTE changeset, sozinho, geraria a partir da versão atual.
 * Serve só como dica no terminal — o número final do release junta todos os changesets pendentes
 * (o Changesets aplica o MAIOR bump uma única vez).
 * @param {string} currentVersion versão atual no formato "major.minor.patch"
 * @param {string} bump "patch" | "minor" | "major"
 * @returns {string}
 */
function computeNextVersion(currentVersion, bump) {
  const [major, minor, patch] = currentVersion.split(".").map(Number);
  if (bump === "major") {
    return `${major + 1}.0.0`;
  }
  if (bump === "minor") {
    return `${major}.${minor + 1}.0`;
  }
  return `${major}.${minor}.${patch + 1}`;
}

/**
 * Gera um nome com o TIPO do bump + data e hora (ordenável e único): <tipo>__AAAA-MM-DD-HHMMSS-mmm.md.
 * @param {string} bump "patch" | "minor" | "major"
 * @returns {string}
 */
function generateFileName(bump) {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const ms = String(now.getMilliseconds()).padStart(MS_DIGITS, "0");
  return `${bump}__${date}-${time}-${ms}.md`;
}

/**
 * Cria uma função que lê a próxima linha do terminal; lança se a entrada terminar (EOF/cancelado).
 * @param {AsyncIterableIterator<string>} iterator
 * @returns {() => Promise<string>}
 */
function lineReader(iterator) {
  return async () => {
    const { value, done } = await iterator.next();
    if (done) {
      throw new Error("entrada cancelada");
    }
    return value.trim();
  };
}

/**
 * Pergunta o tipo da mudança e repete até receber uma resposta válida.
 * @param {() => Promise<string>} nextLine
 * @returns {Promise<string>}
 */
async function askBumpType(nextLine) {
  process.stdout.write("\nQual o tipo da mudança?\n");
  process.stdout.write("  1) patch  -> correção / ajuste pequeno (1.0.0 -> 1.0.1)\n");
  process.stdout.write("  2) minor  -> nova funcionalidade sem quebrar nada (1.0.0 -> 1.1.0)\n");
  process.stdout.write("  3) major  -> mudança que quebra compatibilidade (1.0.0 -> 2.0.0)\n");
  process.stdout.write("Digite 1, 2 ou 3: ");
  const bump = BUMP_BY_CHOICE[(await nextLine()).toLowerCase()];
  if (bump) {
    return bump;
  }
  process.stdout.write("\nOpção inválida. Tente de novo.\n");
  return askBumpType(nextLine);
}

/**
 * Pergunta o resumo da mudança e repete enquanto vier vazio.
 * @param {() => Promise<string>} nextLine
 * @returns {Promise<string>}
 */
async function askSummary(nextLine) {
  process.stdout.write("\nResumo da mudança (vai para o CHANGELOG): ");
  const summary = await nextLine();
  if (summary) {
    return summary;
  }
  process.stdout.write("O resumo não pode ficar vazio.\n");
  return askSummary(nextLine);
}

/**
 * Escreve o arquivo de changeset no diretório .changeset.
 * @param {string} packageName
 * @param {string} bump
 * @param {string} summary
 * @returns {string} caminho absoluto do arquivo criado
 */
function writeChangeset(packageName, bump, summary) {
  const filePath = path.join(CHANGESET_DIR, generateFileName(bump));
  fs.writeFileSync(filePath, `---\n"${packageName}": ${bump}\n---\n\n${summary}\n`);
  return filePath;
}

/**
 * Fluxo interativo em pt-BR para criar um changeset compatível com o Changesets.
 * @returns {Promise<void>}
 */
async function main() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf8"));
  const rl = readline.createInterface({ input: process.stdin });
  const nextLine = lineReader(rl[Symbol.asyncIterator]());

  process.stdout.write(`\n📦 Criar changeset para ${packageJson.name} (versão atual ${packageJson.version})\n`);
  const bump = await askBumpType(nextLine);
  const summary = await askSummary(nextLine);
  rl.close();

  const version = computeNextVersion(packageJson.version, bump);
  const filePath = writeChangeset(packageJson.name, bump, summary);
  process.stdout.write(`\n✅ Changeset criado: ${path.relative(process.cwd(), filePath)}\n`);
  process.stdout.write(`   Tipo: ${bump} — sozinho daria ${packageJson.version} -> ${version} (o número final junta todos os changesets; confirme no PR "Version Packages")\n`);
  process.stdout.write("   Commite esse arquivo junto com o seu código.\n\n");
}

main().catch((error) => {
  process.stderr.write(`\nNenhum changeset criado (${error.message}).\n`);
  process.exit(1);
});
