import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Avatar, AvatarGroup, AvatarMenu } from "./Avatar";
import { User } from "lucide-react";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-9746&m=dev";

const SAMPLE_IMAGE = "https://i.pravatar.cc/150?u=a042581f4e29026024d";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      description: {
        component:
          "Avatar é utilizado para representar usuários ou entidades, exibindo imagens, ícones ou iniciais.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    dsSize: {
      control: "radio",
      options: ["small", "regular"],
      description: "Tamanho do avatar",
    },
    roundness: {
      control: "radio",
      options: ["round", "roundrect"],
      description: "Formato do avatar",
    },
    src: {
      control: "text",
      description: "URL da imagem",
    },
    children: {
      control: "text",
      description: "Texto ou iniciais (quando não há imagem)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    children: "CN",
    dsSize: "regular",
    roundness: "round",
  },
};

// ─── Figma: grid de variantes ────────────────────────────────────────────────

export const VariantsGrid: Story = {
  name: "Variantes (Figma)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Regular round */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Avatar dsSize="regular" roundness="round">CN</Avatar>
        <Avatar dsSize="regular" roundness="round" icon={<User size={20} />} />
        <Avatar dsSize="regular" roundness="round" src={SAMPLE_IMAGE} />
      </div>
      {/* Small round */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Avatar dsSize="small" roundness="round">CN</Avatar>
        <Avatar dsSize="small" roundness="round" icon={<User size={16} />} />
        <Avatar dsSize="small" roundness="round" src={SAMPLE_IMAGE} />
      </div>
      {/* Regular roundrect */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Avatar dsSize="regular" roundness="roundrect">CN</Avatar>
        <Avatar dsSize="regular" roundness="roundrect" icon={<User size={20} />} />
        <Avatar dsSize="regular" roundness="roundrect" src={SAMPLE_IMAGE} />
      </div>
      {/* Small roundrect */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Avatar dsSize="small" roundness="roundrect">CN</Avatar>
        <Avatar dsSize="small" roundness="roundrect" icon={<User size={16} />} />
        <Avatar dsSize="small" roundness="roundrect" src={SAMPLE_IMAGE} />
      </div>
    </div>
  ),
};

// ─── Figma: Avatar stack ──────────────────────────────────────────────────────

export const StackSmall: Story = {
  name: "Stack — Small",
  render: () => (
    <AvatarGroup>
      <Avatar dsSize="small" roundness="round">CN</Avatar>
      <Avatar dsSize="small" roundness="round">JS</Avatar>
      <Avatar dsSize="small" roundness="round">KT</Avatar>
    </AvatarGroup>
  ),
};

export const StackRegular: Story = {
  name: "Stack — Regular",
  render: () => (
    <AvatarGroup>
      <Avatar dsSize="regular" roundness="round">CN</Avatar>
      <Avatar dsSize="regular" roundness="round">JS</Avatar>
      <Avatar dsSize="regular" roundness="round">KT</Avatar>
    </AvatarGroup>
  ),
};

// ─── Figma: Avatar menu (dropdown trigger) ────────────────────────────────────

export const MenuDefault: Story = {
  name: "Menu — Default",
  render: () => <AvatarMenu state="default">CN</AvatarMenu>,
};

export const MenuFocus: Story = {
  name: "Menu — Focus",
  render: () => <AvatarMenu state="focus">CN</AvatarMenu>,
};

export const MenuActive: Story = {
  name: "Menu — Active",
  render: () => <AvatarMenu state="active">CN</AvatarMenu>,
};

export const MenuAllStates: Story = {
  name: "Menu — Todos os estados (Figma)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ width: 60, fontSize: 12, color: "#6d6d6e" }}>Default</span>
        <AvatarMenu state="default">CN</AvatarMenu>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ width: 60, fontSize: 12, color: "#6d6d6e" }}>Focus</span>
        <AvatarMenu state="focus">CN</AvatarMenu>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ width: 60, fontSize: 12, color: "#6d6d6e" }}>Active</span>
        <AvatarMenu state="active">CN</AvatarMenu>
      </div>
    </div>
  ),
};
