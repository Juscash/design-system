import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Radio, RadioGroup } from ".";
import { RichRadio } from "../RichRadio";

import { designSystemColors } from "../../theme";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4062-4957&m=dev";

type RadioStoryProps = React.ComponentProps<typeof Radio> & {
  focus?: boolean;

  active?: boolean;
};

const meta: Meta<RadioStoryProps> = {
  title: "Components/Radio",
  component: Radio,
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
Componente de seleção única baseado no [Ant Design Radio](https://ant.design/components/radio).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Radio.
- **Custom (Juscash)**:
  - \`error\`: Define o estado de erro visual (vermelho: borda e dot) quando verdadeiro.

### Como usar:

\`\`\`tsx
import { Radio } from "@juscash/design-system";

function Example() {
  return <Radio>Opcao</Radio>;
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
    children: "Radio option",

    active: false,
    focus: false,
  },
  argTypes: {
    error: {
      control: "boolean",
      description: "Define o estado de erro (borda vermelha e cor de destaque)",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita a interação com o componente",
    },
    truncate: {
      control: "boolean",
      description: "Aplica `...` no label quando o texto ultrapassa a largura disponível.",
    },
    width: {
      control: { type: "number" },
      description:
        "Largura máxima do wrapper. Number = pixels; string = qualquer valor CSS. Default `240` quando `truncate=true`.",
    },
    focus: {
      control: "boolean",
      description: "Força o estado focus (visual)",
      table: { category: "Pseudo States" },
    },

    active: {
      control: "boolean",
      description: "Força o estado active (visual)",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { focus, active, style, ...props } = args;
    const pseudoClasses = [active && "pseudo-active", focus && "pseudo-focus-visible pseudo-focus-visible-all"]
      .filter(Boolean)
      .join(" ");

    return <Radio {...props} style={style} className={pseudoClasses} />;
  },
};

export default meta;
type Story = StoryObj<RadioStoryProps>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
    checked: false,
  },
};

export const ErrorChecked: Story = {
  args: {
    error: true,
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const Focus: Story = {
  args: {
    focus: true,
    checked: false,
  },
};

export const ErrorFocus: Story = {
  args: {
    focus: true,
    error: true,
    checked: false,
  },
};

export const Truncate: Story = {
  args: {
    truncate: true,
    children: "Texto de label bem mais longo que o limite imposto pelo width para forçar o ellipsis",
  },
  parameters: {
    docs: {
      description: {
        story: "`truncate=true` sem `width` explícito usa o default `240` (240px).",
      },
    },
  },
};

export const TruncateWidthCustom: Story = {
  args: {
    truncate: true,
    width: 160,
    children: "Texto de label mais longo que 160px",
  },
  parameters: {
    docs: {
      description: {
        story: "`width=160` sobrescreve o default 240.",
      },
    },
  },
};

export const Group: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, color: designSystemColors.neutral[900] }}>Radio Group</label>
      <RadioGroup defaultValue="a" {...args}>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </RadioGroup>
    </div>
  ),
  args: {
    children: undefined,
  },
};

// ============================================
// RADIO GROUP - Layouts do Figma
// ============================================

export const GroupInline: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, color: designSystemColors.neutral[900] }}>Radio Group Inline</label>
      <RadioGroup defaultValue="a" style={{ display: "flex", gap: 8 }}>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Radio Group com layout inline (horizontal).",
      },
    },
  },
};

export const GroupList: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, color: designSystemColors.neutral[900] }}>Radio Group List</label>
      <RadioGroup defaultValue="a" style={{ display: "flex", flexDirection: "column", gap: 8, width: 240 }}>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Radio Group com layout em lista (vertical) e largura fixa de 240px.",
      },
    },
  },
};

// ============================================
// RICH RADIO - Variação com label e secondary text
// ============================================

export const RichRadioUnchecked: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, color: designSystemColors.neutral[900] }}>Rich Radio - Unchecked</label>
      <RichRadio label="Opção Premium" secondaryText="Inclui todos os benefícios" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Rich Radio não marcado com label e secondary text.",
      },
    },
  },
};

export const RichRadioChecked: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, color: designSystemColors.neutral[900] }}>Rich Radio - Checked</label>
      <RichRadio label="Opção Premium" secondaryText="Inclui todos os benefícios" checked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Rich Radio marcado com label e secondary text.",
      },
    },
  },
};

export const RichRadioGroup: Story = {
  render: () => {
    const [value, setValue] = React.useState("option1");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 13, color: designSystemColors.neutral[900] }}>Rich Radio Group</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <RichRadio
            value="option1"
            label="Opção Premium"
            secondaryText="Inclui todos os benefícios"
            checked={value === "option1"}
            onChange={() => setValue("option1")}
          />
          <RichRadio
            value="option2"
            label="Opção Básica"
            secondaryText="Funcionalidades essenciais"
            checked={value === "option2"}
            onChange={() => setValue("option2")}
          />
          <RichRadio
            value="option3"
            label="Opção Desabilitada"
            secondaryText="Não disponível no momento"
            checked={value === "option3"}
            disabled
            onChange={() => setValue("option3")}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Grupo de Rich Radio com gerenciamento de estado. Similar ao RichCheckbox.",
      },
    },
  },
};
