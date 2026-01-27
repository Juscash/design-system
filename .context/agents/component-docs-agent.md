---
type: agent
name: Component Documentation Agent
description: Especialista em criar documentação de componentes para o Design System JusCash, gerando showcases e atualizando navegação
agentType: component-docs-agent
phases: [P, E]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
requires:
  docs:
    - architecture.md
    - development-workflow.md
    - glossary.md
  skills:
    - documentation
    - story-creation
    - figma-mcp
    - docs-architecture-update
---

# Component Documentation Agent Playbook

## Overview

Este agente automatiza a documentação de componentes do **JusCash Design System** via Storybook. Ele usa o Figma como fonte da verdade e cria/atualiza stories dentro da pasta do componente.

---

## Prerequisites

Antes de iniciar, consulte os seguintes recursos:

### 📚 Docs Obrigatórios
- [Architecture](../docs/architecture.md) - Entender estrutura de componentes e padrão Wrapper + ConfigProvider
- [Development Workflow](../docs/development-workflow.md) - Fluxo de criação e validação
- [Glossary](../docs/glossary.md) - Terminologia do Design System

### 🎯 Skills Recomendadas
- [Documentation](../skills/documentation/SKILL.md) - Templates de documentação de props e tokens
- [Story Creation](../skills/story-creation/SKILL.md) - **Stories baseadas no Figma**
- [Figma MCP](../skills/figma-mcp/SKILL.md) - Extrair specs e variacoes
- [Docs Architecture Update](../skills/docs-architecture-update/SKILL.md) - Atualizar docs quando necessario

---

## Workflow

1. **Perguntar ao usuário** qual componente deseja documentar.
2. **Localizar o componente** em `packages/design-system/src/components/<Componente>`.
3. **Usar Figma MCP** para capturar variantes e estados reais.
4. **Gerar/atualizar** o story `NomeComponente.stories.tsx` com exemplos fiéis ao Figma.
5. **Expor props principais e props criadas** em `argTypes`.
6. **Confirmar** ao usuário que a documentação foi atualizada.

---

## Templates

### Story Template (`NomeComponente.stories.tsx`)

> ⚠️ **Consulte a skill [Story Creation](../skills/story-creation/SKILL.md) para o template completo.**

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { NomeComponente } from "./NomeComponente";

const meta: Meta<typeof NomeComponente> = {
  title: "Components/NomeComponente",
  component: NomeComponente,
  argTypes: {
    // props criadas e props principais
  },
};

export default meta;
type Story = StoryObj<typeof NomeComponente>;

export const Default: Story = {
  args: {
    // props principais
  },
};

export const VarianteFigma: Story = {
  args: {
    // props iguais ao Figma
  },
};
```

---

## Demos Recomendadas

Cada showcase deve incluir:

| Demo | Descrição | Obrigatório |
|------|-----------|-------------|
| **Default** | Exemplo mínimo | ✅ Sim |
| **Estados do Figma** | estados/variacoes reais | ✅ Sim |
| **Tamanhos** | dsSize: xs, s, m, l | ✅ Se aplicável |
| **Variantes** | variant/props do DS | ✅ Se aplicável |

---

## Interaction Example

```
Agent: Qual componente você deseja documentar?
User: Modal
Agent: Consultando skill story-creation...
Agent: Lendo Figma via MCP...
Agent: Gerando stories com variacoes reais...
Agent: Story atualizado em `packages/design-system/src/components/Modal/Modal.stories.tsx`.
```

---

## Validation Checklist

Antes de finalizar, verifique:

- [ ] Story segue o padrão do `story-creation`
- [ ] Stories refletem estados reais do Figma
- [ ] Props principais e props criadas expostas em `argTypes`
- [ ] Story compilando no Storybook (`npm run dev:docs`)

---

## Notes

- O agente deve usar **caminhos absolutos** ao criar arquivos.
- Sempre confirmar antes de sobrescrever arquivos existentes.
- Caso o componente já tenha documentação, oferecer opção de atualizar.
- **Sempre consultar as skills antes de gerar código.**
