import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";
import { Button } from "../Button";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4077-7402&m=dev",
    },
    docs: {
      description: {
        component: `
Componente que exibe uma mensagem de aviso para chamar a atenção do usuário sobre informações importantes.
Baseado no [Ant Design Alert](https://ant.design/components/alert).

### Props:
- **Extended (Ant Design)**: Props padrão do Antd (message, description, showIcon, etc).
- **Custom (Juscash)**:
  - \`type\`: 'neutral' (default) | 'error' | 'success' | 'info' | 'warning'.
  - \`showLine2\`: Controla a exibição de uma descrição secundária (mapeado para usar prop \`description\`).
  - \`showButton\`: Controla a exibição de ação (mapeado para usar prop \`action\`).
  - \`showLeftIcon\`: Controla a exibição do ícone (mapeado para prop \`showIcon\`).
`,
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["neutral", "error", "success", "info", "warning"],
      description: "Tipo do alerta. 'neutral' é customizado do Design System.",
    },
    showLine2: {
      control: "boolean",
      description:
        "Habilita segunda linha (descrição). Use a prop `description` para o conteúdo.",
    },
    showButton: {
      control: "boolean",
      description:
        "Habilita botão de ação. Use a prop `action` para o conteúdo.",
    },
    showLeftIcon: {
      control: "boolean",
      description: "Exibe ícone. Mapeado para `showIcon`.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    message: "Line 1",
    type: "neutral",
  },
};

export const SuccessExample: Story = {
  args: {
    message: "Configurações salvas com sucesso.",
    type: "success",
    showIcon: true,
  },
};

export const InfoExample: Story = {
  args: {
    message:
      "Seu plano expirará em 3 dias. Considere renová-lo para evitar interrupções.",
    type: "info",
    showIcon: true,
  },
};

export const ErrorExample: Story = {
  args: {
    message: "Falha ao salvar os dados.",
    description: "Tente novamente mais tarde.",
    type: "error",
    showIcon: true,
  },
};

export const WithActionExample: Story = {
  args: {
    message: "Arquivo excluído com sucesso.",
    type: "neutral",
    action: <Button size="small">Desfazer</Button>,
    showIcon: true,
  },
};
