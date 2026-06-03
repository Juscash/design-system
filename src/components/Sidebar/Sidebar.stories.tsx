import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Sidebar, SidebarGroupLabel, SidebarItem, SidebarSubItem } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-13321&m=dev";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
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
Componente \`Sidebar\` (menu lateral colapsável) baseado no Figma
\`4080:13321\`. Largura **240px** (expandido) ou **72px** (colapsado). O
estado é controlado pelo consumidor via \`expanded\` — não há botão de
recolher embutido (o controle vive fora, tipicamente na navbar).

### Subcomponentes

- \`SidebarItem\` — entrada de 1º nível (ícone + label; opcional \`badge\` ou submenu).
- \`SidebarSubItem\` — entrada de 2º nível, com a guia vertical à esquerda.
- \`SidebarGroupLabel\` — rótulo de seção (tipos \`base\`/\`action\`/\`expanded\`/\`collapsed\`).

### Estados (Figma)

Os itens têm apenas **default**, **focus** (anel \`0 0 0 3px neutral/300\`) e
**active** (fundo \`neutral/100\`). Não há estado de hover para itens.

### Como usar

\`\`\`tsx
import { Sidebar, SidebarItem, SidebarGroupLabel } from "@juscash/design-system";

const [expanded, setExpanded] = useState(true);

<Sidebar expanded={expanded}>
  <SidebarItem icon="House" label="Dashboard" active />
  <SidebarItem icon="Bell" label="Notificações" badge={5} />
</Sidebar>
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
  argTypes: {
    expanded: {
      control: "boolean",
      description: "Estado expandido (240px) ou colapsado (72px). Default true.",
    },
    "aria-label": {
      control: "text",
      description: "Rótulo acessível do <aside role='navigation'>.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

/** Sidebar expandida (240px) com itens de 1º nível. */
export const Default: Story = {
  args: { expanded: true },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarItem icon="House" label="Dashboard" active />
      <SidebarItem icon="Send" label="Enviar processo" />
      <SidebarItem icon="CircleDollarSign" label="Cashback" />
      <SidebarItem icon="UserRound" label="Meu perfil" />
    </Sidebar>
  ),
};

/** Sidebar colapsada — 72px, exibe apenas ícones (40x36). */
export const Collapsed: Story = {
  parameters: {
    docs: { description: { story: "Variante colapsada (`expanded=false`) — largura 72px, sem labels." } },
  },
  args: { expanded: false },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarItem icon="House" label="Dashboard" active />
      <SidebarItem icon="Send" label="Enviar processo" />
      <SidebarItem icon="CircleDollarSign" label="Cashback" />
      <SidebarItem icon="UserRound" label="Meu perfil" />
    </Sidebar>
  ),
};

/** Itens com `badge` (pill transparente, texto `text/dark`). */
export const WithBadge: Story = {
  parameters: {
    docs: { description: { story: "Itens com `badge` exibindo contagem." } },
  },
  args: { expanded: true },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarItem icon="House" label="Dashboard" />
      <SidebarItem icon="Bell" label="Notificações" badge={5} active />
      <SidebarItem icon="Mail" label="Mensagens" badge={12} />
    </Sidebar>
  ),
};

/** Item com submenu — chevron-right fechado, chevron-down aberto, e `SidebarSubItem` (2º nível). */
export const WithSubmenu: Story = {
  parameters: {
    docs: { description: { story: "Clique em `Gestão` para abrir o submenu de 2º nível." } },
  },
  args: { expanded: true },
  render: function WithSubmenuRender(args) {
    const [open, setOpen] = React.useState(false);
    return (
      <Sidebar {...args}>
        <SidebarItem icon="House" label="Dashboard" />
        <SidebarItem icon="Settings" label="Gestão" expanded={open} onClick={() => setOpen(!open)}>
          <SidebarSubItem label="Gerenciar usuários" active />
          <SidebarSubItem label="Central de notificações" />
        </SidebarItem>
        <SidebarItem icon="Headset" label="Suporte" />
      </Sidebar>
    );
  },
};

/** Rótulos de seção (`SidebarGroupLabel`) nos quatro tipos do Figma. */
export const WithGroupLabels: Story = {
  parameters: {
    docs: { description: { story: "Tipos `base`, `action` (+), `expanded` (chevron-down) e `collapsed` (chevron-right)." } },
  },
  args: { expanded: true },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarGroupLabel label="Base" />
      <SidebarItem icon="House" label="Dashboard" active />
      <SidebarGroupLabel label="Action" type="action" onActionClick={() => undefined} />
      <SidebarItem icon="Send" label="Enviar processo" />
      <SidebarGroupLabel label="Expanded" type="expanded" onActionClick={() => undefined} />
      <SidebarItem icon="CircleDollarSign" label="Cashback" />
      <SidebarGroupLabel label="Collapsed" type="collapsed" onActionClick={() => undefined} />
    </Sidebar>
  ),
};

/** Playground controlado por args. */
export const Playground: Story = {
  args: { expanded: true, "aria-label": "Menu lateral" },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarItem icon="House" label="Dashboard" active />
      <SidebarItem icon="Send" label="Enviar processo" />
      <SidebarItem icon="Bell" label="Notificações" badge={3} />
      <SidebarItem icon="Settings" label="Configurações" />
    </Sidebar>
  ),
};
