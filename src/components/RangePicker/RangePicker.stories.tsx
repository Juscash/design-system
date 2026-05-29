import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { RangePicker } from ".";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-9747&m=dev";

const meta: Meta<typeof RangePicker> = {
  title: "Components/RangePicker",
  component: RangePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      description: {
        component:
          "Seletor de intervalo de datas baseado no `DatePicker.RangePicker` do Ant Design. Reusa os tokens visuais do `DatePicker` do design system.",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
    allowClear: { control: "boolean" },
    placeholder: { control: "object" },
  },
  args: {
    disabled: false,
    allowClear: false,
    placeholder: ["Data inicial", "Data final"],
  },
};

export default meta;
type Story = StoryObj<typeof RangePicker>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllowClear: Story = {
  args: { allowClear: true },
};

export const CustomPlaceholder: Story = {
  args: { placeholder: ["De", "Até"] },
};

export const Playground: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <RangePicker {...args} />
    </div>
  ),
};
