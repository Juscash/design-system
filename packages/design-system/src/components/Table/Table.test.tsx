import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Table } from "./Table";

const columns = [{ title: "Name", dataIndex: "name", key: "name" }];

const dataSource = [{ key: "1", name: "Test" }];

describe("Table", () => {
  it("renders table with data", () => {
    render(<Table columns={columns} dataSource={dataSource} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders table header", () => {
    render(<Table columns={columns} dataSource={dataSource} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
  });
});
