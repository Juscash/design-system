import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Grid, List } from "lucide-react";
import { Description, Controls, Primary as DocsPrimary, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";
import { Segmented } from "./Segmented";
import { designSystemColors } from "../../theme";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4886-14656&m=dev";

type SegmentedStoryProps = React.ComponentProps<typeof Segmented> & {
};

const meta: Meta<SegmentedStoryProps> = {
  title: "Components/Segmented",
  component: Segmented,
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente de controle segmentado baseado no [Ant Design Segmented](https://ant.design/components/segmented).

### Props:
- **Extended (Ant Design)**: suporta propriedades nativas do AntD.
- **Custom (Juscash)**:
  - \`size\`: \`m\` | \`s\` | \`xs\` (altura do root conforme Figma).
  - \`options\`: aceita \`state\`, \`counter\`, \`icon\`, \`text\`, \`bold\` e \`disabled\` por item.
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <DocsPrimary />
          <Controls />
          <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem" }}>Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
  args: {
    size: "m",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["m", "s", "xs"],
      description: "Tamanho do componente",
    },
    options: {
      control: "object",
      description: "Lista de opcoes do segmented",
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
  render: (args) => <Segmented {...args} />,
};

export default meta;
type Story = StoryObj<SegmentedStoryProps>;

const textOptions = ["Daily", "Weekly", "Monthly"];

const iconTextOptions = [
  { value: "grid", text: "Grid", icon: <Grid size={16} /> },
  { value: "list", text: "List", icon: <List size={16} /> },
];

const iconOnlyOptions = [
  { value: "grid", icon: <Grid size={16} />, bold: false },
  { value: "list", icon: <List size={16} />, bold: false },
];

const primaryOptions = [
  { value: "daily", text: "Daily", state: "active" as const },
  { value: "weekly", text: "Weekly", counter: "3" },
  { value: "grid", text: "Grid", icon: <Grid size={16} /> },
  { value: "icon_only", icon: <List size={16} />, bold: false },
  { value: "monthly", text: "Monthly", disabled: true, state: "inactive" as const },
];

export const Primary: Story = {
  args: {
    size: "m",
    options: primaryOptions,
  },
  name: "Primary",
};

export const Default: Story = {
  args: { options: ["Daily", "Weekly", "Monthly"], defaultValue: "Daily" },
  name: "Label Only",
};

export const WithIcon: Story = {
  args: { options: iconTextOptions, defaultValue: "grid" },
  name: "Icon + Label",
};

export const IconOnly: Story = {
  args: { options: iconOnlyOptions, defaultValue: "grid" },
  name: "Icon Only",
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
        <span style={{ color: designSystemColors.neutral[500], fontSize: 12, width: 60 }}>M:</span>
        <Segmented size="m" options={textOptions} defaultValue="Daily" />
      </div>
      <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
        <span style={{ color: designSystemColors.neutral[500], fontSize: 12, width: 60 }}>S:</span>
        <Segmented size="s" options={textOptions} defaultValue="Daily" />
      </div>
      <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
        <span style={{ color: designSystemColors.neutral[500], fontSize: 12, width: 60 }}>XS:</span>
        <Segmented size="xs" options={textOptions} defaultValue="Daily" />
      </div>
    </div>
  ),
  name: "Sizes",
};

export const Disabled: Story = {
  args: { options: textOptions, defaultValue: "Daily", disabled: true },
};

export const Block: Story = {
  args: { options: textOptions, defaultValue: "Weekly", block: true },
  render: (args) => (
    <div style={{ width: 400 }}>
      <Segmented {...args} />
    </div>
  ),
};

export const FigmaProps: Story = {
  args: {
    size: "m",
    options: [
      { value: "heart", text: "Label", icon: <Grid size={16} />, counter: "1", state: "active", bold: true },
      { value: "list", text: "Label", icon: <List size={16} />, state: "inactive", bold: false },
    ],
  },
  name: "Figma Props",
};
