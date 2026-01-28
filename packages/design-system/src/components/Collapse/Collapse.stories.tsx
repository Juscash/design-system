import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Collapse } from "./Collapse";

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
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4069-5252&m=dev";

type CollapseStoryProps = React.ComponentProps<typeof Collapse> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<CollapseStoryProps> = {
  title: "Components/Collapse",
  component: Collapse,
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente Collapse (Accordion) baseado no [Ant Design Collapse](https://ant.design/components/collapse).

### Props:
- **Extended (Ant Design)**: Suporta todas as propriedades padrão do AntD Collapse.

### Como usar:

\`\`\`tsx
import { Collapse } from "@Juscash/design-system";

function Example() {
  return <Collapse items={[{ key: "1", label: "Label", children: "Content" }]} />;
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

    return <Collapse {...props} className={mergedClassName} />;
  },
};

export default meta;
type Story = StoryObj<CollapseStoryProps>;

const text = `O cashback será disponibilizado na plataforma após a comprovação da protocolização do contrato nos autos. Confira as regras em nossa política.`;

const items = [{ key: "1", label: "Label", children: <p>{text}</p> }];

export const Open: Story = {
  name: "Open",
  args: {
    items,
    defaultActiveKey: ["1"],
  },
};

export const Closed: Story = {
  name: "Closed",
  args: {
    items,
  },
};

export const Levels: Story = {
  name: "Levels",
  render: () => (
    <Collapse
      defaultActiveKey={["1"]}
      items={[
        {
          key: "1",
          label: "Label",
          children: (
            <Collapse
              items={[
                { key: "1-1", label: "Label", children: <p>{text}</p> },
                { key: "1-2", label: "Label", children: <p>{text}</p> },
              ]}
            />
          ),
        },
      ]}
    />
  ),
};

export const Slot: Story = {
  name: "Slot",
  render: () => (
    <Collapse
      defaultActiveKey={["1"]}
      items={[
        {
          key: "1",
          label: "Label",
          children: (
            <div
              style={{
                border: "1px dashed #c89dff",
                borderRadius: "4px",
                padding: "16px",
                textAlign: "center",
                color: "#c89dff",
                fontWeight: 500,
              }}
            >
              Slot
            </div>
          ),
        },
      ]}
    />
  ),
};

export const Examples: Story = {
  name: "Exemplos",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Collapse
        items={[
          {
            key: "1",
            label: "Qual é o valor do cashback?",
            children: <p>{text}</p>,
          },
        ]}
      />
      <Collapse
        items={[
          {
            key: "2",
            label: "Como funciona o resgate de cashback?",
            children: <p>{text}</p>,
          },
        ]}
      />
      <Collapse
        items={[
          {
            key: "3",
            label: "O que é o Which?",
            children: <p>{text}</p>,
          },
        ]}
      />
      <Collapse
        defaultActiveKey={["4"]}
        items={[
          {
            key: "4",
            label: "Quanto tempo leva para o cashback ser aprovado?",
            children: <p>{text}</p>,
          },
        ]}
      />
    </div>
  ),
};

// Simulation of states for documentation purposes
export const Hover: Story = {
  name: "Hover",
  args: {
    items,
  },
  parameters: {
    docs: {
      description: {
        story: "Simulates hover state (usually handled by CSS :hover).",
      },
    },
  },
  render: (args) => (
    <div className="pseudo-hover">
      <Collapse {...args} />
    </div>
  ),
};

export const Focus: Story = {
  name: "Focus",
  args: {
    items,
  },
  parameters: {
    docs: {
      description: {
        story: "Simulates focus state (usually handled by CSS :focus-within).",
      },
    },
  },
  render: (args) => (
    <div className="pseudo-focus-within">
      <Collapse {...args} />
    </div>
  ),
};

export const Accordion: Story = {
  args: {
    items,
    accordion: true,
  },
};
