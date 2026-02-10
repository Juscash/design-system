import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Loading } from "./Loading";
import { designSystemColors } from "../../theme";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4076-2037&m=dev";

type LoadingStoryProps = React.ComponentProps<typeof Loading> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<LoadingStoryProps> = {
  title: "Components/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente de carregamento (Spinner) baseado no [Ant Design Spin](https://ant.design/components/spin).

### Props:
- **Extended (Ant Design)**: Props padrao do AntD Spin.

### Como usar:

\`\`\`tsx
import { Loading } from "@juscash/design-system";

function Example() {
  return <Loading />;
}
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
            <h3
              style={{
                marginBottom: "1rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              🎨 Figma Spec
            </h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>

          <Stories />
        </>
      ),
    },
  },
  tags: ["autodocs"],
  args: {
    hover: false,
    active: false,
    focus: false,
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "default", "large"],
      description: "Tamanho do spinner",
    },
    tip: {
      control: "text",
      description: "Texto de descrição (opcional)",
    },
    fullscreen: {
      control: "boolean",
      description: "Exibir em tela cheia",
    },
    hover: {
      control: "boolean",
      description: "Força o estado hover",
      table: { category: "Pseudo States" },
    },
    active: {
      control: "boolean",
      description: "Força o estado active",
      table: { category: "Pseudo States" },
    },
    focus: {
      control: "boolean",
      description: "Força o estado focus",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { hover, active, focus, className, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return <Loading {...props} className={mergedClassName} />;
  },
};

export default meta;
type Story = StoryObj<LoadingStoryProps>;

export const Default: Story = {
  args: {
    size: "default",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const WithTip: Story = {
  args: {
    size: "large",
    tip: "Carregando...",
  },
};

export const ContainerExample: Story = {
  render: () => (
    <div
      style={{
        padding: "50px",
        background: designSystemColors.neutral[100],
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <Loading />
    </div>
  ),
};

// Example simulating the Figma structure roughly (just the spinner part)
export const FigmaExample: Story = {
  args: {
    size: "large",
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
      }}
    >
      <Loading {...args} />
      <span style={{ fontFamily: "Inter", color: designSystemColors.neutral[600] }}>Loading</span>
    </div>
  ),
};
