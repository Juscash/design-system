---
type: skill
name: story-creation
description: Criar stories baseadas no Figma com link de design, props estendidas e exemplos reais
skillSlug: story-creation
phases: [E]
mode: false
generated: 2026-01-26
status: filled
scaffoldVersion: "2.0.0"
---

# 📚 Skill: story-creation

> Criar stories fieis ao Figma e expor props essenciais, seguindo o padrao real do repositorio.

## ✅ Quando usar

- Sempre que criar ou alterar componente do Design System.

## 🧭 Passos

1. Ler o Figma via MCP e listar estados/variacoes reais.
2. Mapear props extendidas e props criadas.
3. Criar `Default` com props principais.
4. Criar stories para cada estado/variacao observada no Figma.
5. Expor props criadas e pseudo states em `argTypes`.
6. Evitar exemplos inventados fora do Figma.

## ✅ Obrigatorio no story

- `parameters.design` com URL do Figma.
- `docs.description.component` com link do Antd e resumo de props estendidas.
- `tags: ["autodocs"]`.
- Props principais do componente.
- Props criadas pelo Design System.
- Exemplos iguais aos do Figma.

## 🧩 Padrao real do repo

- Usar `@storybook/react-vite`.
- `Meta` tipado com props estendidas quando houver pseudo states.
- `parameters.design` com `type: "figma"` e URL.
- `docs.description.component` com texto + link do Antd.
- `argTypes` para props criadas e pseudo states (categoria "Pseudo States").
- `decorators` quando o layout precisar (ex.: `Form`, largura fixa).
- `render` customizado quando precisa forcar `focus/hover` visual.

## ✍️ Template base

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { NomeComponente } from "./NomeComponente";

type StoryProps = React.ComponentProps<typeof NomeComponente> & {
  hover?: boolean;
  focus?: boolean;
  active?: boolean;
};

const meta: Meta<StoryProps> = {
  title: "Components/NomeComponente",
  component: NomeComponente,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXX?node-id=123-456",
    },
    docs: {
      description: {
        component: `
Componente baseado no [Ant Design NomeComponente](https://ant.design/components/nomecomponente).

### Props:
- **Extended (Ant Design)**: Props padrao do Antd.
- **Custom (Juscash)**:
  - \`dsSize\`: Define tamanho (xs, s, m, l).
`,
      },
    },
  },
  argTypes: {
    dsSize: {
      control: "select",
      options: ["xs", "s", "m", "l"],
      description: "Tamanho do Design System",
    },
    hover: {
      control: "boolean",
      description: "Forca o estado hover",
      table: { category: "Pseudo States" },
    },
    focus: {
      control: "boolean",
      description: "Forca o estado focus",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { hover, focus, active, ...props } = args;
    const pseudoClasses = [
      hover && "pseudo-hover",
      focus && "pseudo-focus",
      active && "pseudo-active",
    ]
      .filter(Boolean)
      .join(" ");

    return <NomeComponente {...props} className={pseudoClasses} />;
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

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

## ✅ Checklist rapido

- [ ] URL do Figma em `parameters.design`.
- [ ] Link Antd em `docs.description.component`.
- [ ] Props criadas em `argTypes`.
- [ ] Variacoes reais do Figma cobertas.
