import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Breadcrumb } from ".";

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
Componente de Breadcrumb (migalhas de pÃ£o) para navegaÃ§Ã£o hierÃ¡rquica.
Baseado no [Ant Design Breadcrumb](https://ant.design/components/breadcrumb).

Mostra o caminho de navegaÃ§Ã£o dentro do sistema, indicando a localizaÃ§Ã£o atual do usuÃ¡rio.

### Quando usar

Use o breadcrumb em interfaces com mÃºltiplos nÃ­veis de navegaÃ§Ã£o (ex.: Categoria â†’ Subcategoria â†’ PÃ¡gina) para indicar ao usuÃ¡rio onde ele estÃ¡ na hierarquia de pÃ¡ginas e permitir retorno rÃ¡pido a nÃ­veis anteriores.

### Props:
- **Extended (Ant Design)**: Props padrÃ£o do AntD Breadcrumb.

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
              ðŸŽ¨ Figma Spec
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

/** Exemplo padrÃ£o do Figma: Home > ... > Components > **Breadcrumb** */
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

/** Breadcrumb com mÃºltiplos nÃ­veis */
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
