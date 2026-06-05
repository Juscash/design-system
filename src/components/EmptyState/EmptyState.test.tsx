import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { EmptyState } from ".";

describe("EmptyState", () => {
  it("renderiza com título obrigatório", () => {
    render(<EmptyState title="Sem resultados" />);
    expect(screen.getByText("Sem resultados")).toBeInTheDocument();
  });

  it("renderiza descrição opcional quando fornecida", () => {
    render(<EmptyState title="Vazio" description="Adicione um item para começar" />);
    expect(screen.getByText("Adicione um item para começar")).toBeInTheDocument();
  });

  it("não renderiza descrição quando ausente", () => {
    render(<EmptyState title="Vazio" />);
    expect(screen.queryByText("Adicione um item para começar")).not.toBeInTheDocument();
  });

  it("renderiza botão de ação quando actionLabel é fornecido", () => {
    render(<EmptyState title="Vazio" actionLabel="Adicionar" />);
    expect(screen.getByRole("button", { name: "Adicionar" })).toBeInTheDocument();
  });

  it("renderiza o slot livre `action` quando fornecido", () => {
    render(<EmptyState title="Vazio" action={<button type="button">Custom</button>} />);
    expect(screen.getByRole("button", { name: "Custom" })).toBeInTheDocument();
  });

  it("dispara onClick do botão de ação", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<EmptyState title="Vazio" actionLabel="Adicionar" actionButtonProps={{ onClick: handleClick }} />);

    await user.click(screen.getByRole("button", { name: "Adicionar" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
