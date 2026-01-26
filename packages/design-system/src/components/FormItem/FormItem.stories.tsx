import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormItem } from "./FormItem";
import { Input } from "../Input";

const meta: Meta<typeof FormItem> = {
  title: "Components/FormItem",
  component: FormItem,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormItem>;

export const Default: Story = {
  args: {
    label: "Field Label",
    children: <Input placeholder="Enter value" />,
  },
};

export const Required: Story = {
  args: {
    label: "Required Field",
    required: true,
    children: <Input placeholder="This field is required" />,
  },
};
