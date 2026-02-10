import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Button } from "../Button";
import { ConfirmModal } from "./ConfirmModal";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4098-6577&m=dev";

type ConfirmModalStoryProps = React.ComponentProps<typeof ConfirmModal> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const getPseudoClassName = (args: { hover?: boolean; active?: boolean; focus?: boolean; className?: string }) => {
  const pseudoClasses = [args.hover && "pseudo-hover", args.active && "pseudo-active", args.focus && "pseudo-focus-visible"]
    .filter(Boolean)
    .join(" ");

  return [args.className, pseudoClasses].filter(Boolean).join(" ");
};

const meta: Meta<ConfirmModalStoryProps> = {
  title: "Components/ConfirmModal",
  component: ConfirmModal,
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
Modal de confirmação para ações que requerem aprovação do usuário.

### Props:
- **Custom (Juscash)**:
  - \`type\`: \`info\`, \`warning\`, \`danger\`.
  - \`confirmText\`/\`cancelText\`: Define os textos dos botões.
  - \`confirmLoading\`: Estado de carregamento do botão de confirmação.

### Como usar:

\`\`\`tsx
import { ConfirmModal, Button } from "@juscash/design-system";

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
  args: {
    hover: false,
    active: false,
    focus: false,
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
    const mergedClassName = getPseudoClassName({
      hover,
      active,
      focus,
      className,
    });

    return <ConfirmModal {...props} className={mergedClassName} />;
  },
};

export default meta;

type Story = StoryObj<ConfirmModalStoryProps>;

// Story 1: Default (com dois botões)
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Modal de confirmação padrão com botões Cancelar e Confirmar.",
      },
    },
  },
  render: function DefaultStory(args) {
    const [open, setOpen] = useState(false);
    const { hover, active, focus, className, ...props } = args;
    const mergedClassName = getPseudoClassName({
      hover,
      active,
      focus,
      className,
    });

    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Abrir Confirmação</Button>
        <ConfirmModal
          {...props}
          open={open}
          title="Tem certeza que deseja sair desta página?"
          description="Suas alterações podem ser perdidas."
          confirmText="Confirmar"
          cancelText="Não, ficar na página"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          className={mergedClassName}
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
  render: function DangerStory(args) {
    const [open, setOpen] = useState(false);
    const { hover, active, focus, className, ...props } = args;
    const mergedClassName = getPseudoClassName({
      hover,
      active,
      focus,
      className,
    });

    return (
      <div style={{ padding: 40 }}>
        <Button type="destructive" onClick={() => setOpen(true)}>
          Excluir Item
        </Button>
        <ConfirmModal
          {...props}
          open={open}
          title="Excluir"
          description="Você tem certeza que deseja excluir este item?"
          type="danger"
          confirmText="Excluir"
          cancelText="Cancelar"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          className={mergedClassName}
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
  render: function SingleButtonStory(args) {
    const [open, setOpen] = useState(false);
    const { hover, active, focus, className, ...props } = args;
    const mergedClassName = getPseudoClassName({
      hover,
      active,
      focus,
      className,
    });

    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Abrir Alerta</Button>
        <ConfirmModal
          {...props}
          open={open}
          title="Excluir"
          description="Você tem certeza que deseja excluir este item?"
          confirmText="Label"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          className={mergedClassName}
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
  render: function WithLoadingStory(args) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { hover, active, focus, className, ...props } = args;
    const mergedClassName = getPseudoClassName({
      hover,
      active,
      focus,
      className,
    });

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
          {...props}
          open={open}
          title="Salvar alterações?"
          description="Deseja salvar as alterações feitas?"
          confirmText="Salvar"
          cancelText="Cancelar"
          confirmLoading={loading}
          onConfirm={handleConfirm}
          onCancel={() => setOpen(false)}
          className={mergedClassName}
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
  render: function FigmaExampleStory(args) {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const { hover, active, focus, className, ...props } = args;
    const mergedClassName = getPseudoClassName({
      hover,
      active,
      focus,
      className,
    });

    return (
      <div style={{ padding: 40, display: "flex", gap: 16 }}>
        <Button onClick={() => setOpen1(true)}>Botão único</Button>
        <Button onClick={() => setOpen2(true)}>Com Cancelar</Button>
        <Button type="destructive" onClick={() => setOpen3(true)}>
          Ação Destrutiva
        </Button>

        {/* Exemplo 1: Botão único */}
        <ConfirmModal
          {...props}
          open={open1}
          title="Excluir"
          description="Você tem certeza que deseja excluir este item?"
          confirmText="Label"
          onConfirm={() => setOpen1(false)}
          onCancel={() => setOpen1(false)}
          className={mergedClassName}
        />

        {/* Exemplo 2: Com cancelar */}
        <ConfirmModal
          {...props}
          open={open2}
          title="Excluir"
          description="Você tem certeza que deseja excluir este item?"
          confirmText="Excluir"
          cancelText="Label"
          type="danger"
          onConfirm={() => setOpen2(false)}
          onCancel={() => setOpen2(false)}
          className={mergedClassName}
        />

        {/* Exemplo 3: Sair da página */}
        <ConfirmModal
          {...props}
          open={open3}
          title="Tem certeza que deseja sair desta página?"
          description="Suas alterações podem ser perdidas."
          confirmText="Confirmar"
          cancelText="Não, ficar na página"
          onConfirm={() => setOpen3(false)}
          onCancel={() => setOpen3(false)}
          className={mergedClassName}
        />
      </div>
    );
  },
};
