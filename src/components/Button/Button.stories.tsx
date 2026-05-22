import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Search, DollarSign, Bell, Plus, Mail, Pencil, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4035-4133&m=dev";

type ButtonStoryProps = React.ComponentProps<typeof Button> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<ButtonStoryProps> = {
  title: "Components/Button",

  component: Button,
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
Componente de botÃ£o baseado no [Ant Design Button](https://ant.design/components/button).

### Props:
- **Extended (Ant Design)**: A maioria das propriedades padrÃ£o do AntD Button sÃ£o suportadas.
- **Customized**:
  - \`type\` ou \`variant\`: Define o estilo do botÃ£o (\`primary\`, \`secondary\`, \`outline\`, \`ghost\`, \`destructive\`, \`neutral\`). A prop \`variant\` tem prioridade sobre \`type\`.
  - \`size\`: Define o tamanho do botÃ£o seguindo o Design System (\`xs\`, \`s\`, \`m\`).

### Como usar:

\`\`\`tsx
import { Button } from "@juscash/design-system";

function Example() {
  return <Button onClick={() => {}}>Excluir</Button>;
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
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive", "neutral"],
      description: "Alias para 'type'. Se definido, tem prioridade.",
    },
    size: {
      control: "select",
      options: ["xs", "s", "m"],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
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
  args: {
    hover: false,
    active: false,
    focus: false,
  },
  render: (args) => {
    const { hover, active, focus, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");

    return <Button {...props} className={pseudoClasses} />;
  },
};

export default meta;
type Story = StoryObj<ButtonStoryProps>;

export const Primarys: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Neutral: Story = {
  args: {
    variant: "neutral",
    children: "Neutral Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Disabled Button",
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    loading: true,
    children: "Loading Button",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    icon: <Search size={16} />,
    children: "Search",
  },
};

export const IconButton: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => {
    const { hover, active, focus, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");

    return <Button {...props} icon={<Plus size={16} />} className={pseudoClasses} />;
  },
};

export const ExemplosFigma: Story = {
  name: "Exemplos Figma",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
        <Button variant="primary" size="m" icon={<Mail size={15} />}>
          Entrar com o e-mail
        </Button>
        <Button variant="primary" size="m">
          Enviar processo
        </Button>
        <Button variant="secondary" size="m" icon={<Plus size={15} />}>
          Adicionar cliente
        </Button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
        <Button variant="outline" icon={<Pencil size={15} />}>
          Editar
        </Button>
        <Button variant="destructive" icon={<Trash size={15} />}>
          Excluir
        </Button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
        <Button variant="neutral" icon={<ChevronLeft size={15} />}>
          Anterior
        </Button>
        <Button variant="neutral" icon={<ChevronRight size={15} />} iconPlacement="end">
          Proximo
        </Button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
        <Button variant="outline" size="m" icon={<DollarSign size={15} />} />
        <Button variant="ghost" size="m" icon={<Bell size={15} />} />
      </div>
    </div>
  ),
};
