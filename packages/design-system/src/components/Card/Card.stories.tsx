import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Card } from "./Card";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4069-6522&m=dev";

type CardStoryProps = React.ComponentProps<typeof Card> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<CardStoryProps> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente Card baseado no [Ant Design Card](https://ant.design/components/card).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Card.
- **Custom (Juscash)**:
  - \`clickable\`: Quando verdadeiro, habilita o efeito de hover e altera o cursor para pointer, indicando interatividade.

### Como usar:

\`\`\`tsx
import { Card } from "@juscash/design-system";

function Example() {
  return <Card title="Card Title">Card content</Card>;
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
  tags: ["autodocs"],
  args: {
    hover: false,
    active: false,
    focus: false,
  },
  argTypes: {
    clickable: {
      control: "boolean",
      description: "Habilita estado de hover e cursor pointer",
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
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return <Card {...props} className={mergedClassName} />;
  },
};

export default meta;
type Story = StoryObj<CardStoryProps>;

export const Default: Story = {
  args: {
    children: "Card content",
  },
};

export const WithTitle: Story = {
  args: {
    title: "Card Title",
    children: "Card content with a title",
  },
};

export const Clickable: Story = {
  args: {
    title: "Clickable Card",
    children: "Click me to trigger an action",
    clickable: true,

    onClick: () => alert("Card clicked!"),
  },
};

export const NonClickable: Story = {
  args: {
    title: "Non-Clickable Card",
    children: "This card behaves like a static container.",
    clickable: false,
  },
};
