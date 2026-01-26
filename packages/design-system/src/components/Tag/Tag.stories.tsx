import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    error: {
      control: "boolean",
    },
    success: {
      control: "boolean",
    },
    warning: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: "Tag",
  },
};

export const StatusVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Tag success>Success</Tag>
      <Tag warning>Warning</Tag>
      <Tag error>Error</Tag>
      <Tag>Default</Tag>
    </div>
  ),
};

export const WithSuccess: Story = {
  args: {
    success: true,
    children: "Success",
  },
};

export const WithWarning: Story = {
  args: {
    warning: true,
    children: "Warning",
  },
};

export const WithError: Story = {
  args: {
    error: true,
    children: "Error",
  },
};
