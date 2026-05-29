import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Sidebar, SidebarGroupLabel, SidebarItem, SidebarSubItem, SidebarToggleButton } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-13321&m=dev";

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
\`4080:13321\`. Contém 6 variantes (3 visuais × 2 estados de expansão):

- **expanded** (240px) ou **collapsed** (72px).
- **variant**: \`juscash\` (default), \`sij\` ou \`prompt-tester\`.

### Subcomponentes

- \`SidebarItem\` — entrada de 1º nível (com ícone, badge ou submenu).
- \`SidebarSubItem\` — entrada de 2º nível, exibida sob um item com submenu.
- \`SidebarGroupLabel\` — rótulo de seção entre grupos de itens.
- \`SidebarToggleButton\` — botão 32x32 que alterna entre expanded/collapsed.

### Como usar

\`\`\`tsx
import {
  Sidebar,
  SidebarItem,
  SidebarGroupLabel,
  SidebarToggleButton,
} from "@juscash/design-system";

const [expanded, setExpanded] = useState(true);

<Sidebar expanded={expanded}>
  <SidebarItem icon="Home" label="Início" active />
  <SidebarGroupLabel label="Geral" />
  <SidebarItem icon="Users" label="Clientes" badge={3} />
  <SidebarToggleButton expanded={expanded} onClick={() => setExpanded(!expanded)} />
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
    variant: {
      control: { type: "inline-radio" },
      options: ["juscash", "sij", "prompt-tester"],
      description: "Variante visual conforme matriz 4080:14598.",
    },
    "aria-label": {
      control: "text",
      description: "Rótulo acessível do <aside role='navigation'>.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

/** Variante default — sidebar expandida `variant="juscash"`. */
export const Default: Story = {
  args: {
    expanded: true,
    variant: "juscash",
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarItem icon="Home" label="Início" active />
      <SidebarItem icon="FileText" label="Documentos" />
      <SidebarItem icon="Users" label="Clientes" />
      <SidebarItem icon="Settings" label="Configurações" />
    </Sidebar>
  ),
};

/** Sidebar colapsada — 72px, exibe apenas ícones. */
export const Collapsed: Story = {
  parameters: {
    docs: {
      description: {
        story: "Variante colapsada (`expanded=false`) — largura 72px, sem labels.",
      },
    },
  },
  args: {
    expanded: false,
    variant: "juscash",
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarItem icon="Home" label="Início" active />
      <SidebarItem icon="FileText" label="Documentos" />
      <SidebarItem icon="Users" label="Clientes" />
      <SidebarItem icon="Settings" label="Configurações" />
    </Sidebar>
  ),
};

/** Sidebar com `SidebarGroupLabel` separando seções. */
export const WithGroups: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstra `SidebarGroupLabel` separando seções do menu.",
      },
    },
  },
  args: {
    expanded: true,
    variant: "juscash",
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarItem icon="Home" label="Início" active />
      <SidebarGroupLabel label="Operacional" />
      <SidebarItem icon="FileText" label="Documentos" />
      <SidebarItem icon="Users" label="Clientes" />
      <SidebarGroupLabel label="Sistema" />
      <SidebarItem icon="Settings" label="Configurações" />
      <SidebarItem icon="HelpCircle" label="Ajuda" />
    </Sidebar>
  ),
};

/** Itens com `badge` numérico (variante `badge` do dump). */
export const WithBadge: Story = {
  parameters: {
    docs: {
      description: {
        story: "Item com `badge` exibindo contagem de novidades.",
      },
    },
  },
  args: {
    expanded: true,
    variant: "juscash",
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarItem icon="Home" label="Início" />
      <SidebarItem icon="Bell" label="Notificações" badge={5} active />
      <SidebarItem icon="Mail" label="Mensagens" badge={12} />
      <SidebarItem icon="Users" label="Clientes" />
    </Sidebar>
  ),
};

/** Item com submenu (variante `dropdown` do dump). */
export const WithSubmenu: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra `SidebarItem` com `hasSubmenu` aberto e dois `SidebarSubItem` (2º nível).",
      },
    },
  },
  args: {
    expanded: true,
    variant: "juscash",
  },
  render: function WithSubmenuRender(args) {
    const [open, setOpen] = React.useState(false);
    return (
      <Sidebar {...args}>
        <SidebarItem icon="Home" label="Início" />
        <SidebarItem
          icon="FolderOpen"
          label="Projetos"
          hasSubmenu
          expanded={open}
          onClick={() => setOpen(!open)}
        >
          <SidebarSubItem label="Em andamento" active />
          <SidebarSubItem label="Concluídos" />
          <SidebarSubItem label="Arquivados" />
        </SidebarItem>
        <SidebarItem icon="Settings" label="Configurações" />
      </Sidebar>
    );
  },
};

/** Variante `sij` — produto SIJ. */
export const VariantSij: Story = {
  parameters: {
    docs: {
      description: {
        story: "Variante `sij` (nodes 4806:11920 / 4806:12158).",
      },
    },
  },
  args: {
    expanded: true,
    variant: "sij",
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarItem icon="Home" label="Início" active />
      <SidebarItem icon="Scale" label="Processos" />
      <SidebarItem icon="Calendar" label="Audiências" />
    </Sidebar>
  ),
};

/** Variante `prompt-tester` — ferramenta interna. */
export const VariantPromptTester: Story = {
  parameters: {
    docs: {
      description: {
        story: "Variante `prompt-tester` (nodes 5303:9044 / 5303:9033).",
      },
    },
  },
  args: {
    expanded: true,
    variant: "prompt-tester",
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarItem icon="Sparkles" label="Prompts" active />
      <SidebarItem icon="History" label="Histórico" />
      <SidebarItem icon="Bot" label="Modelos" />
    </Sidebar>
  ),
};

/** Playground controlado por args. */
export const Playground: Story = {
  args: {
    expanded: true,
    variant: "juscash",
    "aria-label": "Menu lateral",
  },
  render: function PlaygroundRender(args) {
    const [expanded, setExpanded] = React.useState<boolean>(args.expanded ?? true);
    React.useEffect(() => {
      setExpanded(args.expanded ?? true);
    }, [args.expanded]);
    return (
      <Sidebar {...args} expanded={expanded}>
        <SidebarItem icon="Home" label="Início" active />
        <SidebarGroupLabel label="Geral" />
        <SidebarItem icon="FileText" label="Documentos" />
        <SidebarItem icon="Users" label="Clientes" badge={3} />
        <SidebarItem icon="Settings" label="Configurações" />
        <SidebarGroupLabel label="" collapsed />
        <SidebarToggleButton expanded={expanded} onClick={() => setExpanded(!expanded)} />
      </Sidebar>
    );
  },
};
