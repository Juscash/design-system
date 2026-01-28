import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "./Button";

type ButtonStoryProps = React.ComponentProps<typeof Button> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<ButtonStoryProps> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4035-4133&m=dev",
    },
    docs: {
      description: {
        component: `
Componente de botão baseado no [Ant Design Button](https://ant.design/components/button).

### Props:
- **Extended (Ant Design)**: A maioria das propriedades padrão do AntD Button são suportadas.
- **Customized**:
  - \`type\`: Estendido com variantes exclusivas (\`secondary\`, \`destructive\`, \`ghost\`, \`neutral\`, \`outlined\`).
  - \`size\`: Mapeado internamente para o \`dsSize\` do sistema Juscash.
- **Custom (Juscash)**:
  - \`dsSize\`: Define o tamanho específico seguindo o Design System (\`xs\`, \`s\`, \`m\`).

### Como usar:

\`\`\`tsx
import { Button } from "@Juscash/design-system";

function Example() {
  return <Button onClick={() => {}}>Excluir</Button>;
}
\`\`\`
`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "destructive",
        "ghost",
        "neutral",
        "outlined",
      ],
    },
    dsSize: {
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
  args: {
    hover: false,
    active: false,
    focus: false,
  },
  render: (args) => {
    const { hover, active, focus, ...props } = args;
    const pseudoClasses = [
      hover && "pseudo-hover",
      active && "pseudo-active",
      focus && "pseudo-focus",
    ]
      .filter(Boolean)
      .join(" ");

    return <Button {...props} className={pseudoClasses} />;
  },
};

export default meta;
type Story = StoryObj<ButtonStoryProps>;

export const Primary: Story = {
  args: {
    type: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    type: "secondary",
    children: "Secondary Button",
  },
};

export const Destructive: Story = {
  args: {
    type: "destructive",
    children: "Destructive Button",
  },
};

export const Ghost: Story = {
  args: {
    type: "ghost",
    children: "Ghost Button",
  },
};

export const Neutral: Story = {
  args: {
    type: "neutral",
    children: "Neutral Button",
  },
};

export const Outlined: Story = {
  args: {
    type: "outlined",
    children: "Outlined Button",
  },
};

export const Disabled: Story = {
  args: {
    type: "primary",
    disabled: true,
    children: "Disabled Button",
  },
};

export const Loading: Story = {
  args: {
    type: "primary",
    loading: true,
    children: "Loading Button",
  },
};

export const WithIcon: Story = {
  args: {
    type: "primary",
    icon: <Search size={16} />,
    children: "Search",
  },
};

export const IconButton: Story = {
  args: {
    type: "primary",
    icon: <Plus size={16} />,
  },
};
