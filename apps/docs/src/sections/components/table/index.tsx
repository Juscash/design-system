"use client";

import React, { useState } from "react";
import {
  Card,
  Space,
  Table,
  Heading2,
  Body1,
  Body2,
} from "@Juscash/design-system";

import type { ColumnsType } from "antd/es/table";
import { ButtonPlayground } from "../buttons/ButtonPlayground";

interface DemoCardProps {
  title: string;
  description: string;
  code: string;
  preview: React.ReactNode;
}

const DemoCard: React.FC<DemoCardProps> = ({
  title,
  description,
  code,
  preview,
}) => {
  const [showPlayground, setShowPlayground] = useState(false);

  return (
    <Card
      title={title}
      style={{ width: "100%" }}
      extra={
        <Body2
          onClick={() => setShowPlayground((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: "#136CE2",
            fontWeight: 600,
          }}
        >
          {showPlayground ? "Ocultar exemplo" : "Exemplo interativo"}
        </Body2>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Body1>{description}</Body1>
        {preview}
        {showPlayground ? <ButtonPlayground code={code} /> : null}
      </Space>
    </Card>
  );
};

interface DataType {
  id: string;
  name: string;
  email: string;
  age: number;
  address: string;
  status: string;
  tags: string[];
  createdAt: string;
}

// Função para gerar 100 itens de dados
const generateTableData = (): DataType[] => {
  const names = [
    "João Silva",
    "Maria Santos",
    "Pedro Oliveira",
    "Ana Costa",
    "Carlos Ferreira",
    "Juliana Almeida",
    "Roberto Lima",
    "Fernanda Souza",
    "Ricardo Pereira",
    "Patricia Rocha",
  ];

  const statuses = ["Ativo", "Inativo", "Pendente", "Bloqueado"];
  const tagOptions = ["VIP"];

  const data: DataType[] = [];
  for (let i = 1; i <= 100; i++) {
    const nameIndex = (i - 1) % names.length;
    const randomTags = tagOptions
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 1);

    data.push({
      id: `id-${i}`,
      name: `${names[nameIndex]} ${i}`,
      email: `usuario${i}@example.com`,
      age: Math.floor(Math.random() * 50) + 18,
      address: `Rua ${i}, Número ${Math.floor(
        Math.random() * 1000
      )}, Bairro Centro, Cidade ${i}, Estado ${String.fromCharCode(
        65 + (i % 26)
      )}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      tags: randomTags,
      createdAt: new Date(
        2020 + Math.floor(Math.random() * 5),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toLocaleDateString("pt-BR"),
    });
  }
  return data;
};

const tableData = generateTableData();

// Colunas básicas
const basicColumns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Idade",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Endereço",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
  },
  {
    title: "Criado em",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

// Colunas com sorter
const sorterColumns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Idade",
    dataIndex: "age",
    key: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Endereço",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
  },
  {
    title: "Criado em",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: (a, b) => {
      const dateA = new Date(a.createdAt.split("/").reverse().join("-"));
      const dateB = new Date(b.createdAt.split("/").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    },
  },
];

// Colunas com ellipsis
const ellipsisColumns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Idade",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Endereço",
    dataIndex: "address",
    key: "address",
    ellipsis: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    ellipsis: true,
  },
  {
    title: "Criado em",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

const basicTableCode = `import { Table } from '@Juscash/design-system';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: string;
  name: string;
  email: string;
  age: number;
  address: string;
  status: string;
  tags: string[];
  createdAt: string;
}

const columns: ColumnsType<DataType> = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nome', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Idade', dataIndex: 'age', key: 'age' },
  { title: 'Endereço', dataIndex: 'address', key: 'address' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Tags', dataIndex: 'tags', key: 'tags' },
  { title: 'Criado em', dataIndex: 'createdAt', key: 'createdAt' },
];

const data: DataType[] = [
  // ... 100 itens de dados
];

function BasicTable() {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
}

render(<BasicTable />);`;

const rowSelectionTableCode = `import { Table } from '@Juscash/design-system';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface DataType {
  id: string;
  name: string;
  email: string;
  age: number;
  address: string;
  status: string;
  tags: string[];
  createdAt: string;
}

const columns: ColumnsType<DataType> = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nome', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Idade', dataIndex: 'age', key: 'age' },
  { title: 'Endereço', dataIndex: 'address', key: 'address' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Tags', dataIndex: 'tags', key: 'tags' },
  { title: 'Criado em', dataIndex: 'createdAt', key: 'createdAt' },
];

const data: DataType[] = [
  // ... 100 itens de dados
];

function RowSelectionTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      rowSelection={rowSelection}
      pagination={{ pageSize: 10 }}
    />
  );
}

