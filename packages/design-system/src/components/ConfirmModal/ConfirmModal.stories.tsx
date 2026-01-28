import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Button } from "../Button";
import { ConfirmModal } from "./ConfirmModal";

const meta: Meta<typeof ConfirmModal> = {
  title: "Components/ConfirmModal",
  component: ConfirmModal,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4098-6577&m=dev",
    },
    docs: {
      description: {
        component: `
Modal de confirmação para ações que requerem aprovação do usuário.

### Features Juscash:
- **Tipos**: \`info\`, \`warning\`, \`danger\` (afeta cor do botão de confirmação)
- **Botão único ou duplo**: Use \`cancelText\` para exibir botão de cancelar
- **Loading state**: Prop \`confirmLoading\` para estados de carregamento
- **Sem botão X**: Focado em decisão do usuário

### Como usar:

\`\`\`tsx
import { ConfirmModal, Button } from '@juscash/design-system';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Excluir</Button>
      <ConfirmModal
        open={open}
        title="Excluir"
        description="Você tem certeza que deseja excluir este item?"
        type="danger"
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["info", "warning", "danger"],
      description: "Tipo de confirmação (afeta cor do botão)",
      table: {
        type: { summary: '"info" | "warning" | "danger"' },
        defaultValue: { summary: '"info"' },
        category: "Juscash Props",
      },
    },
    title: {
      control: "text",
      description: "Título do modal",
      table: {
        type: { summary: "ReactNode" },
        category: "Juscash Props",
      },
    },
    description: {
      control: "text",
      description: "Descrição/mensagem do modal",
      table: {
        type: { summary: "ReactNode" },
        category: "Juscash Props",
      },
    },
    confirmText: {
      control: "text",
      description: "Texto do botão de confirmação",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Confirmar"' },
        category: "Juscash Props",
      },
    },
    cancelText: {
      control: "text",
      description: "Texto do botão cancelar (omitir para esconder)",
      table: {
        type: { summary: "string" },
        category: "Juscash Props",
      },
    },
    confirmLoading: {
      control: "boolean",
      description: "Estado de loading do botão de confirmação",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Juscash Props",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmModal>;

// Story 1: Default (com dois botões)
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Modal de confirmação padrão com botões Cancelar e Confirmar.",
      },
    },
  },
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Abrir Confirmação</Button>
        <ConfirmModal
          open={open}
          title="Tem certeza que deseja sair desta página?"
          description="Suas alterações podem ser perdidas."
          confirmText="Confirmar"
          cancelText="Não, ficar na página"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </div>
    );
  },
};

// Story 2: Danger (Excluir)
export const Danger: Story = {
  parameters: {
    docs: {
      description: {
        story: "Modal de confirmação para ações destrutivas (excluir).",
      },
    },
  },
  render: function DangerStory() {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: 40 }}>
        <Button type="destructive" onClick={() => setOpen(true)}>
          Excluir Item
        </Button>
        <ConfirmModal
          open={open}
          title="Excluir"
          description="Você tem certeza que deseja excluir este item?"
          type="danger"
          confirmText="Excluir"
          cancelText="Cancelar"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </div>
    );
  },
};

// Story 3: Single Button
export const SingleButton: Story = {
  parameters: {
    docs: {
      description: {
        story: "Modal com apenas um botão de confirmação (sem cancelar).",
      },
    },
  },
  render: function SingleButtonStory() {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Abrir Alerta</Button>
        <ConfirmModal
          open={open}
          title="Excluir"
          description="Você tem certeza que deseja excluir este item?"
          confirmText="Label"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </div>
    );
  },
};

// Story 4: With Loading
export const WithLoading: Story = {
  parameters: {
    docs: {
      description: {
        story: "Modal com estado de loading no botão de confirmação.",
      },
    },
  },
  render: function WithLoadingStory() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 2000);
    };

    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Salvar Alterações</Button>
        <ConfirmModal
          open={open}
          title="Salvar alterações?"
          description="Deseja salvar as alterações feitas?"
          confirmText="Salvar"
          cancelText="Cancelar"
          confirmLoading={loading}
          onConfirm={handleConfirm}
          onCancel={() => setOpen(false)}
        />
      </div>
    );
  },
};

// Story 5: Figma Example
export const FigmaExample: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplos baseados no design do Figma.",
      },
    },
  },
  render: function FigmaExampleStory() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    return (
      <div style={{ padding: 40, display: "flex", gap: 16 }}>
        <Button onClick={() => setOpen1(true)}>Botão único</Button>
        <Button onClick={() => setOpen2(true)}>Com Cancelar</Button>
        <Button type="destructive" onClick={() => setOpen3(true)}>
          Ação Destrutiva
        </Button>

        {/* Exemplo 1: Botão único */}
        <ConfirmModal
          open={open1}
          title="Excluir"
          description="Você tem certeza que deseja excluir este item?"
          confirmText="Label"
          onConfirm={() => setOpen1(false)}
          onCancel={() => setOpen1(false)}
        />

        {/* Exemplo 2: Com cancelar */}
        <ConfirmModal
          open={open2}
          title="Excluir"
          description="Você tem certeza que deseja excluir este item?"
          confirmText="Excluir"
          cancelText="Label"
          type="danger"
          onConfirm={() => setOpen2(false)}
          onCancel={() => setOpen2(false)}
        />

        {/* Exemplo 3: Sair da página */}
        <ConfirmModal
          open={open3}
          title="Tem certeza que deseja sair desta página?"
          description="Suas alterações podem ser perdidas."
          confirmText="Confirmar"
          cancelText="Não, ficar na página"
          onConfirm={() => setOpen3(false)}
          onCancel={() => setOpen3(false)}
        />
      </div>
    );
  },
};
