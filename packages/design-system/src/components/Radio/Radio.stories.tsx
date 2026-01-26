import type { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioGroup } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    children: "Radio option",
  },
};

export const RadioGroupStory: Story = {
  render: () => (
    <RadioGroup defaultValue="a">
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
    </RadioGroup>
  ),
  name: "Radio Group",
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled radio",
  },
};
