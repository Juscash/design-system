import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Select } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4122-8572&m=dev";

type SelectStoryProps = React.ComponentProps<typeof Select> & {
  focus?: boolean;
  hover?: boolean;
};

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
  { value: "option5", label: "Option 5" },
  { value: "disabled", label: "Disabled Option", disabled: true },
];

const meta: Meta<SelectStoryProps> = {
  title: "Components/MultiSelect",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      codePanel: true,
      description: {
        component: `
Seleção múltipla — o mesmo \`Select\` com \`mode="multiple"\` (chips + checkbox nas opções). Tokens do Figma (\`4122:8572\`).

### Props proprietárias
- \`size\`: \`xs\` · \`s\` · \`m\` · \`l\` (default \`m\`).
- \`label\` / \`helperText\`.
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
    mode: "multiple",
    label: "Label",
    options,
    placeholder: "Selecione itens",
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

export const Default: Story = { name: "Multiple", args: {} };

export const WithSelected: Story = { name: "With Selected Options", args: { defaultValue: ["option1", "option2"] } };

export const Searchable: Story = { name: "Multiple with Search", args: { showSearch: true } };

export const Disabled: Story = { args: { disabled: true, defaultValue: ["option1"] } };

export const Error: Story = { args: { status: "error", helperText: "Selecione ao menos uma opção" } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 320 }}>
      <Select size="l" mode="multiple" label="Large" defaultValue={["option1"]} options={options} />
      <Select size="m" mode="multiple" label="Regular" defaultValue={["option1"]} options={options} />
      <Select size="s" mode="multiple" label="Small" defaultValue={["option1"]} options={options} />
      <Select size="xs" mode="multiple" label="Mini" defaultValue={["option1"]} options={options} />
    </div>
  ),
};
