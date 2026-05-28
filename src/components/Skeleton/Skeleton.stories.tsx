import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Skeleton } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-20627&m=dev";

const CONTAINER_WIDTH = 320;
const SMALL_CONTAINER_WIDTH = 260;
const AVATAR_WRAPPER_SIZE = 48;
const CUSTOM_LAYOUT_GAP = 12;

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
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
Componente \`Skeleton\` (placeholder de carregamento) baseado no padrão de
"shimmer" do [shadcn/ui Skeleton](https://ui.shadcn.com/docs/components/skeleton).
Usado para indicar visualmente que o conteúdo está sendo carregado, ocupando
o espaço onde os elementos reais aparecerão.

### Composição

O componente composto \`<Skeleton />\` renderiza:

- \`Skeleton.Avatar\` — disco 48x48 (radius.full).
- \`Skeleton.Line\` — barra 100% × 16px (radius.xl).
- \`Skeleton.Object\` — bloco 100% × 132px (radius.xl).

Para layouts customizados, use os subcomponentes diretamente.

### Tokens

- **Background:** \`var(--color-neutral-100)\` (#f5f5f5).
- **Avatar radius:** \`var(--radius-full)\`.
- **Line / Object radius:** \`var(--radius-xl)\` (8px).
- **Gap composto / stack:** \`var(--spacing-3)\` (12px).
- **Animação:** keyframe \`ds-skeleton-pulse\` (opacity 1 → 0.5 → 1), 2s ease-in-out infinite.

### Acessibilidade

- O wrapper externo carrega \`role="status"\`, \`aria-live="polite"\` e
  \`aria-busy="true"\` — leitores anunciam o estado de carregamento.
- O \`aria-label\` é configurável (default \`"Carregando..."\`).
- Os subcomponentes internos recebem \`aria-hidden="true"\` para evitar
  leitura redundante.
- Em \`prefers-reduced-motion: reduce\`, a animação é desligada via media query.

### Como usar

\`\`\`tsx
import { Skeleton } from "@juscash/design-system";

// Composto pronto
<Skeleton />

// Layout customizado
<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Skeleton.Line />
  <Skeleton.Line />
  <Skeleton.Object />
</div>
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
    animated: {
      control: "boolean",
      description: "Liga ou desliga a animação de pulse. Default `true`.",
    },
    "aria-label": {
      control: "text",
      description: "Rótulo acessível anunciado por leitores de tela. Default `'Carregando...'`.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

/** Composto padrão: avatar + linha + bloco, animado, com `aria-label` default. */
export const Default: Story = {
  args: {
    animated: true,
  },
  render: (args) => (
    <div style={{ width: CONTAINER_WIDTH }}>
      <Skeleton {...args} />
    </div>
  ),
};

/** Subcomponente `Skeleton.Avatar` isolado — disco 48x48. */
export const AvatarOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: "Subcomponente avatar (48x48, `radius.full`) usado isoladamente.",
      },
    },
  },
  render: () => (
    <div style={{ width: AVATAR_WRAPPER_SIZE }}>
      <Skeleton.Avatar aria-label="Carregando avatar..." />
    </div>
  ),
};

/** Subcomponente `Skeleton.Line` isolado — barra 100% × 16px. */
export const LineOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: "Subcomponente linha (16px de altura, `radius.xl`) usado isoladamente.",
      },
    },
  },
  render: () => (
    <div style={{ width: SMALL_CONTAINER_WIDTH }}>
      <Skeleton.Line aria-label="Carregando linha..." />
    </div>
  ),
};

/** Subcomponente `Skeleton.Object` isolado — bloco 100% × 132px. */
export const ObjectOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: "Subcomponente bloco (132px de altura, `radius.xl`) usado isoladamente.",
      },
    },
  },
  render: () => (
    <div style={{ width: SMALL_CONTAINER_WIDTH }}>
      <Skeleton.Object aria-label="Carregando bloco..." />
    </div>
  ),
};

/** Composto com `animated={false}` — pulse desligado, opacidade fixa em 1. */
export const NoAnimation: Story = {
  parameters: {
    docs: {
      description: {
        story: "Composto com animação desligada. Útil em ambientes onde o pulse distrai o usuário.",
      },
    },
  },
  args: {
    animated: false,
  },
  render: (args) => (
    <div style={{ width: CONTAINER_WIDTH }}>
      <Skeleton {...args} />
    </div>
  ),
};

/** Layout customizado: consumer monta a composição usando as primitivas. */
export const CustomLayout: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo de layout customizado: três linhas e um bloco, sem usar o composto. Útil para mockar um card de listagem.",
      },
    },
  },
  render: () => (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Carregando lista..."
      style={{ width: CONTAINER_WIDTH, display: "flex", flexDirection: "column", gap: CUSTOM_LAYOUT_GAP }}
    >
      <Skeleton.Line aria-hidden="true" />
      <Skeleton.Line aria-hidden="true" />
      <Skeleton.Line aria-hidden="true" />
      <Skeleton.Object aria-hidden="true" />
    </div>
  ),
};

/** Playground controlado por args. */
export const Playground: Story = {
  args: {
    animated: true,
    "aria-label": "Carregando...",
  },
  render: (args) => (
    <div style={{ width: CONTAINER_WIDTH }}>
      <Skeleton {...args} />
    </div>
  ),
};
