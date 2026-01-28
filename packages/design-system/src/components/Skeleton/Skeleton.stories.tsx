import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Skeleton } from "./Skeleton";
import { designSystemColors } from "../../theme";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Placeholder usado para indicar carregamento de conteúdo.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    active: { control: "boolean", description: "Mostra animação" },
    loading: { control: "boolean", description: "Estado de carregamento" },
    avatar: { control: "boolean", description: "Mostra placeholder de avatar" },
    title: { control: "boolean", description: "Mostra placeholder de título" },
    paragraph: { control: "object", description: "Configuração do parágrafo" },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

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
    <div
      style={{ display: "flex", flexDirection: "column", gap: 32, width: 400 }}
    >
      {/* Avatar */}
      <div style={{ display: "flex", gap: 16 }}>
        <Skeleton.Avatar active={args.active} size={48} shape="circle" />
        <div
          style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}
        >
          <Skeleton.Input
            active={args.active}
            style={{ width: 260, height: 16, borderRadius: 8 }}
            size="small"
          />
          <Skeleton.Button
            active={args.active}
            style={{ width: "100%", height: 132, borderRadius: 8 }}
            block
          />
        </div>
      </div>
    </div>
  ),
  args: {
    active: true,
  },
};
