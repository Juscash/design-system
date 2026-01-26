import type { Meta, StoryObj } from "@storybook/react";
import { Upload } from "./Upload";

const meta: Meta<typeof Upload> = {
  title: "Components/Upload",
  component: Upload,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Upload>;

export const Default: Story = {
  args: {
    children: "Click to upload",
  },
};
