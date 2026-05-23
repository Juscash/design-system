import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { MoreHorizontal, Filter, Download } from "lucide-react";
import { PageHeader } from ".";
import { Button } from "../Button";
import { Tag } from "../Tag";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=8220-10535&m=dev";

type Story = StoryObj<typeof PageHeader>;

const meta: Meta<typeof PageHeader> = {
  title: "Components/PageHeader",
  component: PageHeader,
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
Cabeçalho de página padrão do design system. Renderiza um \`Card\` contendo
título obrigatório, descrição opcional e um **slot livre de ações** que
pode receber qualquer conteúdo React.

## Quando usar

Como o primeiro bloco de conteúdo de uma rota interna do produto — logo
abaixo do header global e do breadcrumb, antes da listagem/tabela/formulário
principal da página. Serve para identificar contextualmente o que o usuário
está vendo e para hospedar as ações principais daquela tela.

## Props

| Prop          | Tipo                                | Default        | Descrição                                                            |
| ------------- | ----------------------------------- | -------------- | -------------------------------------------------------------------- |
| \`title\`       | \`ReactNode\`                         | \`undefined\`    | Título do cabeçalho. Aceita string ou nó com badge/tag.              |
| \`description\` | \`ReactNode\`                         | \`undefined\`    | Subtítulo opcional renderizado abaixo do título.                     |
| \`actions\`     | \`ReactNode\`                         | \`undefined\`    | Slot livre — botões, menus, seletores, qualquer JSX.                 |
| \`variant\`     | \`'default' | 'responsive' | 'stacked'\` | \`'responsive'\` | Controla o layout (horizontal / empilhado / responsivo).          |
| \`level\`       | \`1 | 2 | 3 | 4 | 5 | 6\`           | \`1\`            | Nível semântico (\`<h1>\`–\`<h6>\`) do título.                            |
| \`className\`   | \`string\`                            | —              | Classe extra aplicada ao \`Card\` raiz.                                |
| \`style\`       | \`CSSProperties\`                     | —              | Estilo inline aplicado ao \`Card\` raiz.                               |

## Variantes do Figma

- **Padrão** — apenas título + descrição (sem ações).
- **Com ações** — texto à esquerda, slot de ações à direita.
- **Responsivo** — ações sobem para o topo em telas estreitas.

## Como usar

\`\`\`tsx
import { PageHeader, Button } from "@juscash/design-system";
import { MoreHorizontal } from "lucide-react";

function Page(): JSX.Element {
  return (
    <PageHeader
      title="Análise prospecção"
      description="Realize a análise de processos ou de carteiras de advogados e acompanhe os resultados."
      actions={(
        <>
          <Button type="primary" size="s">Label</Button>
          <Button type="outline" size="s" icon={<MoreHorizontal size={16} />} aria-label="Mais opções" />
        </>
      )}
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
            <h2 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: 700 }}>Figma Spec</h2>
            <Figma showLink url={FIGMA_URL} height="500px" />
          </div>

          <Stories />
        </>
      ),
    },
  },
  args: {
    title: "Análise prospecção",
    description: "Realize a análise de processos ou de carteiras de advogados e acompanhe os resultados.",
    variant: "responsive",
    // Em produção o componente é renderizado com `level=1` (default). Aqui
    // usamos `level=2` para que as stories convivam com o `<h1>` dos blocos
    // de Docs do Storybook sem quebrar a regra `heading-order` do axe.
    level: 2,
  },
  argTypes: {
    title: {
      control: "text",
      description: "Título principal do cabeçalho",
    },
    description: {
      control: "text",
      description: "Descrição opcional renderizada abaixo do título",
    },
    actions: {
      control: false,
      description: "Slot livre. No Storybook, controlado via cada story.",
    },
    variant: {
      control: { type: "inline-radio" },
      options: ["default", "responsive", "stacked"],
      description:
        "default = horizontal sempre. responsive = horizontal em ≥768px, empilhado em <768px. stacked = empilhado sempre.",
    },
    level: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
      description: "Nível semântico do heading (`h1`..`h6`).",
    },
    className: { control: false },
    style: { control: false },
  },
  render: (args) => (
    <div style={{ maxWidth: 1024 }}>
      <PageHeader {...args} />
    </div>
  ),
};

export default meta;

const defaultActions = (
  <>
    <Button type="primary" size="s">
      Label
    </Button>
    <Button type="outline" size="s" icon={<MoreHorizontal size={16} />} aria-label="Mais opções" />
  </>
);

// ───────────────────────────────────────────────────────────────────────────
// Variantes do Figma
// ───────────────────────────────────────────────────────────────────────────

/**
 * Variante `Padrão` do Figma — apenas título e descrição, sem slot de ações.
 */
export const Padrao: Story = {
  name: "Padrão (Figma)",
  args: {
    title: "Title",
    description: "Subtitle",
    actions: undefined,
    level: 2,
  },
};

/**
 * Variante `With actions` do Figma — botão primário verde + botão `outline`
 * com `ellipsis` (MoreHorizontal). O slot é qualquer ReactNode; aqui usamos
 * exatamente o mesmo arranjo do Figma.
 */
export const ComAcoes: Story = {
  name: "Com ações (Figma)",
  args: {
    title: "Title",
    description: "Subtitle",
    actions: defaultActions,
    variant: "default",
    level: 2,
  },
};

/**
 * Variante `Responsive` do Figma — em telas estreitas, as ações sobem para
 * o topo e o conteúdo fica embaixo. Use o viewport mobile do Storybook para
 * ver o comportamento.
 */
export const Responsivo: Story = {
  name: "Responsivo (Figma)",
  args: {
    title: "Title",
    description: "Subtitle",
    actions: defaultActions,
    variant: "responsive",
    level: 2,
  },
};

/**
 * Variante `Stacked` — ações sempre no topo, conteúdo embaixo. Útil em
 * sidebars/colunas estreitas.
 */
export const Empilhado: Story = {
  name: "Empilhado",
  args: {
    title: "Title",
    description: "Subtitle",
    actions: defaultActions,
    variant: "stacked",
    level: 2,
  },
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <PageHeader {...args} />
    </div>
  ),
};

// ───────────────────────────────────────────────────────────────────────────
// Exemplos reais do Figma
// ───────────────────────────────────────────────────────────────────────────

/**
 * Exemplo real do Figma — desktop. Layout horizontal com título, descrição
 * e dupla de ações (botão primário + menu).
 */
export const ExemploDesktop: Story = {
  name: "Exemplo — Desktop (Figma)",
  args: {
    title: "Análise prospecção",
    description: "Realize a análise de processos ou de carteiras de advogados e acompanhe os resultados.",
    actions: defaultActions,
    variant: "default",
    level: 2,
  },
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <div style={{ maxWidth: 1334 }}>
      <PageHeader {...args} />
    </div>
  ),
};

/**
 * Exemplo real do Figma — mobile/coluna estreita. Layout empilhado, com as
 * ações no topo e o título + descrição embaixo.
 */
export const ExemploMobile: Story = {
  name: "Exemplo — Mobile (Figma)",
  args: {
    title: "Análise prospecção",
    description: "Realize a análise de processos ou de carteiras de advogados e acompanhe os resultados.",
    actions: defaultActions,
    variant: "stacked",
    level: 2,
  },
  parameters: {
    layout: "centered",
    viewport: { defaultViewport: "mobile1" },
  },
  render: (args) => (
    <div style={{ width: 268 }}>
      <PageHeader {...args} />
    </div>
  ),
};

// ───────────────────────────────────────────────────────────────────────────
// Estados e composições
// ───────────────────────────────────────────────────────────────────────────

/**
 * Apenas título — sem descrição e sem ações.
 */
export const SoTitulo: Story = {
  name: "Apenas título",
  args: {
    title: "Painel principal",
    description: undefined,
    actions: undefined,
    level: 2,
  },
};

/**
 * Apenas ações no slot — útil em telas onde o título já está no breadcrumb
 * ou em outro container.
 */
export const SoAcoes: Story = {
  name: "Apenas ações",
  args: {
    title: undefined,
    description: undefined,
    actions: defaultActions,
    variant: "default",
  },
};

/**
 * Card vazio (sem título, descrição ou ações) — esqueleto enquanto a
 * página decide o que renderizar.
 */
export const Vazio: Story = {
  name: "Vazio (placeholder)",
  args: {
    title: undefined,
    description: undefined,
    actions: undefined,
  },
};

/**
 * Sem descrição, mas com ações — útil quando o título já é
 * autodescritivo (ex.: "Dashboard").
 */
export const SemDescricaoComAcoes: Story = {
  name: "Sem descrição, com ações",
  args: {
    title: "Dashboard",
    description: undefined,
    actions: defaultActions,
    variant: "default",
    level: 2,
  },
};

/**
 * Título acompanhado por um `Tag` à direita do texto — o slot `title` aceita
 * `ReactNode`, permitindo enriquecer com badges/tags.
 */
export const TituloComTag: Story = {
  name: "Título com Tag",
  args: {
    title: (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        Análise prospecção
        <Tag success>Ativo</Tag>
      </span>
    ),
    description: "Realize a análise de processos ou de carteiras de advogados e acompanhe os resultados.",
    actions: defaultActions,
    variant: "default",
    level: 2,
  },
};

/**
 * Descrição longa — verifica quebra de linha em viewports diversos.
 */
export const DescricaoLonga: Story = {
  name: "Descrição longa",
  args: {
    title: "Relatório consolidado de prospecção",
    description:
      "Esse cabeçalho contém uma descrição mais longa do que o padrão para validarmos a quebra de linha, o respiro vertical entre título e descrição e o comportamento da área de ações alinhada à direita quando o texto ocupa quase toda a largura do card.",
    actions: defaultActions,
    variant: "responsive",
    level: 2,
  },
};

/**
 * Slot de ações composto: filtro + exportar + menu.
 */
export const AcoesCustomizadas: Story = {
  name: "Ações customizadas",
  args: {
    title: "Processos",
    description: "Acompanhe todos os processos sob sua responsabilidade.",
    actions: (
      <>
        <Button type="outline" size="s" icon={<Filter size={16} />}>
          Filtrar
        </Button>
        <Button type="outline" size="s" icon={<Download size={16} />}>
          Exportar
        </Button>
        <Button type="primary" size="s">
          Novo processo
        </Button>
        <Button type="outline" size="s" icon={<MoreHorizontal size={16} />} aria-label="Mais opções" />
      </>
    ),
    variant: "default",
    level: 2,
  },
};

/**
 * Heading semântico ajustado — quando o `PageHeader` está dentro de uma
 * página que já possui um `h1`, é possível reduzir o nível semântico
 * sem alterar a aparência visual.
 */
export const HeadingNivelAjustado: Story = {
  name: "Heading semântico (h2)",
  args: {
    title: "Seção secundária",
    description: "Renderizado como `<h2>` para preservar a hierarquia.",
    actions: defaultActions,
    level: 2,
    variant: "default",
  },
};

// ───────────────────────────────────────────────────────────────────────────
// Comparativo de variantes
// ───────────────────────────────────────────────────────────────────────────

/**
 * Grid comparativa com as três variantes (`default`, `responsive`, `stacked`)
 * lado a lado para inspeção visual rápida.
 */
export const ComparativoVariantes: Story = {
  name: "Comparativo de variantes",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <section>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#525252" }}>variant = default</h4>
        <PageHeader
          title="Análise prospecção"
          description="Realize a análise de processos ou de carteiras de advogados e acompanhe os resultados."
          actions={defaultActions}
          variant="default"
          level={5}
        />
      </section>
      <section>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#525252" }}>variant = responsive</h4>
        <PageHeader
          title="Análise prospecção"
          description="Realize a análise de processos ou de carteiras de advogados e acompanhe os resultados."
          actions={defaultActions}
          variant="responsive"
          level={5}
        />
      </section>
      <section style={{ maxWidth: 320 }}>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#525252" }}>variant = stacked</h4>
        <PageHeader
          title="Análise prospecção"
          description="Realize a análise de processos ou de carteiras de advogados e acompanhe os resultados."
          actions={defaultActions}
          variant="stacked"
          level={5}
        />
      </section>
    </div>
  ),
};

// ───────────────────────────────────────────────────────────────────────────
// Playground
// ───────────────────────────────────────────────────────────────────────────

/**
 * Playground livre — edite todos os controles pelo painel `Controls` do
 * Storybook para testar combinações de título, descrição, variante e nível
 * semântico.
 */
export const Playground: Story = {
  args: {
    title: "Análise prospecção",
    description: "Realize a análise de processos ou de carteiras de advogados e acompanhe os resultados.",
    actions: defaultActions,
    variant: "responsive",
    level: 2,
  },
};
