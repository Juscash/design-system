import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs } from "./Tabs";
import type { TabsProps } from "antd";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Tab 1",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
];

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4077-9817&m=dev",
    },
    docs: {
      description: {
        component: `
Componente baseado no [Ant Design Tabs](https://ant.design/components/tabs).

### Features Juscash:
- **Variantes**: Suporte a \`primary\` (padrão) e \`secondary\`.
- **Tamanhos**: \`s\` (Small), \`m\` (Medium/Default), \`l\` (Large), ajustando fontes e espaçamentos.
- **Tokens**: Cores de texto, bordas e estados (hover, active) mapeados do Design System.
- **Acessibilidade**: Mantém toda a acessibilidade teclado/leitor de tela do Ant Design.

### Como usar:

\`\`\`tsx
import { Tabs } from '@juscash/design-system';

const items = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
];

const MyComponent = () => (
  <Tabs defaultActiveKey="1" items={items} variant="primary" dsSize="m" />
);
\`\`\`
`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary"],
      description: "Variante visual das abas",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    dsSize: {
      control: "radio",
      options: ["s", "m", "l"],
      description: "Tamanho das abas (altura, fonte, padding)",
      table: {
        defaultValue: { summary: "m" },
      },
    },
    defaultActiveKey: {
      control: "text",
      description: "Chave da aba ativa inicial",
    },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    defaultActiveKey: "1",
    items: items,
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    items: items,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Variante principal do sistema, utilizando a cor primária da marca.",
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    items: items,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Variante secundária, utilizando a cor secundária (azul) da marca.",
      },
    },
  },
};

export const Small: Story = {
  args: {
    dsSize: "s",
    items: items,
  },
  parameters: {
    docs: {
      description: {
        story: "Tamanho compacto (Small) para interfaces densas.",
      },
    },
  },
};

export const Medium: Story = {
  args: {
    dsSize: "m",
    items: items,
  },
  parameters: {
    docs: {
      description: {
        story: "Tamanho padrão (Medium).",
      },
    },
  },
};

export const Large: Story = {
  args: {
    dsSize: "l",
    items: items,
  },
  parameters: {
    docs: {
      description: {
        story: "Tamanho expandido (Large) para maior destaque.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    items: items.map((item) => ({ ...item, disabled: item.key === "2" })),
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstração de abas desabilitadas.",
      },
    },
  },
};
