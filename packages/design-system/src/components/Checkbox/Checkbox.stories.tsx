import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Checkbox } from "./Checkbox";

type CheckboxStoryProps = React.ComponentProps<typeof Checkbox> & {
  hover?: boolean;
  focus?: boolean;
};

const meta: Meta<CheckboxStoryProps> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4052-2075&m=dev",
    },
    docs: {
      description: {
        component:
          "Componente de checkbox baseado no [Ant Design Checkbox](https://ant.design/components/checkbox). Extende todas as props padrão do Ant Design Checkbox e adiciona a prop `error` para indicar estado de erro.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    checked: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
    hover: {
      control: "boolean",
      description: "Estado hover",
      table: { category: "Pseudo States" },
    },
    focus: {
      control: "boolean",
      description: "Estado focus",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { hover, focus, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", focus && "pseudo-focus"]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={pseudoClasses}>
        <Checkbox {...props} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<CheckboxStoryProps>;

export const Default: Story = {
  args: {
    children: "Checkbox label",
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    children: "Checked",
  },
};

export const Error: Story = {
  args: {
    error: true,
    checked: true,
    children: "Error State",
  },
};

export const Group: StoryObj<typeof Checkbox.Group> = {
  render: (args) => (
    <Checkbox.Group {...args}>
      <Checkbox value="A">Option A</Checkbox>
      <Checkbox value="B">Option B</Checkbox>
      <Checkbox value="C">Option C</Checkbox>
    </Checkbox.Group>
  ),
  args: {
    defaultValue: ["A"],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    children: "Disabled Checked",
  },
};
