import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input, TextAreaProps } from "./Input";
import { FormItem } from "../FormItem/FormItem";
import { shadow } from "../../theme/foundations/shadow";
import { Form } from "antd";

// TextArea é exportado como prop estática de Input, mas para o Storybook
// criamos uma referência direta para facilitar o uso no meta.
const { TextArea } = Input;

type TextAreaStoryProps = TextAreaProps & {
  focus?: boolean;
  hover?: boolean;
};

const meta: Meta<TextAreaStoryProps> = {
  title: "Components/Input/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4059-2085&m=dev",
    },
    docs: {
      description: {
        component: `
Componente de área de texto (TextArea) baseado no [Ant Design Input.TextArea](https://ant.design/components/input#inputtextarea).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD TextArea.
- **Custom (Juscash)**:
  - \`dsSize\`: Define o tamanho específico seguindo o Design System (\`xs\`, \`s\`, \`m\`, \`l\`).
`,
      },
    },
  },
  args: {
    placeholder: "Type your message here...",
    rows: 4,
  },
  argTypes: {
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
  },
  decorators: [
    (Story) => (
      <Form layout="vertical">
        <div style={{ width: 400 }}>
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
      // Ajuste visual para borda do textarea
      mergedStyle.borderColor = "transparent";
      mergedStyle.outline = "none";
    }

    return (
      <FormItem label="Label">
        <TextArea {...props} style={mergedStyle} />
      </FormItem>
    );
  },
};

export default meta;
type Story = StoryObj<TextAreaStoryProps>;

export const Default: Story = {
  args: {},
  name: "Default",
};

export const Filled: Story = {
  args: {
    defaultValue: "This is a filled text area.",
  },
  name: "Filled",
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Disabled content",
  },
};

export const Error: Story = {
  args: {
    status: "error",
    defaultValue: "Error content",
  },
};

export const Focus: Story = {
  args: {
    focus: true,
    placeholder: "Focused...",
  },
};

export const ErrorFocus: Story = {
  args: {
    status: "error",
    focus: true,
    defaultValue: "Error focus content",
  },
};
