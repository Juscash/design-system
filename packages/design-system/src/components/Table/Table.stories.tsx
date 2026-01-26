import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

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
