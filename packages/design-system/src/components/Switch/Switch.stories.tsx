import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4062-5352&m=dev",
    },
    docs: {
      description: {
        component: `
Componente de alternância (Switch) baseado no [Ant Design Switch](https://ant.design/components/switch).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Switch.
- **Custom (Juscash)**:
  - \`error\`: Define o estado de erro visual (vermelho) quando verdadeiro.
`,
      },
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Desabilita a interação",
    },
    defaultChecked: {
      control: "boolean",
      description: "Estado inicial checado",
    },
    error: {
      control: "boolean",
      description: "Estado de erro",
    },
    loading: {
      control: "boolean",
      description: "Estado de carregamento",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const ErrorChecked: Story = {
  args: {
    error: true,
    defaultChecked: true,
  },
};
