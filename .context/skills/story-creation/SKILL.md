---
type: skill
name: story-creation
description: Criar stories baseadas no Figma com props principais e props criadas
skillSlug: story-creation
phases: [E]
mode: false
generated: 2026-01-26
status: filled
scaffoldVersion: "2.0.0"
---

# 📚 Skill: story-creation

> Criar stories fiéis ao Figma e expor props essenciais.

## ✅ Quando usar

- Sempre que criar ou alterar componente do Design System.

## 🧭 Passos

1. Ler o Figma e listar estados/variacoes reais.
2. Criar `Default` com props principais.
3. Criar stories para cada estado/variacao observada no Figma.
4. Expor props criadas em `argTypes`.
5. Evitar exemplos inventados fora do Figma.

## ✅ Obrigatorio no story

- Props principais do componente.
- Props criadas pelo Design System.
- Exemplos iguais aos do Figma.

## ✍️ Template base

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { NomeComponente } from "./NomeComponente";

const meta: Meta<typeof NomeComponente> = {
  title: "Components/NomeComponente",
  component: NomeComponente,
  argTypes: {
    // props criadas
    dsSize: { control: "select", options: ["xs", "s", "m", "l"] },
  },
};

export default meta;
type Story = StoryObj<typeof NomeComponente>;

export const Default: Story = {
  args: {
    // props principais
  },
};

export const VarianteDoFigma: Story = {
  args: {
    // props iguais ao Figma
  },
};
```
