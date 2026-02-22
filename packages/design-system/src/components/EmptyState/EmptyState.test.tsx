import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button";

describe("EmptyState", () => {
  it("renderiza com title e description", () => {
    render(
      <EmptyState
        title="Título"
        description="Descrição"
      />
    );
    expect(screen.getByText("Título")).toBeInTheDocument();
    expect(screen.getByText("Descrição")).toBeInTheDocument();
  });

  it("renderiza no estado padrão (neutral)", () => {
    const { container } = render(
      <EmptyState
        title="Neutral"
        description="Descrição neutral"
      />
    );
    expect(screen.getByText("Neutral")).toBeInTheDocument();
    expect(container.querySelector(".empty-state")).toBeInTheDocument();
  });

  it("renderiza com variante error", () => {
    const { container } = render(
      <EmptyState
        variant="error"
        title="Erro"
        description="Mensagem de erro"
      />
    );
    expect(screen.getByText("Erro")).toBeInTheDocument();
    expect(container.querySelector(".empty-state")).toBeInTheDocument();
  });

  it("renderiza com variante success", () => {
    const { container } = render(
      <EmptyState
        variant="success"
        title="Sucesso"
        description="Mensagem de sucesso"
      />
    );
    expect(screen.getByText("Sucesso")).toBeInTheDocument();
    expect(container.querySelector(".empty-state")).toBeInTheDocument();
  });

  it("renderiza com variante info", () => {
    const { container } = render(
      <EmptyState
        variant="info"
        title="Info"
        description="Mensagem de info"
      />
    );
    expect(screen.getByText("Info")).toBeInTheDocument();
    expect(container.querySelector(".empty-state")).toBeInTheDocument();
  });

  it("renderiza com variante warning", () => {
    const { container } = render(
      <EmptyState
        variant="warning"
        title="Atenção"
        description="Mensagem de warning"
      />
    );
    expect(screen.getByText("Atenção")).toBeInTheDocument();
    expect(container.querySelector(".empty-state")).toBeInTheDocument();
  });

  it("renderiza com tamanho xs", () => {
    const { container } = render(
      <EmptyState
        size="xs"
        title="XS"
        description="Tamanho pequeno"
      />
    );
    expect(screen.getByText("XS")).toBeInTheDocument();
    expect(container.querySelector(".empty-state")).toBeInTheDocument();
  });

  it("renderiza com tamanho s", () => {
    const { container } = render(
      <EmptyState
        size="s"
        title="S"
        description="Tamanho médio"
      />
    );
    expect(screen.getByText("S")).toBeInTheDocument();
    expect(container.querySelector(".empty-state")).toBeInTheDocument();
  });

  it("renderiza com tamanho m", () => {
    const { container } = render(
      <EmptyState
        size="m"
        title="M"
        description="Tamanho grande"
      />
    );
    expect(screen.getByText("M")).toBeInTheDocument();
    expect(container.querySelector(".empty-state")).toBeInTheDocument();
  });

  it("renderiza com action única", () => {
    render(
      <EmptyState
        title="Com Action"
        description="Descrição"
        action={<Button>Action</Button>}
      />
    );
    expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument();
  });

  it("renderiza com primaryAction", () => {
    render(
      <EmptyState
        title="Primary Action"
        description="Descrição"
        primaryAction={<Button variant="primary">Primary</Button>}
      />
    );
    expect(screen.getByRole("button", { name: /primary/i })).toBeInTheDocument();
  });

  it("renderiza com secondaryAction", () => {
    render(
      <EmptyState
        title="Secondary Action"
        description="Descrição"
        secondaryAction={<Button variant="outline">Secondary</Button>}
      />
    );
    expect(screen.getByRole("button", { name: /secondary/i })).toBeInTheDocument();
  });

  it("renderiza com primaryAction e secondaryAction", () => {
    render(
      <EmptyState
        title="Ambas Actions"
        description="Descrição"
        primaryAction={<Button variant="primary">Primary</Button>}
        secondaryAction={<Button variant="outline">Secondary</Button>}
      />
    );
    expect(screen.getByRole("button", { name: /primary/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /secondary/i })).toBeInTheDocument();
  });

  it("renderiza ícone customizado quando fornecido", () => {
    const { container } = render(
      <EmptyState
        title="Custom Icon"
        description="Com ícone customizado"
        icon={<div data-testid="custom-icon">Custom</div>}
      />
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("aplica className customizado", () => {
    const { container } = render(
      <EmptyState
        title="Custom Class"
        description="Descrição"
        className="my-custom-class"
      />
    );
    expect(container.querySelector(".empty-state")).toHaveClass("my-custom-class");
  });

  it("aplica style customizado", () => {
    const { container } = render(
      <EmptyState
        title="Custom Style"
        description="Descrição"
        style={{ backgroundColor: "#f0f0f0" }}
      />
    );
    const emptyState = container.querySelector(".empty-state");
    expect(emptyState).toHaveStyle({ backgroundColor: "#f0f0f0" });
  });

  it("renderiza com centered=false", () => {
    const { container } = render(
      <EmptyState
        title="Not Centered"
        description="Descrição"
        centered={false}
      />
    );
    const emptyState = container.querySelector(".empty-state") as HTMLElement;
    expect(emptyState.style.textAlign).toBe("left");
  });

  it("renderiza sem title quando não fornecido", () => {
    render(<EmptyState description="Apenas descrição" />);
    expect(screen.getByText("Apenas descrição")).toBeInTheDocument();
  });

  it("renderiza sem description quando não fornecida", () => {
    render(<EmptyState title="Apenas título" />);
    expect(screen.getByText("Apenas título")).toBeInTheDocument();
  });

  it("renderiza com displayName correto", () => {
    expect(EmptyState.displayName).toBe("EmptyState");
  });

  it("renderiza com apenas description e action", () => {
    render(
      <EmptyState
        description="Sem título"
        action={<Button>Action</Button>}
      />
    );
    expect(screen.getByText("Sem título")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument();
  });
});
