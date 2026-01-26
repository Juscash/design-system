import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4069-6522&m=dev",
    },
    docs: {
      description: {
        component: `
Componente Card baseado no [Ant Design Card](https://ant.design/components/card).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Card.
- **Custom (Juscash)**:
  - \`clickable\`: Quando verdadeiro, habilita o efeito de hover e altera o cursor para pointer, indicando interatividade.
`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    clickable: {
      control: "boolean",
      description: "Habilita estado de hover e cursor pointer",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

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
