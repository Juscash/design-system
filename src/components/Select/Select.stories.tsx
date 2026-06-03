import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Heart } from "lucide-react";
import { Select } from ".";
import { designSystemColors } from "../../theme";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4062-7843&m=dev";

type SelectStoryProps = React.ComponentProps<typeof Select> & {
  focus?: boolean;
  hover?: boolean;
};

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
  { value: "disabled", label: "Disabled Option", disabled: true },
];

const optionsWithGroups = [
  {
    label: "Group label",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
      { value: "option4", label: "Option 4" },
    ],
  },
];

const meta: Meta<SelectStoryProps> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      codePanel: true,
      description: {
        component: `
Campo de seleção do design system. Embrulha o [Ant Design Select](https://ant.design/components/select) aplicando os tokens do Figma (\`4062:7843\`).

Compõe a pilha vertical com gap de 8px: **label** (16px) → **campo** → **helper/erro** (13px), igual ao Input.

### Props proprietárias
- \`size\`: \`xs\` (24px) · \`s\` (32px) · \`m\` (36px) · \`l\` (40px). Default \`m\`.
- \`label\`: rótulo acima do campo (16px, \`text/dark\`).
- \`helperText\`: texto auxiliar abaixo (13px, \`text/soft\`; vermelho em \`status="error"\`).

### Como usar
\`\`\`tsx
import { Select } from "@juscash/design-system";

<Select label="Categoria" placeholder="Selecione um item" options={options} />
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
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>🎨 Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
  args: {
    label: "Label",
    options,
    placeholder: "Selecione um item",
    hover: false,
    focus: false,
  },
  argTypes: {
    size: { control: "select", options: ["xs", "s", "m", "l"], description: "Tamanho do Design System" },
    label: { control: "text" },
    helperText: { control: "text" },
    disabled: { control: "boolean" },
    status: { control: "select", options: ["", "error"] },
    hover: { control: "boolean", description: "Força hover", table: { category: "Pseudo States" } },
    focus: { control: "boolean", description: "Força focus", table: { category: "Pseudo States" } },
  },
  render: (args) => {
    const { focus, hover, className, ...props } = args;
    const pseudo = [hover && "pseudo-hover", focus && "pseudo-focus-visible"].filter(Boolean).join(" ");
    const mergedClassName = [className, pseudo].filter(Boolean).join(" ");
    return (
      <div style={{ width: 320 }}>
        <Select {...props} className={mergedClassName} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<SelectStoryProps>;

export const Default: Story = { name: "Placeholder", args: {} };

export const Value: Story = { args: { defaultValue: "option1" } };

export const Focus: Story = { args: { defaultValue: "option1", focus: true } };

export const Error: Story = { args: { status: "error", helperText: "Selecione uma opção válida" } };

export const ErrorFocus: Story = { name: "Error Focus", args: { status: "error", helperText: "Selecione uma opção válida", focus: true } };

export const Disabled: Story = { args: { defaultValue: "option1", disabled: true } };

export const WithHelperText: Story = { name: "With Helper Text", args: { helperText: "Helper text" } };

export const Searchable: Story = { name: "With Search", args: { showSearch: true, options: optionsWithGroups } };

export const WithPrefix: Story = {
  name: "With Decoration (prefix)",
  args: { defaultValue: "option1", prefix: <Heart size={16} color={designSystemColors.neutral[800]} /> },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 320 }}>
      <Select size="l" label="Large (40px)" defaultValue="option1" options={options} />
      <Select size="m" label="Regular (36px)" defaultValue="option1" options={options} />
      <Select size="s" label="Small (32px)" defaultValue="option1" options={options} />
      <Select size="xs" label="Mini (24px)" defaultValue="option1" options={options} />
    </div>
  ),
};
