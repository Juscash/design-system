import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageHeader } from ".";

const meta: Meta<typeof PageHeader> = {
  title: "Components/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: "Page Title",
  },
};
