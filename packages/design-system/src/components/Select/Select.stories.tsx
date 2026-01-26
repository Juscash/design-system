import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    dsSize: {
      control: "select",
      options: ["xs", "s", "m", "l"],
    },
    disabled: {
      control: "boolean",
    },
    showSearch: {
      control: "boolean",
    },
    mode: {
      control: "select",
      options: ["", "multiple", "tags"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: "option1", label: "Opção 1" },
  { value: "option2", label: "Opção 2" },
  { value: "option3", label: "Opção 3" },
];

export const Default: Story = {
  args: {
    placeholder: "Selecione...",
    options,
    style: { width: 200 },
  },
};

export const WithSearch: Story = {
  args: {
    placeholder: "Buscar...",
    showSearch: true,
    options,
    style: { width: 200 },
  },
};

export const Multiple: Story = {
  args: {
    placeholder: "Selecione múltiplos...",
    mode: "multiple",
    options,
    style: { width: 300 },
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Select
        dsSize="xs"
        placeholder="Extra Small"
        options={options}
        style={{ width: 200 }}
      />
      <Select
        dsSize="s"
        placeholder="Small"
        options={options}
        style={{ width: 200 }}
      />
      <Select
        dsSize="m"
        placeholder="Medium"
        options={options}
        style={{ width: 200 }}
      />
      <Select
        dsSize="l"
        placeholder="Large"
        options={options}
        style={{ width: 200 }}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
    options,
    style: { width: 200 },
  },
};
