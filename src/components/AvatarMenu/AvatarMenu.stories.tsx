import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { AvatarMenu } from ".";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-9746&m=dev";

const meta: Meta<typeof AvatarMenu> = {
  title: "Components/AvatarMenu",
  component: AvatarMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      description: {
        component:
          "Menu de avatar com chevron lateral. Suporta os estados `default`, `focus` e `active`; em `active` o chevron aponta para cima.",
      },
    },
  },
  argTypes: {
    state: {
      control: "radio",
      options: ["default", "focus", "active"],
      description: "Estado visual do menu",
    },
    children: {
      control: "text",
      description: "Texto/iniciais exibidos no avatar interno",
    },
  },
  args: {
    state: "default",
    children: "CN",
  },
};

export default meta;
type Story = StoryObj<typeof AvatarMenu>;

export const Default: Story = {};

export const Focus: Story = {
  args: { state: "focus" },
};

export const Active: Story = {
  args: { state: "active" },
};

export const Playground: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <AvatarMenu {...args}>CN</AvatarMenu>
      <AvatarMenu {...args} state="focus">JS</AvatarMenu>
      <AvatarMenu {...args} state="active">PV</AvatarMenu>
    </div>
  ),
};
