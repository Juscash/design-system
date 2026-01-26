import type { Meta, StoryObj } from "@storybook/react-vite";
import { Segmented } from "./Segmented";

const meta: Meta<typeof Segmented> = {
  title: "Components/Segmented",
  component: Segmented,
  tags: ["autodocs"],
  argTypes: {
    dsSize: {
      control: "select",
      options: ["xs", "s", "m"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Segmented>;

const options = ["Daily", "Weekly", "Monthly"];

export const Default: Story = {
  args: {
    options,
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Segmented dsSize="xs" options={options} />
      <Segmented dsSize="s" options={options} />
      <Segmented dsSize="m" options={options} />
    </div>
  ),
};
