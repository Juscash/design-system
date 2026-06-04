import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import type { CSSProperties } from "react";
import type { ColumnsType } from "antd/es/table";
import { Table } from ".";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4069-6603&m=dev";

type Row = {
  key: string;
  nome: string;
  processo: string;
  valor: string;
  data: string;
  status: string;
  posicao?: number;
};

const COLUMNS_DEFAULT: ColumnsType<Row> = [
  { title: "Nome", dataIndex: "nome", key: "nome", ellipsis: true },
  { title: "Processo", dataIndex: "processo", key: "processo", ellipsis: true },
  { title: "Valor", dataIndex: "valor", key: "valor" },
  { title: "Data", dataIndex: "data", key: "data" },
  { title: "Status", dataIndex: "status", key: "status" },
];

const COLUMNS_SORTABLE: ColumnsType<Row> = [
  {
    title: "Nome",
    dataIndex: "nome",
    key: "nome",
    ellipsis: true,
    sorter: (a, b) => a.nome.localeCompare(b.nome),
    defaultSortOrder: "ascend",
  },
  { title: "Processo", dataIndex: "processo", key: "processo", ellipsis: true },
  {
    title: "Valor",
    dataIndex: "valor",
    key: "valor",
    sorter: (a, b) => a.valor.localeCompare(b.valor),
  },
  { title: "Data", dataIndex: "data", key: "data" },
  { title: "Status", dataIndex: "status", key: "status" },
];

/**
 * O `Table` não injeta tooltip automaticamente — quem quiser tooltip numa
 * célula precisa envolver o valor via `render` (o tooltip alinha pelo TEXTO da
 * célula, não pelo `<th>` da coluna). `inline-block` + `max-width: 100%` faz o
 * span ocupar apenas o tamanho do texto; quando excede o espaço, o ellipsis
 * kicka pelo `max-width`.
 */
const ELLIPSIS_CELL_STYLE: CSSProperties = {
  display: "inline-block",
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
};

function renderWithTooltip(value: string): React.ReactNode {
  return (
    <Tooltip title={value}>
      <span style={ELLIPSIS_CELL_STYLE}>{value}</span>
    </Tooltip>
  );
}

const COLUMNS_TOOLTIP: ColumnsType<Row> = [
  { title: "Nome", dataIndex: "nome", key: "nome", ellipsis: true, render: (value: string) => renderWithTooltip(value) },
  { title: "Processo", dataIndex: "processo", key: "processo", ellipsis: true },
  { title: "Valor", dataIndex: "valor", key: "valor", render: (value: string) => renderWithTooltip(value) },
  { title: "Data", dataIndex: "data", key: "data", render: (value: string) => renderWithTooltip(value) },
  { title: "Status", dataIndex: "status", key: "status", render: (value: string) => renderWithTooltip(value) },
];

const STATUS_BADGE_COLOR: Record<string, "success" | "warning" | "error" | "info"> = {
  Aprovado: "success",
  Pendente: "warning",
  Cancelado: "error",
  "Em análise": "info",
};

const COLUMNS_BADGE: ColumnsType<Row> = [
  { title: "Nome", dataIndex: "nome", key: "nome", ellipsis: true },
  { title: "Processo", dataIndex: "processo", key: "processo", ellipsis: true },
  { title: "Valor", dataIndex: "valor", key: "valor" },
  { title: "Data", dataIndex: "data", key: "data" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 140,
    render: (value: string) => (
      <Badge variant="outline" statusColor={STATUS_BADGE_COLOR[value] ?? "info"}>
        {value}
      </Badge>
    ),
  },
];

const COLUMNS_ACTIONS: ColumnsType<Row> = [
  { title: "Nome", dataIndex: "nome", key: "nome", ellipsis: true },
  { title: "Processo", dataIndex: "processo", key: "processo", ellipsis: true },
  { title: "Valor", dataIndex: "valor", key: "valor" },
  { title: "Data", dataIndex: "data", key: "data" },
  { title: "Status", dataIndex: "status", key: "status" },
  {
    title: "#",
    key: "actions",
    width: 160,
    align: "right",
    render: () => (
      <div style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
        <Button variant="primary" size="s" icon="Heart" tooltip="Favoritar" />
        <Button variant="secondary" size="s" icon="Pencil" tooltip="Editar" />
        <Button variant="destructive" size="s" icon="Trash2" tooltip="Excluir" />
      </div>
    ),
  },
];

