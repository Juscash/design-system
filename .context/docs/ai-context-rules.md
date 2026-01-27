---
type: doc
name: ai-context-rules
description: Regras de prioridade para agentes e skills do projeto
category: rules
generated: 2026-01-27
status: filled
scaffoldVersion: "2.0.0"
---

# Regras do AI Context

## Prioridade de agentes

- Sempre priorizar agentes custom do projeto.
- Usar agentes built-in apenas quando nao houver agente custom equivalente.

Agentes custom do projeto:
- `component-creator`
- `component-docs-agent`

## Prioridade de skills

- Sempre priorizar skills custom do projeto.
- Usar skills built-in apenas quando nao houver skill custom equivalente.

Skills custom do projeto:
- `component-creation`
- `figma-mcp`
- `story-creation`
- `test-creation`
- `run-tests`
- `docs-architecture-update`

## Perguntas ao usuario

- Sempre que precisar de uma decisao do usuario, faca uma pergunta com opcoes usando selecao (lista de escolhas).
- Evite pedir resposta livre.

## Prompt padrao (plano)

Use este prompt curto quando quiser um plano e garantir o uso de agentes/skills custom:

```text
Use apenas agentes e skills custom deste repo (ver .context/docs/ai-context-rules.md).
Gere um plano via MCP ai-context antes de implementar qualquer coisa.
Quando precisar de decisao, pergunte com lista de escolhas.
```
