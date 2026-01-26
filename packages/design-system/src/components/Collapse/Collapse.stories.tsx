import type { Meta, StoryObj } from "@storybook/react";
import { Collapse } from "./Collapse";

const meta: Meta<typeof Collapse> = {
  title: "Components/Collapse",
  component: Collapse,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Collapse>;

const items = [
  { key: "1", label: "Panel 1", children: "Content of panel 1" },
  { key: "2", label: "Panel 2", children: "Content of panel 2" },
  { key: "3", label: "Panel 3", children: "Content of panel 3" },
];

export const Default: Story = {
  args: {
    items,
  },
};

export const Accordion: Story = {
  args: {
    items,
    accordion: true,
  },
};
