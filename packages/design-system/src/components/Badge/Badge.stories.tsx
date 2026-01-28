import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Heart } from "lucide-react";
import { Badge } from "./Badge";

import {
  Title,
  Subtitle,
  Description,
  Primary as DocsPrimary,
  Controls,
  Stories,
} from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-6201&m=dev";

type BadgeStoryProps = React.ComponentProps<typeof Badge> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<BadgeStoryProps> = {
  title: "Components/Badge",
  component: Badge,
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
Componente de badge baseado no [Ant Design Badge](https://ant.design/components/badge).

### Props:
- **Extended (Ant Design)**: Props padrao do Antd Badge.
- **Custom (Juscash)**:
  - \`variant\`: Define a variante visual (primary, secondary, tertiary, outline, ghost, destructive, counter).
  - \`statusColor\`: Cores de status para a variante secondary (success, error, warning).
  - \`leftIcon\`/\`rightIcon\`: Icones opcionais ao lado do label.
  - \`count\`: Numero exibido na variante counter.

### Como usar:

\`\`\`tsx
import { Badge } from "@Juscash/design-system";

function Example() {
  return <Badge variant="primary">Label</Badge>;
}
\`\`\`
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />

          <DocsPrimary />

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
    hover: {
      control: "boolean",
      description: "Forca o estado hover",
      table: { category: "Pseudo States" },
    },
    active: {
      control: "boolean",
      description: "Forca o estado active",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { focus, hover, active, ...props } = args;
    const pseudoClasses = [
      hover && "pseudo-hover",
      active && "pseudo-active",
      focus && "pseudo-focus-visible",
    ]
      .filter(Boolean)
      .join(" ");

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
