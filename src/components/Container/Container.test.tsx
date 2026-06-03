import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Container } from "./index";

describe("Container", () => {
  // --- Render default (product / div) ---

  it("renderiza um <div> por padrão com a classe ds-container", () => {
    render(<Container data-testid="container">conteúdo</Container>);
    const el = screen.getByTestId("container");
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveClass("ds-container");
  });

  it("aplica ds-container--product no default", () => {
    render(<Container data-testid="container">conteúdo</Container>);
    const el = screen.getByTestId("container");
    expect(el).toHaveClass("ds-container--product");
    expect(el).not.toHaveClass("ds-container--site");
  });

  it("renderiza children", () => {
    render(
      <Container>
        <span data-testid="child">filho</span>
      </Container>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  // --- Variantes ---

  it("aplica ds-container--site quando variant='site'", () => {
    render(
      <Container data-testid="container" variant="site">
        conteúdo
      </Container>
    );
    const el = screen.getByTestId("container");
    expect(el).toHaveClass("ds-container--site");
    expect(el).not.toHaveClass("ds-container--product");
  });

  it("aplica ds-container--product quando variant='product' é explícito", () => {
    render(
      <Container data-testid="container" variant="product">
        conteúdo
      </Container>
    );
    const el = screen.getByTestId("container");
    expect(el).toHaveClass("ds-container--product");
    expect(el).not.toHaveClass("ds-container--site");
  });

  // --- Tag (as) ---

  it("renderiza como <main> quando as='main'", () => {
    render(
      <Container data-testid="container" as="main">
        conteúdo
      </Container>
    );
    const el = screen.getByTestId("container");
    expect(el.tagName).toBe("MAIN");
  });

  it("renderiza como <section> quando as='section'", () => {
    render(
      <Container data-testid="container" as="section">
        conteúdo
      </Container>
    );
    const el = screen.getByTestId("container");
    expect(el.tagName).toBe("SECTION");
  });

  it("renderiza como <div> quando as='div' é explícito", () => {
    render(
      <Container data-testid="container" as="div">
        conteúdo
      </Container>
    );
    const el = screen.getByTestId("container");
    expect(el.tagName).toBe("DIV");
  });

  // --- className extra do consumidor ---

  it("preserva className extra passado pelo consumidor", () => {
    render(
      <Container data-testid="container" className="minha-classe">
        conteúdo
      </Container>
    );
    const el = screen.getByTestId("container");
    expect(el).toHaveClass("minha-classe");
    expect(el).toHaveClass("ds-container");
    expect(el).toHaveClass("ds-container--product");
  });

  // --- style extra do consumidor ---

  it("preserva style extra passado pelo consumidor", () => {
    render(
      <Container data-testid="container" style={{ marginTop: "8px" }}>
        conteúdo
      </Container>
    );
    const el = screen.getByTestId("container");
    expect(el).toHaveStyle({ marginTop: "8px" });
  });

  // --- Spread de outras props ---

  it("propaga atributos HTML extras (ex.: id)", () => {
    render(
      <Container data-testid="container" id="main-container">
        conteúdo
      </Container>
    );
    const el = screen.getByTestId("container");
    expect(el).toHaveAttribute("id", "main-container");
  });
});
