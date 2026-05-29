import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Check, X } from "lucide-react";
import { Alert } from "./index";

describe("Alert", () => {
  // --- Render base ---

  it("renderiza um elemento com role='alert' no container raiz", () => {
    render(<Alert>Mensagem</Alert>);
    const el = screen.getByRole("alert");
    expect(el).toBeInTheDocument();
  });

  it("aplica a classe ds-alert no container raiz", () => {
    render(<Alert>Mensagem</Alert>);
    const el = screen.getByRole("alert");
    expect(el).toHaveClass("ds-alert");
  });

  it("não aplica ds-alert--error quando type='neutral' (default)", () => {
    render(<Alert>Mensagem</Alert>);
    const el = screen.getByRole("alert");
    expect(el).not.toHaveClass("ds-alert--error");
  });

  // --- Variante error ---

  it("aplica ds-alert--error quando type='error'", () => {
    render(<Alert type="error">Mensagem</Alert>);
    const el = screen.getByRole("alert");
    expect(el).toHaveClass("ds-alert--error");
  });

  // --- Linha 1 (children) ---

  it("renderiza o conteúdo de children como linha 1", () => {
    render(<Alert>Configurações salvas com sucesso.</Alert>);
    expect(screen.getByText("Configurações salvas com sucesso.")).toBeInTheDocument();
  });

  // --- showLine2 ---

  it("não renderiza a linha 2 quando showLine2 é false (default)", () => {
    render(<Alert line2="Linha secundária">Linha primária</Alert>);
    expect(screen.queryByText("Linha secundária")).not.toBeInTheDocument();
  });

  it("renderiza a linha 2 quando showLine2 é true", () => {
    render(
      <Alert showLine2 line2="Linha secundária">
        Linha primária
      </Alert>,
    );
    expect(screen.getByText("Linha secundária")).toBeInTheDocument();
  });

  // --- showLeftIcon (default true) ---

  it("renderiza o aligner do ícone esquerdo quando showLeftIcon é true (default)", () => {
    const { container } = render(
      <Alert leftIcon={<Check data-testid="left-icon" />}>Mensagem</Alert>,
    );
    expect(container.querySelector(".ds-alert-icon")).not.toBeNull();
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("não renderiza o aligner do ícone esquerdo quando showLeftIcon é false", () => {
    const { container } = render(
      <Alert showLeftIcon={false} leftIcon={<Check />}>
        Mensagem
      </Alert>,
    );
    expect(container.querySelector(".ds-alert-icon")).toBeNull();
  });

  // --- showRightIcon (default false) ---

  it("não renderiza o aligner do ícone direito quando showRightIcon é false (default)", () => {
    const { container } = render(
      <Alert rightIcon={<X />}>Mensagem</Alert>,
    );
    expect(container.querySelector(".ds-alert-right-icon")).toBeNull();
  });

  it("renderiza o aligner do ícone direito quando showRightIcon é true", () => {
    const { container } = render(
      <Alert showRightIcon rightIcon={<X data-testid="right-icon" />}>
        Mensagem
      </Alert>,
    );
    expect(container.querySelector(".ds-alert-right-icon")).not.toBeNull();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  // --- showButton e buttonLabel ---

  it("não renderiza o botão quando showButton é false (default)", () => {
    render(<Alert>Mensagem</Alert>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renderiza o botão com label default 'Label' quando showButton é true", () => {
    render(<Alert showButton>Mensagem</Alert>);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Label");
  });

  it("renderiza o botão com o buttonLabel fornecido", () => {
    render(
      <Alert showButton buttonLabel="Desfazer">
        Arquivo excluído com sucesso.
      </Alert>,
    );
    expect(screen.getByRole("button", { name: "Desfazer" })).toBeInTheDocument();
  });

  it("dispara onButtonClick quando o botão é acionado", () => {
    const handle = vi.fn();
    render(
      <Alert showButton buttonLabel="Desfazer" onButtonClick={handle}>
        Mensagem
      </Alert>,
    );
    screen.getByRole("button", { name: "Desfazer" }).click();
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it("renderiza o botão com type='button' para evitar submit acidental", () => {
    render(<Alert showButton>Mensagem</Alert>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  // --- className do consumer preservada ---

  it("preserva className extra passada pelo consumer", () => {
    render(<Alert className="minha-classe">Mensagem</Alert>);
    const el = screen.getByRole("alert");
    expect(el).toHaveClass("minha-classe");
    expect(el).toHaveClass("ds-alert");
  });

  // --- Spread de atributos HTML ---

  it("propaga atributos HTML extras (ex.: data-testid)", () => {
    render(
      <Alert data-testid="meu-alert">Mensagem</Alert>,
    );
    expect(screen.getByTestId("meu-alert")).toBeInTheDocument();
  });

  it("propaga id para o container raiz", () => {
    render(<Alert id="alert-01">Mensagem</Alert>);
    expect(screen.getByRole("alert")).toHaveAttribute("id", "alert-01");
  });
});
