import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { RichRadio } from ".";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4052-2076&m=dev";

const meta: Meta<typeof RichRadio> = {
  title: "Components/RichRadio",
  component: RichRadio,
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
          "Versão rica do `Radio` com `label` e `secondaryText` em um wrapper clicável. O wrapper inteiro alterna o estado.",
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
    label: "Plano Premium",
    secondaryText: "R$ 99/mês com todos os recursos",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof RichRadio>;

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
    const [value, setValue] = React.useState("basic");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}>
        <RichRadio
          label="Plano Básico"
          secondaryText="R$ 29/mês"
          checked={value === "basic"}
          onChange={() => setValue("basic")}
        />
        <RichRadio
          label="Plano Premium"
          secondaryText="R$ 99/mês"
          checked={value === "premium"}
          onChange={() => setValue("premium")}
        />
        <RichRadio
          label="Plano Empresarial"
          secondaryText="Sob consulta"
          checked={value === "enterprise"}
          onChange={() => setValue("enterprise")}
        />
      </div>
    );
  },
};

export const Playground: Story = {};
