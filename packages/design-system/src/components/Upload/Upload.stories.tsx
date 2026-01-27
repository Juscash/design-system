import type { Meta, StoryObj } from "@storybook/react-vite";
import { Upload } from "./Upload";
import { FormItem } from "../FormItem/FormItem";
import { shadow } from "../../theme/foundations/shadow";
import { Form } from "antd";

type UploadStoryProps = React.ComponentProps<typeof Upload> & {
  focus?: boolean;
};

const meta: Meta<UploadStoryProps> = {
  title: "Components/Upload",
  component: Upload,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4051-2649&m=dev",
    },
    docs: {
      description: {
        component: `
Componente de upload de arquivos baseado no [Ant Design Upload](https://ant.design/components/upload).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Upload.
- **Custom (Juscash)**:
  - \`dsSize\`: Define o tamanho específico seguindo o Design System (\`xs\`, \`s\`, \`m\`).
  - \`layout\`: Define o layout do componente (\`vertical\` ou \`horizontal\`).
`,
      },
    },
  },
  args: {
    layout: "vertical",

    children: undefined,
  },
  argTypes: {
    dsSize: {
      control: "select",
      options: ["xs", "s", "m"],
      description: "Tamanho do Design System",
    },
    layout: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "Layout do botão e lista",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o componente",
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
    const { focus, style, ...props } = args;
    const mergedStyle = { ...style };

    return (
      <FormItem label="Upload Label">
        <Upload {...props} style={mergedStyle} />
      </FormItem>
    );
  },
};

export default meta;
type Story = StoryObj<UploadStoryProps>;

export const Vertical: Story = {
  args: {
    layout: "vertical",
  },
  name: "Vertical (Default)",
};

export const Horizontal: Story = {
  args: {
    layout: "horizontal",
  },
  name: "Horizontal",
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithError: Story = {
  decorators: [
    (Story) => (
      <Form layout="vertical">
        <Form.Item
          validateStatus="error"
          help="Error message"
          style={{ marginBottom: 0 }}
        >
          <div style={{ width: 400 }}>
            <Story />
          </div>
        </Form.Item>
      </Form>
    ),
  ],
  name: "Error State",
};

export const Focus: Story = {
  args: {
    focus: true,
  },
  name: "Focus State",
};
