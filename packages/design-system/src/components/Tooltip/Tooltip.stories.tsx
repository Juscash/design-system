import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";
import { Info } from "lucide-react";

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
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4125-11510&m=dev";

type TooltipStoryProps = React.ComponentProps<typeof Tooltip> & {
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

const meta: Meta<TooltipStoryProps> = {
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
import { Tooltip, Button } from "@Juscash/design-system";

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
    const pseudoClasses = [
      hover && "pseudo-hover",
      active && "pseudo-active",
      focus && "pseudo-focus-visible",
    ]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return <Tooltip {...props} className={mergedClassName} />;
  },
};

export default meta;
type Story = StoryObj<TooltipStoryProps>;

export const Default: Story = {
  args: {
    title: "Tooltip text",
    children: <Button>Tooltip text</Button>,
  },
  render: (args) => {
    const { hover, active, focus, className, ...props } = args;
    const mergedClassName = getPseudoClassName({
      hover,
      active,
      focus,
      className,
    });

    return (
      <div className={mergedClassName}>
        <Tooltip {...props} />
      </div>
    );
  },
};

export const IconTooltip: Story = {
  args: {
    title: "Informação adicional",
    children: <Info size={20} color="#6D6D6E" />,
  },
  render: (args) => {
    const { hover, active, focus, className, ...props } = args;
    const mergedClassName = getPseudoClassName({
      hover,
      active,
      focus,
      className,
    });

    return (
      <div className={mergedClassName}>
        <Tooltip {...props} />
      </div>
    );
  },
};

export const Placements: Story = {
  render: (args) => {
    const mergedClassName = getPseudoClassName(args);

    return (
      <div
        className={mergedClassName}
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
    );
  },
};

export const FigmaExample: Story = {
  render: (args) => {
    const mergedClassName = getPseudoClassName(args);

    return (
      <div
        className={mergedClassName}
        style={{ display: "flex", gap: 40, alignItems: "center" }}
      >
        <Tooltip title="Tooltip text" defaultOpen>
          <Button type="primary" style={{ backgroundColor: "#262626" }}>
            Tooltip text
          </Button>
        </Tooltip>

        <Tooltip title="Tooltip text" defaultOpen placement="top">
          <Info size={20} color="#6D6D6E" />
        </Tooltip>
      </div>
    );
  },
};
