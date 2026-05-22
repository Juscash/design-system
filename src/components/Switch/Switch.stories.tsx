import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Switch } from ".";
import { RichSwitch } from "../RichSwitch";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4062-5352&m=dev";

type SwitchStoryProps = React.ComponentProps<typeof Switch> & {
  focus?: boolean;
};

const meta: Meta<SwitchStoryProps> = {
  title: "Components/Switch",
  component: Switch,
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
Componente de alternância (Switch) baseado no [Ant Design Switch](https://ant.design/components/switch).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Switch.
- **Custom (Juscash)**:
  - \`error\`: Define o estado de erro visual (vermelho) quando verdadeiro.

### Como usar:

\`\`\`tsx
import { Switch } from "@juscash/design-system";

function Example() {
  return <Switch defaultChecked />;
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
    focus: false,
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Desabilita a interação",
    },
    defaultChecked: {
      control: "boolean",
      description: "Estado inicial checado",
    },
    error: {
      control: "boolean",
      description: "Estado de erro",
    },
    loading: {
      control: "boolean",
      description: "Estado de carregamento",
    },

    focus: {
      control: "boolean",
      description: "Força o estado focus",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { focus, ...props } = args;
    const pseudoClasses = [focus && "pseudo-focus-visible"].filter(Boolean).join(" ");

    return <Switch {...props} className={pseudoClasses} />;
  },
};

export default meta;
type Story = StoryObj<SwitchStoryProps>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const ErrorChecked: Story = {
  args: {
    error: true,
    defaultChecked: true,
  },
};

// ============================================
// SWITCH GROUP - Layouts conforme Checkbox/Radio
// ============================================

export const GroupInline: Story = {
  render: () => {
    const [values, setValues] = React.useState({ a: false, b: true, c: false });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 13, fontWeight: 500 }}>Switch Group Inline</label>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Switch checked={values.a} onChange={(checked) => setValues({ ...values, a: checked })} />
            <span style={{ fontSize: 13 }}>Option A</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Switch checked={values.b} onChange={(checked) => setValues({ ...values, b: checked })} />
            <span style={{ fontSize: 13 }}>Option B</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Switch checked={values.c} onChange={(checked) => setValues({ ...values, c: checked })} />
            <span style={{ fontSize: 13 }}>Option C</span>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Switch Group com layout inline (horizontal).",
      },
    },
  },
};

export const GroupList: Story = {
  render: () => {
    const [values, setValues] = React.useState({ a: false, b: true, c: false });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 13, fontWeight: 500 }}>Switch Group List</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 240 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 8 }}>
            <Switch checked={values.a} onChange={(checked) => setValues({ ...values, a: checked })} />
            <span style={{ fontSize: 13 }}>Option A</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 8 }}>
            <Switch checked={values.b} onChange={(checked) => setValues({ ...values, b: checked })} />
            <span style={{ fontSize: 13 }}>Option B</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 8 }}>
            <Switch checked={values.c} onChange={(checked) => setValues({ ...values, c: checked })} />
            <span style={{ fontSize: 13 }}>Option C</span>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Switch Group com layout em lista (vertical) e largura fixa de 240px.",
      },
    },
  },
};

// ============================================
// RICH SWITCH - Variação com label e secondary text
// ============================================

export const RichSwitchUnchecked: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, fontWeight: 500 }}>Rich Switch - Unchecked</label>
      <RichSwitch label="Notificações" secondaryText="Receber alertas por email" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Rich Switch não marcado com label e secondary text.",
      },
    },
  },
};

export const RichSwitchChecked: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, fontWeight: 500 }}>Rich Switch - Checked</label>
      <RichSwitch label="Notificações" secondaryText="Receber alertas por email" defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Rich Switch marcado com label e secondary text.",
      },
    },
  },
};

export const RichSwitchGroup: Story = {
  render: () => {
    const [values, setValues] = React.useState({
      notifications: true,
      marketing: false,
      updates: true,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 13, fontWeight: 500 }}>Rich Switch Group</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <RichSwitch
            label="Notificações"
            secondaryText="Receber alertas por email"
            checked={values.notifications}
            onChange={(checked) => setValues({ ...values, notifications: checked })}
          />
          <RichSwitch
            label="Marketing"
            secondaryText="Novidades e promoções"
            checked={values.marketing}
            onChange={(checked) => setValues({ ...values, marketing: checked })}
          />
          <RichSwitch
            label="Atualizações"
            secondaryText="Mudanças no sistema"
            checked={values.updates}
            onChange={(checked) => setValues({ ...values, updates: checked })}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Grupo de Rich Switch com gerenciamento de estado. Similar ao RichCheckbox e RichRadio.",
      },
    },
  },
};
