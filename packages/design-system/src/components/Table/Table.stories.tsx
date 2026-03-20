import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import type { ColumnsType } from "antd/es/table";
import {
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Table } from "./Table";
import { Badge } from "../Badge";
import { Checkbox } from "../Checkbox";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4069-6603&m=dev";
const TRANSACTIONS_FIGMA_URL = "https://www.figma.com/design/W8c4OGU0SYKy2rrGiUSTYL/Transa%C3%A7%C3%B5es?node-id=6003-8239&m=dev";

type Story = StoryObj<typeof Table>;

type DesktopRow = {
  key: string;
  selected?: boolean;
  checked?: boolean;
  id: string;
  cliente: string;
  processo: string;
  valor: string;
  status: "Aprovado" | "Em análise" | "Pendente";
};

type TransactionRow = {
  key: string;
  id: string;
  cliente: string;
  clienteSecundario: string;
  processo: string;
  infosVenda: string;
  infosSecundarias: string;
  valores: string;
  valoresSecundarios: string;
  status: "Concluído" | "Pendente" | "Cancelado";
};

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
Tabela baseada no Ant Design com acabamento visual do design system da JusCash.

Links de referência:
- Design system: ${FIGMA_URL}
- Exemplo real de uso: ${TRANSACTIONS_FIGMA_URL}
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <div style={{ marginTop: "2rem", display: "grid", gap: "1.5rem" }}>
            <div>
              <h3 style={{ margin: "0 0 0.75rem", fontSize: "1rem", fontWeight: 700 }}>Figma Spec</h3>
              <Figma showLink url={FIGMA_URL} height="420px" />
            </div>
            <div>
              <h3 style={{ margin: "0 0 0.75rem", fontSize: "1rem", fontWeight: 700 }}>Figma Usage Example</h3>
              <Figma showLink url={TRANSACTIONS_FIGMA_URL} height="320px" />
            </div>
          </div>
          <Stories />
        </>
      ),
    },
  },
};

export default meta;

const surfaceStyle: React.CSSProperties = {
  border: "1px solid #d4d4d4",
  borderRadius: 8,
  background: "#fafafa",
  padding: 24,
};

const exampleStackStyle: React.CSSProperties = {
  display: "grid",
  gap: 24,
};

const figmaLabelStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "monospace",
  fontSize: 14,
  lineHeight: "18px",
  color: "#6e33ff",
};

const tableViewportStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "100%",
  overflowX: "auto",
  overflowY: "hidden",
  paddingBottom: 4,
  boxSizing: "border-box",
};

