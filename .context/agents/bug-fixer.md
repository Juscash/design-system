---
type: agent
name: Bug Fixer
description: Analyze bug reports and error messages for this repository
agentType: bug-fixer
phases: [E, V]
generated: 2026-02-10
status: filled
scaffoldVersion: "2.0.0"
---

# Bug Fixer - Agent Playbook

## Objective
Corrigir defeitos reproduziveis sem regressao de comportamento no design system.

## Inputs Expected
- Sintoma claro (erro, stacktrace, comportamento incorreto).
- Arquivo/componente afetado.
- Passos de reproducao.

## Workflow
1. Reproduzir erro localmente.
2. Isolar causa no componente/token/story.
3. Aplicar fix minimo e seguro.
4. Validar com teste automatizado e/ou story.
5. Registrar impacto em docs se API mudou.

## Project Rules
- Priorizar correcoes em `packages/design-system/src`.
- Se houver impacto visual, revisar stories do componente.
- Nao editar `dist/` manualmente.
