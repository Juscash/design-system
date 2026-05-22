import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Button } from "../Button";
import { ConfirmModal } from ".";

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
Modal de confirmaÃ§Ã£o para aÃ§Ãµes que requerem aprovaÃ§Ã£o do usuÃ¡rio.

### Props:
- **Custom (Juscash)**:
  - \`type\`: \`info\`, \`warning\`, \`danger\`.
  - \`confirmText\`/\`cancelText\`: Define os textos dos botÃµes.
  - \`confirmLoading\`: Estado de carregamento do botÃ£o de confirmaÃ§Ã£o.

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
        description="VocÃª tem certeza que deseja excluir este item?"
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
              ðŸŽ¨ Figma Spec
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
      options: ["info", "warning", "danger", "secondary"],
      description: "Tipo de confirmaÃ§Ã£o (afeta cor do botÃ£o)",
      table: {
        type: { summary: '"info" | "warning" | "danger"' },
        defaultValue: { summary: '"info"' },
        category: "Juscash Props",
      },
    },
    title: {
      control: "text",
      description: "TÃ­tulo do modal",
      table: {
        type: { summary: "ReactNode" },
        category: "Juscash Props",
      },
    },
    description: {
      control: "text",
      description: "DescriÃ§Ã£o/mensagem do modal",
      table: {
        type: { summary: "ReactNode" },
        category: "Juscash Props",
      },
    },
    confirmText: {
      control: "text",
      description: "Texto do botÃ£o de confirmaÃ§Ã£o",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Confirmar"' },
        category: "Juscash Props",
      },
    },
    cancelText: {
      control: "text",
      description: "Texto do botÃ£o cancelar (omitir para esconder)",
      table: {
        type: { summary: "string" },
        category: "Juscash Props",
      },
    },
    confirmLoading: {
      control: "boolean",
      description: "Estado de loading do botÃ£o de confirmaÃ§Ã£o",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Juscash Props",
      },
    },
    hover: {
      control: "boolean",
      description: "ForÃ§a o estado hover",
      table: { category: "Pseudo States" },
    },
    active: {
      control: "boolean",
      description: "ForÃ§a o estado active",
      table: { category: "Pseudo States" },
    },
    focus: {
      control: "boolean",
      description: "ForÃ§a o estado focus",
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

// Story 1: Default (com dois botÃµes)
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Modal de confirmaÃ§Ã£o padrÃ£o com botÃµes Cancelar e Confirmar.",
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
        <Button onClick={() => setOpen(true)}>Abrir ConfirmaÃ§Ã£o</Button>
        <ConfirmModal
          {...props}
          open={open}
          title="Tem certeza que deseja sair desta pÃ¡gina?"
          description="Suas alteraÃ§Ãµes podem ser perdidas."
          confirmText="Confirmar"
          cancelText="NÃ£o, ficar na pÃ¡gina"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          className={mergedClassName}
        />
      </div>
    );
  },
};

// Story 2: Secondary
export const Secondary: Story = {
  parameters: {
    docs: {
      description: {
        story: "Modal de confirmaÃ§Ã£o com botÃ£o secundÃ¡rio (azul).",
      },
    },
  },
  render: function SecondaryStory(args) {
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
        <Button onClick={() => setOpen(true)}>Abrir ConfirmaÃ§Ã£o</Button>
        <ConfirmModal
          {...props}
          open={open}
          title="Tem certeza que deseja sair desta pÃ¡gina?"
          description="Suas alteraÃ§Ãµes podem ser perdidas."
          type="secondary"
          confirmText="Confirmar"
          cancelText="NÃ£o, ficar na pÃ¡gina"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          className={mergedClassName}
        />
      </div>
    );
  },
};

// Story 3: Danger (Excluir)
export const Danger: Story = {
  parameters: {
    docs: {
      description: {
        story: "Modal de confirmaÃ§Ã£o para aÃ§Ãµes destrutivas (excluir).",
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
          description="VocÃª tem certeza que deseja excluir este item?"
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
        story: "Modal com apenas um botÃ£o de confirmaÃ§Ã£o (sem cancelar).",
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
          description="VocÃª tem certeza que deseja excluir este item?"
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
        story: "Modal com estado de loading no botÃ£o de confirmaÃ§Ã£o.",
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
        <Button onClick={() => setOpen(true)}>Salvar AlteraÃ§Ãµes</Button>
        <ConfirmModal
          {...props}
          open={open}
          title="Salvar alteraÃ§Ãµes?"
          description="Deseja salvar as alteraÃ§Ãµes feitas?"
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
        <Button onClick={() => setOpen1(true)}>BotÃ£o Ãºnico</Button>
        <Button onClick={() => setOpen2(true)}>Com Cancelar</Button>
        <Button type="destructive" onClick={() => setOpen3(true)}>
          AÃ§Ã£o Destrutiva
        </Button>

        {/* Exemplo 1: BotÃ£o Ãºnico */}
        <ConfirmModal
          {...props}
          open={open1}
          title="Excluir"
          description="VocÃª tem certeza que deseja excluir este item?"
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
          description="VocÃª tem certeza que deseja excluir este item?"
          confirmText="Excluir"
          cancelText="Label"
          type="danger"
          onConfirm={() => setOpen2(false)}
          onCancel={() => setOpen2(false)}
          className={mergedClassName}
        />

        {/* Exemplo 3: Sair da pÃ¡gina */}
        <ConfirmModal
          {...props}
          open={open3}
          title="Tem certeza que deseja sair desta pÃ¡gina?"
          description="Suas alteraÃ§Ãµes podem ser perdidas."
          confirmText="Confirmar"
          cancelText="NÃ£o, ficar na pÃ¡gina"
          onConfirm={() => setOpen3(false)}
          onCancel={() => setOpen3(false)}
          className={mergedClassName}
        />
      </div>
    );
  },
};
