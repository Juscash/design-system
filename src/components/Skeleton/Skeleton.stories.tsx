import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Skeleton } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-20627&m=dev";

type SkeletonStoryProps = React.ComponentProps<typeof Skeleton> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<SkeletonStoryProps> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Placeholder usado para indicar carregamento de conteÃºdo.
Baseado no [Ant Design Skeleton](https://ant.design/components/skeleton).

### Props:
- **Extended (Ant Design)**: Props padrÃ£o do AntD Skeleton.

### Como usar:

\`\`\`tsx
import { Skeleton } from "@juscash/design-system";

function Example() {
  return <Skeleton active />;
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
              ðŸŽ¨ Figma Spec
            </h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>

          <Stories />
        </>
      ),
    },
  },
  tags: ["autodocs"],
  args: {
    hover: false,
    active: false,
    focus: false,
  },
  argTypes: {
    loading: { control: "boolean", description: "Estado de carregamento" },
    avatar: { control: "boolean", description: "Mostra placeholder de avatar" },
    title: { control: "boolean", description: "Mostra placeholder de tÃ­tulo" },
    paragraph: { control: "object", description: "ConfiguraÃ§Ã£o do parÃ¡grafo" },
    hover: {
      control: "boolean",
      description: "ForÃ§a o estado hover",
      table: { category: "Pseudo States" },
    },
    active: {
      control: "boolean",
      description: "ForÃ§a o estado active",
      table: { category: "Pseudo States" },
    },
    focus: {
      control: "boolean",
      description: "ForÃ§a o estado focus",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { hover, active, focus, className, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return <Skeleton {...props} className={mergedClassName} />;
  },
};

export default meta;
type Story = StoryObj<SkeletonStoryProps>;

export const Default: Story = {
  args: {
    active: true,
  },
};

export const Avatar: Story = {
  args: {
    avatar: { shape: "circle", size: "large" },
    active: true,
    paragraph: false,
    title: false,
  },
};

export const ImagePlaceholder: Story = {
  render: (args) => (
    <div style={{ width: 300 }}>
      <Skeleton.Image active={args.active} />
    </div>
  ),
  args: {
    active: true,
  },
};

export const FigmaExample: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, width: 400 }}>
      {/* Avatar */}
      <div style={{ display: "flex", gap: 16 }}>
        <Skeleton.Avatar active={args.active} size={48} shape="circle" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
          <Skeleton.Input active={args.active} style={{ width: 260, height: 16, borderRadius: 8 }} size="small" />
          <Skeleton.Button active={args.active} style={{ width: "100%", height: 132, borderRadius: 8 }} block />
        </div>
      </div>
    </div>
  ),
  args: {
    active: true,
  },
};
