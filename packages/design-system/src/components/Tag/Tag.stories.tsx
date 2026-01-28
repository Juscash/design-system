import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Tag } from "./Tag";

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
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-6517&m=dev";

type TagStoryProps = React.ComponentProps<typeof Tag> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<TagStoryProps> = {
  title: "Components/Tag",
  component: Tag,
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
Componente de tag baseado no [Ant Design Tag](https://ant.design/components/tag).

### Props:
- **Extended (Ant Design)**: Props padrão do AntD Tag.

### Como usar:

\`\`\`tsx
import { Tag } from "@Juscash/design-system";

function Example() {
  return <Tag>Tag</Tag>;
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
    error: {
      control: "boolean",
    },
    success: {
      control: "boolean",
    },
    warning: {
      control: "boolean",
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
  render: (args) => {
    const { hover, active, focus, className, ...props } = args;
    const pseudoClasses = [
      hover && "pseudo-hover",
      active && "pseudo-active",
      focus && "pseudo-focus-visible",
    ]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return <Tag {...props} className={mergedClassName} />;
  },
};

export default meta;
type Story = StoryObj<TagStoryProps>;

export const Default: Story = {
  args: {
    children: "Tag",
  },
};

export const StatusVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Tag success>Success</Tag>
      <Tag warning>Warning</Tag>
      <Tag error>Error</Tag>
      <Tag>Default</Tag>
    </div>
  ),
};

export const WithSuccess: Story = {
  args: {
    success: true,
    children: "Success",
  },
};

export const WithWarning: Story = {
  args: {
    warning: true,
    children: "Warning",
  },
};

export const WithError: Story = {
  args: {
    error: true,
    children: "Error",
  },
};
