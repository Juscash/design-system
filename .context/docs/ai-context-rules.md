---
type: doc
name: ai-context-rules
description: Regras de prioridade para agentes e skills do projeto
category: rules
generated: 2026-02-10
status: filled
scaffoldVersion: "2.0.0"
---

# Regras Do AI Context

## Prioridade De Agentes
- Priorizar agentes custom do projeto quando houver equivalente.
- Usar agentes built-in somente como fallback.

Agentes custom principais:
- `component-creator`
- `component-docs-agent`

## Prioridade De Skills
- Priorizar skills custom sob `.context/skills` para tarefas do design system.
- Usar skills built-in apenas quando nao houver skill custom aplicavel.

Skills custom do projeto:
- `component-creation`
- `figma-mcp`
- `story-creation`
- `test-creation`
- `run-tests`
- `docs-architecture-update`

## Regras De Execucao
- Planejamento de feature: usar `feature-breakdown` quando a mudanca nao for trivial.
- Criacao de componente: usar `component-creation` + `figma-mcp`.
- Historias de Storybook: usar `story-creation`.
- Testes de componente: usar `test-creation` e validar com `run-tests`.
- Revisao: usar `pr-review` e `code-review`.

## Decisoes Com Usuario
- Quando faltar contexto critico, fazer pergunta objetiva antes de implementar.
- Preferir opcoes fechadas e impacto de cada opcao.

## Limites
- Nao inventar API que nao exista no Figma/Antd quando a tarefa exigir aderencia a esses insumos.
- Evitar alterar `dist/` manualmente; gerar por build.
