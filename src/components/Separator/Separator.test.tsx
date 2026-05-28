import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Separator } from "./index";

describe("Separator", () => {
  // --- Render horizontal (default) ---

  it("renderiza um elemento com role='separator' na direção horizontal por padrão", () => {
    render(<Separator />);
    const el = screen.getByRole("separator");
    expect(el).toBeInTheDocument();
  });

  it("não define aria-orientation na direção horizontal (default)", () => {
    render(<Separator />);
    const el = screen.getByRole("separator");
    expect(el).not.toHaveAttribute("aria-orientation");
  });

  // --- Render vertical ---

  it("define aria-orientation='vertical' quando direction='vertical'", () => {
    render(<Separator direction="vertical" />);
    const el = screen.getByRole("separator");
    expect(el).toHaveAttribute("aria-orientation", "vertical");
  });

  it("não define aria-orientation='vertical' quando direction='horizontal'", () => {
    render(<Separator direction="horizontal" />);
    const el = screen.getByRole("separator");
    expect(el).not.toHaveAttribute("aria-orientation");
  });

  // --- Classes aplicadas ---

  it("aplica ds-separator e ds-separator--horizontal no default", () => {
    render(<Separator />);
    const el = screen.getByRole("separator");
    expect(el).toHaveClass("ds-separator");
    expect(el).toHaveClass("ds-separator--horizontal");
    expect(el).not.toHaveClass("ds-separator--vertical");
  });

  it("aplica ds-separator e ds-separator--vertical quando direction='vertical'", () => {
    render(<Separator direction="vertical" />);
    const el = screen.getByRole("separator");
    expect(el).toHaveClass("ds-separator");
    expect(el).toHaveClass("ds-separator--vertical");
    expect(el).not.toHaveClass("ds-separator--horizontal");
  });

  it("aplica ds-separator--horizontal quando direction='horizontal' é explícito", () => {
    render(<Separator direction="horizontal" />);
    const el = screen.getByRole("separator");
    expect(el).toHaveClass("ds-separator--horizontal");
    expect(el).not.toHaveClass("ds-separator--vertical");
  });

  // --- tabIndex: componente não deve ser focável ---

  it("não possui tabIndex no elemento raiz", () => {
    render(<Separator />);
    const el = screen.getByRole("separator");
    expect(el).not.toHaveAttribute("tabindex");
  });

  // --- className do consumidor é preservado ---

  it("preserva className extra passada pelo consumidor", () => {
    render(<Separator className="minha-classe-custom" />);
    const el = screen.getByRole("separator");
    expect(el).toHaveClass("minha-classe-custom");
    // classes do componente continuam presentes
    expect(el).toHaveClass("ds-separator");
    expect(el).toHaveClass("ds-separator--horizontal");
  });

  // --- style do consumidor é preservado ---

  it("preserva style extra passado pelo consumidor", () => {
    render(<Separator style={{ marginTop: "8px", opacity: 0.5 }} />);
    const el = screen.getByRole("separator");
    expect(el).toHaveStyle({ marginTop: "8px", opacity: "0.5" });
  });

  // --- Spread de outras props de HTML ---

  it("propaga atributos HTML extras (ex.: data-testid)", () => {
    render(<Separator data-testid="meu-separator" />);
    expect(screen.getByTestId("meu-separator")).toBeInTheDocument();
  });

  it("propaga atributos HTML extras (ex.: id)", () => {
    render(<Separator id="sep-01" />);
    const el = screen.getByRole("separator");
    expect(el).toHaveAttribute("id", "sep-01");
  });
});