render(<RowSelectionTable />);`;

const sorterTableCode = `import { Table } from '@Juscash/design-system';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: string;
  name: string;
  email: string;
  age: number;
  address: string;
  status: string;
  tags: string[];
  createdAt: string;
}

const columns: ColumnsType<DataType> = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  {
    title: 'Idade',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  { title: 'Endereço', dataIndex: 'address', key: 'address' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Tags', dataIndex: 'tags', key: 'tags' },
  {
    title: 'Criado em',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: (a, b) => {
      const dateA = new Date(a.createdAt.split('/').reverse().join('-'));
      const dateB = new Date(b.createdAt.split('/').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    },
  },
];

const data: DataType[] = [
  // ... 100 itens de dados
];

function SorterTable() {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
}

render(<SorterTable />);`;

const ellipsisTableCode = `import { Table, Tag, Space } from '@Juscash/design-system';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: string;
  name: string;
  email: string;
  age: number;
  address: string;
  status: string;
  tags: string[];
  createdAt: string;
}

const columns: ColumnsType<DataType> = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nome', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Idade', dataIndex: 'age', key: 'age' },
  {
    title: 'Endereço',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
  },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: {
      showTitle: false,
    },
    render: (tags: string[]) => (
      <Space size={4} wrap>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Space>
    ),
  },
  { title: 'Criado em', dataIndex: 'createdAt', key: 'createdAt' },
];

const data: DataType[] = [
  // ... 100 itens de dados
];

function EllipsisTable() {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
}

render(<EllipsisTable />);`;

export const TableShowcase: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      <Heading2>Table</Heading2>
      <Body1>
        Componente de tabela para exibir dados estruturados com suporte a
        paginação, ordenação, seleção de linhas e ellipsis.
      </Body1>

      <DemoCard
        title="Tabela Básica com Paginação"
        description="Tabela básica com 8 colunas e paginação de 10 itens por página."
        code={basicTableCode}
        preview={
          <Table
            columns={basicColumns}
            dataSource={tableData}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        }
      />

      <DemoCard
        title="Tabela com RowSelection"
        description="Tabela com seleção de linhas habilitada. Clique nas checkboxes para selecionar linhas."
        code={rowSelectionTableCode}
        preview={
          <Table
            columns={basicColumns}
            dataSource={tableData}
            rowKey="id"
            rowSelection={rowSelection}
            pagination={{ pageSize: 10 }}
          />
        }
      />

      <DemoCard
        title="Tabela com Sorter"
        description="Tabela com colunas ordenáveis. Clique nos cabeçalhos das colunas Nome, Idade e Criado em para ordenar."
        code={sorterTableCode}
        preview={
          <Table
            columns={sorterColumns}
            dataSource={tableData}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        }
      />

      <DemoCard
        title="Tabela com Ellipsis"
        description="Tabela com colunas que usam ellipsis. A coluna Endereço usa ellipsis simples, enquanto Tags usa ellipsis com render customizado mostrando tags coloridas."
        code={ellipsisTableCode}
        preview={
          <Table
            columns={ellipsisColumns}
            dataSource={tableData}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        }
      />
    </Space>
  );
};
