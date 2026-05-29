import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Bell, Info, X } from "lucide-react";
import { Button } from "../Button";
import { Popover } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4125-10702&m=dev";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente baseado no [Ant Design Popover](https://ant.design/components/popover).

Componente flutuante que aparece sobre o conteúdo ao clicar em um elemento,
exibindo informações extras, ações ou formulários. Diferente de tooltips,
suporta conteúdo mais complexo e interativo.

### Eixo principal

A prop \`slotNo\` define a composição do painel:

- \`"1 slot"\`: apenas \`mainSlot\`.
- \`"2 slots"\`: \`headerSlot\` acima do \`mainSlot\`.
- \`"3 slots"\`: \`headerSlot\` → \`mainSlot\` → \`footerSlot\`.

### Como usar

\`\`\`tsx
import { Popover, Button } from "@juscash/design-system";

<Popover
  slotNo="2 slots"
  headerSlot={<strong>Notificações</strong>}
  mainSlot={<span>Você tem 3 novas notificações.</span>}
  trigger="click"
>
  <Button>Abrir</Button>
</Popover>
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
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

const decorate = (children: React.ReactNode): React.ReactElement => (
  <div style={{ padding: 100, display: "flex", justifyContent: "center" }}>{children}</div>
);

/** Popover com apenas o conteúdo principal (1 slot) e placeholder de slot. */
export const Default: Story = {
  args: {
    slotNo: "1 slot",
    trigger: "click",
  },
  render: (args) => decorate(
    <Popover {...args}>
      <Button>Abrir popover</Button>
    </Popover>,
  ),
};

/** 1 slot — somente `mainSlot` é renderizado. */
export const OneSlot: Story = {
  parameters: {
    docs: { description: { story: "Variante de 1 slot. Renderiza apenas o `mainSlot`." } },
  },
  args: {
    slotNo: "1 slot",
    trigger: "click",
    mainSlot: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  render: (args) => decorate(
    <Popover {...args}>
      <Button>1 slot</Button>
    </Popover>,
  ),
};

/** 2 slots — `headerSlot` acima do `mainSlot`. */
export const TwoSlots: Story = {
  parameters: {
    docs: { description: { story: "Variante de 2 slots. Header acima do mainSlot." } },
  },
  args: {
    slotNo: "2 slots",
    trigger: "click",
    headerSlot: (
      <>
        <strong style={{ flex: 1, fontSize: 20 }}>Notificações</strong>
        <button aria-label="Fechar" style={{ background: "transparent", border: "none", cursor: "pointer" }}>
          <X size={16} />
        </button>
      </>
    ),
    mainSlot: (
      <div style={{ display: "flex", gap: 8 }}>
        <Info size={16} />
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>Lorem ipsum</p>
          <p style={{ margin: 0, fontSize: 13 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    ),
  },
  render: (args) => decorate(
    <Popover {...args}>
      <Button icon={<Bell size={16} />}>Ver notificações</Button>
    </Popover>,
  ),
};

/** 3 slots — header + main + footer. */
export const ThreeSlots: Story = {
  parameters: {
    docs: { description: { story: "Variante de 3 slots. Header, mainSlot e footer." } },
  },
  args: {
    slotNo: "3 slots",
    showArrow: true,
    trigger: "click",
    headerSlot: (
      <>
        <Info size={16} />
        <strong style={{ flex: 1 }}>Novidade!</strong>
        <button aria-label="Fechar" style={{ background: "transparent", border: "none", cursor: "pointer" }}>
          <X size={16} />
        </button>
      </>
    ),
    mainSlot: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    footerSlot: (
      <Button size="xs" type="outline">
        Fechar
      </Button>
    ),
  },
  render: (args) => decorate(
    <Popover {...args}>
      <Button>Abrir novidade</Button>
    </Popover>,
  ),
};

/** Com seta apontando para o trigger. */
export const WithArrow: Story = {
  parameters: {
    docs: { description: { story: "Popover com `showArrow=true`." } },
  },
  args: {
    slotNo: "1 slot",
    showArrow: true,
    trigger: "click",
    mainSlot: "Lorem ipsum dolor sit amet.",
  },
  render: (args) => decorate(
    <Popover {...args}>
      <Button>Com seta</Button>
    </Popover>,
  ),
};

/** Playground controlado por args. */
export const Playground: Story = {
  args: {
    slotNo: "2 slots",
    showArrow: false,
    trigger: "click",
    placement: "bottom",
    headerSlot: "Título do Popover",
    mainSlot: "Conteúdo do popover.",
  },
  argTypes: {
    slotNo: {
      control: "select",
      options: ["1 slot", "2 slots", "3 slots"],
    },
    showArrow: { control: "boolean" },
    trigger: {
      control: "select",
      options: ["hover", "click", "focus", "contextMenu"],
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
    },
  },
  render: (args) => decorate(
    <Popover {...args}>
      <Button>Playground</Button>
    </Popover>,
  ),
};
