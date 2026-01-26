import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "destructive",
        "ghost",
        "neutral",
        "outlined",
      ],
    },
    dsSize: {
      control: "select",
      options: ["xs", "s", "m"],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    type: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    type: "secondary",
    children: "Secondary Button",
  },
};

export const Destructive: Story = {
  args: {
    type: "destructive",
    children: "Destructive Button",
  },
};

export const Ghost: Story = {
  args: {
    type: "ghost",
    children: "Ghost Button",
  },
};

export const Neutral: Story = {
  args: {
    type: "neutral",
    children: "Neutral Button",
  },
};

export const Outlined: Story = {
  args: {
    type: "outlined",
    children: "Outlined Button",
  },
};

export const SizeXS: Story = {
  args: {
    type: "primary",
    dsSize: "xs",
    children: "Extra Small",
  },
};

export const SizeS: Story = {
  args: {
    type: "primary",
    dsSize: "s",
    children: "Small",
  },
};

export const SizeM: Story = {
  args: {
    type: "primary",
    dsSize: "m",
    children: "Medium",
  },
};

export const Disabled: Story = {
  args: {
    type: "primary",
    disabled: true,
    children: "Disabled Button",
  },
};

export const Loading: Story = {
  args: {
    type: "primary",
    loading: true,
    children: "Loading Button",
  },
};
