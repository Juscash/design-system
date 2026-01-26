import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: "Card content",
    style: { width: 300 },
  },
};

export const WithTitle: Story = {
  args: {
    title: "Card Title",
    children: "Card content with a title",
    style: { width: 300 },
  },
};
