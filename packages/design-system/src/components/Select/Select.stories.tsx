import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { FormItem } from "../FormItem/FormItem";
import { shadow } from "../../theme/foundations/shadow";
import { Form } from "antd";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4062-7843&m=dev",
    },
    docs: {
      description: {
        component: `
Componente de seleção (Select) baseado no [Ant Design Select](https://ant.design/components/select).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Select.
- **Custom (Juscash)**:
  - \`dsSize\`: Define o tamanho específico seguindo o Design System (\`xs\`, \`s\`, \`m\`, \`l\`).
`,
      },
    },
  },
  args: {
    style: { width: "100%" },
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
    // @ts-ignore
    const { focus, hover, style, ...props } = args;
    const mergedStyle = { ...style };

    // Simulação visual de Focus para o Storybook
    if (focus) {
      // O input do Select é interno, mas podemos simular o anel de foco no container
      // Como o Select do AntD é complexo, aplicamos uma sombra no container principal
      // via inline style se possível, ou usamos a prop de estilo do componente
      // Nota: O Select aplica estilos em elementos internos (.ant-select-selector)
      // Aqui forçamos via box-shadow no style wrapper para efeito visual nos docs
      // (Isso é apenas para visualização, o componente real usa tokens)
      mergedStyle.boxShadow =
        props.status === "error" ? shadow.focusError : shadow.focus;
      mergedStyle.borderRadius = "8px"; // Ajuste fino para matching visual se necessário
    }

    return (
      <FormItem label="Label">
        <Select {...props} style={mergedStyle} />
      </FormItem>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

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
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}
    >
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
