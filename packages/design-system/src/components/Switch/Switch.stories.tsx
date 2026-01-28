import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Switch } from "./Switch";

import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4062-5352&m=dev";

type SwitchStoryProps = React.ComponentProps<typeof Switch> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<SwitchStoryProps> = {
  title: "Components/Switch",
  component: Switch,
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
Componente de alternância (Switch) baseado no [Ant Design Switch](https://ant.design/components/switch).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Switch.
- **Custom (Juscash)**:
  - \`error\`: Define o estado de erro visual (vermelho) quando verdadeiro.

### Como usar:

\`\`\`tsx
import { Switch } from "@Juscash/design-system";

function Example() {
  return <Switch defaultChecked />;
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
  args: {
    hover: false,
    active: false,
    focus: false,
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Desabilita a interação",
    },
    defaultChecked: {
      control: "boolean",
      description: "Estado inicial checado",
    },
    error: {
      control: "boolean",
      description: "Estado de erro",
    },
    loading: {
      control: "boolean",
      description: "Estado de carregamento",
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
    const { hover, active, focus, ...props } = args;
    const pseudoClasses = [
      hover && "pseudo-hover",
      active && "pseudo-active",
      focus && "pseudo-focus-visible",
    ]
      .filter(Boolean)
      .join(" ");

    return <Switch {...props} className={pseudoClasses} />;
  },
};

export default meta;
type Story = StoryObj<SwitchStoryProps>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const ErrorChecked: Story = {
  args: {
    error: true,
    defaultChecked: true,
  },
};
