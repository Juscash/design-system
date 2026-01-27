import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { FormItem } from "../FormItem/FormItem";
import { shadow } from "../../theme/foundations/shadow";
import { Form } from "antd";

type SelectStoryProps = React.ComponentProps<typeof Select> & {
  focus?: boolean;
  hover?: boolean;
  active?: boolean;
};

const meta: Meta<SelectStoryProps> = {
  title: "Components/Select/MultiSelect",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4122-8572&m=dev",
    },
    docs: {
      description: {
        component: `
Componente de seleção múltipla (MultiSelect) baseado no [Ant Design Select](https://ant.design/components/select).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Select com \`mode="multiple"\`.
- **Custom (Juscash)**:
  - \`dsSize\`: Define o tamanho específico seguindo o Design System (\`xs\`, \`s\`, \`m\`, \`l\`).
`,
      },
    },
  },
  args: {
    mode: "multiple",
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

    if (focus) {
      mergedStyle.boxShadow =
        props.status === "error" ? shadow.focusError : shadow.focus;
      mergedStyle.borderRadius = "8px";
    }

    return (
      <FormItem label="Label">
        <Select {...props} style={mergedStyle} />
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
  { value: "option5", label: "Option 5" },
  { value: "disabled", label: "Disabled Option", disabled: true },
];

export const Default: Story = {
  args: {
    placeholder: "Select multiple options",
    options,
  },
  name: "Multiple",
};

export const Searchable: Story = {
  args: {
    placeholder: "Search options...",
    showSearch: true,
    options,
  },
  name: "Multiple with Search",
};

export const WithSelected: Story = {
  args: {
    placeholder: "Select multiple options",
    defaultValue: ["option1", "option2"],
    options,
  },
  name: "With Selected Options",
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled select",
    disabled: true,
    defaultValue: ["option1"],
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
        <Select
          dsSize="xs"
          mode="multiple"
          placeholder="XS Size"
          options={options}
          defaultValue={["option1"]}
        />
      </FormItem>

      {/* S Size */}
      <FormItem label="Size S">
        <Select
          dsSize="s"
          mode="multiple"
          placeholder="S Size"
          options={options}
          defaultValue={["option1"]}
        />
      </FormItem>

      {/* M Size */}
      <FormItem label="Size M (Default)">
        <Select
          dsSize="m"
          mode="multiple"
          placeholder="M Size"
          options={options}
          defaultValue={["option1"]}
        />
      </FormItem>

      {/* L Size */}
      <FormItem label="Size L">
        <Select
          dsSize="l"
          mode="multiple"
          placeholder="L Size"
          options={options}
          defaultValue={["option1"]}
        />
      </FormItem>
    </div>
  ),
  decorators: [(Story) => <Story />],
};
