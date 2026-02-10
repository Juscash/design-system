import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Breadcrumb } from "./Breadcrumb";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-20126&m=dev";

type BreadcrumbStoryProps = React.ComponentProps<typeof Breadcrumb> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<BreadcrumbStoryProps> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente de Breadcrumb (migalhas de pão) para navegação hierárquica.
Baseado no [Ant Design Breadcrumb](https://ant.design/components/breadcrumb).

### Props:
- **Extended (Ant Design)**: Props padrão do AntD Breadcrumb.

### Como usar:

\`\`\`tsx
import { Breadcrumb } from "@juscash/design-system";

function Example() {
  return (
    <Breadcrumb
      items={[
        { title: "Home", href: "#" },
        { title: "Components", href: "#" },
        { title: "Breadcrumb" },
      ]}
    />
  );
}
\`\`\`
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />

          <Primary />

          <Controls />

          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <h3
              style={{
                marginBottom: "1rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              🎨 Figma Spec
            </h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>

          <Stories />
        </>
      ),
    },
  },
  args: {
    items: [{ title: "Home" }, { title: "Components" }, { title: "Breadcrumb" }],
    hover: false,
    active: false,
    focus: false,
  },
  argTypes: {
    hover: {
      control: "boolean",
      description: "Força o estado hover",
      table: { category: "Pseudo States" },
    },
    active: {
      control: "boolean",
      description: "Força o estado active",
      table: { category: "Pseudo States" },
    },
    focus: {
      control: "boolean",
      description: "Força o estado focus",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { hover, active, focus, className, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return <Breadcrumb {...props} className={mergedClassName} />;
  },
};

export default meta;
type Story = StoryObj<BreadcrumbStoryProps>;

export const Default: Story = {
  args: {
    items: [{ title: "Home", href: "#" }, { title: "Components", href: "#" }, { title: "Breadcrumb" }],
  },
};

export const WithEllipsis: Story = {
  args: {
    items: [
      { title: "Home", href: "#" },
      { title: "...", href: "#" }, // Antd treats this as a link if it has href, or just text? Usually we use proper items structure
      { title: "Components", href: "#" },
      { title: "Breadcrumb" },
    ],
  },
  render: (args) => (
    <Breadcrumb
      {...args}
      items={[
        { title: "Home", href: "" },
        { title: "Application Center", href: "" },
        { title: "Application List", href: "" },
        { title: "An Application" },
      ]}
    />
  ),
};
