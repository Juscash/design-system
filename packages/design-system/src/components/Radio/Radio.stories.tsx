import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Radio, RadioGroup } from "./Radio";

import { designSystemColors } from "../../theme";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4062-4957&m=dev";

type RadioStoryProps = React.ComponentProps<typeof Radio> & {
  focus?: boolean;

  active?: boolean;
};

const meta: Meta<RadioStoryProps> = {
  title: "Components/Radio",
  component: Radio,
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
Componente de seleção única baseado no [Ant Design Radio](https://ant.design/components/radio).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Radio.
- **Custom (Juscash)**:
  - \`error\`: Define o estado de erro visual (vermelho: borda e dot) quando verdadeiro.

### Como usar:

\`\`\`tsx
import { Radio } from "@juscash/design-system";

function Example() {
  return <Radio>Opcao</Radio>;
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
    children: "Radio option",

    active: false,
    focus: false,
  },
  argTypes: {
    error: {
      control: "boolean",
      description: "Define o estado de erro (borda vermelha e cor de destaque)",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita a interação com o componente",
    },
    focus: {
      control: "boolean",
      description: "Força o estado focus (visual)",
      table: { category: "Pseudo States" },
    },

    active: {
      control: "boolean",
      description: "Força o estado active (visual)",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { focus, active, style, ...props } = args;
    const pseudoClasses = [active && "pseudo-active", focus && "pseudo-focus-visible pseudo-focus-visible-all"]
      .filter(Boolean)
      .join(" ");

    return <Radio {...props} style={style} className={pseudoClasses} />;
  },
};

export default meta;
type Story = StoryObj<RadioStoryProps>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
    checked: false,
  },
};

export const ErrorChecked: Story = {
  args: {
    error: true,
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const Focus: Story = {
  args: {
    focus: true,
    checked: false,
  },
};

export const ErrorFocus: Story = {
  args: {
    focus: true,
    error: true,
    checked: false,
  },
};

export const Group: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, color: designSystemColors.neutral[900] }}>Radio Group</label>
      <RadioGroup defaultValue="a" {...args}>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </RadioGroup>
    </div>
  ),
  args: {
    children: undefined,
  },
};
