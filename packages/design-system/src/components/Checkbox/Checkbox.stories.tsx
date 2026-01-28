import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Checkbox } from "./Checkbox";

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
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4052-2075&m=dev";

type CheckboxStoryProps = React.ComponentProps<typeof Checkbox> & {
  hover?: boolean;
  focus?: boolean;
};

const meta: Meta<CheckboxStoryProps> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente de checkbox baseado no [Ant Design Checkbox](https://ant.design/components/checkbox).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Checkbox.
- **Custom (Juscash)**:
  - \`error\`: Indica estado de erro.

### Como usar:

\`\`\`tsx
import { Checkbox } from "@Juscash/design-system";

function Example() {
  return <Checkbox>Concordo com os termos</Checkbox>;
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
  argTypes: {
    disabled: {
      control: "boolean",
    },
    checked: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
    hover: {
      control: "boolean",
      description: "Estado hover",
      table: { category: "Pseudo States" },
    },
    focus: {
      control: "boolean",
      description: "Estado focus",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { hover, focus, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", focus && "pseudo-focus"]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={pseudoClasses}>
        <Checkbox {...props} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<CheckboxStoryProps>;

export const Default: Story = {
  args: {
    children: "Checkbox label",
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    children: "Checked",
  },
};

export const Error: Story = {
  args: {
    error: true,
    checked: true,
    children: "Error State",
  },
};

export const Group: StoryObj<typeof Checkbox.Group> = {
  render: (args) => (
    <Checkbox.Group {...args}>
      <Checkbox value="A">Option A</Checkbox>
      <Checkbox value="B">Option B</Checkbox>
      <Checkbox value="C">Option C</Checkbox>
    </Checkbox.Group>
  ),
  args: {
    defaultValue: ["A"],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    children: "Disabled Checked",
  },
};
