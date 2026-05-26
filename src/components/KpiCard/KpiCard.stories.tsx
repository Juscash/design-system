import type { Meta, StoryObj } from "@storybook/react-vite";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";
import { KpiCard } from ".";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=5088-13986";

const meta: Meta<typeof KpiCard> = {
  title: "Components/KpiCard",
  component: KpiCard,
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      codePanel: true,
      description: {
        component: `
KpiCard — cartão de indicador (KPI) com label, valor em destaque,
badge de tendência opcional e ícone opcional. Baseado no Figma
\`KPI card (5088:13986)\`.

### Variantes
- **Sem ícone** (\`kpi card\`): compacto, com \`align="left" | "center"\`.
- **Com ícone** (\`kpi card with icon\`): destaque visual à esquerda, dois
  tamanhos (\`size="l" | "m"\`).

### Props proprietárias
- \`label\` (string, obrigatório): texto descritivo.
- \`value\` (string | number, obrigatório): valor principal.
- \`icon\` (ReactNode | string): nome do Lucide ou ReactNode.
- \`size\` ("m" | "l"): apenas quando há ícone.
- \`align\` ("left" | "center"): apenas sem ícone.
- \`subtitle\`: linha extra de contexto.
- \`badge\` ({ value, direction }): tendência up/down.
- \`clickable\`: ativa role=button, hover/focus e cursor pointer.
- \`onClick\`: handler — ativa \`clickable\` automaticamente.

### Acessibilidade
- Quando \`clickable\`, recebe \`role="button"\`, \`tabIndex={0}\` e
  responde a \`Enter\`/\`Space\`. \`aria-label\` derivado de \`label\` +
  \`value\`.
- Badge tem \`aria-label\` descritivo (\"Tendência de alta/baixa\").
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Figma url={FIGMA_URL} />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
  },
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    icon: { control: "text", description: 'Nome do Lucide ou ReactNode. Ex.: "Users", "Wallet".' },
    size: { control: { type: "inline-radio" }, options: ["m", "l"] },
    align: { control: { type: "inline-radio" }, options: ["left", "center"] },
    subtitle: { control: "text" },
    clickable: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof KpiCard>;

export const Default: Story = {
  args: { label: "Devedores ativos", value: "1.234" },
};

export const AlignCenter: Story = {
  args: { label: "Devedores ativos", value: "1.234", align: "center" },
  name: "Sem ícone — align center",
};

export const WithBadgeUp: Story = {
  args: { label: "Receita mensal", value: "R$ 12.500", badge: { value: "+12%", direction: "up" } },
  name: "Com badge (tendência de alta)",
};

export const WithBadgeDown: Story = {
  args: { label: "Cancelamentos", value: "14", badge: { value: "-4%", direction: "down" } },
  name: "Com badge (tendência de baixa)",
};

export const WithIconLarge: Story = {
  args: { label: "Usuários ativos", value: "1.234", icon: "Users", badge: { value: "+12%", direction: "up" } },
  name: "Com ícone — size L",
};

export const WithIconMedium: Story = {
  args: { label: "Processos", value: "320", icon: "FileText", size: "m", badge: { value: "+3%", direction: "up" } },
  name: "Com ícone — size M",
};

export const WithIconLargeSubtitle: Story = {
  args: {
    label: "Receita mensal",
    value: "R$ 12.500",
    icon: "Wallet",
    subtitle: "Comparado a 30 dias atrás",
    badge: { value: "+8%", direction: "up" },
  },
  name: "Com ícone L + subtítulo",
};

export const Clickable: Story = {
  args: {
    label: "Devedores ativos",
    value: "1.234",
    icon: "Users",
    clickable: true,
    onClick: () => undefined,
  },
  name: "Clicável (hover/focus visíveis)",
};

export const StateHover: Story = {
  args: { label: "Devedores", value: "1.234", icon: "Users", clickable: true },
  parameters: { pseudo: { hover: true } },
  name: "Estado — hover (clicável)",
};

export const StateFocus: Story = {
  args: { label: "Devedores", value: "1.234", icon: "Users", clickable: true },
  parameters: { pseudo: { focusVisible: true } },
  name: "Estado — focus (clicável)",
};

export const NoIconAllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 345px)", gap: 16 }}>
      <KpiCard label="default" value="1.234" />
      <KpiCard label="default · clickable" value="1.234" clickable />
      <KpiCard label="hover (pseudo)" value="1.234" clickable className="pseudo-hover" />
      <KpiCard label="focus (pseudo)" value="1.234" clickable className="pseudo-focus-visible" />
    </div>
  ),
  name: "Matriz — sem ícone (estados)",
};

export const WithIconAllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 345px)", gap: 16 }}>
      <KpiCard label="L · default" value="1.234" icon="Users" />
      <KpiCard label="M · default" value="1.234" icon="Users" size="m" />
      <KpiCard label="L · hover" value="1.234" icon="Users" clickable className="pseudo-hover" />
      <KpiCard label="M · focus" value="1.234" icon="Users" size="m" clickable className="pseudo-focus-visible" />
    </div>
  ),
  name: "Matriz — com ícone (size × estados)",
};
