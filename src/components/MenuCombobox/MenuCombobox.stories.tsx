import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";
import { MenuCombobox } from ".";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4115-13286&m=dev";

const meta: Meta<typeof MenuCombobox> = {
  title: "Components/MenuCombobox",
  component: MenuCombobox,
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
Conjunto de primitivos visuais para construir popups de **menu**, **dropdown** ou **combobox**.

> Este componente representa o **conteúdo do popup** — não inclui o trigger nem o positioning. Use junto com \`Popover\`, \`Dropdown\` ou um menu posicionado manualmente.

### Sub-componentes

- \`MenuCombobox\` — container do menu (largura 240px, padding configurável via \`spacing\`).
- \`MenuCombobox.Item\` — entrada do menu (\`size\` m/l, \`type\` default/destructive, \`state\` default/selected/disabled/loading).
- \`MenuCombobox.GroupLabel\` — rótulo de seção (\`indented\` controla recuo).
- \`MenuCombobox.Search\` — input de busca embarcado.
- \`MenuCombobox.Overflow\` — chevron indicador de scroll (up/down).

### Como usar

\`\`\`tsx
import { MenuCombobox } from "@juscash/design-system";

<MenuCombobox spacing="8" aria-label="Ações">
  <MenuCombobox.Search placeholder="Buscar..." />
  <MenuCombobox.GroupLabel>Conta</MenuCombobox.GroupLabel>
  <MenuCombobox.Item icon="User" label="Meu perfil" />
  <MenuCombobox.Item icon="Settings" label="Configurações" />
  <MenuCombobox.Item icon="LogOut" type="destructive" label="Sair" />
</MenuCombobox>
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

type Story = StoryObj<typeof MenuCombobox>;

const decorate = (children: React.ReactNode): React.ReactElement => (
  <div style={{ padding: 24, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>{children}</div>
);

/** Composição padrão com search, group label e itens. */
export const Default: Story = {
  render: () =>
    decorate(
      <MenuCombobox aria-label="Menu padrão">
        <MenuCombobox.Item icon="User" label="Perfil" />
        <MenuCombobox.Item icon="Settings" label="Configurações" />
        <MenuCombobox.Item icon="HelpCircle" label="Ajuda" />
      </MenuCombobox>,
    ),
};

/** Container com `spacing="none"` (sem padding interno). */
export const SpacingNone: Story = {
  parameters: { docs: { description: { story: "Container com padding zero." } } },
  render: () =>
    decorate(
      <MenuCombobox spacing="none" aria-label="Spacing none">
        <MenuCombobox.Item label="Lorem ipsum" />
      </MenuCombobox>,
    ),
};

/** Container com `spacing="8"` (default — 8px de padding). */
export const Spacing8: Story = {
  parameters: { docs: { description: { story: "Container com 8px de padding." } } },
  render: () =>
    decorate(
      <MenuCombobox spacing="8" aria-label="Spacing 8">
        <MenuCombobox.Item label="Lorem ipsum" />
      </MenuCombobox>,
    ),
};

/** Container com `spacing="16"` (16px de padding). */
export const Spacing16: Story = {
  parameters: { docs: { description: { story: "Container com 16px de padding." } } },
  render: () =>
    decorate(
      <MenuCombobox spacing="16" aria-label="Spacing 16">
        <MenuCombobox.Item label="Lorem ipsum" />
      </MenuCombobox>,
    ),
};

/** Container com `spacing="24"` (24px de padding). */
export const Spacing24: Story = {
  parameters: { docs: { description: { story: "Container com 24px de padding." } } },
  render: () =>
    decorate(
      <MenuCombobox spacing="24" aria-label="Spacing 24">
        <MenuCombobox.Item label="Lorem ipsum" />
      </MenuCombobox>,
    ),
};

/** Item `size="m"` (32px) vs `size="l"` (36px). */
export const ItemSizes: Story = {
  parameters: { docs: { description: { story: "Tamanhos m (32px) e l (36px) do item." } } },
  render: () =>
    decorate(
      <>
        <MenuCombobox aria-label="Itens m">
          <MenuCombobox.Item size="m" label="Item m" />
          <MenuCombobox.Item size="m" icon="Star" label="Com ícone" />
        </MenuCombobox>
        <MenuCombobox aria-label="Itens l">
          <MenuCombobox.Item size="l" label="Item l" />
          <MenuCombobox.Item size="l" icon="Star" label="Com ícone" />
        </MenuCombobox>
      </>,
    ),
};

/** Item `type="destructive"` (cor de feedback vermelha). */
export const ItemDestructive: Story = {
  parameters: { docs: { description: { story: "Item destructive — usado para ações como excluir/sair." } } },
  render: () =>
    decorate(
      <MenuCombobox aria-label="Destructive">
        <MenuCombobox.Item icon="Trash2" type="destructive" label="Excluir" />
        <MenuCombobox.Item icon="LogOut" type="destructive" label="Sair" />
      </MenuCombobox>,
    ),
};

/** Estados do item: default, selected, disabled e loading. */
export const ItemStates: Story = {
  parameters: { docs: { description: { story: "Estados declarativos do item." } } },
  render: () =>
    decorate(
      <MenuCombobox aria-label="Estados">
        <MenuCombobox.Item icon="Circle" label="Default" />
        <MenuCombobox.Item icon="Check" label="Selecionado" state="selected" />
        <MenuCombobox.Item icon="Ban" label="Desabilitado" state="disabled" />
        <MenuCombobox.Item icon="Clock" label="Carregando" state="loading" />
      </MenuCombobox>,
    ),
};

/** Group label (com e sem indented). */
export const GroupLabel: Story = {
  parameters: { docs: { description: { story: "Rótulo de seção com e sem recuo." } } },
  render: () =>
    decorate(
      <MenuCombobox aria-label="Com grupos">
        <MenuCombobox.GroupLabel>Conta</MenuCombobox.GroupLabel>
        <MenuCombobox.Item icon="User" label="Perfil" />
        <MenuCombobox.Item icon="Settings" label="Configurações" />
        <MenuCombobox.GroupLabel indented>Outros</MenuCombobox.GroupLabel>
        <MenuCombobox.Item label="Lorem ipsum" />
      </MenuCombobox>,
    ),
};

/** Search embarcado no menu (controlled). */
export const SearchEmbedded: Story = {
  parameters: { docs: { description: { story: "Input de busca embarcado no menu." } } },
  render: () => {
    const [query, setQuery] = React.useState("");
    return decorate(
      <MenuCombobox aria-label="Com busca">
        <MenuCombobox.Search placeholder="Buscar..." value={query} onChange={setQuery} />
        <MenuCombobox.Item label="Lorem ipsum" />
        <MenuCombobox.Item label="Dolor sit amet" />
        <MenuCombobox.Item label="Consectetur" />
      </MenuCombobox>,
    );
  },
};

/** Indicadores de overflow (chevron up/down). */
export const Overflow: Story = {
  parameters: { docs: { description: { story: "Chevrons indicando scroll up/down." } } },
  render: () =>
    decorate(
      <MenuCombobox spacing="none" aria-label="Com overflow">
        <MenuCombobox.Overflow direction="up" />
        <MenuCombobox.Item label="Lorem ipsum" />
        <MenuCombobox.Item label="Dolor sit amet" />
        <MenuCombobox.Item label="Consectetur" />
        <MenuCombobox.Overflow direction="down" />
      </MenuCombobox>,
    ),
};

/** Composição completa: search + group + items + overflow. */
export const FullComposition: Story = {
  parameters: { docs: { description: { story: "Exemplo completo combinando todos os sub-componentes." } } },
  render: () =>
    decorate(
      <MenuCombobox spacing="none" aria-label="Composição completa">
        <MenuCombobox.Search placeholder="Buscar opção..." />
        <MenuCombobox.GroupLabel>Conta</MenuCombobox.GroupLabel>
        <MenuCombobox.Item icon="User" label="Meu perfil" />
        <MenuCombobox.Item icon="Settings" label="Configurações" state="selected" />
        <MenuCombobox.Item icon="HelpCircle" label="Ajuda" />
        <MenuCombobox.GroupLabel indented>Sessão</MenuCombobox.GroupLabel>
        <MenuCombobox.Item icon="LogOut" type="destructive" label="Sair" />
        <MenuCombobox.Overflow direction="down" />
      </MenuCombobox>,
    ),
};

/** Playground com controles. */
export const Playground: Story = {
  args: {
    spacing: "8",
    "aria-label": "Playground",
  },
  argTypes: {
    spacing: {
      control: "select",
      options: ["none", "8", "16", "24"],
    },
  },
  render: (args) =>
    decorate(
      <MenuCombobox {...args}>
        <MenuCombobox.Item icon="Star" label="Lorem ipsum" />
        <MenuCombobox.Item icon="Heart" label="Dolor sit amet" />
        <MenuCombobox.Item icon="LogOut" type="destructive" label="Consectetur" />
      </MenuCombobox>,
    ),
};