function Section(props: { label: string; children: React.ReactNode; width?: number | string }) {
  const { label, children, width = "100%" } = props;
  const resolvedWidth =
    typeof width === "number" ? { width: "100%", maxWidth: width } : width === "100%" ? { width } : { width };

  return (
    <div style={resolvedWidth}>
      <p style={figmaLabelStyle}>{label}</p>
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

function CellText(props: { primary: string; secondary?: string; strong?: boolean; gapPx?: number }) {
  const { primary, secondary, strong = false, gapPx = 2 } = props;

  return (
    <div style={{ minWidth: 0, display: "grid", gap: secondary ? gapPx : 0 }}>
      <div
        style={{
          margin: 0,
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          lineHeight: "15.6px",
          fontWeight: strong ? 700 : 400,
          color: "#262626",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {primary}
      </div>
      {secondary ? (
        <div
          style={{
            margin: 0,
            fontFamily: "Inter, sans-serif",
            fontSize: 10,
            lineHeight: "12px",
            color: "#737373",
          }}
        >
          {secondary}
        </div>
      ) : null}
    </div>
  );
}

function StatusPill(props: { status: "Concluído" | "Pendente" | "Cancelado" | "Aprovado" | "Em análise" | "Pendente"; compact?: boolean }) {
  const { status, compact = false } = props;
  const statusColor = status === "Concluído" || status === "Aprovado" ? "success" : status === "Cancelado" ? "error" : "caution";

  return (
    <Badge
      variant="secondary"
      statusColor={statusColor}
      styles={{
        indicator: {
          minHeight: compact ? 20 : 24,
          height: compact ? 20 : 24,
          paddingInline: 8,
          paddingBlock: compact ? 2 : 4,
          borderRadius: 8,
          fontSize: 13,
          lineHeight: "15.6px",
          fontWeight: 400,
          whiteSpace: "nowrap",
        },
      }}
    >
      {status}
    </Badge>
  );
}

function ActionIconButton(props: { icon: React.ReactNode; label: string; destructive?: boolean; size?: number; onClick?: () => void }) {
  const { icon, label, destructive = false, size = 32, onClick } = props;

  return (
    <button
      aria-label={label}
      type="button"
      onClick={onClick}
      style={{
        width: size,
        minWidth: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        border: "1px solid transparent",
        borderRadius: 8,
        background: "transparent",
        color: destructive ? "#d2190b" : "#262626",
        cursor: "pointer",
      }}
    >
      {icon}
    </button>
  );
}

const baseColumns: ColumnsType<{ key: string; nome: string; email: string; status: string }> = [
  { title: "Nome", dataIndex: "nome", key: "nome", sorter: (a, b) => a.nome.localeCompare(b.nome) },
  { title: "Email", dataIndex: "email", key: "email", ellipsis: true },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: string) => <StatusPill status={value === "Ativo" ? "Concluído" : "Pendente"} compact />,
  },
];

const baseData = [
  { key: "1", nome: "Julia Mascarenhas", email: "julia@juscash.com", status: "Ativo" },
  { key: "2", nome: "Julia Flor", email: "julia.flor@juscash.com", status: "Pendente" },
  { key: "3", nome: "Iago Silva", email: "iago@juscash.com", status: "Ativo" },
];

const desktopDataColumns: ColumnsType<DesktopRow> = [
  {
    title: "ID",
    dataIndex: "id",
    width: 84,
    sorter: (a, b) => Number(a.id) - Number(b.id),
  },
  {
    title: "Cliente principal",
    dataIndex: "cliente",
    width: 229.5,
    sorter: (a, b) => a.cliente.localeCompare(b.cliente),
    render: (value: string) => <CellText primary={value} />,
  },
  {
    title: "Processo",
    dataIndex: "processo",
    width: 229.5,
    sorter: (a, b) => a.processo.localeCompare(b.processo),
    render: (value: string) => <CellText primary={value} />,
  },
  {
    title: "Valor",
    dataIndex: "valor",
    width: 229.5,
    sorter: (a, b) => Number(a.valor.replace(/\D/g, "")) - Number(b.valor.replace(/\D/g, "")),
    render: (value: string) => <CellText primary={value} />,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 80,
    render: (value: DesktopRow["status"]) => <StatusPill status={value} compact />,
  },
  {
    title: "",
    key: "actions-placeholder",
    width: 48,
    render: () => <ActionIconButton icon={<MoreHorizontal size={16} />} label="Ações" size={24} />,
  },
];

const desktopRows: DesktopRow[] = [
  { key: "1", selected: true, checked: true, id: "3401", cliente: "Ana Souza", processo: "0002457-65.2026", valor: "R$ 12.350,00", status: "Aprovado" },
  { key: "2", id: "3402", cliente: "Bruno Lima", processo: "0002458-22.2026", valor: "R$ 7.480,00", status: "Em análise" },
  { key: "3", id: "3403", cliente: "Carla Dias", processo: "0002459-11.2026", valor: "R$ 3.190,00", status: "Pendente" },
  { key: "4", id: "3404", cliente: "Diego Ramos", processo: "0002460-98.2026", valor: "R$ 16.250,00", status: "Aprovado" },
  { key: "5", id: "3405", cliente: "Elisa Prado", processo: "0002461-74.2026", valor: "R$ 8.900,00", status: "Em análise" },
];

const desktopStoryRows: DesktopRow[] = Array.from({ length: 30 }, (_, index) => {
  const seed = desktopRows[index % desktopRows.length];
  const sequence = 3401 + index;

  return {
    ...seed,
    key: `desktop-${sequence}`,
    id: String(sequence),
    processo: `0002${457 + index}-${10 + (index % 89)}.2026`,
    checked: index === 0,
    selected: index === 0,
  };
});

function buildDesktopColumns(props: {
  rows: DesktopRow[];
  selectedKeys: string[];
  setSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  deleteAction?: boolean;
  openActionKey: string | null;
  setOpenActionKey: React.Dispatch<React.SetStateAction<string | null>>;
  onDeleteRow: (key: string) => void;
}): ColumnsType<DesktopRow> {
  const { rows, selectedKeys, setSelectedKeys, deleteAction = false, openActionKey, setOpenActionKey, onDeleteRow } = props;
  const allSelected = rows.length > 0 && rows.every((row) => selectedKeys.includes(row.key));

  return [
    {
      title: (
        <Checkbox
          checked={allSelected}
          onChange={(event) => {
            setSelectedKeys(event.target.checked ? rows.map((row) => row.key) : []);
          }}
        />
      ),
      dataIndex: "checked",
      key: "checked",
      width: 32,
      render: (_value, record) => (
        <Checkbox
          checked={selectedKeys.includes(record.key)}
          onChange={(event) => {
            setSelectedKeys((current) =>
              event.target.checked ? [...new Set([...current, record.key])] : current.filter((key) => key !== record.key),
            );
          }}
        />
      ),
    },
    ...desktopDataColumns.slice(0, -1),
    {
      title: "",
      key: deleteAction ? "delete" : "actions",
      width: 48,
      render: (_value, record) => (
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          {deleteAction ? (
            <ActionIconButton
              icon={<Trash2 size={16} />}
              label="Excluir"
              destructive
              size={24}
              onClick={() => onDeleteRow(record.key)}
            />
          ) : (
            <>
              <ActionIconButton
                icon={<MoreHorizontal size={16} />}
                label="Ações"
                size={24}
                onClick={() => {
                  setOpenActionKey((current) => (current === record.key ? null : record.key));
                }}
              />
              {openActionKey === record.key ? (
                <div
                  style={{
                    position: "absolute",
                    top: 28,
                    right: 0,
                    width: 168,
                    border: "1px solid #d4d4d4",
                    borderRadius: 8,
                    background: "#fafafa",
                    boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    zIndex: 3,
                  }}
                >
                  {["Ver detalhes", "Editar", "Arquivar"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setOpenActionKey(null)}
                      style={{
                        width: "100%",
                        minHeight: 32,
                        padding: "4px 8px",
                        display: "flex",
                        alignItems: "center",
                        border: "none",
                        background: "#fafafa",
                        color: "#262626",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 13,
                        lineHeight: "15.6px",
                        cursor: "pointer",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      ),
    },
  ];
}

function SelectableDesktopTable(props: {
  rows: DesktopRow[];
  deleteAction?: boolean;
  scroll?: { x?: number; y?: number };
  pagination?: false | {
    total: number;
    pageSize: number;
    current: number;
    showSizeChanger: true;
    pageSizeOptions: string[];
    showTotal: () => string;
    onChange?: (page: number, pageSize: number) => void;
    onShowSizeChange?: (current: number, size: number) => void;
  };
}) {
  const { rows, deleteAction = false, scroll, pagination } = props;
  const [localRows, setLocalRows] = React.useState<DesktopRow[]>(rows);
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(() =>
    rows.filter((row) => row.checked || row.selected).map((row) => row.key),
  );
  const [openActionKey, setOpenActionKey] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(pagination && pagination !== false ? pagination.current : 1);
  const [pageSize, setPageSize] = React.useState(pagination && pagination !== false ? pagination.pageSize : 15);

  const mergedPagination =
    pagination === false ?
      false
    : {
        ...pagination,
        total: localRows.length,
        current: currentPage,
        pageSize,
        showTotal: () => `Quantidade total ${localRows.length}`,
        onChange: (page: number, nextPageSize: number) => {
          setCurrentPage(page);
          setPageSize(nextPageSize);
          setOpenActionKey(null);
        },
        onShowSizeChange: (page: number, size: number) => {
          setCurrentPage(page);
          setPageSize(size);
          setOpenActionKey(null);
        },
      };

  return (
    <div style={tableViewportStyle}>
      <Table
        columns={buildDesktopColumns({
          rows: localRows,
          selectedKeys,
          setSelectedKeys,
          deleteAction,
          openActionKey,
          setOpenActionKey,
          onDeleteRow: (key) => {
            setLocalRows((current) => current.filter((row) => row.key !== key));
            setSelectedKeys((current) => current.filter((item) => item !== key));
            setOpenActionKey((current) => (current === key ? null : current));
          },
        })}
        dataSource={localRows}
        pagination={mergedPagination}
        rowClassName={(record) => (selectedKeys.includes(record.key) ? "ds-table-row-selected" : "")}
        scroll={scroll}
      />
    </div>
  );
}

function TransactionsTablePreview() {
  const [rows] = React.useState<TransactionRow[]>(transactionStoryRows);
  const [openActionKey, setOpenActionKey] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(15);

  return (
    <div style={tableViewportStyle}>
      <Table
        columns={[
          ...transactionsColumns.slice(0, -1),
          {
            title: "Ações",
            key: "acoes",
            width: 88,
            render: (_value, record) => (
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                <ActionIconButton
                  icon={<MoreHorizontal size={16} />}
                  label="Ações"
                  onClick={() => {
                    setOpenActionKey((current) => (current === record.key ? null : record.key));
                  }}
                />
                {openActionKey === record.key ? (
                  <div
                    style={{
                      position: "absolute",
                      top: 32,
                      right: 0,
                      width: 168,
                      border: "1px solid #d4d4d4",
                      borderRadius: 8,
                      background: "#fafafa",
                      boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      zIndex: 3,
                    }}
                  >
                    {["Ver detalhes", "Editar", "Baixar comprovante"].map((label) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setOpenActionKey(null)}
                        style={{
                          width: "100%",
                          minHeight: 32,
                          padding: "4px 8px",
                          display: "flex",
                          alignItems: "center",
                          border: "none",
                          background: "#fafafa",
                          color: "#262626",
                          fontFamily: "Inter, sans-serif",
                          fontSize: 13,
                          lineHeight: "15.6px",
                          cursor: "pointer",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ),
          },
        ]}
        dataSource={rows}
        pagination={{
          total: rows.length,
          pageSize,
          current: currentPage,
          showSizeChanger: true,
          pageSizeOptions: ["15", "30", "50"],
          showTotal: () => `Quantidade total ${rows.length}`,
          onChange: (page, nextPageSize) => {
            setCurrentPage(page);
            setPageSize(nextPageSize);
            setOpenActionKey(null);
          },
          onShowSizeChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
            setOpenActionKey(null);
          },
        }}
        rowClassName={() => "ds-table-row-multiline"}
        scroll={{ x: 1246 }}
      />
    </div>
  );
}

const transactionsColumns: ColumnsType<TransactionRow> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 68,
    sorter: (a, b) => Number(a.id) - Number(b.id),
  },
  {
    title: "Cliente principal",
    dataIndex: "cliente",
    key: "cliente",
    width: 220,
    sorter: (a, b) => a.cliente.localeCompare(b.cliente),
    render: (_value: string, record) => <CellText primary={record.cliente} secondary={record.clienteSecundario} gapPx={4} />,
  },
  {
    title: "Processo",
    dataIndex: "processo",
    key: "processo",
    width: 220,
    sorter: (a, b) => a.processo.localeCompare(b.processo),
    render: (value: string) => <CellText primary={value} secondary="Cível · São Paulo" gapPx={4} />,
  },
  {
    title: "Infos venda",
    dataIndex: "infosVenda",
    key: "infosVenda",
    width: 240,
    render: (_value: string, record) => <CellText primary={record.infosVenda} secondary={record.infosSecundarias} gapPx={4} />,
  },
  {
    title: "Valores (R$)",
    dataIndex: "valores",
    key: "valores",
    width: 170,
    align: "left",
    render: (_value: string, record) => <CellText primary={record.valores} secondary={record.valoresSecundarios} strong gapPx={4} />,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 140,
    render: (value: TransactionRow["status"]) => <StatusPill status={value} />,
  },
  {
    title: "Ações",
    key: "acoes",
    width: 88,
    render: () => <ActionIconButton icon={<MoreHorizontal size={16} />} label="Ações" />,
  },
];

const transactionRows: TransactionRow[] = [
  {
    key: "1",
    id: "3241",
    cliente: "Maria Fernanda",
    clienteSecundario: "CPF 117.***.***-90",
    processo: "0002457-65.2026.8.26.0100",
    infosVenda: "Contrato CJ-2026-001",
    infosSecundarias: "15/03/2026 · Portabilidade",
    valores: "12.350,00",
    valoresSecundarios: "Líquido 11.720,50",
    status: "Concluído",
  },
  {
    key: "2",
    id: "3242",
    cliente: "Marcos Vinícius",
    clienteSecundario: "CPF 991.***.***-18",
    processo: "0002458-22.2026.8.26.0100",
    infosVenda: "Contrato CJ-2026-002",
    infosSecundarias: "16/03/2026 · Refinanciamento",
    valores: "7.480,00",
    valoresSecundarios: "Líquido 6.950,30",
    status: "Pendente",
  },
  {
    key: "3",
    id: "3243",
    cliente: "Patrícia Gomes",
    clienteSecundario: "CPF 405.***.***-42",
    processo: "0002459-11.2026.8.26.0100",
    infosVenda: "Contrato CJ-2026-003",
    infosSecundarias: "17/03/2026 · Antecipação",
    valores: "3.190,00",
    valoresSecundarios: "Líquido 2.988,90",
    status: "Cancelado",
  },
  {
    key: "4",
    id: "3244",
    cliente: "Rafael Moura",
    clienteSecundario: "CPF 223.***.***-07",
    processo: "0002460-98.2026.8.26.0100",
    infosVenda: "Contrato CJ-2026-004",
    infosSecundarias: "17/03/2026 · Portabilidade",
    valores: "16.250,00",
    valoresSecundarios: "Líquido 15.690,00",
    status: "Concluído",
  },
];

const transactionStoryRows: TransactionRow[] = Array.from({ length: 20 }, (_, index) => {
  const seed = transactionRows[index % transactionRows.length];

  return {
    ...seed,
    key: `transaction-${3241 + index}`,
    id: String(3241 + index),
    infosVenda: `Contrato CJ-2026-${String(index + 1).padStart(3, "0")}`,
  };
});

export const Default: Story = {
  args: {
    columns: baseColumns,
    dataSource: baseData,
    pagination: { pageSize: 5, showSizeChanger: true },
  },
};

export const FigmaExamples: Story = {
  name: "Figma — Examples",
  render: () => (
    <div style={surfaceStyle}>
      <div style={exampleStackStyle}>
        <Section label="quantity per page" width={760}>
          <SelectableDesktopTable
            rows={desktopStoryRows}
            pagination={{
              total: 68,
              pageSize: 15,
              current: 1,
              showSizeChanger: true,
              pageSizeOptions: ["15", "30", "50"],
              showTotal: () => "Quantidade total 68",
            }}
          />
        </Section>

        <Section label="desktop example" width={1078}>
          <SelectableDesktopTable
            rows={desktopStoryRows}
            pagination={{
              total: 68,
              pageSize: 15,
              current: 1,
              showSizeChanger: true,
              pageSizeOptions: ["15", "30", "50"],
              showTotal: () => "Quantidade total 68",
            }}
          />
        </Section>

        <Section label="sticky header" width={1078}>
          <SelectableDesktopTable
            rows={[...desktopStoryRows, ...desktopStoryRows].map((row, index) => ({
              ...row,
              key: `${row.key}-sticky-${index}`,
              selected: false,
              checked: false,
            }))}
            pagination={false}
            scroll={{ y: 220 }}
          />
        </Section>

        <Section label="delete action" width={1078}>
          <SelectableDesktopTable
            rows={desktopStoryRows}
            deleteAction
            pagination={{
              total: 68,
              pageSize: 15,
              current: 1,
              showSizeChanger: true,
              pageSizeOptions: ["15", "30", "50"],
              showTotal: () => "Quantidade total 68",
            }}
          />
        </Section>

        <Section label="transactions example" width={1246}>
          <TransactionsTablePreview />
        </Section>
      </div>
    </div>
  ),
};

export const Transactions: Story = {
  name: "Transactions Example",
  render: () => (
    <div style={surfaceStyle}>
      <div style={{ display: "grid", gap: 12 }}>
        <p style={figmaLabelStyle}>transactions</p>
        <TransactionsTablePreview />
      </div>
    </div>
  ),
};
