import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Table } from ".";

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
];

const dataSource = [
  { key: "1", name: "Julia", email: "julia@juscash.com" },
  { key: "2", name: "Iago", email: "iago@juscash.com" },
];

describe("Table", () => {
  it("renders table with data", () => {
    render(<Table columns={columns} dataSource={dataSource} />);
    expect(screen.getByText("Julia")).toBeInTheDocument();
    expect(screen.getByText("Iago")).toBeInTheDocument();
  });

  it("renders table header", () => {
    render(<Table columns={columns} dataSource={dataSource} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders Portuguese empty text by default", () => {
    render(<Table columns={columns} dataSource={[]} />);
    expect(screen.getByText("Nenhum registro encontrado.")).toBeInTheDocument();
  });

  it("allows the consumer to override the empty text", () => {
    render(<Table columns={columns} dataSource={[]} locale={{ emptyText: "Sem dados" }} />);
    expect(screen.getByText("Sem dados")).toBeInTheDocument();
  });

  it("renders pagination total in Portuguese (itens)", () => {
    const data = Array.from({ length: 12 }, (_, i) => ({ key: String(i), name: `Row ${i}`, email: "" }));
    render(<Table columns={columns} dataSource={data} pagination={{ pageSize: 5, total: 12 }} />);
    expect(screen.getByText(/12 itens/)).toBeInTheDocument();
  });

  it("uses singular 'item' when total is exactly 1", () => {
    render(<Table columns={columns} dataSource={[dataSource[0]]} pagination={{ pageSize: 5, total: 1 }} />);
    expect(screen.getByText(/1 item$/)).toBeInTheDocument();
  });

  it("renders Anterior/Próximo labels in pagination", () => {
    const data = Array.from({ length: 12 }, (_, i) => ({ key: String(i), name: `Row ${i}`, email: "" }));
    render(<Table columns={columns} dataSource={data} pagination={{ pageSize: 5, total: 12 }} />);
    expect(screen.getByText("Anterior")).toBeInTheDocument();
    expect(screen.getByText("Próximo")).toBeInTheDocument();
  });

  it("renders the sort icon when a column has sorter", () => {
    const sortableColumns = [
      { title: "Name", dataIndex: "name", key: "name", sorter: () => 0 },
    ];
    const { container } = render(<Table columns={sortableColumns} dataSource={dataSource} />);
    expect(container.querySelector(".ds-table-sort-icon")).not.toBeNull();
  });
});
