import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Pagination } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-17825&m=dev";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
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
Componente baseado no [Ant Design Pagination](https://ant.design/components/pagination).

Permite navegar entre páginas de uma lista, exibindo botões \`Anterior\`/\`Próximo\`,
páginas numeradas e atalhos de salto (\`...\`) com a identidade visual do design system.

### Props proprietárias

A API mantém as props do AntD com exceção de \`showSizeChanger\`,
\`showQuickJumper\`, \`showLessItems\`, \`simple\` e \`responsive\` — eixos que
não constam no dump do Figma e foram suprimidos da camada Juscash.

### Como usar

\`\`\`tsx
import { Pagination } from "@juscash/design-system";

<Pagination total={100} defaultCurrent={1} pageSize={10} />
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
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

/** 10 páginas com ellipsis e o item `1` ativo. */
export const Default: Story = {
  args: {
    total: 100,
    pageSize: 10,
    defaultCurrent: 1,
  },
};

/** Página ativa próxima ao final (11 de 11), gerando o salto ao centro. */
export const Active11: Story = {
  parameters: {
    docs: { description: { story: "Paginação com a página `11` ativa e ellipsis ao centro." } },
  },
  args: {
    total: 110,
    pageSize: 10,
    current: 11,
  },
};

/** Caso simples com 3 páginas — sem ellipsis. */
export const Simple3: Story = {
  parameters: {
    docs: { description: { story: "Apenas três páginas, sem saltos." } },
  },
  args: {
    total: 30,
    pageSize: 10,
    defaultCurrent: 1,
  },
};

/** Caso simples com 2 páginas. */
export const Simple2: Story = {
  parameters: {
    docs: { description: { story: "Apenas duas páginas, sem saltos." } },
  },
  args: {
    total: 20,
    pageSize: 10,
    defaultCurrent: 1,
  },
};

/** Variante com 3 páginas e ellipsis (página atual no início, total maior). */
export const SimpleWithEllipsis: Story = {
  parameters: {
    docs: { description: { story: "Páginas iniciais visíveis seguidas de ellipsis." } },
  },
  args: {
    total: 80,
    pageSize: 10,
    defaultCurrent: 1,
  },
};

/** Paginação com apenas uma página — `Anterior` e `Próximo` aparecem desabilitados (opacity 50%). */
export const Disabled: Story = {
  parameters: {
    docs: { description: { story: "Pagination com uma única página, com prev/next desabilitados." } },
  },
  args: {
    total: 1,
    pageSize: 10,
    defaultCurrent: 1,
    disabled: true,
  },
};

/** Playground controlado por args. */
export const Playground: Story = {
  args: {
    total: 100,
    pageSize: 10,
    defaultCurrent: 1,
    disabled: false,
  },
  argTypes: {
    total: { control: { type: "number", min: 0, step: 10 } },
    pageSize: { control: { type: "number", min: 1, step: 1 } },
    defaultCurrent: { control: { type: "number", min: 1, step: 1 } },
    disabled: { control: "boolean" },
  },
  render: (args) => <Pagination {...args} />,
};
