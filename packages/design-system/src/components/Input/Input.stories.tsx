import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input, TextArea } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    dsSize: {
      control: "select",
      options: ["xs", "s", "m", "l"],
    },
    disabled: {
      control: "boolean",
    },
    status: {
      control: "select",
      options: ["", "error", "warning"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Digite algo...",
  },
};

export const SizeXS: Story = {
  args: {
    dsSize: "xs",
    placeholder: "Extra Small",
  },
};

export const SizeS: Story = {
  args: {
    dsSize: "s",
    placeholder: "Small",
  },
};

export const SizeM: Story = {
  args: {
    dsSize: "m",
    placeholder: "Medium",
  },
};

export const SizeL: Story = {
  args: {
    dsSize: "l",
    placeholder: "Large",
  },
};

export const WithError: Story = {
  args: {
    status: "error",
    placeholder: "Campo com erro",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const TextAreaStory: Story = {
  render: () => <TextArea placeholder="Digite uma mensagem..." rows={4} />,
  name: "TextArea",
};
