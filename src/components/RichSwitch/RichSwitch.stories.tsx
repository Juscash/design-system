import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { RichSwitch } from ".";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4062-5352&m=dev";

const meta: Meta<typeof RichSwitch> = {
  title: "Components/RichSwitch",
  component: RichSwitch,
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
          "Versão rica do `Switch` com `label` e `secondaryText` em um wrapper clicável. O wrapper inteiro alterna o estado.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    secondaryText: { control: "text" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
  args: {
    label: "Notificações",
    secondaryText: "Receber alertas por email",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof RichSwitch>;

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
    const [values, setValues] = React.useState({
      notifications: true,
      marketing: false,
      updates: true,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}>
        <RichSwitch
          label="Notificações"
          secondaryText="Receber alertas por email"
          checked={values.notifications}
          onChange={(checked) => setValues((prev) => ({ ...prev, notifications: checked }))}
        />
        <RichSwitch
          label="Marketing"
          secondaryText="Novidades e promoções"
          checked={values.marketing}
          onChange={(checked) => setValues((prev) => ({ ...prev, marketing: checked }))}
        />
        <RichSwitch
          label="Atualizações"
          secondaryText="Mudanças no sistema"
          checked={values.updates}
          onChange={(checked) => setValues((prev) => ({ ...prev, updates: checked }))}
        />
      </div>
    );
  },
};

export const Playground: Story = {};
