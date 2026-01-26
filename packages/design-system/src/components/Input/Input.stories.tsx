import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";
import { FormItem } from "../FormItem";
import { Form } from "antd";
import { designSystemColors, shadow } from "../../theme";

type InputStoryProps = React.ComponentProps<typeof Input> & {
  focus?: boolean;
};

const meta: Meta<InputStoryProps> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4048-10668&m=dev",
    },
    docs: {
      description: {
        component: `
Componente de Input baseado no [Ant Design Input](https://ant.design/components/input).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Input.
- **Custom (Juscash)**:
  - \`dsSize\`: Define o tamanho específico seguindo o Design System (\`xs\`, \`s\`, \`m\`, \`l\`).
`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    dsSize: {
      control: "select",
      options: ["xs", "s", "m", "l"],
    },
    disabled: {
      control: "boolean",
    },
    status: {
      control: "select",
      options: ["", "error", "warning"],
    },

    focus: {
      control: "boolean",
      description: "Força o estado focus",
      table: { category: "Pseudo States" },
    },
  },
  args: {
    focus: false,
  },
  decorators: [
    (Story) => (
      <Form layout="vertical">
        <Story />
      </Form>
    ),
  ],
  render: (args) => {
    const { focus, style, ...props } = args;

    const mergedStyle = { ...style };

    if (focus) {
      mergedStyle.boxShadow =
        props.status === "error" ? shadow.focusError : shadow.focus;
      mergedStyle.borderColor = "transparent";
    }

    return (
      <FormItem label="Label">
        <Input {...props} style={mergedStyle} />
      </FormItem>
    );
  },
};

export default meta;
type Story = StoryObj<InputStoryProps>;

export const Default: Story = {
  args: {
    placeholder: "Label",
  },
};

export const Empty: Story = {
  name: "Empty",
  args: {},
};

export const Placeholder: Story = {
  name: "Placeholder",
  args: {
    placeholder: "Value",
  },
};

export const Value: Story = {
  name: "Value",
  args: {
    defaultValue: "Value",
  },
};

export const Focus: Story = {
  name: "Focus",
  args: {
    defaultValue: "Value",
    focus: true,
  },
};

export const Error: Story = {
  name: "Error",
  args: {
    defaultValue: "Value",
    status: "error",
  },
  render: (args) => {
    const { focus, style, ...props } = args;
    const mergedStyle = { ...style };
    if (focus) {
      mergedStyle.boxShadow = shadow.focusError;
      mergedStyle.borderColor = "transparent";
    }
    return (
      <FormItem label="Label" validateStatus="error" help="Error message">
        <Input {...props} style={mergedStyle} />
      </FormItem>
    );
  },
};

export const ErrorFocus: Story = {
  name: "Error Focus",
  args: {
    defaultValue: "Value",
    status: "error",
    focus: true,
  },
  render: (args) => {
    const { focus, style, ...props } = args;
    const mergedStyle = { ...style };
    if (focus) {
      mergedStyle.boxShadow = shadow.focusError;
      mergedStyle.borderColor = "transparent";
    }
    return (
      <FormItem label="Label" validateStatus="error" help="Error message">
        <Input {...props} style={mergedStyle} />
      </FormItem>
    );
  },
};

export const Disabled: Story = {
  name: "Disabled",
  args: {
    defaultValue: "Value",
    disabled: true,
  },
};
