import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { Drawer } from "./Drawer";
import { Button } from "antd";
import { designSystemColors } from "../../theme";

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
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash";

type DrawerStoryProps = React.ComponentProps<typeof Drawer> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const getPseudoClassName = (args: {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
  className?: string;
}) => {
  const pseudoClasses = [
    args.hover && "pseudo-hover",
    args.active && "pseudo-active",
    args.focus && "pseudo-focus-visible",
  ]
    .filter(Boolean)
    .join(" ");

  return [args.className, pseudoClasses].filter(Boolean).join(" ");
};

const meta: Meta<DrawerStoryProps> = {
  title: "Components/Drawer",
  component: Drawer,
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
Drawer é um painel deslizante usado para exibir detalhes ou ações secundárias.
Baseado no [Ant Design Drawer](https://ant.design/components/drawer).

### Props:
- **Extended (Ant Design)**: Props padrão do AntD Drawer.

### Como usar:

\`\`\`tsx
import { Drawer, Button } from "@Juscash/design-system";

function Example() {
  return <Drawer title="Titulo" open={false} />;
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
  args: {
    hover: false,
    active: false,
    focus: false,
  },
  argTypes: {
    title: { control: "text", description: "Título do Drawer" },
    placement: {
      control: "select",
      options: ["right", "left", "top", "bottom"],
      description: "Posição de abertura",
    },
    width: { control: "number", description: "Largura do Drawer" },
    open: { control: "boolean", description: "Controla a visibilidade" },
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
    const mergedClassName = getPseudoClassName({
      hover,
      active,
      focus,
      className,
    });

    return <Drawer {...props} className={mergedClassName} />;
  },
};

export default meta;
type Story = StoryObj<DrawerStoryProps>;

// Wrapper to handle state in Storybook
const DrawerWrapper = (props: DrawerStoryProps) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  const { hover, active, focus, className, ...drawerProps } = props;
  const mergedClassName = getPseudoClassName({
    hover,
    active,
    focus,
    className,
  });

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Abrir Drawer
      </Button>
      <Drawer
        {...drawerProps}
        open={open}
        onClose={onClose}
        className={mergedClassName}
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: "Título do Drawer",
    children: <p>Conteúdo do Drawer...</p>,
    width: 400,
  },
};

export const WithFooter: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: "Drawer com Footer",
    width: 400,
    children: (
      <>
        <p>Conteúdo principal...</p>
        <p>Mais informações...</p>
      </>
    ),
    footer: (
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <Button>Cancelar</Button>
        <Button
          type="primary"
          style={{ background: designSystemColors.brand.primary[500] }}
        >
          Confirmar
        </Button>
      </div>
    ),
  },
};

export const FigmaExample: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: "Context",
    width: 500,
    children: (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: designSystemColors.neutral[100],
          borderRadius: 8,
          border: `1px dashed ${designSystemColors.neutral[300]}`,
          color: designSystemColors.neutral[400],
        }}
      >
        Content (Slot)
      </div>
    ),
    footer: (
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <Button>Label</Button>
        <Button type="primary">Label</Button>
      </div>
    ),
  },
};
