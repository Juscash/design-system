import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Loading } from "./Loading";
import { designSystemColors } from "../../theme";

const meta: Meta<typeof Loading> = {
  title: "Components/Feedback/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de carregamento (Spinner) utilizando a cor da marca.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "default", "large"],
      description: "Tamanho do spinner",
    },
    tip: {
      control: "text",
      description: "Texto de descrição (opcional)",
    },
    fullscreen: {
      control: "boolean",
      description: "Exibir em tela cheia",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {
    size: "default",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const WithTip: Story = {
  args: {
    size: "large",
    tip: "Carregando...",
  },
};

export const ContainerExample: Story = {
  render: () => (
    <div
      style={{
        padding: "50px",
        background: designSystemColors.neutral[100],
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <Loading />
    </div>
  ),
};

// Example simulating the Figma structure roughly (just the spinner part)
export const FigmaExample: Story = {
  args: {
    size: "large",
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
      }}
    >
      <Loading {...args} />
      <span
        style={{ fontFamily: "Inter", color: designSystemColors.neutral[600] }}
      >
        Loading
      </span>
    </div>
  ),
};
