import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Input } from "./Input";
import { FormItem } from "../FormItem";
import { Form } from "antd";
import { shadow } from "../../theme";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4048-10668&m=dev";

type InputStoryProps = React.ComponentProps<typeof Input> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<InputStoryProps> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente de Input baseado no [Ant Design Input](https://ant.design/components/input).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Input.
- **Customized**:
  - \`size\`: Mapeado internamente para o \`dsSize\` do sistema Juscash.
- **Custom (Juscash)**:
  - \`dsSize\`: Define o tamanho específico seguindo o Design System (\`xs\`, \`s\`, \`m\`, \`l\`).

### Como usar:

\`\`\`tsx
import { Input } from "@juscash/design-system";

function Example() {
  return <Input placeholder="Digite seu nome" />;
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
      description: "Força o estado focus",
      table: { category: "Pseudo States" },
    },
  },
  args: {
    hover: false,
    active: false,
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
    const { focus, hover, active, style, className, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible pseudo-focus"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return (
      <FormItem label="Label">
        <Input {...props} style={style} className={mergedClassName} />
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
    const { focus, hover, active, style, className, ...props } = args;
    const mergedStyle = { ...style };
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");
    if (focus) {
      mergedStyle.boxShadow = shadow.focusError;
      mergedStyle.borderColor = "transparent";
    }
    return (
      <FormItem label="Label" validateStatus="error" help="Error message">
        <Input {...props} style={mergedStyle} className={mergedClassName} />
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
    const { focus, hover, active, style, className, ...props } = args;

    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return (
      <FormItem label="Label" validateStatus="error" help="Error message">
        <Input {...props} style={style} className={mergedClassName} />
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
