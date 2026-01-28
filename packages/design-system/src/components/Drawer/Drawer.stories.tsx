import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Drawer } from "./Drawer";
import { Button } from "antd";
import React, { useState } from "react";
import { designSystemColors } from "../../theme";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Drawer é um painel deslizante usado para exibir detalhes ou ações secundárias.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text", description: "Título do Drawer" },
    placement: {
      control: "select",
      options: ["right", "left", "top", "bottom"],
      description: "Posição de abertura",
    },
    width: { control: "number", description: "Largura do Drawer" },
    open: { control: "boolean", description: "Controla a visibilidade" },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Wrapper to handle state in Storybook
const DrawerWrapper = (props: any) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Abrir Drawer
      </Button>
      <Drawer {...props} open={open} onClose={onClose} />
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
