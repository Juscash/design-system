import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Slider } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4069-5196&m=dev";

type SliderStoryProps = React.ComponentProps<typeof Slider> & {
  focus?: boolean;
};

const meta: Meta<SliderStoryProps> = {
  title: "Components/Slider",
  component: Slider,
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
Componente Slider baseado no [Ant Design Slider](https://ant.design/components/slider).

Permite ao usuário selecionar um valor (ou intervalo) arrastando um marcador sobre uma trilha. Suporta as orientações **horizontal** e **vertical** e os modos **default** (valor único) e **range** (intervalo de dois valores), conforme dump \`figma/components/slider/\` (\`4069:5196\`).

### Props:
- **Extended (Ant Design)**: A API completa do AntD Slider é exposta como pass-through. Inclui \`vertical\`, \`range\`, \`min\`, \`max\`, \`step\`, \`marks\`, \`dots\`, \`tooltip\`, \`disabled\`, \`value\`, \`defaultValue\`, \`onChange\`, etc.
- **Custom (Juscash)**: Sem props proprietárias adicionais — a camada JusCash apenas aplica tokens visuais (marker 14×14 com borda 2px em \`brand.primary.500\`, track full \`neutral.300\`, track fill \`brand.primary.500\`).

### Como usar:

\`\`\`tsx
import { Slider } from "@juscash/design-system";

function Example() {
  return <Slider defaultValue={50} />;
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
              Figma Spec
            </h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>

          <Stories />
        </>
      ),
    },
  },
  args: {
    focus: false,
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Desabilita a interação",
    },
    vertical: {
      control: "boolean",
      description: "Orientação vertical (default = horizontal)",
    },
    focus: {
      control: "boolean",
      description: "Força o estado focus",
      table: { category: "Pseudo States" },
    },
  },
  render: (args: SliderStoryProps) => {
    const { focus, ...props } = args;
    const pseudoClasses = [focus && "pseudo-focus-visible"].filter(Boolean).join(" ");
    return (
      <div style={{ width: 240, padding: 16 }}>
        <Slider {...(props as React.ComponentProps<typeof Slider>)} className={pseudoClasses} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<SliderStoryProps>;

export const Default: Story = {
  args: { defaultValue: 50 },
  parameters: {
    docs: { description: { story: "Slider horizontal default — 240×16 com handle posicionado em 50%." } },
  },
};

export const HorizontalRange: Story = {
  args: { range: true, defaultValue: [25, 75] },
  parameters: {
    docs: {
      description: {
        story: "Slider horizontal em modo range — dois markers com o trilho colorido entre eles.",
      },
    },
  },
  render: (args: SliderStoryProps) => (
    <div style={{ width: 240, padding: 16 }}>
      <Slider {...(args as React.ComponentProps<typeof Slider>)} />
    </div>
  ),
};

export const Vertical: Story = {
  args: { vertical: true, defaultValue: 50 },
  parameters: {
    docs: { description: { story: "Slider vertical default — 16×240 com handle em 50%." } },
  },
  render: (args: SliderStoryProps) => (
    <div style={{ height: 240, padding: 16 }}>
      <Slider {...(args as React.ComponentProps<typeof Slider>)} />
    </div>
  ),
};

export const VerticalRange: Story = {
  args: { vertical: true, range: true, defaultValue: [25, 75] },
  parameters: {
    docs: { description: { story: "Slider vertical em modo range — dois markers com trilho colorido entre eles." } },
  },
  render: (args: SliderStoryProps) => (
    <div style={{ height: 240, padding: 16 }}>
      <Slider {...(args as React.ComponentProps<typeof Slider>)} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { defaultValue: 30, disabled: true },
  parameters: {
    docs: { description: { story: "Slider desabilitado — interação bloqueada." } },
  },
};

export const Playground: Story = {
  args: { defaultValue: 50 },
  parameters: {
    docs: { description: { story: "Playground livre — use os controles para alterar props nativas do Antd Slider." } },
  },
};
