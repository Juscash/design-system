---
type: agent
name: Component Creator
description: Especialista em criar componentes para o Design System JusCash, estendendo Ant Design
agentType: component-creator
phases: [P, E]
generated: 2026-02-10
status: filled
scaffoldVersion: "2.0.0"
---

# Component Creator - Agent Playbook

## Objective
Criar componentes React/TypeScript no design system com base no Antd e alinhamento com Figma.

## Required Skills
- `component-creation`
- `figma-mcp`
- `story-creation`
- `test-creation`
- `run-tests`

## Workflow
1. Levantar requisitos (Figma + Antd + API esperada).
2. Implementar componente em `packages/design-system/src/components/<Component>`.
3. Criar/atualizar story e testes.
4. Atualizar exports locais e globais.
5. Rodar build/testes do workspace afetado.

## Project Rules
- Manter padrao de pasta por componente (`Component.tsx`, `Component.stories.tsx`, `Component.test.tsx`, `index.ts`).
- Reusar tokens de `theme/foundations` em vez de valores hardcoded.
- Evitar breaking change sem alinhamento explicito.
