import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Alert } from ".";
import { Button } from "../Button";
import { CircleCheck, AlertCircle } from "lucide-react";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4077-7402&m=dev";

type AlertStoryProps = React.ComponentProps<typeof Alert> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<AlertStoryProps> = {
  title: "Components/Alert",
  component: Alert,
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
Componente que exibe uma mensagem de aviso para chamar a atenÃ§Ã£o do usuÃ¡rio sobre informaÃ§Ãµes importantes.
Baseado no [Ant Design Alert](https://ant.design/components/alert).

### Props:
- **Extended (Ant Design)**: Props padrÃ£o do Antd (message, description, showIcon, etc).
- **Custom (Juscash)**:
  - \`type\`: 'neutral' (default) | 'error' | 'success' | 'info' | 'warning'.
  - \`showLine2\`: Controla a exibiÃ§Ã£o de uma descriÃ§Ã£o secundÃ¡ria (mapeado para usar prop \`description\`).
  - \`showButton\`: Controla a exibiÃ§Ã£o de aÃ§Ã£o (mapeado para usar prop \`action\`).
  - \`showLeftIcon\`: Controla a exibiÃ§Ã£o do Ã­cone (mapeado para prop \`showIcon\`).

### Como usar:

\`\`\`tsx
import { Alert } from "@juscash/design-system";

function Example() {
  return <Alert type="neutral" message="Line 1" />;
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
      options: ["neutral", "error", "success", "info", "warning"],
      description: "Tipo do alerta. 'neutral' Ã© customizado do Design System.",
    },
    showLine2: {
      control: "boolean",
      description: "Habilita segunda linha (descriÃ§Ã£o). Use a prop `description` para o conteÃºdo.",
    },
    showButton: {
      control: "boolean",
      description: "Habilita botÃ£o de aÃ§Ã£o. Use a prop `action` para o conteÃºdo.",
    },
    showLeftIcon: {
      control: "boolean",
      description: "Exibe Ã­cone. Mapeado para `showIcon`.",
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
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return <Alert {...props} className={mergedClassName} />;
  },
};

export default meta;
type Story = StoryObj<AlertStoryProps>;

export const Default: Story = {
  args: {
    message: "Line 1",
    type: "neutral",
  },
};

// Figma Example 1: neutral + check icon + closable (X)
export const NeutralWithClose: Story = {
  name: "Neutral com Ã­cone e fechar",
  args: {
    message: "ConfiguraÃ§Ãµes salvas com sucesso.",
    type: "neutral",
    showIcon: true,
    icon: <CircleCheck size={16} />,
    closable: true,
  },
};

// Figma Example 2: neutral + circle-alert icon
export const NeutralWithAlert: Story = {
  name: "Neutral com Ã­cone alerta",
  args: {
    message: "Seu plano expirarÃ¡ em 3 dias. Considere renovÃ¡-lo para evitar interrupÃ§Ãµes.",
    type: "neutral",
    showIcon: true,
    icon: <AlertCircle size={16} />,
  },
};

// Figma Example 3: error + circle-alert + title + description
export const ErrorWithDescription: Story = {
  name: "Error com descriÃ§Ã£o",
  args: {
    message: "Falha ao salvar os dados.",
    description: "Tente novamente mais tarde.",
    type: "error",
    showIcon: true,
    icon: <AlertCircle size={16} />,
  },
};

// Figma Example 4: neutral + check icon + button action
export const NeutralWithAction: Story = {
  name: "Neutral com aÃ§Ã£o",
  args: {
    message: "Arquivo excluÃ­do com sucesso.",
    type: "neutral",
    showIcon: true,
    icon: <CircleCheck size={16} />,
    action: <Button size="m" type="outline" style={{ backgroundColor: "transparent" }}>Desfazer</Button>,
  },
};
