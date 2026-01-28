import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Data Display/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
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

export const Picture: Story = {
  args: {
    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    dsSize: "regular",
    roundness: "round",
  },
};

export const Small: Story = {
  args: {
    children: "CN",
    dsSize: "small",
    roundness: "round",
  },
};

export const RoundRect: Story = {
  args: {
    children: "CN",
    dsSize: "regular",
    roundness: "roundrect",
  },
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>CN</Avatar>
      <Avatar>JS</Avatar>
      <Avatar>KT</Avatar>
      <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
    </AvatarGroup>
  ),
};

export const FigmaExample: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 40 }}>
      {/* Small Round */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Avatar dsSize="small" roundness="round">
          CN
        </Avatar>
        <Avatar
          dsSize="small"
          roundness="round"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
      </div>

      {/* Regular Round */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Avatar dsSize="regular" roundness="round">
          CN
        </Avatar>
        <Avatar
          dsSize="regular"
          roundness="round"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
      </div>

      {/* Regular RoundRect */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Avatar dsSize="regular" roundness="roundrect">
          CN
        </Avatar>
        <Avatar
          dsSize="regular"
          roundness="roundrect"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
      </div>
    </div>
  ),
};
