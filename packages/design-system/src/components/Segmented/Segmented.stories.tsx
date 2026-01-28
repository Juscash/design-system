import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Segmented } from "./Segmented";
import { Grid, List } from "lucide-react";
import { designSystemColors } from "../../theme";

import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4886-14656&m=dev";

type SegmentedStoryProps = React.ComponentProps<typeof Segmented> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<SegmentedStoryProps> = {
  title: "Components/Segmented",
  component: Segmented,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    pseudo: {
      hover: "hover",
      active: "active",
      focus: "focus",
      selector: ".sb-pseudo-target",
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente de controle segmentado baseado no [Ant Design Segmented](https://ant.design/components/segmented).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Segmented.
- **Custom (Juscash)**:
  - \`size\`: Estendido com tamanhos do Design System (\`small\`, \`middle\`, \`large\`). A propriedade original \`size\` do AntD é mapeada automaticamente.

### Como usar:

\`\`\`tsx
import { Segmented } from "@Juscash/design-system";

function Example() {
  return (
    <Segmented
      options={["Daily", "Weekly", "Monthly"]}
      defaultValue="Daily"
    />
  );
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
  args: {
    size: "middle",
    hover: false,
    active: false,
    focus: false,
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
    focus: {
      control: "boolean",
      description: "Forca o estado focus",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { hover, active, focus, ...props } = args;
    const pseudoClasses = [
      hover && "pseudo-hover",
      active && "pseudo-active",
      focus && "pseudo-focus-visible",
    ]
      .filter(Boolean)
      .join(" ");

    return <Segmented {...props} className={pseudoClasses} />;
  },
};

export default meta;
type Story = StoryObj<SegmentedStoryProps>;

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
