import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../Button";
import { Popover } from ".";
import { Bell, Info } from "lucide-react";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4125-10702&m=dev";

type PopoverStoryProps = React.ComponentProps<typeof Popover> & {
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

const meta: Meta<PopoverStoryProps> = {
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

### Features Juscash:
- **Slots Flexíveis**: Suporte a 1, 2 ou 3 slots (header, content, footer).
- **Ícone Customizado**: Prop \`icon\` para adicionar ícone no header.
- **Tokens do Design System**: Sombra, border radius e cores aplicados via ConfigProvider.
- **Compatibilidade**: Mantém todas as props do Ant Design (\`title\`, \`content\`, \`trigger\`, \`placement\`, etc.).

### Como usar:

\`\`\`tsx
import { Popover, Button } from "@juscash/design-system";

// Uso simples (1 slot)
<Popover content="Conteúdo do popover">
  <Button>Clique aqui</Button>
</Popover>

// Com header e footer (3 slots)
<Popover
  header="Título"
  content="Conteúdo principal"
  footer={<Button size="small">Ação</Button>}
  icon={<Bell size={16} />}
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
    header: {
      control: "text",
      description: "Conteúdo do cabeçalho (slot superior)",
      table: {
        type: { summary: "ReactNode" },
        category: "Juscash Props",
      },
    },
    footer: {
      control: "text",
      description: "Conteúdo do rodapé (slot inferior)",
      table: {
        type: { summary: "ReactNode" },
        category: "Juscash Props",
      },
    },
    icon: {
      control: false,
      description: "Ícone customizado no header",
      table: {
        type: { summary: "ReactNode" },
        category: "Juscash Props",
      },
    },
    content: {
      control: "text",
      description: "Conteúdo principal do popover",
      table: {
        type: { summary: "ReactNode | RenderFunction" },
        category: "Ant Design Props",
      },
    },
    title: {
      control: "text",
      description: "Título do popover (alternativa ao header)",
      table: {
        type: { summary: "ReactNode" },
        category: "Ant Design Props",
      },
    },
    trigger: {
      control: "select",
      options: ["hover", "click", "focus", "contextMenu"],
      description: "Tipo de trigger para abrir o popover",
      table: {
        type: { summary: "string | string[]" },
        defaultValue: { summary: "hover" },
        category: "Ant Design Props",
      },
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
      description: "Posicionamento do popover",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "top" },
        category: "Ant Design Props",
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
};

export default meta;

type Story = StoryObj<PopoverStoryProps>;

// Story 1: Default (1 slot - apenas content)
export const Default: Story = {
  args: {
    content: "Este é um popover simples com apenas conteúdo.",
    trigger: "click",
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
      <div className={mergedClassName} style={{ padding: 100, display: "flex", justifyContent: "center" }}>
        <Popover {...props}>
          <Button>Clique aqui</Button>
        </Popover>
      </div>
    );
  },
};

// Story 2: With Header (2 slots)
export const WithHeader: Story = {
  parameters: {
    docs: {
      description: {
        story: "Popover com header e conteúdo (2 slots).",
      },
    },
  },
  args: {
    header: "Notificações",
    content: "Você tem 3 novas notificações para revisar.",
    trigger: "click",
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
      <div className={mergedClassName} style={{ padding: 100, display: "flex", justifyContent: "center" }}>
        <Popover {...props}>
          <Button>Ver Notificações</Button>
        </Popover>
      </div>
    );
  },
};

// Story 3: Complete (3 slots - header + content + footer)
export const Complete: Story = {
  parameters: {
    docs: {
      description: {
        story: "Popover completo com header, conteúdo e footer (3 slots).",
      },
    },
  },
  args: {
    header: "Confirmar Ação",
    content: "Tem certeza que deseja prosseguir com esta operação?",
    footer: (
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Button type="neutral" size="s">
          Cancelar
        </Button>
        <Button type="primary" size="s">
          Confirmar
        </Button>
      </div>
    ),
    trigger: "click",
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
      <div className={mergedClassName} style={{ padding: 100, display: "flex", justifyContent: "center" }}>
        <Popover {...props}>
          <Button>Abrir Confirmação</Button>
        </Popover>
      </div>
    );
  },
};

// Story 4: Custom Icon
export const CustomIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: "Popover com ícone customizado no header.",
      },
    },
  },
  args: {
    header: "Informação Importante",
    content: "Esta é uma mensagem informativa com ícone customizado.",
    icon: <Info size={16} />,
    trigger: "click",
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
      <div className={mergedClassName} style={{ padding: 100, display: "flex", justifyContent: "center" }}>
        <Popover {...props}>
          <Button>Ver Info</Button>
        </Popover>
      </div>
    );
  },
};

// Story 5: Different Placements
export const Placements: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstra diferentes posicionamentos do popover.",
      },
    },
  },
  render: (args) => {
    const content = "Conteúdo do popover";
    const mergedClassName = getPseudoClassName(args);
    return (
      <div
        className={mergedClassName}
        style={{
          padding: 100,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          placeItems: "center",
        }}
      >
        <Popover content={content} placement="topLeft" trigger="click">
          <Button>Top Left</Button>
        </Popover>
        <Popover content={content} placement="top" trigger="click">
          <Button>Top</Button>
        </Popover>
        <Popover content={content} placement="topRight" trigger="click">
          <Button>Top Right</Button>
        </Popover>

        <Popover content={content} placement="leftTop" trigger="click">
          <Button>Left Top</Button>
        </Popover>
        <div />
        <Popover content={content} placement="rightTop" trigger="click">
          <Button>Right Top</Button>
        </Popover>

        <Popover content={content} placement="leftBottom" trigger="click">
          <Button>Left Bottom</Button>
        </Popover>
        <div />
        <Popover content={content} placement="rightBottom" trigger="click">
          <Button>Right Bottom</Button>
        </Popover>

        <Popover content={content} placement="bottomLeft" trigger="click">
          <Button>Bottom Left</Button>
        </Popover>
        <Popover content={content} placement="bottom" trigger="click">
          <Button>Bottom</Button>
        </Popover>
        <Popover content={content} placement="bottomRight" trigger="click">
          <Button>Bottom Right</Button>
        </Popover>
      </div>
    );
  },
};

// Story 6: Different Triggers
export const Triggers: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstra diferentes tipos de trigger (hover, click, focus).",
      },
    },
  },
  render: (args) => {
    const mergedClassName = getPseudoClassName(args);

    return (
      <div
        className={mergedClassName}
        style={{
          padding: 100,
          display: "flex",
          gap: 16,
          justifyContent: "center",
        }}
      >
        <Popover content="Abre ao passar o mouse" trigger="hover">
          <Button>Hover</Button>
        </Popover>
        <Popover content="Abre ao clicar" trigger="click">
          <Button>Click</Button>
        </Popover>
        <Popover content="Abre ao focar" trigger="focus">
          <Button>Focus</Button>
        </Popover>
      </div>
    );
  },
};

// Story 7: Using Antd Title (compatibility)
export const WithAntdTitle: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstra compatibilidade com a prop `title` do Ant Design (sem usar `header`).",
      },
    },
  },
  args: {
    title: "Título via Antd",
    content: "Conteúdo usando a prop title do Ant Design.",
    trigger: "click",
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
      <div className={mergedClassName} style={{ padding: 100, display: "flex", justifyContent: "center" }}>
        <Popover {...props}>
          <Button>Abrir (Antd Title)</Button>
        </Popover>
      </div>
    );
  },
};
