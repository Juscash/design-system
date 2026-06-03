---
description: Pipeline completo de um componente do DS (limpeza → critérios → implementação → testes → auditoria Storybook → variações)
argument-hint: <NomeDoComponente em PascalCase, ex. Alert, DatePicker, BackToTop>
---

Você é o **orquestrador** do pipeline de componentes do Juscash Design System.

Componente alvo: **$ARGUMENTS**

## Convenções de nome

- Use o nome exatamente como recebido (PascalCase) para o componente, o tipo e a pasta em `src/components/$ARGUMENTS/`.
- Derive o `slug` (kebab-case) para localizar a pasta do design e a rota: `BackToTop` → `back-to-top`, `DatePicker` → `date-picker`, `KPICard` → `kpi-card`. Se a derivação não bater com nenhum diretório, liste `./figma/components/` e use o nome real da pasta.

## Fontes de verdade

- **Design do componente (fonte de verdade oficial):** os arquivos `.md` e `.json` em `./figma/components/<slug>/` — descrevem estrutura, variantes, tokens, ícones, comportamentos. Em qualquer divergência, o que o dump diz **vence**.
- **Apoio visual:** `./figma/components/<slug>/screenshot.png` — usado para confirmar layout, posicionamento e aparência geral.
- **Tokens base:** `./figma/fundamentos/<topico>/` (cores, espaçamento, bordas, sombras, breakpoints, tipografia, ícones, logotipo, container, aspect-ratio).
- **Regras de código (gates):** `.code-review.json` e `CLAUDE.md`.
- **Foundations:** `src/theme`.
- **Catálogo de subcomponentes:** `design-system-tests/mapeamento.md`.

## Servidores de dev (suba uma vez, deixe rodando)

Garanta que estes dois processos estão no ar antes de iniciar; se não estiverem, suba-os **em background** e mantenha rodando durante toda a execução. **Não** rode `npm run build` — o watch já mantém o `dist/` atualizado.

- **design-system:** `npm run dev:watch` — sobe Storybook em `localhost:6006` + `tsup --watch` mantendo `dist/`.
- **design-system-tests:** `npm run dev` — sobe app Vite (rotas `/<slug>`). Confirme que `LOCAL_DS_PATH` aponta para o `dist/` local do design-system (`vite.config.ts`), senão ele usa a versão publicada.

Os agentes `storybook-auditor` e `ds-tests-author` **assumem** que esses servidores já estão no ar.

## Etapas do pipeline

Invoque cada agente abaixo via Task tool (`subagent_type` = nome do agente), um de cada vez, passando: nome do componente, `slug`, caminho da pasta do design (`./figma/components/<slug>/`) e o resultado do agente anterior.

1. **code-cleaner** — se o componente já existe no código, remove props/CSS/stories que não têm respaldo em `./figma/components/<slug>/`.
2. **acceptance-criteria-author** — gera o checklist de critérios de aceite a partir do design e **retorna o texto na resposta** (sem escrever em disco). Guarde esse texto para passar adiante.
3. **implementer** — implementa o componente (código, tipos, CSS module, stories) fiel ao design e ao checklist recebido como input.
4. **acceptance-criteria-checker** — recebe o checklist do passo 2 como input e verifica cada item contra o código.
   - **Loop A:** enquanto houver FAIL por causa do código, devolve ao **implementer** com a lista e re-roda o checker com o mesmo checklist.
5. **vitest-author** — recebe o checklist + dump e cria/atualiza `<Nome>.test.tsx`. Roda `npm run test:run`.
6. **storybook-auditor** — audita a doc page do componente no Storybook via Chrome MCP, comparando contra `./figma/components/<slug>/`.
   - **Loop B:** se a auditoria achar erro, identifique a etapa responsável (1 code-cleaner para item extra; 3 implementer para item ausente / token errado / estado interativo simulado), volte a ela com o relato e re-audite.
7. **ds-tests-author** — cria/atualiza `design-system-tests/src/pages/<slug>/` com todas as variações via props.
8. **Fechamento:**
   - Marque `"<slug>": true` em `design-system-tests/checklist.json` (preserve as demais chaves).
   - Commit + push nos **dois** repositórios, seguindo o estilo de cada um, terminando com:
     `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`
   - Se o repo estiver em `main`, crie uma branch de feature antes do commit.
   - Os artefatos comitados ficam em: `src/components/<Nome>/`, `src/types/components/<Nome>/`, e a página em `design-system-tests/src/pages/<slug>/`. A documentação do design vive em `./figma/components/<slug>/` (já comitada).

## Critério de conclusão

Encerre automaticamente assim que todos os gates abaixo estiverem verdes — **não** pare para revisão humana entre etapas nem ao final. Use os loops para resolver erros que cabem ao próprio pipeline; só interrompa em caso de erro real impossível de resolver (build/test quebrando com causa fora do escopo do componente, conflito explícito entre dump e gate do `.code-review.json` sem caminho de saída, servidor de dev que não sobe).

Gates verdes:

- Código sem itens fora do design.
- Critérios de aceite 100% PASS.
- `npm run build` e `npm run test:run` passando.
- Auditoria do Storybook limpa (incluindo axe-core sem violações).
- Página de variações criada em `design-system-tests`.
- `design-system-tests/checklist.json` com `"<slug>": true`.
- Commit + push feitos nos dois repositórios.

Ao concluir, entregue um resumo curto: o que mudou em cada arquivo e o estado de cada gate. Pendências `warning`/`info` do `.code-review.json` são apenas listadas; não bloqueiam a conclusão.
