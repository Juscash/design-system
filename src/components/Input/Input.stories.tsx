import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Input } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4048-10668&m=dev";

type InputStoryProps = React.ComponentProps<typeof Input> & {
  hover?: boolean;
  focus?: boolean;
};

const meta: Meta<InputStoryProps> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      codePanel: true,
      description: {
        component: `
Campo de texto do design system. Embrulha o [Ant Design Input](https://ant.design/components/input) aplicando os tokens do Figma (\`4048:10668\`).

O componente compõe a pilha vertical do Figma com gap de 8px: **label** (16px) → **campo** → **helper/erro** (13px).

### Props proprietárias
- \`size\`: \`xs\` (24px) · \`s\` (32px) · \`m\` (36px) · \`l\` (40px). Default \`m\`.
- \`label\`: rótulo acima do campo (16px, \`text/dark\`).
- \`helperText\`: texto auxiliar abaixo (13px, \`text/soft\`; vermelho em \`status="error"\`).
- \`prefix\` / \`suffix\`: decoração à esquerda/direita — \`ReactNode\` ou nome de ícone Lucide (16px).

### Como usar
\`\`\`tsx
import { Input } from "@juscash/design-system";

<Input label="E-mail" placeholder="seu@email.com" helperText="Texto auxiliar" />
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
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "s", "m", "l"] },
    label: { control: "text" },
    helperText: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    status: { control: "select", options: ["", "error"] },
    hover: { control: "boolean", description: "Força hover", table: { category: "Pseudo States" } },
    focus: { control: "boolean", description: "Força focus", table: { category: "Pseudo States" } },
  },
  args: {
    label: "Label",
    hover: false,
    focus: false,
  },
  render: (args) => {
    const { focus, hover, className, ...props } = args;
    const pseudo = [hover && "pseudo-hover", focus && "pseudo-focus pseudo-focus-within"].filter(Boolean).join(" ");
    const mergedClassName = [className, pseudo].filter(Boolean).join(" ");
    return (
      <div style={{ width: 320 }}>
        <Input {...props} className={mergedClassName} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<InputStoryProps>;

export const Default: Story = {
  args: { label: "Label", placeholder: "Value" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 320 }}>
      <Input size="l" label="Large (40px)" defaultValue="Value" />
      <Input size="m" label="Regular (36px)" defaultValue="Value" />
      <Input size="s" label="Small (32px)" defaultValue="Value" />
      <Input size="xs" label="Mini (24px)" defaultValue="Value" />
    </div>
  ),
};

export const Empty: Story = {
  args: { label: "Label" },
};

export const Placeholder: Story = {
  args: { label: "Label", placeholder: "Value" },
};

export const Value: Story = {
  args: { label: "Label", defaultValue: "Value" },
};

export const Focus: Story = {
  args: { label: "Label", defaultValue: "Value", focus: true },
};

export const Error: Story = {
  args: { label: "Label", defaultValue: "Value", status: "error", helperText: "Senha incorreta" },
};

export const ErrorFocus: Story = {
  name: "Error Focus",
  args: { label: "Label", defaultValue: "Value", status: "error", helperText: "Senha incorreta", focus: true },
};

export const Disabled: Story = {
  args: { label: "Label", defaultValue: "Value", disabled: true },
};

export const WithHelperText: Story = {
  name: "With Helper Text",
  args: { label: "Label", placeholder: "Value", helperText: "Helper text" },
};

export const DecorationLeft: Story = {
  name: "Decoration (prefix)",
  args: { label: "Buscar", placeholder: "Pesquisar...", prefix: "Search" },
};

export const DecorationRight: Story = {
  name: "Decoration (suffix)",
  args: { label: "Senha", placeholder: "Digite sua senha", suffix: "EyeOff" },
};

export const ClickableSuffix: Story = {
  name: "Decoration clicável (toggle senha)",
  render: () => {
    const [visible, setVisible] = React.useState(false);
    return (
      <div style={{ width: 320 }}>
        <Input
          label="Senha"
          type={visible ? "text" : "password"}
          defaultValue="segredo123"
          suffix={visible ? "Eye" : "EyeOff"}
          onSuffixClick={() => setVisible((value) => !value)}
        />
      </div>
    );
  },
};
