import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import { Navbar } from "./index";

describe("Navbar", () => {
  // --- Render base ---

  it("renderiza um <header> com role='banner'", () => {
    render(<Navbar />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe("HEADER");
  });

  it("aplica aria-label padrão 'Barra de navegação'", () => {
    render(<Navbar />);
    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("aria-label", "Barra de navegação");
  });

  it("respeita aria-label custom", () => {
    render(<Navbar aria-label="Top bar" />);
    expect(screen.getByRole("banner")).toHaveAttribute("aria-label", "Top bar");
  });

  it("aplica a classe base ds-navbar no header", () => {
    render(<Navbar />);
    expect(screen.getByRole("banner")).toHaveClass("ds-navbar");
  });

  // --- Slots ---

  it("renderiza o brand dentro do wrapper ds-navbar__brand", () => {
    render(<Navbar brand={<span data-testid="logo">JusCash</span>} />);
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
    expect(logo.parentElement).toHaveClass("ds-navbar__brand");
  });

  it("renderiza o leftSlot dentro do container ds-navbar__left", () => {
    render(<Navbar leftSlot={<button data-testid="hamburger">Menu</button>} />);
    const btn = screen.getByTestId("hamburger");
    expect(btn).toBeInTheDocument();
    expect(btn.parentElement).toHaveClass("ds-navbar__left");
  });

  it("renderiza o rightSlot dentro do container ds-navbar__right", () => {
    render(<Navbar rightSlot={<button data-testid="bell">Notify</button>} />);
    const btn = screen.getByTestId("bell");
    expect(btn).toBeInTheDocument();
    expect(btn.parentElement).toHaveClass("ds-navbar__right");
  });

  it("renderiza brand e leftSlot no mesmo container esquerdo", () => {
    render(
      <Navbar
        brand={<span data-testid="brand">B</span>}
        leftSlot={<span data-testid="left-extra">L</span>}
      />,
    );
    const brand = screen.getByTestId("brand");
    const extra = screen.getByTestId("left-extra");
    expect(brand.parentElement?.parentElement).toBe(extra.parentElement);
    expect(extra.parentElement).toHaveClass("ds-navbar__left");
  });

  it("não renderiza ds-navbar__right quando rightSlot está ausente", () => {
    const { container } = render(<Navbar brand={<span>B</span>} />);
    expect(container.querySelector(".ds-navbar__right")).toBeNull();
  });

  // --- children fallback ---

  it("usa children quando nenhum slot é informado", () => {
    render(
      <Navbar>
        <span data-testid="raw">conteúdo manual</span>
      </Navbar>,
    );
    expect(screen.getByTestId("raw")).toBeInTheDocument();
  });

  it("ignora children quando algum slot é informado", () => {
    render(
      <Navbar brand={<span data-testid="brand">B</span>}>
        <span data-testid="raw">não deve aparecer</span>
      </Navbar>,
    );
    expect(screen.getByTestId("brand")).toBeInTheDocument();
    expect(screen.queryByTestId("raw")).toBeNull();
  });

  // --- className / style / spread ---

  it("preserva className extra passado pelo consumidor", () => {
    render(<Navbar className="custom-class" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("ds-navbar");
    expect(header).toHaveClass("custom-class");
  });

  it("aplica style inline extra passado pelo consumidor", () => {
    render(<Navbar style={{ position: "fixed", top: 0 }} />);
    const header = screen.getByRole("banner");
    expect(header).toHaveStyle({ position: "fixed", top: "0px" });
  });

  it("propaga atributos HTML extras (id, data-testid)", () => {
    render(<Navbar id="main-navbar" data-testid="navbar-root" />);
    const header = screen.getByTestId("navbar-root");
    expect(header).toHaveAttribute("id", "main-navbar");
  });
});
