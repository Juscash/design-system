import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import { Navbar } from "./index";

describe("Navbar", () => {
  it("renderiza um <header> com role='banner'", () => {
    render(<Navbar />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe("HEADER");
  });

  it("aplica aria-label padrão 'Barra de navegação'", () => {
    render(<Navbar />);
    expect(screen.getByRole("banner")).toHaveAttribute("aria-label", "Barra de navegação");
  });

  it("respeita aria-label custom", () => {
    render(<Navbar aria-label="Top bar" />);
    expect(screen.getByRole("banner")).toHaveAttribute("aria-label", "Top bar");
  });

  it("aplica a classe base ds-navbar no header", () => {
    render(<Navbar />);
    expect(screen.getByRole("banner")).toHaveClass("ds-navbar");
  });

  it("renderiza o slot left dentro do container ds-navbar__left", () => {
    render(<Navbar left={<button data-testid="toggle">Menu</button>} />);
    const btn = screen.getByTestId("toggle");
    expect(btn.parentElement).toHaveClass("ds-navbar__left");
  });

  it("renderiza o slot right dentro do container ds-navbar__right", () => {
    render(<Navbar right={<button data-testid="bell">Notify</button>} />);
    const btn = screen.getByTestId("bell");
    expect(btn.parentElement).toHaveClass("ds-navbar__right");
  });

  it("preserva className extra passado pelo consumidor", () => {
    render(<Navbar className="custom-class" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("ds-navbar");
    expect(header).toHaveClass("custom-class");
  });

  it("aplica style inline extra passado pelo consumidor", () => {
    render(<Navbar style={{ position: "fixed", top: 0 }} />);
    expect(screen.getByRole("banner")).toHaveStyle({ position: "fixed", top: "0px" });
  });

  it("propaga atributos HTML extras (id, data-testid)", () => {
    render(<Navbar id="main-navbar" data-testid="navbar-root" />);
    const header = screen.getByTestId("navbar-root");
    expect(header).toHaveAttribute("id", "main-navbar");
  });
});
