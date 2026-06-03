import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";
import { NavigationMenu } from ".";
import type { NavigationMenuItem } from "../../types/components/NavigationMenu";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-15062&m=dev";

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
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
Menu de navegação horizontal com triggers que abrem painéis ricos abaixo
de si. Cada trigger pode opcionalmente exibir um painel com itens
dispostos lado a lado (4 itens por linha, 240px cada).

### Comportamento

- Cada \`item\` da prop \`items\` vira um trigger horizontal.
- Triggers com \`content\` renderizam um chevron e abrem o painel ao clicar.
- Apenas um painel fica aberto por vez.
- Clicar fora do menu ou pressionar \`Escape\` fecha o painel.

### Como usar

\`\`\`tsx
import { NavigationMenu } from "@juscash/design-system";

const items = [
  {
    key: "produtos",
    label: "Produtos",
    content: [
      { key: "doc", title: "Documentation", description: "Learn how to use the library." },
      { key: "api", title: "API", description: "Reference da API." },
    ],
  },
  { key: "sobre", label: "Sobre" },
];

<NavigationMenu items={items} aria-label="Principal" />
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

type Story = StoryObj<typeof NavigationMenu>;

const ITEMS_WITH_CONTENT: NavigationMenuItem[] = [
  {
    key: "documentation",
    label: "Documentação",
    content: [
      {
        key: "intro",
        title: "Introdução",
        description: "Lorem ipsum dolor sit amet.",
      },
      {
        key: "guia",
        title: "Guia inicial",
        description: "Lorem ipsum dolor sit amet.",
      },
      {
        key: "api",
        title: "API",
        description: "Lorem ipsum dolor sit amet.",
      },
      {
        key: "exemplos",
        title: "Exemplos",
        description: "Lorem ipsum dolor sit amet.",
      },
    ],
  },
  { key: "produtos", label: "Produtos" },
  { key: "sobre", label: "Sobre" },
];

const ITEMS_WITHOUT_CONTENT: NavigationMenuItem[] = [
  { key: "home", label: "Início" },
  { key: "blog", label: "Blog" },
  { key: "contato", label: "Contato" },
];

const ITEMS_MULTIPLE_TRIGGERS: NavigationMenuItem[] = [
  {
    key: "produtos",
    label: "Produtos",
    content: [
      { key: "p1", title: "Produto A", description: "Lorem ipsum dolor sit amet." },
      { key: "p2", title: "Produto B", description: "Lorem ipsum dolor sit amet." },
    ],
  },
  {
    key: "solucoes",
    label: "Soluções",
    content: [
      { key: "s1", title: "Solução A", description: "Lorem ipsum dolor sit amet." },
      { key: "s2", title: "Solução B", description: "Lorem ipsum dolor sit amet." },
      { key: "s3", title: "Solução C", description: "Lorem ipsum dolor sit amet." },
      { key: "s4", title: "Solução D", description: "Lorem ipsum dolor sit amet." },
    ],
  },
  {
    key: "recursos",
    label: "Recursos",
    content: [
      { key: "r1", title: "Documentation", description: "Learn how to use the library." },
      { key: "r2", title: "Guides", description: "Lorem ipsum dolor sit amet." },
    ],
  },
];

/**
 * Variante default — 3 triggers, o primeiro com 4 itens no painel.
 */
export const Default: Story = {
  args: {
    items: ITEMS_WITH_CONTENT,
    "aria-label": "Navegação principal",
  },
};

/**
 * Variante apenas com triggers simples — sem painel.
 */
export const WithoutContent: Story = {
  parameters: {
    docs: {
      description: {
        story: "Variante com triggers sem painel. Útil como navegação plana.",
      },
    },
  },
  args: {
    items: ITEMS_WITHOUT_CONTENT,
    "aria-label": "Navegação simples",
  },
};

/**
 * Variante com múltiplos triggers, cada um com seu próprio painel.
 */
export const MultipleTriggers: Story = {
  parameters: {
    docs: {
      description: {
        story: "Vários triggers com painéis independentes. Apenas um abre por vez.",
      },
    },
  },
  args: {
    items: ITEMS_MULTIPLE_TRIGGERS,
    "aria-label": "Múltiplos triggers",
  },
};

/** Playground controlado por args. */
export const Playground: Story = {
  args: {
    items: ITEMS_WITH_CONTENT,
    "aria-label": "Playground",
  },
};
