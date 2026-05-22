import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Breadcrumb } from "./Breadcrumb";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-20126&m=dev";

type BreadcrumbStoryProps = React.ComponentProps<typeof Breadcrumb>;

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

Mostra o caminho de navegação dentro do sistema, indicando a localização atual do usuário.

### Quando usar

Use o breadcrumb em interfaces com múltiplos níveis de navegação (ex.: Categoria → Subcategoria → Página) para indicar ao usuário onde ele está na hierarquia de páginas e permitir retorno rápido a níveis anteriores.

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
        { title: "...", href: "#" },
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
    items: [
      { title: "Home", href: "#" },
      { title: "...", href: "#" },
      { title: "Components", href: "#" },
      { title: "Breadcrumb" },
    ],
  },
  argTypes: {},
  render: (args) => {
    return <Breadcrumb {...args} />;
  },
};

export default meta;
type Story = StoryObj<BreadcrumbStoryProps>;

/** Exemplo padrão do Figma: Home > ... > Components > **Breadcrumb** */
export const Default: Story = {
  args: {
    items: [
      { title: "Home", href: "#" },
      { title: "...", href: "#" },
      { title: "Components", href: "#" },
      { title: "Breadcrumb" },
    ],
  },
};

/** Breadcrumb simples sem ellipsis */
export const Simple: Story = {
  args: {
    items: [{ title: "Home", href: "#" }, { title: "Components", href: "#" }, { title: "Breadcrumb" }],
  },
};

/** Breadcrumb com múltiplos níveis */
export const MultiLevel: Story = {
  args: {
    items: [
      { title: "Home", href: "#" },
      { title: "Application Center", href: "#" },
      { title: "Application List", href: "#" },
      { title: "An Application" },
    ],
  },
};
