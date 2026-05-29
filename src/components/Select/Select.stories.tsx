import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Heart } from "lucide-react";
import { Select } from ".";
import { Form } from "antd";
import { designSystemColors } from "../../theme";

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
      options: ["", "error"],
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
    (Story, context) => {
      const isFigmaComparison = context.id === "components-select--figma-grid" || context.id === "components-select--figma-examples";

      return (
        <Form layout="vertical">
          <div style={{ width: isFigmaComparison ? "fit-content" : 300 }}>
            <Story />
          </div>
        </Form>
      );
    },
  ],
  render: (args) => {
    const { focus, hover, active, className, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return (
      <Form.Item label="Label">
        <Select {...props} className={mergedClassName} />
      </Form.Item>
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
    <Form.Item label="Label" extra="Helper text">
      <Select placeholder="Selecione um item" options={options} />
    </Form.Item>
  ),
  decorators: [(Story) => <Story />],
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
      <Form.Item label="Size XS">
        <Select dsSize="xs" placeholder="XS Size" options={options} />
      </Form.Item>
      <Form.Item label="Size S">
        <Select dsSize="s" placeholder="S Size" options={options} />
      </Form.Item>
      <Form.Item label="Size M (Default)">
        <Select dsSize="m" placeholder="M Size" options={options} />
      </Form.Item>
      <Form.Item label="Size L">
        <Select dsSize="l" placeholder="L Size" options={options} />
      </Form.Item>
    </div>
  ),
  decorators: [(Story) => <Story />],
};

// Grid completo: todos estados × todos tamanhos (espelho do Figma)
const sizes: Array<{ label: string; dsSize: "m" | "l" | "s" | "xs" }> = [
  { label: "Regular", dsSize: "m" },
  { label: "Large", dsSize: "l" },
  { label: "Small", dsSize: "s" },
  { label: "Mini", dsSize: "xs" },
];

export const FigmaGrid: Story = {
  name: "Figma — Grid (estados × tamanhos)",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "78px repeat(4, 320px)",
        columnGap: 48,
        rowGap: 24,
        alignItems: "start",
        width: "fit-content",
      }}
    >
        {/* Header */}
        <div />
        {sizes.map((s) => (
          <div key={s.dsSize} style={{ fontSize: 11, color: "#9747ff", textAlign: "center", fontFamily: "monospace" }}>{s.label}</div>
        ))}

        {/* Placeholder */}
        <div style={{ fontSize: 11, color: "#9747ff", fontFamily: "monospace", textAlign: "right" }}>Placeholder</div>
        {sizes.map((s) => (
          <Form.Item key={s.dsSize} label="Label" style={{ marginBottom: 0, width: "100%" }}>
            <Select dsSize={s.dsSize} placeholder="Selecione um item" options={options} style={{ width: "100%" }} />
          </Form.Item>
        ))}

        {/* Value */}
        <div style={{ fontSize: 11, color: "#9747ff", fontFamily: "monospace", textAlign: "right" }}>Value</div>
        {sizes.map((s) => (
          <Form.Item key={s.dsSize} label="Label" style={{ marginBottom: 0, width: "100%" }}>
            <Select dsSize={s.dsSize} defaultValue="option1" options={options} style={{ width: "100%" }} />
          </Form.Item>
        ))}

        {/* Focus */}
        <div style={{ fontSize: 11, color: "#9747ff", fontFamily: "monospace", textAlign: "right" }}>Focus</div>
        {sizes.map((s) => (
          <Form.Item key={s.dsSize} label="Label" style={{ marginBottom: 0, width: "100%" }}>
            <Select dsSize={s.dsSize} placeholder="Selecione um item" className="pseudo-focus-visible" options={options} style={{ width: "100%" }} />
          </Form.Item>
        ))}

        {/* Error */}
        <div style={{ fontSize: 11, color: "#9747ff", fontFamily: "monospace", textAlign: "right" }}>Error</div>
        {sizes.map((s) => (
          <Form.Item key={s.dsSize} label="Label" style={{ marginBottom: 0, width: "100%" }}>
            <Select dsSize={s.dsSize} placeholder="Selecione um item" status="error" options={options} style={{ width: "100%" }} />
          </Form.Item>
        ))}

        {/* Error Focus */}
        <div style={{ fontSize: 11, color: "#9747ff", fontFamily: "monospace", textAlign: "right" }}>Error focus</div>
        {sizes.map((s) => (
          <Form.Item key={s.dsSize} label="Label" style={{ marginBottom: 0, width: "100%" }}>
            <Select dsSize={s.dsSize} placeholder="Selecione um item" status="error" className="pseudo-focus-visible" options={options} style={{ width: "100%" }} />
          </Form.Item>
        ))}

        {/* Disabled */}
        <div style={{ fontSize: 11, color: "#9747ff", fontFamily: "monospace", textAlign: "right" }}>Disabled</div>
        {sizes.map((s) => (
          <Form.Item key={s.dsSize} label="Label" style={{ marginBottom: 0, width: "100%" }}>
            <Select dsSize={s.dsSize} placeholder="Selecione um item" disabled options={options} style={{ width: "100%" }} />
          </Form.Item>
        ))}
    </div>
  ),
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
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
    <div style={{ display: "flex", gap: 48, alignItems: "flex-start", padding: 32, width: "fit-content" }}>
      {/* Exemplo 1: dropdown aberto com search + group label */}
      <div style={{ width: 240, flex: "0 0 240px" }}>
        <Form.Item label="Label" style={{ marginBottom: 0, width: "100%" }}>
          <Select
            placeholder="Selecione um item"
            showSearch
            open
            options={optionsWithGroups}
            getPopupContainer={(trigger) => trigger.parentElement!}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </div>

      {/* Exemplo 2: com valor selecionado + helper text */}
      <div style={{ width: 240, flex: "0 0 240px" }}>
        <Form.Item
          label="Label"
          extra={<span style={{ fontSize: 13, lineHeight: 1.2, color: designSystemColors.neutral[500] }}>Helper text</span>}
          style={{ marginBottom: 0, width: "100%" }}
        >
          <Select
            defaultValue="option1"
            options={options}
            prefix={<Heart size={16} color={designSystemColors.neutral[800]} />}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </div>
    </div>
  ),
  decorators: [(Story) => <Story />],
};
