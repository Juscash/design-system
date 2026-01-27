---
type: skill
name: figma-mcp
description: Usar MCP do Figma para extrair specs e variacoes antes de implementar
skillSlug: figma-mcp
phases: [P, E]
mode: false
generated: 2026-01-26
status: filled
scaffoldVersion: "2.0.0"
---

# 🖼️ Skill: figma-mcp

> Usar o MCP do Figma para obter specs reais antes de escrever codigo.

## ✅ Quando usar

- Sempre que houver link/node do Figma.
- Antes de perguntar sobre variantes ou estados.

## 🔎 Entradas obrigatorias

- Link do Figma com `node-id`.

## 🧭 Passos

1. Extrair `nodeId` do link.
2. Chamar `get_design_context({ nodeId })`.
3. Chamar `get_screenshot({ nodeId })`.
4. Chamar `get_variable_defs({ nodeId })`.
5. Identificar variantes, estados e props visiveis no Figma.
6. Mapear tokens para `designSystemColors`, `spacing`, `radius`.
7. Se houver ambiguidade, so entao perguntar variantes extras.

## 📦 Saida esperada

- Lista de variantes/estados reais do Figma.
- Tokens mapeados para o DS.
- Observacoes de props obrigatorias.

## ✍️ Exemplo

```bash
get_design_context({ nodeId: "123:456" })
get_screenshot({ nodeId: "123:456" })
get_variable_defs({ nodeId: "123:456" })
```
