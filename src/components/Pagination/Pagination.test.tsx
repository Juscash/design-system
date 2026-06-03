import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from ".";

describe("Pagination", () => {
  it("renderiza com total=100 e current=1 sem erros", () => {
    const { container } = render(<Pagination total={100} current={1} pageSize={10} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("possui wrapper <nav> com aria-label='Paginação'", () => {
    render(<Pagination total={100} current={1} pageSize={10} />);
    const nav = screen.getByRole("navigation", { name: "Paginação" });
    expect(nav).toBeInTheDocument();
  });

  it("página ativa tem aria-current='page'", () => {
    render(<Pagination total={100} current={3} pageSize={10} />);
    const activeButton = screen.getByRole("button", { name: "Página 3" });
    expect(activeButton).toHaveAttribute("aria-current", "page");
  });

  it("botões prev e next estão presentes com texto 'Anterior' e 'Próximo'", () => {
    render(<Pagination total={100} current={1} pageSize={10} />);
    expect(screen.getByText("Anterior")).toBeInTheDocument();
    expect(screen.getByText("Próximo")).toBeInTheDocument();
  });

  it("clicar em 'Próximo' chama onChange com página 2", async () => {
    const onChange = vi.fn();
    render(<Pagination total={100} current={1} pageSize={10} onChange={onChange} />);
    const nextButton = screen.getByText("Próximo").closest("button");
    expect(nextButton).not.toBeNull();
    await userEvent.click(nextButton!);
    expect(onChange).toHaveBeenCalledWith(2, expect.anything());
  });

  it("com disabled=true, prev e next têm aria-disabled='true'", () => {
    render(<Pagination total={10} current={1} pageSize={10} disabled />);
    const prevButton = screen.getByRole("button", { name: "Página anterior" });
    const nextButton = screen.getByRole("button", { name: "Próxima página" });
    expect(prevButton).toHaveAttribute("aria-disabled", "true");
    expect(nextButton).toHaveAttribute("aria-disabled", "true");
  });

  it("PaginationButton ativo tem classe ds-pagination-page--active", () => {
    render(<Pagination total={100} current={1} pageSize={10} />);
    const activePage = screen.getByRole("button", { name: "Página 1" });
    expect(activePage).toHaveClass("ds-pagination-page--active");
  });

  it("PaginationButton inativo tem classe ds-pagination-page mas não ds-pagination-page--active", () => {
    render(<Pagination total={100} current={1} pageSize={10} />);
    const inactivePage = screen.getByRole("button", { name: "Página 2" });
    expect(inactivePage).toHaveClass("ds-pagination-page");
    expect(inactivePage).not.toHaveClass("ds-pagination-page--active");
  });

  it("ellipsis aparece em paginações grandes (total=200, current=1, pageSize=10)", () => {
    render(<Pagination total={200} current={1} pageSize={10} />);
    const ellipsisButtons = screen.getAllByRole("button", {
      name: "Saltar para próximas páginas",
    });
    expect(ellipsisButtons.length).toBeGreaterThan(0);
  });

  it("displayName é 'Pagination'", () => {
    expect(Pagination.displayName).toBe("Pagination");
  });
});
