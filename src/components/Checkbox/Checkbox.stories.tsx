import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Checkbox } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4052-2075&m=dev";

type CheckboxStoryProps = React.ComponentProps<typeof Checkbox> & {
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<CheckboxStoryProps> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },

    docs: {
      codePanel: true,
      description: {
        component: `
Componente de checkbox baseado no [Ant Design Checkbox](https://ant.design/components/checkbox).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Checkbox.
- **Custom (Juscash)**:
  - \`error\`: Indica estado de erro.

### Como usar:

\`\`\`tsx
import { Checkbox } from "@juscash/design-system";

function Example() {
  return (
    <>
      <Checkbox>Concordo com os termos</Checkbox>
      <Checkbox rich label="Opção Premium" secondaryText="Inclui benefícios extras" />
    </>
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
  tags: ["autodocs"],
  args: {
    active: false,
    focus: false,
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    checked: {
      control: "boolean",
    },
    indeterminate: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
    truncate: {
      control: "boolean",
      description: "Aplica `...` no label quando o texto ultrapassa a largura disponível.",
    },
    width: {
      control: { type: "number" },
      description:
        "Largura máxima do wrapper. Number = pixels, string = qualquer valor CSS. Default `240` quando `truncate=true`.",
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
    const { focus, ...props } = args;
    const pseudoClasses = [focus && "pseudo-focus-visible"].filter(Boolean).join(" ");

    return <Checkbox {...props} className={pseudoClasses} />;
  },
};

export default meta;
type Story = StoryObj<CheckboxStoryProps>;

// ============================================
// CHECKBOX BÁSICO - Estados do Figma
// ============================================

export const Default: Story = {
  args: {
    children: "Checkbox label",
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    children: "Checked",
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    children: "Indeterminate State",
  },
  parameters: {
    docs: {
      description: {
        story: "Estado indeterminate usado quando um grupo de checkboxes tem seleção parcial.",
      },
    },
  },
};

export const Focused: Story = {
  args: {
    children: "Focused",
    focus: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Estado de foco com shadow conforme design do Figma.",
      },
    },
  },
};

export const Error: Story = {
  args: {
    error: true,
    checked: true,
    children: "Error State",
  },
};

export const ErrorFocused: Story = {
  args: {
    error: true,
    checked: true,
    focus: true,
    children: "Error + Focus",
  },
  parameters: {
    docs: {
      description: {
        story: "Combinação de estado de erro com foco, mostrando shadow vermelha.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const Truncate: StoryObj<CheckboxStoryProps> = {
  args: {
    truncate: true,
    children: "Texto de label bem mais longo que o limite imposto pelo width para forçar o ellipsis",
  },
  parameters: {
    docs: {
      description: {
        story: "`truncate=true` sem `width` explícito usa o default `240` (240px). Aplica `...` quando o texto excede a largura.",
      },
    },
  },
};

export const TruncateOff: StoryObj<CheckboxStoryProps> = {
  args: {
    children: "Texto de label bem mais longo do que o normal — sem truncate o texto quebra em múltiplas linhas",
    width: 220,
  },
  parameters: {
    docs: {
      description: {
        story: "Com `width=220` mas sem `truncate`: o texto quebra em múltiplas linhas em vez de truncar.",
      },
    },
  },
};

export const TruncateWidthCustom: StoryObj<CheckboxStoryProps> = {
  args: {
    truncate: true,
    width: 160,
    children: "Texto de label mais longo que 160px",
  },
  parameters: {
    docs: {
      description: {
        story: "`width` (number) sobrescreve o default 240. Aqui aplicamos `width=160` (160px).",
      },
    },
  },
};

export const TruncateWidthPercentage: StoryObj<CheckboxStoryProps> = {
  args: {
    truncate: true,
    width: "50%",
    children: "Texto de label que excede 50% do container pai",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480, border: "1px dashed #d4d4d4", padding: 8 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '`width` aceita string CSS — aqui `"50%"` em um container de 480px ⇒ checkbox ocupa no máximo 240px.',
      },
    },
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    children: "Disabled Checked",
  },
};

export const DisabledIndeterminate: Story = {
  args: {
    disabled: true,
    indeterminate: true,
    children: "Disabled Indeterminate",
  },
  parameters: {
    docs: {
      description: {
        story: "Estado disabled + indeterminate com fundo cinza e ícone branco.",
      },
    },
  },
};

// ============================================
// CHECKBOX GROUP - Layouts do Figma
// ============================================

export const Group: StoryObj<typeof Checkbox.Group> = {
  render: (args) => (
    <Checkbox.Group {...args}>
      <Checkbox value="A">Option A</Checkbox>
      <Checkbox value="B">Option B</Checkbox>
      <Checkbox value="C">Option C</Checkbox>
    </Checkbox.Group>
  ),
  args: {
    defaultValue: ["A"],
  },
};

export const GroupInline: StoryObj<typeof Checkbox.Group> = {
  render: () => (
    <Checkbox.Group style={{ display: "flex", gap: "8px" }}>
      <Checkbox value="A">Label</Checkbox>
      <Checkbox value="B">Label</Checkbox>
      <Checkbox value="C">Label</Checkbox>
      <Checkbox value="D">Label</Checkbox>
    </Checkbox.Group>
  ),
  parameters: {
    docs: {
      description: {
        story: "Layout inline conforme especificação do Figma - checkboxes lado a lado.",
      },
    },
  },
};

export const GroupList: StoryObj<typeof Checkbox.Group> = {
  render: () => (
    <Checkbox.Group style={{ display: "flex", flexDirection: "column", gap: "8px", width: "240px" }}>
      <Checkbox value="A">Label</Checkbox>
      <Checkbox value="B">Label</Checkbox>
      <Checkbox value="C">Label</Checkbox>
      <Checkbox value="D">Label</Checkbox>
    </Checkbox.Group>
  ),
  parameters: {
    docs: {
      description: {
        story: "Layout em lista conforme especificação do Figma - checkboxes empilhados verticalmente.",
      },
    },
  },
};

// ============================================
// RICH — variação via prop `rich`
// ============================================

export const RichUnchecked: Story = {
  args: { rich: true, label: "Opção Premium", secondaryText: "Inclui todos os benefícios" },
  parameters: {
    docs: { description: { story: "`rich=true` envelopa o checkbox em card 240×44 com `label` + `secondaryText`. Estado: unchecked." } },
  },
};

export const RichChecked: Story = {
  args: { rich: true, label: "Opção Premium", secondaryText: "Inclui todos os benefícios", checked: true },
  parameters: {
    docs: { description: { story: "Mesma variação rich, com `checked=true`. BG muda para `neutral.100`." } },
  },
};

export const RichGroup: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 240 }}>
      <Checkbox rich label="Opção Premium" secondaryText="Inclui todos os benefícios" />
      <Checkbox rich label="Opção Básica" secondaryText="Recursos essenciais" defaultChecked />
      <Checkbox rich label="Opção Avançada" secondaryText="Para usuários experientes" />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Múltiplos checkboxes rich empilhados — uso típico em listas de opções." } },
  },
};
