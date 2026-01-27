import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Heart } from "lucide-react";
import { Badge } from "./Badge";

type BadgeStoryProps = React.ComponentProps<typeof Badge> & {
  focus?: boolean;
};

const meta: Meta<BadgeStoryProps> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-6201&m=dev",
    },
    docs: {
      description: {
        component: `
Componente de badge baseado no [Ant Design Badge](https://ant.design/components/badge).

### Props:
- **Extended (Ant Design)**: Props padrao do Antd Badge.
- **Custom (Juscash)**:
  - \`variant\`: Define a variante visual (primary, secondary, tertiary, outline, ghost, destructive, counter).
  - \`statusColor\`: Cores de status para a variante secondary (success, error, warning).
  - \`leftIcon\`/\`rightIcon\`: Icones opcionais ao lado do label.
  - \`count\`: Numero exibido na variante counter.
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "outline",
        "ghost",
        "destructive",
        "counter",
      ],
    },
    statusColor: {
      control: "select",
      options: ["success", "error", "warning"],
    },
    count: {
      control: "number",
    },
    leftIcon: {
      control: false,
    },
    rightIcon: {
      control: false,
    },
    focus: {
      control: "boolean",
      description: "Forca o estado focus",
      table: { category: "Pseudo States" },
    },
  },
  args: {
    focus: false,
  },
  render: (args) => {
    const { focus, ...props } = args;
    const pseudoClasses = [focus && "pseudo-focus"].filter(Boolean).join(" ");

    return <Badge {...props} className={pseudoClasses} />;
  },
};

export default meta;
type Story = StoryObj<BadgeStoryProps>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Label",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Label",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Label",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Label",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Label",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Label",
  },
};

export const Counter: Story = {
  args: {
    variant: "counter",
    count: 1,
  },
};

export const SecondarySuccess: Story = {
  args: {
    variant: "secondary",
    statusColor: "success",
    children: "Label",
  },
};

export const SecondaryError: Story = {
  args: {
    variant: "secondary",
    statusColor: "error",
    children: "Label",
  },
};

export const SecondaryWarning: Story = {
  args: {
    variant: "secondary",
    statusColor: "warning",
    children: "Label",
  },
};

export const WithIcons: Story = {
  args: {
    variant: "primary",
    leftIcon: <Heart size={12} />,
    rightIcon: <Heart size={12} />,
    children: "Label",
  },
};
