import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Typography,
  Heading1,
  Heading2,
  Heading3,
  Body1,
  Body2,
  Caption,
} from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "heading1",
        "heading2",
        "heading3",
        "heading4",
        "heading5",
        "heading6",
        "body1",
        "body2",
        "caption",
      ],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "neutral",
        "dark",
        "error",
        "warning",
        "success",
        "disabled",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    variant: "body1",
    children: "Typography default text",
  },
};

export const HeadingVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Heading1>Heading 1</Heading1>
      <Heading2>Heading 2</Heading2>
      <Heading3>Heading 3</Heading3>
    </div>
  ),
};

export const BodyVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Body1>Body 1 - Texto principal</Body1>
      <Body2>Body 2 - Texto secundário</Body2>
      <Caption>Caption - Legenda</Caption>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography color="primary">Primary Color</Typography>
      <Typography color="secondary">Secondary Color</Typography>
      <Typography color="error">Error Color</Typography>
      <Typography color="success">Success Color</Typography>
      <Typography color="warning">Warning Color</Typography>
    </div>
  ),
};
