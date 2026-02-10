---
type: doc
name: development-workflow
description: Day-to-day engineering processes, branching, and contribution guidelines
category: workflow
generated: 2026-02-10
status: filled
scaffoldVersion: "2.0.0"
---

# Development Workflow

## Daily Loop
1. Instalar dependencias na raiz: `npm install`
2. Subir docs locais: `npm run dev`
3. Implementar alteracoes em `packages/design-system/src`
4. Atualizar stories e testes do componente alterado
5. Validar build e testes antes de PR

## Build And Validation
- Build completo (lib + docs): `npm run build`
- Testes da lib (workspace): `npm run test -w @Juscash/design-system`
- Testes de docs/storybook: `npm run test:docs`

Observacao:
- O script `npm run test` na raiz esta como placeholder (`no tests configured`).
- Para CI local fiel, execute explicitamente os workspaces relevantes.

## Component Change Checklist
- Codigo do componente atualizado (`*.tsx`).
- Storybook atualizado (`*.stories.tsx`).
- Teste atualizado/criado (`*.test.tsx`).
- Export atualizado em `packages/design-system/src/components/index.ts` quando necessario.
- Export de alto nivel revisado em `packages/design-system/src/index.ts`.

## Versioning And Publish
- Patch: `npm run version:patch`
- Minor: `npm run version:minor`
- Major: `npm run version:major`
- Publicacao/tag: `npm run version:publish`

## PR Expectations
- Conventional Commits.
- Descrever impacto visual/API.
- Incluir evidencias de validacao (build/testes).
- Se houver novo scaffold/agente/doc, atualizar indices em `.context/docs/README.md` e `.context/agents/README.md`.

## Related Resources
- [Architecture Notes](./architecture.md)
- [Tooling](./tooling.md)
- [Agent Handbook](../agents/README.md)
