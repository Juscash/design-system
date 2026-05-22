import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { RichRadioGroup } from ".";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4052-2077&m=dev";

const defaultOptions = [
  { value: "basic", label: "Plano Básico", secondaryText: "R$ 29/mês" },
  { value: "premium", label: "Plano Premium", secondaryText: "R$ 99/mês" },
  { value: "enterprise", label: "Plano Empresarial", secondaryText: "Sob consulta" },
];

const meta: Meta<typeof RichRadioGroup> = {
  title: "Components/RichRadioGroup",
  component: RichRadioGroup,
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
          "Grupo de radios `rich` controlado por uma única `value`. Cada opção pode ter `label`, `secondaryText` e `disabled` próprios.",
      },
    },
  },
  argTypes: {
    options: { control: "object" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
  args: {
    options: defaultOptions,
    disabled: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof RichRadioGroup>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("basic");
    return <RichRadioGroup {...args} value={value} onChange={setValue} />;
  },
};

export const WithErrorState: Story = {
  args: { error: true },
  render: (args) => {
    const [value, setValue] = React.useState("basic");
    return <RichRadioGroup {...args} value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => {
    const [value, setValue] = React.useState("basic");
    return <RichRadioGroup {...args} value={value} onChange={setValue} />;
  },
};

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("premium");
    return <RichRadioGroup {...args} value={value} onChange={setValue} />;
  },
};
