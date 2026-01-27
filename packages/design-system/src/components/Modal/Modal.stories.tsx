import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Button } from "../Button";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Feedback/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4090-7467&m=dev",
    },
    docs: {
      description: {
        component: `
Componente baseado no [Ant Design Modal](https://ant.design/components/modal).

### Features Juscash:
- **Tamanhos**: Prop \`dsSize\` com valores \`s\`, \`m\`, \`l\` para tamanhos padronizados.
- **Tokens do Design System**: Sombra, border radius e cores aplicados via ConfigProvider.
- **Header/Footer estilizados**: Bordas separadoras conforme Figma.
- **Compatibilidade**: Mantém todas as props do Ant Design.

### Tamanhos disponíveis:
| dsSize | Largura |
|--------|---------|
| \`s\`  | 400px   |
| \`m\`  | 520px   |
| \`l\`  | 720px   |

### Como usar:

\`\`\`tsx
import { Modal, Button } from '@juscash/design-system';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir Modal</Button>
      <Modal
        title="Título do Modal"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        Conteúdo do modal
      </Modal>
    </>
  );
}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    dsSize: {
      control: "select",
      options: ["s", "m", "l"],
      description: "Tamanho do modal seguindo o Design System JusCash",
      table: {
        type: { summary: '"s" | "m" | "l"' },
        defaultValue: { summary: '"m"' },
        category: "Juscash Props",
      },
    },
    title: {
      control: "text",
      description: "Título do modal",
      table: {
        type: { summary: "ReactNode" },
        category: "Ant Design Props",
      },
    },
    open: {
      control: "boolean",
      description: "Controla se o modal está visível",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Ant Design Props",
      },
    },
    okText: {
      control: "text",
      description: "Texto do botão de confirmação",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: '"OK"' },
        category: "Ant Design Props",
      },
    },
    cancelText: {
      control: "text",
      description: "Texto do botão de cancelar",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: '"Cancel"' },
        category: "Ant Design Props",
      },
    },
    closable: {
      control: "boolean",
      description: "Exibe o botão X para fechar",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Ant Design Props",
      },
    },
    maskClosable: {
      control: "boolean",
      description: "Fecha ao clicar no backdrop",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Ant Design Props",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

// Story 1: Default
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Modal básico com título e conteúdo simples.",
      },
    },
  },
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Abrir Modal</Button>
        <Modal
          title="Título do Modal"
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          okText="Confirmar"
          cancelText="Cancelar"
        >
          <p>Este é um modal básico com o estilo do Design System JusCash.</p>
          <p>Clique em Confirmar ou Cancelar para fechar.</p>
        </Modal>
      </div>
    );
  },
};

// Story 2: Sizes
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstra os diferentes tamanhos disponíveis (s, m, l).",
      },
    },
  },
  render: function SizesStory() {
    const [openS, setOpenS] = useState(false);
    const [openM, setOpenM] = useState(false);
    const [openL, setOpenL] = useState(false);

    return (
      <div style={{ padding: 40, display: "flex", gap: 16 }}>
        <Button onClick={() => setOpenS(true)}>Small (400px)</Button>
        <Button onClick={() => setOpenM(true)}>Medium (520px)</Button>
        <Button onClick={() => setOpenL(true)}>Large (720px)</Button>

        <Modal
          title="Modal Small"
          open={openS}
          onCancel={() => setOpenS(false)}
          dsSize="s"
          footer={null}
        >
          <p>Modal com tamanho small (400px de largura).</p>
        </Modal>

        <Modal
          title="Modal Medium"
          open={openM}
          onCancel={() => setOpenM(false)}
          dsSize="m"
          footer={null}
        >
          <p>Modal com tamanho medium (520px de largura).</p>
        </Modal>

        <Modal
          title="Modal Large"
          open={openL}
          onCancel={() => setOpenL(false)}
          dsSize="l"
          footer={null}
        >
          <p>Modal com tamanho large (720px de largura).</p>
        </Modal>
      </div>
    );
  },
};

// Story 3: With Footer Buttons
export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story: "Modal com footer contendo botões de ação customizados.",
      },
    },
  },
  render: function WithFooterStory() {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Abrir com Footer</Button>
        <Modal
          title="Confirmar Ação"
          open={open}
          onCancel={() => setOpen(false)}
          footer={
            <div
              style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
            >
              <Button type="neutral" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="primary" onClick={() => setOpen(false)}>
                Confirmar
              </Button>
            </div>
          }
        >
          <p>Tem certeza que deseja prosseguir com esta operação?</p>
          <p>Esta ação não poderá ser desfeita.</p>
        </Modal>
      </div>
    );
  },
};

// Story 4: No Footer
export const NoFooter: Story = {
  parameters: {
    docs: {
      description: {
        story: "Modal sem footer (informativo).",
      },
    },
  },
  render: function NoFooterStory() {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Modal Informativo</Button>
        <Modal
          title="Informação"
          open={open}
          onCancel={() => setOpen(false)}
          footer={null}
        >
          <p>Este modal é apenas informativo.</p>
          <p>Use o X no canto superior direito para fechar.</p>
        </Modal>
      </div>
    );
  },
};

// Story 5: With Scroll Content
export const WithScroll: Story = {
  parameters: {
    docs: {
      description: {
        story: "Modal com conteúdo longo que exibe scroll.",
      },
    },
  },
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
          dsSize="m"
        >
          <div style={{ maxHeight: 300, overflow: "auto" }}>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>
                Parágrafo {i + 1}: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            ))}
          </div>
        </Modal>
      </div>
    );
  },
};

// Story 6: Figma Example
export const FigmaExample: Story = {
  parameters: {
    docs: {
      description: {
        story: "Reprodução do exemplo do Figma com layout típico.",
      },
    },
  },
  render: function FigmaExampleStory() {
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
            <div
              style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
            >
              <Button type="neutral" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="primary" onClick={() => setOpen(false)}>
                Salvar
              </Button>
            </div>
          }
        >
          <p>
            Conteúdo do modal seguindo o design do Figma. O modal possui header
            com título e botão X, área de conteúdo com padding, e footer com
            botões de ação alinhados à direita.
          </p>
        </Modal>
      </div>
    );
  },
};
