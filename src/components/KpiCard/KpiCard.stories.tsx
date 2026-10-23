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
  tamanhos (\`size="l" | "m"\`) e três tonalidades (\`tone="primary" | "secondary" | "neutral"\`).

### Props proprietárias
- \`label\` (string, obrigatório): texto descritivo.
- \`value\` (string | number, obrigatório): valor principal. Quando vazio
  (\`"—"\`, \`"-"\`, \`""\` ou \`null\`), o valor fica em peso regular e cinza.
- \`icon\` (ReactNode | string): ícone à esquerda — nome do Lucide ou ReactNode.
- \`size\` ("m" | "l"): apenas quando há ícone. Default \`l\`.
- \`tone\` ("primary" | "secondary" | "neutral"): apenas quando há ícone.
  \`primary\` verde (default), \`secondary\` azul, \`neutral\` cinza (valor em preto).
- \`align\` ("left" | "center"): apenas sem ícone.
- \`subtitle\`: linha extra de contexto (renderiza apenas quando há ícone).
- \`badge\` ({ value, direction?, icon?, color? }): \`direction\` (\`up\`/\`down\`)
  define ícone + cor default (TrendingUp + verde / TrendingDown + vermelho);
  \`icon\` é o nome de um ícone Lucide (string) ou \`null\` para esconder;
  \`color\` aceita os presets \`success | error | warning | caution | info\`.
- \`tooltipCard\` / \`tooltipValue\` / \`tooltipBadge\`: tooltips no card, no valor
  e no badge. Suportam placeholders \`{value}\` e \`{label}\` (\`tooltipBadge\` usa
  \`badge.value\` em \`{value}\`).
- \`clickable\`: ativa role=button, hover/focus e cursor pointer.
- \`onClick\`: handler — ativa \`clickable\` automaticamente.

### Acessibilidade
- Quando \`clickable\`, recebe \`role="button"\`, \`tabIndex={0}\` e
  responde a \`Enter\`/\`Space\`. \`aria-label\` derivado de \`label\` +
  \`value\`.
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
    size: { control: { type: "inline-radio" }, options: ["m", "l"], description: "Só com ícone. Default `l`." },
    tone: {
      control: { type: "inline-radio" },
      options: ["primary", "secondary", "neutral"],
      description: "Só com ícone. `primary` verde (default) · `secondary` azul · `neutral` cinza.",
    },
    align: { control: { type: "inline-radio" }, options: ["left", "center"], description: "Só sem ícone." },
    subtitle: { control: "text", description: "Renderiza apenas quando há ícone." },
    clickable: { control: "boolean" },
    tooltipCard: { control: "text", description: "Tooltip no card. Suporta `{value}` e `{label}`." },
    tooltipValue: { control: "text", description: "Tooltip no valor. Suporta `{value}` e `{label}`." },
    tooltipBadge: { control: "text", description: "Tooltip no badge. `{value}` = `badge.value`." },
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

export const WithIconSizes: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 345px)", gap: 16 }}>
      <KpiCard label="L · default" value="1.234" icon="Users" />
      <KpiCard label="M · default" value="1.234" icon="Users" size="m" />
    </div>
  ),
  name: "Com ícone — tamanhos (L e M)",
};

export const Tonalidades: Story = {
  name: "Tonalidades (com ícone)",
  parameters: {
    docs: {
      description: {
        story: "`tone` (só com ícone): `primary` verde (default), `secondary` azul, `neutral` cinza (valor em preto).",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <KpiCard label="Qtd. de processos" value="14.575" icon="Gavel" tone="primary" badge={{ value: "+10%", direction: "up" }} />
      <KpiCard
        label="Negócios com a JusCash"
        value="112"
        icon="ArrowLeftRight"
        tone="secondary"
        badge={{ value: "+10%", direction: "up" }}
      />
      <KpiCard label="Processos analisados" value="189" icon="Search" tone="neutral" badge={{ value: "+10%", direction: "up" }} />
    </div>
  ),
};

export const EstadoVazio: Story = {
  name: "Estado vazio (value —)",
  parameters: {
    docs: {
      description: {
        story: 'Quando `value` é `—`, `-`, `""` ou `null`, o valor fica em peso regular e cor cinza automaticamente.',
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <KpiCard label="Processos analisados" value="—" icon="Search" tone="neutral" />
      <KpiCard label="Proc. elegíveis para antecipação" value="—" icon="Zap" tone="secondary" />
      <KpiCard label="Taxa de sucesso" value="—" icon="CheckCircle2" tone="primary" />
    </div>
  ),
};

export const Tooltips: Story = {
  name: "Tooltips (card / valor / badge)",
  parameters: {
    docs: {
      description: {
        story:
          "Três tooltips proprietários independentes — `tooltipCard` (card inteiro), `tooltipValue` (valor) e `tooltipBadge` (badge). Suportam placeholders `{value}` e `{label}`. Passe o mouse em cada alvo; o quarto card combina os três.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <KpiCard
        label="Processos analisados"
        value="189"
        icon="Search"
        tone="neutral"
        badge={{ value: "+12%", direction: "up" }}
        tooltipCard="12 processos analisados a mais (+12%) em relação ao período anterior."
      />
      <KpiCard label="Devedores ativos" value="1.234" icon="Users" tooltipValue="Total: {value} ({label})" />
      <KpiCard
        label="Variação mensal"
        value="320"
        icon="TrendingUp"
        badge={{ value: "+12%", direction: "up" }}
        tooltipBadge="Variação: {value}"
      />
      <KpiCard
        label="Receita mensal"
        value="R$ 12.500"
        icon="Wallet"
        tone="primary"
        badge={{ value: "+8%", direction: "up" }}
        tooltipCard="Receita acumulada do mês para {label}"
        tooltipValue="Valor exato: {value}"
        tooltipBadge="Crescimento de {value} vs. mês anterior"
      />
    </div>
  ),
};

export const BadgeCores: Story = {
  name: "Badge — presets de cor",
  parameters: {
    docs: {
      description: {
        story:
          "`badge.color` aceita os mesmos presets do `Badge`: `success`, `error`, `warning`, `caution`, `info`. Cores arbitrárias não são suportadas.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <KpiCard label="Sucesso" value="100" badge={{ value: "OK", color: "success", icon: "Check" }} />
      <KpiCard label="Erro" value="100" badge={{ value: "Falha", color: "error", icon: "X" }} />
      <KpiCard label="Atenção" value="100" badge={{ value: "Atenção", color: "warning", icon: "TriangleAlert" }} />
      <KpiCard label="Cuidado" value="100" badge={{ value: "Cuidado", color: "caution", icon: "AlertTriangle" }} />
      <KpiCard label="Informação" value="100" badge={{ value: "Info", color: "info", icon: "Info" }} />
    </div>
  ),
};

export const BadgeIcones: Story = {
  name: "Badge — ícone customizado / sem ícone",
  parameters: {
    docs: {
      description: {
        story:
          "`badge.icon` aceita o nome de qualquer ícone Lucide (sobrescreve o default da `direction`) ou `null` para renderizar só texto. Funciona também no modo com ícone + `tone`.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <KpiCard label="Prêmio recebido" value="32" badge={{ value: "Novo", icon: "Award" }} />
        <KpiCard label="Status do alerta" value="3" badge={{ value: "Alerta", icon: "Bell", color: "warning" }} />
        <KpiCard label="Conteúdo aprovado" value="125" badge={{ value: "Verificado", icon: "BadgeCheck", color: "info" }} />
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <KpiCard label="Lorem ipsum" value="100" badge={{ value: "Sem ícone", icon: null, color: "caution" }} />
        <KpiCard
          label="Pagamentos do mês"
          value="R$ 24.500"
          icon="CreditCard"
          tone="primary"
          badge={{ value: "Novo", icon: "Zap", color: "info" }}
        />
      </div>
    </div>
  ),
};

export const GridAlturaUniforme: Story = {
  name: "Altura uniforme em grid",
  parameters: {
    docs: {
      description: {
        story:
          "Em containers com `align-items: stretch` (flex/grid ou `Row`/`Col` do Ant Design), os cards alinham na altura do mais alto (`height: 100%`). O card do meio tem subtítulo extra.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
      <div style={{ flex: 1 }}>
        <KpiCard label="Total de processos" value="14.575" icon="Gavel" tone="neutral" badge={{ value: "+10%", direction: "up" }} />
      </div>
      <div style={{ flex: 1 }}>
        <KpiCard label="Qtd. de processos" value="14.575" icon="Gavel" subtitle="5.000 processos inativos" />
      </div>
      <div style={{ flex: 1 }}>
        <KpiCard label="Receita" value="R$ 12.500" icon="Wallet" tone="secondary" />
      </div>
    </div>
  ),
};
