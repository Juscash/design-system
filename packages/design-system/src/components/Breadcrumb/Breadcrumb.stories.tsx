import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb } from "./Breadcrumb";
import React from "react";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-20126&m=dev",
    },
    docs: {
      description: {
        component: `
Componente de Breadcrumb (migalhas de pão) para navegação hierárquica.
Baseado no [Ant Design Breadcrumb](https://ant.design/components/breadcrumb).

### Funcionalidades:
- Exibe o caminho atual de navegação.
- Permite ir para níveis anteriores.
- Suporta itens ocultos (reticências).
- Customizado com tokens do Design System.
`,
      },
    },
  },
  args: {
    items: [
      { title: "Home" },
      { title: "Components" },
      { title: "Breadcrumb" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { title: "Home", href: "#" },
      { title: "Components", href: "#" },
      { title: "Breadcrumb" },
    ],
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

export const FigmaExample: Story = {
  args: {
    items: [
      { title: "Home" },
      { title: "...", className: "cursor-pointer" }, // visual representation of ellipsis
      { title: "Components" },
      { title: "Breadcrumb" },
    ],
  },
};
