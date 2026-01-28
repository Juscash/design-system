import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button"; // Using our custom Button if available, or Antd Button
import { Info } from "lucide-react";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Feedback/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tooltip exibe uma mensagem informativa quando o usuário passa o mouse ou foca em um elemento.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "O texto exibido no tooltip",
    },
    placement: {
      control: "select",
      options: [
        "top",
        "left",
        "right",
        "bottom",
        "topLeft",
        "topRight",
        "bottomLeft",
        "bottomRight",
        "leftTop",
        "leftBottom",
        "rightTop",
        "rightBottom",
      ],
      description: "A posição do tooltip relativa ao alvo",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    title: "Tooltip text",
    children: <Button>Tooltip text</Button>,
  },
};

export const IconTooltip: Story = {
  args: {
    title: "Informação adicional",
    children: <Info size={20} color="#6D6D6E" />,
  },
};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: 10 }}>
        <Tooltip placement="topLeft" title="Prompt Text">
          <Button>TL</Button>
        </Tooltip>
        <Tooltip placement="top" title="Prompt Text">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip placement="topRight" title="Prompt Text">
          <Button>TR</Button>
        </Tooltip>
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Tooltip placement="leftTop" title="Prompt Text">
            <Button>LT</Button>
          </Tooltip>
          <Tooltip placement="left" title="Prompt Text">
            <Button>Left</Button>
          </Tooltip>
          <Tooltip placement="leftBottom" title="Prompt Text">
            <Button>LB</Button>
          </Tooltip>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Tooltip placement="rightTop" title="Prompt Text">
            <Button>RT</Button>
          </Tooltip>
          <Tooltip placement="right" title="Prompt Text">
            <Button>Right</Button>
          </Tooltip>
          <Tooltip placement="rightBottom" title="Prompt Text">
            <Button>RB</Button>
          </Tooltip>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <Tooltip placement="bottomLeft" title="Prompt Text">
          <Button>BL</Button>
        </Tooltip>
        <Tooltip placement="bottom" title="Prompt Text">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip placement="bottomRight" title="Prompt Text">
          <Button>BR</Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const FigmaExample: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
      {/* Tooltip on Button */}
      <Tooltip title="Tooltip text" defaultOpen>
        <Button type="primary" style={{ backgroundColor: "#262626" }}>
          Tooltip text
        </Button>
      </Tooltip>

      {/* Tooltip on Icon */}
      <Tooltip title="Tooltip text" defaultOpen placement="top">
        <Info size={20} color="#6D6D6E" />
      </Tooltip>
    </div>
  ),
};
