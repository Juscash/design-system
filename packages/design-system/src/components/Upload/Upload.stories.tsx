import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Upload } from "./Upload";
import { FormItem } from "../FormItem/FormItem";
import { Form } from "antd";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4051-2649&m=dev";

type UploadStoryProps = React.ComponentProps<typeof Upload> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<UploadStoryProps> = {
  title: "Components/Upload",
  component: Upload,
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
Componente de upload de arquivos baseado no [Ant Design Upload](https://ant.design/components/upload).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Upload.
- **Custom (Juscash)**:
  - \`dsSize\`: Define o tamanho específico seguindo o Design System (\`xs\`, \`s\`, \`m\`).
  - \`layout\`: Define o layout do componente (\`vertical\` ou \`horizontal\`).

### Como usar:

\`\`\`tsx
import { Upload } from "@juscash/design-system";

function Example() {
  return <Upload layout="vertical" />;
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
    layout: "vertical",

    children: undefined,
    hover: false,
    active: false,
    focus: false,
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
    const { focus, hover, active, className, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return (
      <FormItem label="Upload Label">
        <Upload {...props} className={mergedClassName} />
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
        <Form.Item validateStatus="error" help="Error message" style={{ marginBottom: 0 }}>
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
