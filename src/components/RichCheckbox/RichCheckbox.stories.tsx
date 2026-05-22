import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { RichCheckbox } from ".";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4052-2075&m=dev";

const meta: Meta<typeof RichCheckbox> = {
  title: "Components/RichCheckbox",
  component: RichCheckbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      description: {
        component:
          "Versão rica do `Checkbox` com `label` e `secondaryText` em um wrapper clicável. O wrapper inteiro alterna o estado, e o estado `checked` muda o fundo.",
      },
    },
  },
  argTypes: {
    label: { control: "text", description: "Texto principal" },
    secondaryText: { control: "text", description: "Texto auxiliar opcional" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
  args: {
    label: "Opção Premium",
    secondaryText: "Inclui benefícios extras",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof RichCheckbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const WithoutSecondaryText: Story = {
  args: { secondaryText: undefined },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Group: Story = {
  render: () => {
    const [values, setValues] = React.useState({ a: false, b: true, c: false });
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}>
        <RichCheckbox
          label="Notificações"
          secondaryText="Receber alertas por email"
          checked={values.a}
          onChange={(event) => setValues((prev) => ({ ...prev, a: event.target.checked }))}
        />
        <RichCheckbox
          label="Marketing"
          secondaryText="Novidades e promoções"
          checked={values.b}
          onChange={(event) => setValues((prev) => ({ ...prev, b: event.target.checked }))}
        />
        <RichCheckbox
          label="Atualizações"
          secondaryText="Mudanças no sistema"
          checked={values.c}
          onChange={(event) => setValues((prev) => ({ ...prev, c: event.target.checked }))}
        />
      </div>
    );
  },
};

export const Playground: Story = {};
