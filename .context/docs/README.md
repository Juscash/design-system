---
type: doc
name: README
description: Indice de documentacao do projeto
category: index
generated: 2026-02-10
status: filled
scaffoldVersion: "2.0.0"
---

# Documentation Index

Este diretorio concentra a base de conhecimento do repositorio `design_juscash`.

## Core Guides
- [Project Overview](./project-overview.md)
- [Architecture Notes](./architecture.md)
- [Development Workflow](./development-workflow.md)
- [Glossary](./glossary.md)
- [AI Context Rules](./ai-context-rules.md)
- [Tooling](./tooling.md)

## Repository Snapshot
- `apps/`: reservado para apps consumidores; atualmente nao ha app ativo na raiz.
- `assets/`: imagens e artefatos de apoio (nao fonte de componentes).
- `documentacao/`: documentacao de negocio e guias de uso/publicacao.
- `package-lock.json`: lockfile da raiz do workspace npm.
- `package.json`: scripts e configuracao do monorepo.
- `packages/`: codigo principal; inclui `packages/design-system`.
- `README.md`: visao geral publica do repositorio.
- `scripts/`: scripts utilitarios de versao e ambiente local.

## Agent And Skill References
- [Agent Handbook](../agents/README.md)
- [Skills Index](../skills/README.md)
- [Contributor Guide](../../CONTRIBUTING.md)

## Notes
- O projeto segue NPM Workspaces com dois focos: biblioteca (`@Juscash/design-system`) e docs (`@Juscash/storybook`).
- Sempre que novas docs/agentes forem criados, atualizar este indice e `../agents/README.md`.
