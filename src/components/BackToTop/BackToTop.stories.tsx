import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { BackToTop } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4237-10399&m=dev";

const LONG_CONTENT_HEIGHT = 2000;
const PARAGRAPH_LENGTH = 120;

const meta: Meta<typeof BackToTop> = {
  title: "Components/BackToTop",
  component: BackToTop,
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
Componente \`BackToTop\` (botão "voltar ao topo") baseado no padrão de
icon button neutral default do design system.

### Comportamento

- Visível apenas após o usuário rolar \`visibilityHeight\` (default 300) pixels
  a partir do topo do \`target\` (default \`window\`).
- Ao ser clicado, rola suavemente até o topo com \`easeInOutCubic\`,
  respeitando \`duration\` (default 450ms).
- Posição fixed \`bottom-24 right-24\` (desktop) e \`bottom-16 right-16\`
  (mobile, viewport < 768px).
- Tooltip obrigatório no placement \`left\` exibindo \`tooltipLabel\`
  (default \`"Voltar ao topo"\`).

### Como usar

\`\`\`tsx
import { BackToTop } from "@juscash/design-system";

<BackToTop />

// Threshold customizado
<BackToTop visibilityHeight={100} />

// Container scrollável customizado
<BackToTop target={() => document.getElementById("scroll-area")!} />
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
    visibilityHeight: {
      control: "number",
      description: "Distância (px) rolada a partir do topo para o botão aparecer.",
    },
    duration: {
      control: "number",
      description: "Duração (ms) da animação de rolagem ao clicar.",
    },
    tooltipLabel: {
      control: "text",
      description: "Texto exibido no tooltip e como `aria-label` do botão.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BackToTop>;

const LOREM_PARAGRAPH =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

/**
 * Bloco de conteúdo longo (>= 2000px) usado pelas stories para permitir
 * rolagem real e exibição do `BackToTop`.
 */
function ScrollableContent(): React.ReactElement {
  return (
    <div style={{ height: LONG_CONTENT_HEIGHT, padding: 24 }}>
      <p>Lorem ipsum (role para o final da página para ver o botão)</p>
      <p>{LOREM_PARAGRAPH}</p>
      <p>{LOREM_PARAGRAPH.repeat(2)}</p>
      <p>{LOREM_PARAGRAPH.repeat(2)}</p>
      <p>{LOREM_PARAGRAPH.repeat(2)}</p>
      <p style={{ marginTop: PARAGRAPH_LENGTH }}>Lorem ipsum dolor sit amet.</p>
    </div>
  );
}

/** Variante default — `visibilityHeight=300` e tooltip `"Voltar ao topo"`. */
export const Default: Story = {
  render: (args) => (
    <>
      <ScrollableContent />
      <BackToTop {...args} />
    </>
  ),
};

/** Threshold reduzido — botão aparece com apenas 100px de rolagem. */
export const CustomThreshold: Story = {
  parameters: {
    docs: {
      description: {
        story: "Variante com `visibilityHeight=100`. Útil para páginas mais curtas.",
      },
    },
  },
  args: {
    visibilityHeight: 100,
  },
  render: (args) => (
    <>
      <ScrollableContent />
      <BackToTop {...args} />
    </>
  ),
};

/** Conteúdo longo — demonstra o comportamento com várias telas de scroll. */
export const LongContent: Story = {
  parameters: {
    docs: {
      description: {
        story: "Variante com conteúdo extenso para validar a rolagem em uma página real.",
      },
    },
  },
  render: (args) => (
    <>
      <ScrollableContent />
      <ScrollableContent />
      <BackToTop {...args} />
    </>
  ),
};

/** Playground controlado por args. */
export const Playground: Story = {
  args: {
    visibilityHeight: 300,
    duration: 450,
    tooltipLabel: "Voltar ao topo",
  },
  render: (args) => (
    <>
      <ScrollableContent />
      <BackToTop {...args} />
    </>
  ),
};
