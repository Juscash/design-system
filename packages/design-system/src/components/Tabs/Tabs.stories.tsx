import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Ellipsis, Heart } from "lucide-react";
import { Tabs } from "./Tabs";
import type { TabsProps } from "antd";
import { designSystemColors } from "../../theme";

import { Title, Subtitle, Description, Primary as DocsPrimary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4077-9817&m=dev";

type TabsStoryProps = React.ComponentProps<typeof Tabs> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

type TabsSize = "s" | "m" | "l";

function TabLabel({ size, children = "Label" }: { size: TabsSize; children?: React.ReactNode }) {
  const iconSize = size === "m" ? 16 : 12;

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size === "l" ? 8 : 4 }}>
      <Heart size={iconSize} color="currentColor" />
      <span>{children}</span>
    </span>
  );
}

function buildItems(size: TabsSize, count = 3): TabsProps["items"] {
  return Array.from({ length: count }, (_, index) => ({
    key: String(index + 1),
    label: <TabLabel size={size}>Label</TabLabel>,
    children: `Content ${index + 1}`,
  }));
}

function buildNamedItems(size: TabsSize, count = 3): TabsProps["items"] {
  return Array.from({ length: count }, (_, index) => ({
    key: String(index + 1),
    label: <TabLabel size={size}>Label</TabLabel>,
    children: `Content ${index + 1}`,
  }));
}

function CollapsedPreview({ size = "l" }: { size?: TabsSize }) {
  return (
    <div
      className={`ds-tabs ds-tabs-${size} ds-tabs-primary`}
      style={{
        display: "inline-flex",
        borderBottom: `1px solid ${designSystemColors.neutral[300]}`,
        width: "fit-content",
      }}
    >
      <button type="button" className="ant-tabs-nav-more" aria-label="More tabs">
        <Ellipsis size={12} />
      </button>
    </div>
  );
}

const meta: Meta<TabsStoryProps> = {
  title: "Components/Tabs",
  component: Tabs,
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
Componente baseado no [Ant Design Tabs](https://ant.design/components/tabs).

### Features Juscash:
- **Variantes**: Suporte a \`primary\` e \`secondary\`.
- **Tamanhos**: \`s\`, \`m\` e \`l\`, seguindo o Figma com altura, fonte e espaçamento ajustados.
- **Estados**: Hover, ativo, foco e disabled alinhados ao Design System.
- **Overflow**: suporte ao estado collapsed com botão de overflow.
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />

          <DocsPrimary />

          <Controls />

          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <h3
              style={{
                marginBottom: "1rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Figma Spec
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
    variant: {
      control: "radio",
      options: ["primary", "secondary"],
    },
    dsSize: {
      control: "radio",
      options: ["s", "m", "l"],
    },
    defaultActiveKey: {
      control: "text",
    },
    onChange: { action: "changed" },
    hover: {
      control: "boolean",
      table: { category: "Pseudo States" },
    },
    active: {
      control: "boolean",
      table: { category: "Pseudo States" },
    },
    focus: {
      control: "boolean",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { hover, active, focus, className, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return <Tabs {...props} className={mergedClassName} />;
  },
};

export default meta;
type Story = StoryObj<TabsStoryProps>;

export const Default: Story = {
  args: {
    defaultActiveKey: "1",
    items: buildItems("m"),
    dsSize: "m",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    defaultActiveKey: "1",
    items: buildItems("m"),
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    defaultActiveKey: "1",
    items: buildItems("m"),
  },
};

export const Small: Story = {
  args: {
    dsSize: "s",
    defaultActiveKey: "1",
    items: buildItems("s"),
  },
};

export const Medium: Story = {
  args: {
    dsSize: "m",
    defaultActiveKey: "1",
    items: buildItems("m"),
  },
};

export const Large: Story = {
  args: {
    dsSize: "l",
    defaultActiveKey: "1",
    items: buildItems("l"),
  },
};

export const Disabled: Story = {
  args: {
    defaultActiveKey: "1",
    items: buildItems("m").map((item, index) => ({ ...item, disabled: index === 1 })),
  },
};

export const FigmaExamples: Story = {
  name: "Figma — Examples",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "fit-content", padding: 24 }}>
      <div style={{ width: 469 }}>
        <Tabs
          dsSize="l"
          defaultActiveKey="3"
          items={buildNamedItems("l", 7)}
          moreIcon={<Ellipsis size={12} color={designSystemColors.neutral[500]} />}
        />
      </div>

      <div style={{ width: "fit-content" }}>
        <Tabs dsSize="m" defaultActiveKey="3" items={buildNamedItems("m", 5)} style={{ width: "fit-content" }} />
      </div>

      <div style={{ width: "fit-content" }}>
        <Tabs dsSize="s" defaultActiveKey="3" items={buildNamedItems("s", 5)} style={{ width: "fit-content" }} />
      </div>
    </div>
  ),
};

export const FigmaCollapsed: Story = {
  name: "Figma — Collapsed",
  render: () => <CollapsedPreview size="l" />,
  decorators: [(StoryComponent) => <div style={{ padding: 24 }}><StoryComponent /></div>],
};
