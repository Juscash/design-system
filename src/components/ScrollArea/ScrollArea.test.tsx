import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScrollArea } from "./index";

describe("ScrollArea", () => {
  // --- Render default (vertical) ---

  it("renderiza um container scrollável com children", () => {
    render(
      <ScrollArea data-testid="scroll">
        <p>Lorem ipsum</p>
      </ScrollArea>,
    );
    expect(screen.getByTestId("scroll")).toBeInTheDocument();
    expect(screen.getByText("Lorem ipsum")).toBeInTheDocument();
  });

  it("aplica classe ds-scroll-area e modificador vertical por padrão", () => {
    render(<ScrollArea data-testid="scroll">conteudo</ScrollArea>);
    const el = screen.getByTestId("scroll");
    expect(el).toHaveClass("ds-scroll-area");
    expect(el).toHaveClass("ds-scroll-area--vertical");
    expect(el).not.toHaveClass("ds-scroll-area--horizontal");
  });

  // --- Orientação ---

  it("aplica modificador horizontal quando orientation='horizontal'", () => {
    render(
      <ScrollArea data-testid="scroll" orientation="horizontal">
        conteudo
      </ScrollArea>,
    );
    const el = screen.getByTestId("scroll");
    expect(el).toHaveClass("ds-scroll-area--horizontal");
    expect(el).not.toHaveClass("ds-scroll-area--vertical");
  });

  it("não aplica modificador de eixo quando orientation='both'", () => {
    render(
      <ScrollArea data-testid="scroll" orientation="both">
        conteudo
      </ScrollArea>,
    );
    const el = screen.getByTestId("scroll");
    expect(el).toHaveClass("ds-scroll-area");
    expect(el).not.toHaveClass("ds-scroll-area--vertical");
    expect(el).not.toHaveClass("ds-scroll-area--horizontal");
  });

  // --- Acessibilidade ---

  it("aplica tabIndex=0 por padrão para permitir foco via Tab", () => {
    render(<ScrollArea data-testid="scroll">conteudo</ScrollArea>);
    expect(screen.getByTestId("scroll")).toHaveAttribute("tabindex", "0");
  });

  it("respeita tabIndex customizado", () => {
    render(
      <ScrollArea data-testid="scroll" tabIndex={-1}>
        conteudo
      </ScrollArea>,
    );
    expect(screen.getByTestId("scroll")).toHaveAttribute("tabindex", "-1");
  });

  it("aplica role='region' quando aria-label é fornecido", () => {
    render(
      <ScrollArea data-testid="scroll" aria-label="Lista de itens">
        conteudo
      </ScrollArea>,
    );
    const el = screen.getByTestId("scroll");
    expect(el).toHaveAttribute("role", "region");
    expect(el).toHaveAttribute("aria-label", "Lista de itens");
  });

  it("não aplica role quando aria-label não é fornecido", () => {
    render(<ScrollArea data-testid="scroll">conteudo</ScrollArea>);
    expect(screen.getByTestId("scroll")).not.toHaveAttribute("role");
  });

  it("permite role customizado pelo consumidor", () => {
    render(
      <ScrollArea data-testid="scroll" role="group">
        conteudo
      </ScrollArea>,
    );
    expect(screen.getByTestId("scroll")).toHaveAttribute("role", "group");
  });

  // --- className e style do consumidor ---

  it("preserva className extra passada pelo consumidor", () => {
    render(
      <ScrollArea data-testid="scroll" className="minha-classe-custom">
        conteudo
      </ScrollArea>,
    );
    const el = screen.getByTestId("scroll");
    expect(el).toHaveClass("minha-classe-custom");
    expect(el).toHaveClass("ds-scroll-area");
  });

  it("preserva style extra passado pelo consumidor", () => {
    render(
      <ScrollArea data-testid="scroll" style={{ width: "200px", height: "100px" }}>
        conteudo
      </ScrollArea>,
    );
    expect(screen.getByTestId("scroll")).toHaveStyle({ width: "200px", height: "100px" });
  });

  // --- Spread de outras props HTML ---

  it("propaga atributos HTML extras (ex.: id)", () => {
    render(
      <ScrollArea data-testid="scroll" id="scroll-01">
        conteudo
      </ScrollArea>,
    );
    expect(screen.getByTestId("scroll")).toHaveAttribute("id", "scroll-01");
  });
});
