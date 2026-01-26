import type { Meta, StoryObj } from "@storybook/react-vite";
import { Collapse } from "./Collapse";

const meta: Meta<typeof Collapse> = {
  title: "Components/Collapse",
  component: Collapse,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4069-5252&m=dev",
    },
    docs: {
      description: {
        component: `
Componente Collapse (Accordion) baseado no [Ant Design Collapse](https://ant.design/components/collapse).

### Props:
- **Extended (Ant Design)**: Suporta todas as propriedades padrão do AntD Collapse.
`,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Collapse>;

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
