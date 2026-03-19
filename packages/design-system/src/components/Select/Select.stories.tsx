import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Select } from "./Select";
import { FormItem } from "../FormItem/FormItem";
import { Form } from "antd";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4062-7843&m=dev";

type SelectStoryProps = React.ComponentProps<typeof Select> & {
  focus?: boolean;
  hover?: boolean;
  active?: boolean;
};
const meta: Meta<SelectStoryProps> = {
  title: "Components/Select",
  component: Select,
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
Componente de seleção (Select) baseado no [Ant Design Select](https://ant.design/components/select).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Select.
- **Custom (Juscash)**:
  - \`dsSize\`: Define o tamanho específico seguindo o Design System (\`xs\`, \`s\`, \`m\`, \`l\`).

### Como usar:

\`\`\`tsx
import { Select } from "@juscash/design-system";

function Example() {
  return (
    <Select
      placeholder="Selecione uma opcao"
      options={[{ value: "a", label: "Opcao A" }]}
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
    hover: false,
    active: false,
    focus: false,
  },

  argTypes: {
    dsSize: {
      control: "select",
      options: ["xs", "s", "m", "l"],
      description: "Tamanho do Design System",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o componente",
    },
    status: {
      control: "select",
      options: ["", "error", "warning"],
      description: "Estado de validação",
    },
    active: {
      control: "boolean",
      description: "Força o estado active",
      table: { category: "Pseudo States" },
    },
    focus: {
      control: "boolean",
      description: "Força o estado de focus (Visual)",
      table: { category: "Pseudo States" },
    },
    hover: {
      control: "boolean",
      description: "Força o estado de hover (Visual)",
      table: { category: "Pseudo States" },
    },
  },
  decorators: [
    (Story) => (
      <Form layout="vertical">
        <div style={{ width: 300 }}>
          <Story />
        </div>
      </Form>
    ),
  ],
  render: (args) => {
    const { focus, hover, active, className, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return (
      <FormItem label="Label">
        <Select {...props} className={mergedClassName} />
      </FormItem>
    );
  },
};

export default meta;
type Story = StoryObj<SelectStoryProps>;

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
  { value: "disabled", label: "Disabled Option", disabled: true },
];

export const Default: Story = {
  args: {
    placeholder: "Select an option",
    options,
  },
  name: "Simple",
};

export const Searchable: Story = {
  args: {
    placeholder: "Search options...",
    showSearch: true,
    options,
  },
  name: "Simple with Search",
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled select",
    disabled: true,
    options,
  },
};

export const Error: Story = {
  args: {
    placeholder: "Select with error",
    status: "error",
    options,
  },
};

export const Focus: Story = {
  args: {
    placeholder: "Focused select",
    focus: true,
    options,
  },
};

export const ErrorFocus: Story = {
  args: {
    placeholder: "Error + Focus",
    status: "error",
    focus: true,
    options,
  },
};

export const Filled: Story = {
  args: {
    defaultValue: "option1",
    options,
  },
  name: "Filled (Value)",
};

export const WithHelperText: Story = {
  render: () => (
    <FormItem label="Label" extra="Helper text">
      <Select placeholder="Selecione um item" options={options} />
    </FormItem>
  ),
  decorators: [(Story) => <Story />],
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
      <FormItem label="Size XS">
        <Select dsSize="xs" placeholder="XS Size" options={options} />
      </FormItem>
      <FormItem label="Size S">
        <Select dsSize="s" placeholder="S Size" options={options} />
      </FormItem>
      <FormItem label="Size M (Default)">
        <Select dsSize="m" placeholder="M Size" options={options} />
      </FormItem>
      <FormItem label="Size L">
        <Select dsSize="l" placeholder="L Size" options={options} />
      </FormItem>
    </div>
  ),
  decorators: [(Story) => <Story />],
};

// Grid completo: todos estados × todos tamanhos (espelho do Figma)
const sizes: Array<{ label: string; dsSize: "m" | "l" | "s" | "xs" }> = [
  { label: "Regular (m)", dsSize: "m" },
  { label: "Large (l)", dsSize: "l" },
  { label: "Small (s)", dsSize: "s" },
  { label: "Mini (xs)", dsSize: "xs" },
];

export const FigmaGrid: Story = {
  name: "Figma — Grid (estados × tamanhos)",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "100px repeat(4, 220px)", gap: "8px 16px", alignItems: "center" }}>
        {/* Header */}
        <div />
        {sizes.map((s) => (
          <div key={s.dsSize} style={{ fontSize: 11, color: "#9747ff", textAlign: "center", fontFamily: "monospace" }}>{s.label}</div>
        ))}

        {/* Placeholder */}
        <div style={{ fontSize: 11, color: "#9747ff", fontFamily: "monospace", textAlign: "right" }}>Placeholder</div>
        {sizes.map((s) => (
          <FormItem key={s.dsSize} label="Label" style={{ marginBottom: 0 }}>
            <Select dsSize={s.dsSize} placeholder="Selecione um item" options={options} />
          </FormItem>
        ))}

        {/* Value */}
        <div style={{ fontSize: 11, color: "#9747ff", fontFamily: "monospace", textAlign: "right" }}>Value</div>
        {sizes.map((s) => (
          <FormItem key={s.dsSize} label="Label" style={{ marginBottom: 0 }}>
            <Select dsSize={s.dsSize} defaultValue="option1" options={options} />
          </FormItem>
        ))}

        {/* Focus */}
        <div style={{ fontSize: 11, color: "#9747ff", fontFamily: "monospace", textAlign: "right" }}>Focus</div>
        {sizes.map((s) => (
          <FormItem key={s.dsSize} label="Label" style={{ marginBottom: 0 }}>
            <Select dsSize={s.dsSize} placeholder="Selecione um item" className="pseudo-focus-visible" options={options} />
          </FormItem>
        ))}

        {/* Error */}
        <div style={{ fontSize: 11, color: "#9747ff", fontFamily: "monospace", textAlign: "right" }}>Error</div>
        {sizes.map((s) => (
          <FormItem key={s.dsSize} label="Label" style={{ marginBottom: 0 }}>
            <Select dsSize={s.dsSize} placeholder="Selecione um item" status="error" options={options} />
          </FormItem>
        ))}

        {/* Error Focus */}
        <div style={{ fontSize: 11, color: "#9747ff", fontFamily: "monospace", textAlign: "right" }}>Error Focus</div>
        {sizes.map((s) => (
          <FormItem key={s.dsSize} label="Label" style={{ marginBottom: 0 }}>
            <Select dsSize={s.dsSize} placeholder="Selecione um item" status="error" className="pseudo-focus-visible" options={options} />
          </FormItem>
        ))}

        {/* Disabled */}
        <div style={{ fontSize: 11, color: "#9747ff", fontFamily: "monospace", textAlign: "right" }}>Disabled</div>
        {sizes.map((s) => (
          <FormItem key={s.dsSize} label="Label" style={{ marginBottom: 0 }}>
            <Select dsSize={s.dsSize} placeholder="Selecione um item" disabled options={options} />
          </FormItem>
        ))}
    </div>
  ),
  decorators: [(Story) => <div style={{ padding: 32 }}><Story /></div>],
};

// Exemplos do Figma: dropdown aberto com search + group label, e select com helper text
const optionsWithGroups = [
  { label: "Group label", options: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ]},
];

export const FigmaExamples: Story = {
  name: "Figma — Exemplos",
  render: () => (
    <div style={{ display: "flex", gap: 48, alignItems: "flex-start", padding: 32 }}>
      {/* Exemplo 1: dropdown aberto com search + group label */}
      <div style={{ width: 240 }}>
        <FormItem label="Label" style={{ marginBottom: 0 }}>
          <Select
            placeholder="Selecione um item"
            showSearch
            open
            options={optionsWithGroups}
            getPopupContainer={(trigger) => trigger.parentElement!}
          />
        </FormItem>
      </div>

      {/* Exemplo 2: com valor selecionado + helper text */}
      <div style={{ width: 240 }}>
        <FormItem label="Label" extra="Helper text" style={{ marginBottom: 0 }}>
          <Select defaultValue="option1" options={options} />
        </FormItem>
      </div>
    </div>
  ),
  decorators: [(Story) => <Story />],
};
