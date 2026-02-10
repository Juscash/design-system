import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Select } from "./Select";
import { FormItem } from "../FormItem/FormItem";
import { Form } from "antd";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4062-7843&m=dev";

type SelectStoryProps = React.ComponentProps<typeof Select> & {
  focus?: boolean;
  hover?: boolean;
  active?: boolean;
};
const meta: Meta<SelectStoryProps> = {
  title: "Components/Select",
  component: Select,
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
Componente de seleção (Select) baseado no [Ant Design Select](https://ant.design/components/select).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Select.
- **Custom (Juscash)**:
  - \`dsSize\`: Define o tamanho específico seguindo o Design System (\`xs\`, \`s\`, \`m\`, \`l\`).

### Como usar:

\`\`\`tsx
import { Select } from "@juscash/design-system";

function Example() {
  return (
    <Select
      placeholder="Selecione uma opcao"
      options={[{ value: "a", label: "Opcao A" }]}
    />
  );
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
    dsSize: {
      control: "select",
      options: ["xs", "s", "m", "l"],
      description: "Tamanho do Design System",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o componente",
    },
    status: {
      control: "select",
      options: ["", "error", "warning"],
      description: "Estado de validação",
    },
    active: {
      control: "boolean",
      description: "Força o estado active",
      table: { category: "Pseudo States" },
    },
    focus: {
      control: "boolean",
      description: "Força o estado de focus (Visual)",
      table: { category: "Pseudo States" },
    },
    hover: {
      control: "boolean",
      description: "Força o estado de hover (Visual)",
      table: { category: "Pseudo States" },
    },
  },
  decorators: [
    (Story) => (
      <Form layout="vertical">
        <div style={{ width: 300 }}>
          <Story />
        </div>
      </Form>
    ),
  ],
  render: (args) => {
    const { focus, hover, active, className, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return (
      <FormItem label="Label">
        <Select {...props} className={mergedClassName} />
      </FormItem>
    );
  },
};

export default meta;
type Story = StoryObj<SelectStoryProps>;

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
  { value: "disabled", label: "Disabled Option", disabled: true },
];

export const Default: Story = {
  args: {
    placeholder: "Select an option",
    options,
  },
  name: "Simple",
};

export const Searchable: Story = {
  args: {
    placeholder: "Search options...",
    showSearch: true,
    options,
  },
  name: "Simple with Search",
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled select",
    disabled: true,
    options,
  },
};

export const Error: Story = {
  args: {
    placeholder: "Select with error",
    status: "error",
    options,
  },
};

export const Focus: Story = {
  args: {
    placeholder: "Focused select",
    focus: true,
    options,
  },
};

export const ErrorFocus: Story = {
  args: {
    placeholder: "Error + Focus",
    status: "error",
    focus: true,
    options,
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
      {/* XS Size */}
      <FormItem label="Size XS">
        <Select dsSize="xs" placeholder="XS Size" options={options} />
      </FormItem>

      {/* S Size */}
      <FormItem label="Size S">
        <Select dsSize="s" placeholder="S Size" options={options} />
      </FormItem>

      {/* M Size */}
      <FormItem label="Size M (Default)">
        <Select dsSize="m" placeholder="M Size" options={options} />
      </FormItem>

      {/* L Size */}
      <FormItem label="Size L">
        <Select dsSize="l" placeholder="L Size" options={options} />
      </FormItem>
    </div>
  ),
  decorators: [(Story) => <Story />], // Remove default layout decorator for this custom render
};
