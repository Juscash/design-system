import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Button } from "../Button";
import { Modal } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4090-7467&m=dev";

const SlotBox = ({ height = 200 }: { height?: number }) => (
  <div
    style={{
      border: "1px dashed #9747ff",
      borderRadius: 8,
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#c89dff",
      fontSize: 14,
      fontWeight: 500,
    }}
  >
    Slot
  </div>
);

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
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
Componente baseado no [Ant Design Modal](https://ant.design/components/modal).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Modal.
- **Custom (Juscash)**:
  - \`dsSize\`: Tamanhos padronizados (\`s\` = 400px, \`m\` = 640px, \`l\` = 900px).

### Footer:
O Modal usa automaticamente o componente \`<Button>\` do DS no footer.
Para customizar, passe \`footer={<seus botoes>}\` ou \`footer={null}\` para esconder.
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
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>
              Figma Spec
            </h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    dsSize: {
      control: "select",
      options: ["s", "m", "l"],
      description: "Tamanho do modal",
      table: {
        type: { summary: '"s" | "m" | "l"' },
        defaultValue: { summary: '"m"' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ─── Default (2 buttons right) ─────────────────────────────────────────────

export const Default: Story = {
  name: "Default — 2 botoes (Figma)",
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Abrir Modal</Button>
        <Modal
          title="Título do Modal"
          open={open}
          okText="Confirmar"
          cancelText="Cancelar"
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <SlotBox />
        </Modal>
      </div>
    );
  },
};

// ─── Figma: 2 full-width buttons ───────────────────────────────────────

export const FullWidthButtons: Story = {
  name: "Footer — 2 full-width (Figma)",
  render: function FullWidthStory() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Abrir</Button>
        <Modal
          title="Título"
          open={open}
          onCancel={() => setOpen(false)}
          footer={
            <div style={{ display: "flex", gap: 8 }}>
              <Button type="outline" onClick={() => setOpen(false)} style={{ flex: 1 }}>
                Cancelar
              </Button>
              <Button type="primary" onClick={() => setOpen(false)} style={{ flex: 1 }}>
                Confirmar
              </Button>
            </div>
          }
        >
          <SlotBox />
        </Modal>
      </div>
    );
  },
};

// ─── Figma: 3 buttons ───────────────────────────────────────────────

export const ThreeButtons: Story = {
  name: "Footer — 3 botões (Figma)",
  render: function ThreeButtonsStory() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Abrir</Button>
        <Modal
          title="Título"
          open={open}
          onCancel={() => setOpen(false)}
          footer={
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Button type="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <span style={{ flex: 1 }} />
              <Button type="ghost" onClick={() => setOpen(false)}>
                Ação secundária
              </Button>
              <Button type="primary" onClick={() => setOpen(false)}>
                Confirmar
              </Button>
            </div>
          }
        >
          <SlotBox />
        </Modal>
      </div>
    );
  },
};

// ─── Figma: single full-width button ───────────────────────────────────

export const SingleButton: Story = {
  name: "Footer — 1 botão full-width (Figma)",
  render: function SingleButtonStory() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Abrir</Button>
        <Modal
          title="Título"
          open={open}
          onCancel={() => setOpen(false)}
          footer={
            <Button type="primary" onClick={() => setOpen(false)} style={{ width: "100%" }}>
              Confirmar
            </Button>
          }
        >
          <SlotBox />
        </Modal>
      </div>
    );
  },
};

// ─── Figma: close only (no title) ───────────────────────────────────────

export const CloseOnly: Story = {
  name: "Sem título — close only (Figma)",
  render: function CloseOnlyStory() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Abrir</Button>
        <Modal
          open={open}
          onCancel={() => setOpen(false)}
          title={null}
          footer={
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Button type="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="primary" onClick={() => setOpen(false)}>
                Confirmar
              </Button>
            </div>
          }
        >
          <SlotBox />
        </Modal>
      </div>
    );
  },
};

// ─── Tamanhos ──────────────────────────────────────────────────

export const Sizes: Story = {
  name: "Tamanhos (s / m / l)",
  render: function SizesStory() {
    const [openS, setOpenS] = useState(false);
    const [openM, setOpenM] = useState(false);
    const [openL, setOpenL] = useState(false);

    return (
      <div style={{ padding: 40, display: "flex", gap: 16 }}>
        <Button onClick={() => setOpenS(true)}>Small (400px)</Button>
        <Button onClick={() => setOpenM(true)}>Medium (640px)</Button>
        <Button onClick={() => setOpenL(true)}>Large (900px)</Button>

        <Modal title="Small" open={openS} onCancel={() => setOpenS(false)} dsSize="s" footer={null}>
          <SlotBox height={100} />
        </Modal>
        <Modal title="Medium" open={openM} onCancel={() => setOpenM(false)} dsSize="m" footer={null}>
          <SlotBox />
        </Modal>
        <Modal title="Large" open={openL} onCancel={() => setOpenL(false)} dsSize="l" footer={null}>
          <SlotBox height={300} />
        </Modal>
      </div>
    );
  },
};

// ─── Figma: com scroll ──────────────────────────────────────────────

export const WithScroll: Story = {
  name: "Com scroll (Figma)",
  render: function WithScrollStory() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Modal com Scroll</Button>
        <Modal
          title="Termos e Condições"
          open={open}
          onCancel={() => setOpen(false)}
          okText="Aceitar"
          cancelText="Recusar"
          onOk={() => setOpen(false)}
        >
          <div style={{ maxHeight: 300, overflow: "auto" }}>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} style={{ color: "#737373", fontSize: 16, lineHeight: 1.5 }}>
                Parágrafo {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            ))}
          </div>
        </Modal>
      </div>
    );
  },
};

// ─── Figma: Exemplo desktop com sidebar ─────────────────────────────────

export const FigmaDesktopExample: Story = {
  name: "Exemplo desktop (Figma)",
  render: function FigmaDesktopStory() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Exemplo Figma</Button>
        <Modal
          title="Título do Dialog"
          open={open}
          onCancel={() => setOpen(false)}
          dsSize="m"
          footer={
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Button type="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="primary" onClick={() => setOpen(false)}>
                Salvar
              </Button>
            </div>
          }
        >
          <SlotBox height={300} />
        </Modal>
      </div>
    );
  },
};
