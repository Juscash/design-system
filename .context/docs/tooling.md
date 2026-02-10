---
type: doc
name: tooling
description: Scripts, IDE settings, automation, and developer productivity tips
category: tooling
generated: 2026-02-10
status: filled
scaffoldVersion: "2.0.0"
---

# Tooling

## Runtime And Package Management
- Node.js `>=20.0.0` (definido em `package.json`).
- npm workspaces para orquestrar `packages/*` e `docs`.

## Main Scripts (Root)
- `npm run dev`: inicia Storybook local e libera porta 6006 antes.
- `npm run build`: build da lib + build do Storybook.
- `npm run build:design-system`: build somente da biblioteca.
- `npm run build:docs`: build somente da documentacao.
- `npm run version:patch|minor|major`: bump de versao da lib.
- `npm run version:publish`: push de tags para fluxo de publicacao.

## Workspace Scripts
Biblioteca (`@Juscash/design-system`):
- `npm run build -w @Juscash/design-system`
- `npm run test -w @Juscash/design-system`
- `npm run test:run -w @Juscash/design-system`

Docs (`@Juscash/storybook`):
- `npm run storybook -w @Juscash/storybook`
- `npm run build-storybook -w @Juscash/storybook`
- `npm run test-storybook -w @Juscash/storybook`

## Quality Toolchain
- Build da lib: `tsup`
- Tests: `vitest` + testing-library
- Docs/playground: `storybook`
- Iconografia: `lucide-react`

## AI Context Tooling
- Documentacao: `.context/docs/`
- Agentes: `.context/agents/`
- Skills: `.context/skills/`

Quando alterar estrutura desses artefatos, atualizar os indices:
- `.context/docs/README.md`
- `.context/agents/README.md`
