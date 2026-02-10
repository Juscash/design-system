---
type: doc
name: project-overview
description: High-level description of the project, goals, and scope
category: overview
generated: 2026-02-10
status: filled
scaffoldVersion: "2.0.0"
---

# Project Overview

## What This Project Is
`design_juscash` e um monorepo que mantem:
- Biblioteca de componentes React/TypeScript da JusCash (`@Juscash/design-system`).
- Ambiente de documentacao e showcase via Storybook (`@Juscash/storybook`).

## Primary Goals
- Garantir consistencia visual e comportamental entre produtos JusCash.
- Expor componentes reutilizaveis com tipagem forte e API previsivel.
- Facilitar evolucao do design system com docs e testes proximos do codigo.

## Scope
Em escopo:
- Componentes UI e tokens em `packages/design-system`.
- Stories e testes ligados a componentes.
- Documentacao tecnica de suporte no repositorio.

Fora de escopo:
- Aplicacao de produto final (consumidores externos ao DS).
- Regras de negocio de dominio que nao sejam de UI/design.

## Repository Map
- `apps/`: reservado para apps consumidores; atualmente nao ha app ativo na raiz.
- `assets/`: artefatos/imagens de apoio.
- `documentacao/`: guias internos (instalacao, criacao, confluence).
- `package-lock.json`: lockfile da raiz.
- `package.json`: scripts e configuracao de workspace.
- `packages/`: codigo da biblioteca e distribuicao.
- `README.md`: entrada principal para colaboradores.
- `scripts/`: utilitarios de ambiente e versao/publicacao.

## Success Criteria
- Build da biblioteca e docs executa sem erro.
- Componentes novos/alterados incluem story e teste.
- API exportada segue contratos estaveis do pacote.
