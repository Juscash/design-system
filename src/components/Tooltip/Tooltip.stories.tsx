import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Button } from "../Button";
import { Tooltip } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4041-11954&m=dev";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
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
Tooltip exibe uma mensagem informativa quando o usuário passa o mouse ou foca em um elemento.
Baseado no [Ant Design Tooltip](https://ant.design/components/tooltip).

### Props:
- **Extended (Ant Design)**: Props padrão do AntD Tooltip.

### Como usar:

\`\`\`tsx
import { Tooltip, Button } from "@juscash/design-system";

function Example() {
  return (
    <Tooltip title="Tooltip text">
      <Button>Tooltip text</Button>
    </Tooltip>
  );
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
  render: (args) => <Tooltip {...args} />,
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

export const FigmaSides: Story = {
  name: "Figma — Sides",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(180px, 1fr))",
        gap: 40,
        padding: 24,
        border: "1px dashed var(--color-neutral-300)",
        borderRadius: 12,
        background: "white",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 44 }}>
        <Tooltip title="Tooltip text" placement="bottom" defaultOpen>
          <Button type="ghost" size="xs">
            Bottom
          </Button>
        </Tooltip>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingBottom: 44 }}>
        <Tooltip title="Tooltip text" placement="top" defaultOpen>
          <Button type="ghost" size="xs">
            Top
          </Button>
        </Tooltip>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 60 }}>
        <Tooltip title="Tooltip text" placement="left" defaultOpen>
          <Button type="ghost" size="xs">
            Left
          </Button>
        </Tooltip>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: 60 }}>
        <Tooltip title="Tooltip text" placement="right" defaultOpen>
          <Button type="ghost" size="xs">
            Right
          </Button>
        </Tooltip>
      </div>
    </div>
  ),
};
