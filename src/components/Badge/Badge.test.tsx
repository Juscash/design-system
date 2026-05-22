import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from ".";

describe("Badge", () => {
  it("renders label text", () => {
    render(<Badge>Label</Badge>);
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("renders a secondary badge", () => {
    render(<Badge variant="secondary">Processando</Badge>);
    expect(screen.getByText("Processando")).toBeInTheDocument();
  });

  it("renders counter variant", () => {
    render(<Badge variant="counter" count={1} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("supports statusColor on secondary", () => {
    render(
      <Badge variant="secondary" statusColor="error">
        Erro
      </Badge>,
    );
    expect(screen.getByText("Erro")).toBeInTheDocument();
  });
});
