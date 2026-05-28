import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Separator } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4115-8625&m=dev";

const CARD_WIDTH = 320;
const CARD_PADDING = 16;
const CARD_RADIUS = 8;
const TITLE_FONT_SIZE = 31;
const BODY_FONT_SIZE = 16;
const INLINE_GAP = 8;
const INLINE_HEIGHT = 16;

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
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
Linha horizontal ou vertical usada para dividir conteúdo em seções distintas,
ajudando na organização visual e hierarquia da interface.

### Tokens

- Cor: \`var(--color-border-regular)\` (\`#d4d4d4\`, neutral 300).
- Espessura: 1px (em ambas as direções).
- Raio: 2px na variante horizontal; sem raio na vertical.

### Eixo

A prop \`direction\` define o eixo da linha:

- \`"horizontal"\` (default): linha 1px de altura ocupando 100% da largura
  do container.
- \`"vertical"\`: linha 1px de largura ocupando 100% da altura do container.
  Quando vertical, o componente expõe \`aria-orientation="vertical"\` para
  tecnologias assistivas.

### Como usar

\`\`\`tsx
import { Separator } from "@juscash/design-system";

// Horizontal (default)
<Separator />

// Vertical (precisa de container com altura definida)
<div style={{ display: "flex", height: 16 }}>
  <span>Item</span>
  <Separator direction="vertical" />
  <span>Item</span>
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
    direction: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      description: "Eixo do separator. Horizontal (default) ou vertical.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Separator>;

/** Variante padrão. Linha horizontal de 1px ocupando a largura do container. */
export const Default: Story = {
  args: {
    direction: "horizontal",
  },
  render: (args) => (
    <div style={{ width: CARD_WIDTH }}>
      <Separator {...args} />
    </div>
  ),
};

/** Linha vertical de 1px. Requer container com altura definida. */
export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: "Variante vertical. O container precisa ter altura definida para a linha ser visível.",
      },
    },
  },
  args: {
    direction: "vertical",
  },
  render: (args) => (
    <div style={{ display: "flex", height: INLINE_HEIGHT, alignItems: "stretch" }}>
      <Separator {...args} />
    </div>
  ),
};

/** Exemplo 1 do dump: card-like com título, subtítulo e separator horizontal. */
export const WithContent: Story = {
  parameters: {
    docs: {
      description: {
        story: "Card com título e subtítulo separados visualmente do conteúdo seguinte por um separator horizontal.",
      },
    },
  },
  render: () => (
    <div
      style={{
        width: CARD_WIDTH,
        padding: CARD_PADDING,
        borderRadius: CARD_RADIUS,
        background: "var(--color-background-white)",
        border: "1px solid var(--color-border-regular)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: TITLE_FONT_SIZE,
          fontWeight: 700,
          color: "var(--color-text-dark)",
          lineHeight: 1.2,
        }}
      >
        Lorem ipsum
      </h2>
      <p
        style={{
          margin: 0,
          fontSize: BODY_FONT_SIZE,
          fontWeight: 400,
          color: "var(--color-text-soft)",
          lineHeight: 1.2,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis odio nec libero iaculis iaculis id a velit.
      </p>
      <Separator />
    </div>
  ),
};

/** Exemplo 2 do dump: lista inline com separadores verticais entre itens. */
export const InlineList: Story = {
  parameters: {
    docs: {
      description: {
        story: "Lista de itens em linha (`Page | Page | Page`) com separators verticais entre eles.",
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: INLINE_GAP,
        height: INLINE_HEIGHT,
        fontSize: BODY_FONT_SIZE,
        color: "var(--color-text-soft)",
        lineHeight: 1.2,
      }}
    >
      <span>Page</span>
      <Separator direction="vertical" />
      <span>Page</span>
      <Separator direction="vertical" />
      <span>Page</span>
    </div>
  ),
};

/** Playground controlado por args. */
export const Playground: Story = {
  args: {
    direction: "horizontal",
  },
  render: (args) => (
    <div
      style={{
        width: args.direction === "vertical" ? "auto" : CARD_WIDTH,
        height: args.direction === "vertical" ? INLINE_HEIGHT : "auto",
        display: args.direction === "vertical" ? "flex" : "block",
      }}
    >
      <Separator {...args} />
    </div>
  ),
};
