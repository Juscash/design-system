import type { Meta, StoryObj } from "@storybook/react-vite";
import { Segmented } from "./Segmented";
import { Grid, Heart, List, User, Settings } from "lucide-react";
import { designSystemColors } from "../../theme";

const meta: Meta<typeof Segmented> = {
  title: "Components/Segmented",
  component: Segmented,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4886-14656&m=dev",
    },
    docs: {
      description: {
        component: `
Componente de controle segmentado baseado no [Ant Design Segmented](https://ant.design/components/segmented).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Segmented.
- **Custom (Juscash)**:
  - \`size\`: Estendido com tamanhos do Design System (\`small\`, \`middle\`, \`large\`). A propriedade original \`size\` do AntD é mapeada automaticamente.
`,
      },
    },
  },
  args: {
    size: "middle",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["regular", "small", "middle", "large"],
      description: "Tamanho do componente",
    },
    block: {
      control: "boolean",
      description: "Ajusta a largura para caber no container pai",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita todo o componente",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Segmented>;

// Basic Text Options
const textOptions = ["Daily", "Weekly", "Monthly"];

// Icon + Text Options (Simulating the 'With Icons' Figma variant)
const iconTextOptions = [
  {
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Grid size={16} />
        <span>Grid</span>
      </div>
    ),
    value: "grid",
  },
  {
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <List size={16} />
        <span>List</span>
      </div>
    ),
    value: "list",
  },
];

// Icon Only Options
const iconOnlyOptions = [
  {
    label: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid size={16} />
      </div>
    ),
    value: "grid",
  },
  {
    label: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <List size={16} />
      </div>
    ),
    value: "list",
  },
];

export const Default: Story = {
  args: {
    options: textOptions,
    defaultValue: "Daily",
  },
  name: "Label Only",
};

export const WithIcon: Story = {
  args: {
    options: iconTextOptions,
    defaultValue: "grid",
  },
  name: "Icon + Label",
};

export const IconOnly: Story = {
  args: {
    options: iconOnlyOptions,
    defaultValue: "grid",
  },
  name: "Icon Only",
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 60,
            fontSize: 12,
            color: designSystemColors.neutral[500],
          }}
        >
          Small:
        </span>
        <Segmented size="small" options={textOptions} defaultValue="Daily" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 60,
            fontSize: 12,
            color: designSystemColors.neutral[500],
          }}
        >
          Middle:
        </span>
        <Segmented size="middle" options={textOptions} defaultValue="Daily" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 60,
            fontSize: 12,
            color: designSystemColors.neutral[500],
          }}
        >
          Large:
        </span>
        <Segmented size="large" options={textOptions} defaultValue="Daily" />
      </div>
    </div>
  ),
  name: "Sizes",
};

export const Disabled: Story = {
  args: {
    options: textOptions,
    defaultValue: "Daily",
    disabled: true,
  },
};

export const Block: Story = {
  args: {
    options: textOptions,
    defaultValue: "Weekly",
    block: true,
  },
  render: (args) => (
    <div style={{ width: 400 }}>
      <Segmented {...args} />
    </div>
  ),
};
