import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Container } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=8347-11528&m=dev";

const DEMO_MIN_HEIGHT = 240;
const DEMO_PADDING = 16;
const DEMO_FONT_SIZE = 16;
const DEMO_RADIUS = 12;
const PLACEHOLDER_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis odio nec libero iaculis iaculis id a velit.";

const placeholderStyle: React.CSSProperties = {
  background: "var(--color-background-grey)",
  border: "1px dashed var(--color-border-regular)",
  borderRadius: DEMO_RADIUS,
  minHeight: DEMO_MIN_HEIGHT,
  padding: DEMO_PADDING,
  color: "var(--color-text-soft)",
  fontSize: DEMO_FONT_SIZE,
  lineHeight: 1.2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const meta: Meta<typeof Container> = {
  title: "Components/Container",
  component: Container,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Layout primitive que define a área útil de conteúdo dentro do layout (logo
após sidebar/header), centralizando o conteúdo e aplicando \`max-width\`
por breakpoint conforme a variante de produto.

### Variantes

- \`"product"\` (default) — Demais produtos JusCash (apps internos).
  Conteúdo fluido até 1919px; a partir de 1920px assume
  \`max-width: 1800px\` e fica centralizado.
- \`"site"\` — Site institucional. Conteúdo fluido até 1365px; a partir
  de 1366px assume \`max-width: 1086px\` e fica centralizado.

### Padding

Padding horizontal e superior fixos em **24px** em todos os modos
(token \`spacing[6]\`).

### Tag HTML

A prop \`as\` controla a tag raiz. Default \`"div"\`. Use \`"main"\` para a
área principal da página e \`"section"\` para regiões nomeadas.

### Como usar

\`\`\`tsx
import { Container } from "@juscash/design-system";

// Padrão (Demais produtos), tag div
<Container>
  <h1>Título</h1>
  <p>Conteúdo</p>
</Container>

// Site institucional, tag main
<Container variant="site" as="main">
  <h1>Página</h1>
</Container>
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
      options: ["product", "site"],
      description: "Variante de produto. `product` (default) para apps JusCash; `site` para o site institucional.",
    },
    as: {
      control: "inline-radio",
      options: ["div", "main", "section"],
      description: "Tag HTML do elemento raiz. Default `div`.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

/**
 * Variante padrão. Apps JusCash com conteúdo fluido até 1919px e
 * `max-width: 1800px` a partir de 1920px.
 */
export const Default: Story = {
  args: {
    variant: "product",
    as: "div",
  },
  render: (args) => (
    <Container {...args}>
      <div style={placeholderStyle}>{PLACEHOLDER_TEXT}</div>
    </Container>
  ),
};

/**
 * Variante para o site institucional. Conteúdo fluido até 1365px e
 * `max-width: 1086px` a partir de 1366px.
 */
export const Site: Story = {
  parameters: {
    docs: {
      description: {
        story: "Variante `site`. Conteúdo fluido até 1365px; a partir de 1366px assume `max-width: 1086px`.",
      },
    },
  },
  args: {
    variant: "site",
    as: "div",
  },
  render: (args) => (
    <Container {...args}>
      <div style={placeholderStyle}>{PLACEHOLDER_TEXT}</div>
    </Container>
  ),
};

/**
 * Container renderizado como `<main>`. Use para a área principal da
 * página — apenas uma vez por documento HTML.
 */
export const AsMain: Story = {
  parameters: {
    docs: {
      description: {
        story: "Container renderizado como `<main>` (HTML5 semantic). Indicado para a área principal da página.",
      },
    },
  },
  args: {
    variant: "product",
    as: "main",
  },
  render: (args) => (
    <Container {...args}>
      <div style={placeholderStyle}>{PLACEHOLDER_TEXT}</div>
    </Container>
  ),
};

/** Playground controlado por args. */
export const Playground: Story = {
  args: {
    variant: "product",
    as: "div",
  },
  render: (args) => (
    <Container {...args}>
      <div style={placeholderStyle}>{PLACEHOLDER_TEXT}</div>
    </Container>
  ),
};
