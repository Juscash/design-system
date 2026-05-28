import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Loading } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4163-13165&m=dev";

const WRAPPER_PADDING = 16;

const meta: Meta<typeof Loading> = {
  title: "Components/Loading",
  component: Loading,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente \`Loading\` (indicador de carregamento) baseado no padrão de
indicadores de progresso indeterminado descrito por
[ARIA Authoring Practices Guide — Status Role](https://www.w3.org/WAI/ARIA/apg/patterns/alert/).

### Variantes

- \`"dots"\` — três círculos \`size-13\` que descem em sequência (efeito
  "bouncing dots"). Container \`45 x 21px\`.
- \`"spinner"\` — anel circular \`40 x 40px\` rotacionando continuamente
  (\`border\` colorida com \`border-top-color: transparent\`). **Default.**

### Tokens

- **Cor principal:** \`var(--color-neutral-900)\` (#171717).
- **Cor da pista do spinner:** \`var(--color-neutral-200)\`.
- **Tamanho do dot:** 13px (diâmetro), \`var(--radius-full)\`.
- **Gap entre dots:** \`var(--spacing-1)\` (4px).
- **Spinner:** 40x40, \`border 4px\`, \`var(--radius-full)\`.
- **Animação dots:** keyframe \`ds-loading-dots-bounce\` (translateY 0 -> 8px -> 0), 1s ease-in-out infinite, delays 0/200/400ms.
- **Animação spinner:** keyframe \`ds-loading-spin\` (rotate 0 -> 360°), 1s linear infinite.

### Acessibilidade

- O wrapper externo carrega \`role="status"\`, \`aria-live="polite"\` e
  \`aria-busy="true"\` — leitores de tela anunciam o estado de carregamento.
- O \`aria-label\` é configurável (default \`"Carregando..."\`).
- Os elementos visuais internos recebem \`aria-hidden="true"\` para evitar
  leitura redundante.
- Em \`prefers-reduced-motion: reduce\`, as animações são desligadas via
  media query.

### Como usar

\`\`\`tsx
import { Loading } from "@juscash/design-system";

// Spinner (default)
<Loading />

// Dots
<Loading variant="dots" />

// Label customizado
<Loading variant="spinner" aria-label="Salvando alterações..." />
\`\`\`
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["dots", "spinner"],
      description: "Variante visual do indicador. Default `'spinner'`.",
    },
    "aria-label": {
      control: "text",
      description: "Rótulo acessível anunciado por leitores de tela. Default `'Carregando...'`.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Loading>;

/** Variante default `"spinner"` — anel circular rotacionando. */
export const Default: Story = {
  args: {
    variant: "spinner",
  },
  render: (args) => (
    <div style={{ padding: WRAPPER_PADDING }}>
      <Loading {...args} />
    </div>
  ),
};

/** Variante `"dots"` — três círculos descendo em sequência. */
export const Dots: Story = {
  parameters: {
    docs: {
      description: {
        story: "Variante `'dots'`: três dots `size-13` animados com `translateY` em sequência.",
      },
    },
  },
  args: {
    variant: "dots",
  },
  render: (args) => (
    <div style={{ padding: WRAPPER_PADDING }}>
      <Loading {...args} />
    </div>
  ),
};

/** Variante `"spinner"` isolada — anel circular rotacionando. */
export const Spinner: Story = {
  parameters: {
    docs: {
      description: {
        story: "Variante `'spinner'`: anel circular 40x40 rotacionando continuamente.",
      },
    },
  },
  args: {
    variant: "spinner",
  },
  render: (args) => (
    <div style={{ padding: WRAPPER_PADDING }}>
      <Loading {...args} />
    </div>
  ),
};

/** Playground controlado por args. */
export const Playground: Story = {
  args: {
    variant: "spinner",
    "aria-label": "Carregando...",
  },
  render: (args) => (
    <div style={{ padding: WRAPPER_PADDING }}>
      <Loading {...args} />
    </div>
  ),
};
