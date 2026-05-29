import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Input } from "../Input";
import type { TextAreaProps } from "../../types/components/TextArea";
import { Form } from "antd";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4059-2085&m=dev";

// TextArea é exportado como prop estática de Input, mas para o Storybook
// criamos uma referência direta para facilitar o uso no meta.
const { TextArea } = Input;

type TextAreaStoryProps = TextAreaProps & {
  focus?: boolean;
  hover?: boolean;
  active?: boolean;
};

const meta: Meta<TextAreaStoryProps> = {
  title: "Components/TextArea",
  component: TextArea,
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
Componente de área de texto (TextArea) baseado no [Ant Design Input.TextArea](https://ant.design/components/input#inputtextarea).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD TextArea.

### Como usar:

\`\`\`tsx
import { TextArea } from "@juscash/design-system";

function Example() {
  return <TextArea rows={4} placeholder="Digite sua mensagem" />;
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
    placeholder: "Type your message here...",
    rows: 4,
    hover: false,
    active: false,
    focus: false,
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
    hover: {
      control: "boolean",
      description: "Força o estado de hover (Visual)",
      table: { category: "Pseudo States" },
    },
    active: {
      control: "boolean",
      description: "Força o estado active",
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
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible pseudo-focus"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return (
      <Form.Item label="Label">
        <TextArea {...props} className={mergedClassName} />
      </Form.Item>
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
