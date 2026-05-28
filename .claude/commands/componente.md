---
description: Pipeline completo de um componente do DS (Figma → parecer → revisão → limpeza → critérios → implementação → testes → auditoria Storybook → variações)
argument-hint: <NomeDoComponente em PascalCase, ex. Alert, DatePicker, BackToTop>
---

Você é o **orquestrador** do pipeline de componentes do Juscash Design System.

Componente alvo: **$ARGUMENTS**

- Use o nome exatamente como recebido (PascalCase) para o componente, o tipo e a pasta de docs.
- Derive o `slug` (kebab-case) quando precisar de paths de página de teste ou da URL do Storybook.

Fontes de verdade (consulte sempre que necessário):

- Regras de código (gates): `.code-review.json` e `CLAUDE.md`
- Foundations: `src/theme`
- Catálogo oficial de componentes e subcomponentes: `design-system-tests/mapeamento.md`
- Card guarda-chuva: https://juscash.atlassian.net/browse/JS-2395

**Servidores de dev de longa duração — suba UMA vez e deixe rodando durante toda a execução; nunca reinicie.** Antes de iniciar o pipeline, garanta (você, orquestrador) que estes dois processos estão no ar; se não estiverem, suba-os **em background** e **deixe-os rodando** por toda a execução do `prompts.md`. **Não** builde.

- **design-system:** `npm run dev:watch` — sobe o Storybook em `localhost:6006` **e** mantém o `dist/` atualizado via `tsup --watch` (é esse `dist/` que o `design-system-tests` consome via `LOCAL_DS_PATH`). Substitui qualquer `npm run build`.
- **design-system-tests:** `npm run dev` — sobe o app Vite (rotas `/<slug>`). Garanta que `LOCAL_DS_PATH` aponta para o design-system (veja `vite.config.ts`), senão ele consome a versão **publicada** em vez das suas mudanças locais.

Os agentes (`storybook-auditor`, `ds-tests-author`) **assumem** que esses servidores já estão no ar e apenas os usam.

## Como orquestrar

Invoque cada agente abaixo **via Task tool** (`subagent_type` = nome do agente), um de cada vez, passando o nome do componente, os caminhos relevantes e o **resultado do agente anterior**. Não pule etapas. Respeite os três loops.

1. **figma-documenter** — lê o Figma (páginas `Componentes` e `Fundamentos`) via MCP e escreve o parecer técnico em `docs/componentes/$ARGUMENTS/$ARGUMENTS.md`.
2. **doc-reviewer** — compara o parecer com o Figma ao vivo e aponta o que ficou faltando, foi documentado a mais ou está incorreto.
   - **Loop A:** enquanto o doc-reviewer retornar divergências, re-invoque o **figma-documenter** com a lista exata de correções e rode o **doc-reviewer** de novo. Só avance com **0 divergências**.
3. **code-cleaner** — se o componente já existe no código, remove props/comportamentos/CSS que **não têm respaldo claro no parecer** (ex.: prop `tooltip` no código sem referência no parecer → apagar).
4. **acceptance-criteria-author** — gera o roteiro de critérios de aceite em `docs/componentes/$ARGUMENTS/acceptance-criteria.md` a partir do parecer.
5. **implementer** — implementa o parecer no código (componente, tipos, CSS module, stories), respeitando os gates.
6. **acceptance-criteria-checker** — verifica cada critério de aceite contra o código e as stories.
   - **Loop B:** enquanto houver critério não cumprido por causa do código, re-invoque o **implementer** com a lista e re-execute o checker.
7. **vitest-author** — cria/atualiza `<Nome>.test.tsx` e roda `npm run test:run`.
8. **storybook-auditor** — audita a doc page do componente no Storybook via **Chrome MCP** (estilos, tamanhos, cores, espaçamentos, ícones, hover/focus/focus-visible reais, tooltips, subcomponentes, responsividade e WCAG/axe-core).
   - **Loop C:** se a auditoria achar erro, identifique a etapa responsável (3, 5 ou 7), volte a ela com o relato do auditor e **re-audite**. Só avance com auditoria limpa.
9. **ds-tests-author** — cria/atualiza todas as variações de uso em `design-system-tests/src/pages/<slug>/` (página + `index.module.css`). Sobe o app por conta própria (design-system buildado + resolvido via `LOCAL_DS_PATH`) para validar. Rota e Home são automáticas (`COMPONENTS` em `src/components.ts` + `import.meta.glob` das páginas).
10. **Fechamento (commit + check)** — somente com **todos os gates verdes**:
    - Marque o componente como concluído em `design-system-tests/checklist.json`: defina `"<slug>": true` (adicione a chave se não existir; preserve as demais). O `slug` é minúsculo, com `/` e espaços virando `-` (ex.: `Back to top` → `back-to-top`, `KPI card` → `kpi-card`).
    - Faça **commit (com push)** nos **dois** repositórios, seguindo o estilo de commit de cada um e terminando a mensagem com `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`:
      - `design-system`: componente, tipos, CSS module, stories, testes e `docs/componentes/<Nome>/`.
      - `design-system-tests`: página de variações e `checklist.json`.
    - Se algum repo estiver na branch default (`main`), crie/use uma branch de feature antes de commitar.

## Critério de conclusão

Só finalize quando **todos** estes gates estiverem verdes:

- Parecer sem divergências (doc-reviewer = 0).
- Código limpo (sem props/itens fora do parecer) e implementado.
- Critérios de aceite 100% cumpridos.
- `npm run build` e `npm run test:run` passando.
- Auditoria do Storybook limpa (incluindo axe-core sem violações).
- Variações criadas em `design-system-tests`.
- `design-system-tests/checklist.json` com `"<slug>": true`.
- Commit feito nos dois repositórios (com push).

Ao terminar, entregue um **resumo**: o que mudou em cada arquivo, o estado de cada gate e quaisquer pendências `warning`/`info` do `.code-review.json` que sobraram para decisão humana.