/**
 * Colunas da seção Responsive — inclui `posicao` (id) que vai para o header
 * do card e `actions` (apenas trash, como no Figma Prospecção `5101:54788`)
 * que vai para o footer.
 */
const COLUMNS_RESPONSIVE: ColumnsType<Row> = [
  { title: "Posição", dataIndex: "posicao", key: "posicao" },
  { title: "Nº processo", dataIndex: "processo", key: "processo" },
  { title: "Enviado por", dataIndex: "nome", key: "nome" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Horário da busca", dataIndex: "data", key: "data" },
  {
    title: "",
    key: "actions",
    width: 48,
    align: "left",
    render: () => (
      <div style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
        <Button variant="destructive" size="s" icon="Trash2" tooltip="Excluir" />
      </div>
    ),
  },
];

const DATA: Row[] = [
  { key: "1", posicao: 1, nome: "Lorem ipsum dolor", processo: "0001234-56.2026.8.26.0100", valor: "R$ 12.350,00", data: "15/03/2026", status: "Aprovado" },
  { key: "2", posicao: 2, nome: "Consectetur adipiscing", processo: "0001235-78.2026.8.26.0100", valor: "R$ 7.480,00", data: "16/03/2026", status: "Pendente" },
  { key: "3", posicao: 3, nome: "Sed do eiusmod", processo: "0001236-90.2026.8.26.0100", valor: "R$ 3.190,00", data: "17/03/2026", status: "Cancelado" },
  { key: "4", posicao: 4, nome: "Tempor incididunt ut", processo: "0001237-12.2026.8.26.0100", valor: "R$ 16.250,00", data: "17/03/2026", status: "Em análise" },
  { key: "5", posicao: 5, nome: "Labore et dolore", processo: "0001238-34.2026.8.26.0100", valor: "R$ 8.900,00", data: "18/03/2026", status: "Pendente" },
];

const DATA_PAGINATED: Row[] = [
  ...DATA,
  { key: "6", nome: "Magna aliqua enim", processo: "0001239-56.2026.8.26.0100", valor: "R$ 5.100,00", data: "19/03/2026", status: "Aprovado" },
  { key: "7", nome: "Quis nostrud exercitation", processo: "0001240-78.2026.8.26.0100", valor: "R$ 9.800,00", data: "20/03/2026", status: "Pendente" },
  { key: "8", nome: "Ullamco laboris nisi", processo: "0001241-90.2026.8.26.0100", valor: "R$ 4.430,00", data: "21/03/2026", status: "Cancelado" },
  { key: "9", nome: "Aliquip ex ea commodo", processo: "0001242-11.2026.8.26.0100", valor: "R$ 10.300,00", data: "22/03/2026", status: "Aprovado" },
  { key: "10", nome: "Consequat duis aute", processo: "0001243-22.2026.8.26.0100", valor: "R$ 4.890,00", data: "23/03/2026", status: "Pendente" },
  { key: "11", nome: "Irure dolor in", processo: "0001244-33.2026.8.26.0100", valor: "R$ 6.750,00", data: "24/03/2026", status: "Em análise" },
  { key: "12", nome: "Reprehenderit in voluptate", processo: "0001245-44.2026.8.26.0100", valor: "R$ 13.220,00", data: "25/03/2026", status: "Aprovado" },
];

const DATA_TOOLTIP: Row[] = [
  { key: "t1", nome: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", processo: "0001234-56.2026.8.26.0100 - Vara Cível Central", valor: "R$ 12.350,00", data: "15/03/2026", status: "Aprovado" },
  { key: "t2", nome: "Consectetur adipiscing elit sed do eiusmod tempor", processo: "0001235-78.2026.8.26.0100 - Vara da Fazenda", valor: "R$ 7.480,00", data: "16/03/2026", status: "Pendente" },
  { key: "t3", nome: "Sed do eiusmod tempor incididunt ut labore et dolore magna", processo: "0001236-90.2026.8.26.0100 - Juizado Especial", valor: "R$ 3.190,00", data: "17/03/2026", status: "Cancelado" },
];

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
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
Tabela de dados do design system — wrapper sobre o [Ant Design Table](https://ant.design/components/table) com tokens, locale pt-BR e props proprietárias.

### Props proprietárias (Juscash)
- **\`emptyState\`**: estado vazio custom — \`{ title, description, icon }\` (ícone Lucide por nome) ou um \`ReactNode\`.
- **\`skeleton\`**: estado de carregamento — \`true\` (5 linhas), número (N linhas) ou \`{ rows, animated }\`. Tem precedência sobre \`loading\`.
- **\`bulkActions\`**: barra de ações em lote acima da tabela, visível quando \`rowSelection.selectedRowKeys\` tem itens.
- **\`responsive\`**: \`"scroll"\` | \`"cards"\` | \`"auto"\` (default — vira cards em viewport < 768px).
- **\`cardLayout\`**: distribui colunas entre header/body/footer no modo cards (\`{ header, footer }\`).
- **\`sortIcons\`**: trio de ícones de ordenação custom.

Tooltip e Badge nas células são **opt-in** via \`columns[].render\` — o consumidor escolhe quais colunas recebem.

### Como usar
\`\`\`tsx
import { Table } from "@juscash/design-system";

function Example() {
  return <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />;
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
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="420px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    responsive: {
      control: "select",
      options: ["scroll", "cards", "auto"],
      description: "Estratégia de responsividade. `auto` vira cards em < 768px.",
    },
    size: {
      control: "select",
      options: ["large", "middle", "small"],
      description: "Densidade das linhas/células (prop do antd).",
    },
    bordered: { control: "boolean" },
    sticky: { control: "boolean" },
    columns: { control: false },
    dataSource: { control: false },
    pagination: { control: false },
    rowSelection: { control: false },
    emptyState: { control: false },
    bulkActions: { control: false },
    cardLayout: { control: false },
    skeleton: { control: false },
    sortIcons: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

/** Tabela padrão com 5 colunas e 5 linhas. Sem paginação. */
export const Default: Story = {
  args: {
    columns: COLUMNS_DEFAULT as ColumnsType<unknown>,
    dataSource: DATA,
    pagination: false,
  },
};

/** Paginação com 5 itens por página, seletor de quantidade e contagem total. */
export const WithPagination: Story = {
  name: "Com paginação",
  args: {
    columns: COLUMNS_DEFAULT as ColumnsType<unknown>,
    dataSource: DATA_PAGINATED,
    pagination: {
      pageSize: 5,
      showSizeChanger: true,
      pageSizeOptions: ["5", "10", "25"],
    },
  },
};

/** Coluna `Nome` ordenável (asc por default) e coluna `Valor` ordenável por clique no cabeçalho. */
export const Sortable: Story = {
  name: "Ordenação por coluna",
  args: {
    columns: COLUMNS_SORTABLE as ColumnsType<unknown>,
    dataSource: DATA,
    pagination: false,
  },
};

/** Estado vazio com `title`, `description` e `icon` custom via prop `emptyState`. */
export const EmptyState: Story = {
  name: "Estado vazio",
  args: {
    columns: COLUMNS_DEFAULT as ColumnsType<unknown>,
    dataSource: [],
    pagination: false,
    emptyState: {
      title: "Nenhum processo encontrado",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: "Inbox",
    },
  },
};

/** Prop `size="small"` do antd — linhas e células mais compactas. */
export const Compact: Story = {
  name: "Compact / small",
  args: {
    columns: COLUMNS_DEFAULT as ColumnsType<unknown>,
    dataSource: DATA,
    pagination: false,
    size: "small",
  },
};

/** Container com altura fixa e scroll vertical; header fixo via `sticky` + `scroll.y`. */
export const StickyHeader: Story = {
  name: "Sticky header",
  args: {
    columns: COLUMNS_DEFAULT as ColumnsType<unknown>,
    dataSource: DATA_PAGINATED,
    pagination: false,
    scroll: { y: 200 },
    sticky: true,
  },
};

/** Prop `skeleton` (boolean ou número) substitui a tabela por N barras placeholder. */
export const Loading: Story = {
  name: "Loading / skeleton",
  args: {
    columns: COLUMNS_DEFAULT as ColumnsType<unknown>,
    dataSource: [],
    pagination: false,
    skeleton: 6,
  },
};

/**
 * Tooltip é opt-in via `columns[].render`. Aqui todas as colunas mostram
 * tooltip no hover, exceto `Processo` — evidenciando o opt-in coluna a coluna.
 */
export const WithTooltip: Story = {
  name: "Tooltip (opt-in via render)",
  render: () => <Table<Row> columns={COLUMNS_TOOLTIP} dataSource={DATA_TOOLTIP} pagination={false} />,
};

/** Coluna de status usando o componente `Badge` com `statusColor` dinâmico por valor. */
export const WithBadge: Story = {
  name: "Badge",
  render: () => <Table<Row> columns={COLUMNS_BADGE} dataSource={DATA} pagination={false} />,
};

/**
 * `rowSelection.type="checkbox"` com 3 linhas pré-selecionadas. A barra de
 * bulk action aparece acima da tabela com label e botões customizáveis.
 */
export const MultipleSelection: Story = {
  name: "Seleção múltipla (checkbox)",
  render: () => {
    function Demo(): React.ReactElement {
      const [selected, setSelected] = useState<React.Key[]>(["1", "2", "3"]);
      return (
        <Table<Row>
          columns={COLUMNS_DEFAULT}
          dataSource={DATA}
          pagination={false}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selected,
            onChange: (keys) => setSelected(keys),
          }}
          bulkActions={{
            actions: (
              <>
                <Button variant="secondary" size="s">
                  Arquivar
                </Button>
                <Button variant="secondary" size="s">
                  Mover
                </Button>
                <Button variant="outline" size="s" icon="Download" tooltip="Exportar" />
                <Button variant="primary" size="s">
                  Excluir selecionados
                </Button>
              </>
            ),
          }}
        />
      );
    }
    return <Demo />;
  },
};

/** Última coluna com botões de ação (`Heart`, `Pencil`, `Trash2`) alinhados à direita. */
export const Actions: Story = {
  name: "Ações",
  render: () => (
    <Table<Row>
      columns={COLUMNS_ACTIONS}
      dataSource={DATA}
      pagination={false}
      cardLayout={{ header: "nome", footer: "actions" }}
    />
  ),
};

/**
 * Modo `responsive="cards"` (Figma Prospecção `5101:54788`): cada linha vira um
 * cartão vertical com header (`cardLayout.header`), body e footer
 * (`cardLayout.footer`), dividers tocando as bordas e checkbox de seleção.
 */
export const ResponsiveCards: Story = {
  name: "Responsive — cards",
  render: () => {
    function Demo(): React.ReactElement {
      const [selected, setSelected] = useState<React.Key[]>([]);
      return (
        <Table<Row>
          columns={COLUMNS_RESPONSIVE}
          dataSource={DATA}
          pagination={{ pageSize: 5, showSizeChanger: true }}
          responsive="cards"
          cardLayout={{ header: "posicao", footer: "actions" }}
          rowSelection={{
            type: "checkbox",
            columnTitle: "Selecionar todos",
            selectedRowKeys: selected,
            onChange: (keys) => setSelected(keys),
          }}
        />
      );
    }
    return <Demo />;
  },
};

/** Playground controlado pelos Controls — ajuste `responsive`, `size`, `bordered` e `sticky`. */
export const Playground: Story = {
  args: {
    columns: COLUMNS_DEFAULT as ColumnsType<unknown>,
    dataSource: DATA,
    pagination: { pageSize: 5, showSizeChanger: true, pageSizeOptions: ["5", "10", "25"] },
    responsive: "scroll",
    bordered: false,
    size: "middle",
  },
};
