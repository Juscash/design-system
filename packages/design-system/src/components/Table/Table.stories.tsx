import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Flex } from "antd";
import { MoreHorizontal } from "lucide-react";
import { Table } from "./Table";
import { Tooltip } from "../Tooltip";
import { Body2, Caption } from "../Typography";
import { Tag } from "../Tag";
import { Button } from "../Button";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash";

type TableStoryProps = React.ComponentProps<typeof Table> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<TableStoryProps> = {
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
Componente de tabela baseado no [Ant Design Table](https://ant.design/components/table).

### Props:
- **Extended (Ant Design)**: Props padrão do AntD Table.

### Como usar:

\`\`\`tsx
import { Table } from "@juscash/design-system";

function Example() {
  return <Table columns={columns} dataSource={dataSource} />;
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
            <h3
              style={{
                marginBottom: "1rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              🎨 Figma Spec
            </h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>

          <Stories />
        </>
      ),
    },
  },
  args: {
    hover: false,
    active: false,
    focus: false,
  },
  argTypes: {
    hover: {
      control: "boolean",
      description: "Força o estado hover",
      table: { category: "Pseudo States" },
    },
    active: {
      control: "boolean",
      description: "Força o estado active",
      table: { category: "Pseudo States" },
    },
    focus: {
      control: "boolean",
      description: "Força o estado focus",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { hover, active, focus, className, ...props } = args;
    const pseudoClasses = [hover && "pseudo-hover", active && "pseudo-active", focus && "pseudo-focus-visible"]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return <Table {...props} className={mergedClassName} />;
  },
};

export default meta;
type Story = StoryObj<TableStoryProps>;

const columns = [
  { title: "Nome", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Status", dataIndex: "status", key: "status" },
];

const dataSource = [
  { key: "1", name: "João Silva", email: "joao@email.com", status: "Ativo" },
  {
    key: "2",
    name: "Maria Santos",
    email: "maria@email.com",
    status: "Inativo",
  },
  { key: "3", name: "Pedro Costa", email: "pedro@email.com", status: "Ativo" },
];

type ProcessoParte = {
  nome: string;
  status?: "Aprovado" | "Reprovado" | "A_verificar" | "Aprovado IA" | null;
};

type AnaliseMlProcesso = {
  key: string;
  created_at: string;
  numero_processo: string;
  tribunal: string;
  orgao_julgador: string;
  valor_acao: number;
  polo_ativo: ProcessoParte[];
  polo_passivo: ProcessoParte[];
  score: number;
  classificacao_ml: "Aprovado" | "Reprovado" | "A_verificar" | "Aprovado IA";
};

const formatToBrazilianDate = (value: string) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const getResultadoTag = (status: AnaliseMlProcesso["classificacao_ml"]) => {
  if (status === "Aprovado" || status === "Aprovado IA") {
    return <Tag success>{status}</Tag>;
  }
  if (status === "Reprovado") {
    return <Tag error>{status}</Tag>;
  }
  return <Tag warning>{status}</Tag>;
};

const getStatusLabel = (status?: ProcessoParte["status"]) => {
  if (!status) return null;
  const isSuccess = status === "Aprovado" || status === "Aprovado IA";
  const isWarning = status === "A_verificar";

  return (
    <Tag success={isSuccess} warning={isWarning} error={!isSuccess && !isWarning}>
      {status}
    </Tag>
  );
};

const productionColumns: ColumnsType<AnaliseMlProcesso> = [
  {
    title: "Nº processo",
    dataIndex: "created_at",
    width: 220,
    key: "created_at",
    ellipsis: true,
    sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    render: (_, record) => (
      <Flex vertical gap={2} style={{ minWidth: 0 }}>
        <Tooltip title={record.numero_processo} placement="topLeft">
          <Body2 ellipsis>{record.numero_processo}</Body2>
        </Tooltip>
        <Caption style={{ color: "#6D6D6E" }}>Analisado em {formatToBrazilianDate(record.created_at)}</Caption>
      </Flex>
    ),
  },
  {
    title: "Tribunal",
    dataIndex: "tribunal",

    ellipsis: true,

    key: "tribunal",
    sorter: (a, b) => a.tribunal.localeCompare(b.tribunal),
  },
  {
    title: "Orgão Julgador",
    dataIndex: "orgao_julgador",
    key: "orgao_julgador",
    ellipsis: true,
    sorter: (a, b) => a.orgao_julgador.localeCompare(b.orgao_julgador),
  },
  {
    title: "Valor ação",
    dataIndex: "valor_acao",
    key: "valor_acao",
    sorter: (a, b) => a.valor_acao - b.valor_acao,
    render: (_, record) => (
      <Tooltip title={`R$ ${formatCurrency(record.valor_acao)}`} placement="topLeft">
        <Body2 ellipsis>{`R$ ${formatCurrency(record.valor_acao)}`}</Body2>
      </Tooltip>
    ),
  },
  {
    title: "Polo ativo",
    dataIndex: "polo_ativo",
    key: "polo_ativo",
    ellipsis: true,
    render: (_, record) => {
      const nomes = record.polo_ativo.map((polo) => polo.nome).join(", ");
      return (
        <Tooltip title={nomes} placement="topLeft">
          <Body2 ellipsis>{nomes}</Body2>
        </Tooltip>
      );
    },
  },
  {
    title: "Polo passivo",
    dataIndex: "polo_passivo",
    key: "polo_passivo",
    ellipsis: true,
    render: (_, record) => {
      if (!record.polo_passivo?.length) return "-";
      const tooltipContent = (
        <Flex vertical gap={4} style={{ maxWidth: 260 }}>
          {record.polo_passivo.map((polo, index) => (
            <Flex vertical gap={2} key={index} style={{ minWidth: 0 }}>
              <Body2>{polo.nome}</Body2>
              {getStatusLabel(polo.status)}
            </Flex>
          ))}
        </Flex>
      );

      return (
        <Tooltip title={tooltipContent} placement="topLeft">
          <Flex vertical gap={2} style={{ minWidth: 0 }}>
            <Body2 ellipsis>{record.polo_passivo[0]?.nome}</Body2>
            {getStatusLabel(record.polo_passivo[0]?.status)}
          </Flex>
        </Tooltip>
      );
    },
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
    width: 90,
    sorter: (a, b) => a.score - b.score,
    render: (_, record) => <Body2 strong>{record.score}</Body2>,
    ellipsis: true,
  },
  {
    title: "Classificação",
    dataIndex: "classificacao_ml",
    key: "classificacao_ml",
    render: (_, record) => getResultadoTag(record.classificacao_ml),
  },
  {
    title: "Ações",
    key: "acoes",
    width: 70,
    render: () => (
      <Tooltip title="Ver opções" placement="left">
        <Button type="text" icon={<MoreHorizontal size={16} />} />
      </Tooltip>
    ),
  },
];

const tribunalList = ["TJSP", "TJRJ", "TJMG", "TJRS", "TJPR", "TRF1"];
const orgaoList = ["2ª Vara Cível", "7ª Vara do Trabalho", "1ª Câmara Cível", "Juizado Especial", "Vara da Fazenda"];
const statusList: AnaliseMlProcesso["classificacao_ml"][] = ["Aprovado", "Reprovado", "A_verificar", "Aprovado IA"];

const parteStatus: ProcessoParte["status"][] = ["Aprovado", "Reprovado", "A_verificar", "Aprovado IA", null];

const buildProcessData = (count: number): AnaliseMlProcesso[] =>
  Array.from({ length: count }, (_, index) => {
    const id = index + 1;
    const tribunal = tribunalList[index % tribunalList.length];
    const orgao = orgaoList[index % orgaoList.length];
    const status = statusList[index % statusList.length];
    const score = Math.max(50, 100 - index * 2);

    return {
      key: String(id),
      created_at: new Date(Date.now() - index * 86400000).toISOString(),
      numero_processo: `000${id}-91.${2024 - (index % 3)}.8.26.0100`,
      tribunal,
      orgao_julgador: orgao,
      valor_acao: 25000 + index * 1875,
      polo_ativo: [{ nome: `Pessoa Ativa ${id}` }, { nome: `Empresa ${id}` }],
      polo_passivo: [
        {
          nome: `Requerido ${id}`,
          status: parteStatus[index % parteStatus.length],
        },
        {
          nome: `Interessado ${id}`,
          status: parteStatus[(index + 1) % parteStatus.length],
        },
      ],
      score,
      classificacao_ml: status,
    };
  });

const productionData = buildProcessData(20);

export const Default: Story = {
  args: {
    columns,
    dataSource,
  },
};

export const Empty: Story = {
  args: {
    columns,
    dataSource: [],
  },
};

export const SortableAndEllipsis: Story = {
  args: {
    columns: productionColumns as ColumnsType<unknown>,
    dataSource: productionData,
    pagination: { pageSize: 5 },
    scroll: { x: 1200 },
  },
  name: "Sortable + Ellipsis",
};

export const ProductionLike: Story = {
  args: {
    columns: productionColumns as ColumnsType<unknown>,
    dataSource: productionData,
    pagination: { pageSize: 10 },
    scroll: { x: 1400 },
  },
};
