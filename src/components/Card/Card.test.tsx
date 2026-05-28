import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Card } from ".";

describe("Card", () => {
  // 1. Render do conteúdo via children
  it("renderiza o conteúdo passado via children", () => {
    render(<Card>Conteúdo do card</Card>);
    expect(screen.getByText("Conteúdo do card")).toBeInTheDocument();
  });

  // 2. Card sem clickable: sem tabIndex, sem role, sem cursor pointer
  it("não tem tabIndex quando clickable não está ativo", () => {
    const { container } = render(<Card>Estático</Card>);
    const card = container.querySelector(".ant-card");
    expect(card?.getAttribute("tabindex")).toBeNull();
  });

  it("não tem role quando clickable não está ativo", () => {
    const { container } = render(<Card>Estático</Card>);
    const card = container.querySelector(".ant-card");
    expect(card?.getAttribute("role")).toBeNull();
  });

  it("não tem cursor pointer no style quando clickable não está ativo", () => {
    const { container } = render(<Card style={{ color: "red" }}>Estático</Card>);
    const card = container.querySelector(".ant-card") as HTMLElement;
    expect(card.style.cursor).not.toBe("pointer");
  });

  // 3. Card com clickable=true: tabIndex, role, cursor pointer e classe
  it("tem tabIndex=0 quando clickable=true", () => {
    const { container } = render(<Card clickable>Clicável</Card>);
    const card = container.querySelector(".ant-card") as HTMLElement;
    expect(card.getAttribute("tabindex")).toBe("0");
  });

  it("tem role=button quando clickable=true", () => {
    const { container } = render(<Card clickable>Clicável</Card>);
    const card = container.querySelector(".ant-card") as HTMLElement;
    expect(card.getAttribute("role")).toBe("button");
  });

  it("tem cursor: pointer no style quando clickable=true", () => {
    const { container } = render(<Card clickable>Clicável</Card>);
    const card = container.querySelector(".ant-card") as HTMLElement;
    expect(card.style.cursor).toBe("pointer");
  });

  it("aplica a classe ds-card-clickable quando clickable=true", () => {
    const { container } = render(<Card clickable>Clicável</Card>);
    const card = container.querySelector(".ant-card");
    expect(card).toHaveClass("ds-card-clickable");
  });

  // 4. onClick dispara em click no card clickable
  it("dispara onClick ao clicar no card clickable", () => {
    const handleClick = vi.fn();
    const { container } = render(
      <Card clickable onClick={handleClick}>
        Clicável
      </Card>,
    );
    const card = container.querySelector(".ant-card") as HTMLElement;
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 5. Enter dispara onClick em modo clickable
  it("dispara onClick ao pressionar Enter em modo clickable", () => {
    const handleClick = vi.fn();
    const { container } = render(
      <Card clickable onClick={handleClick}>
        Clicável
      </Card>,
    );
    const card = container.querySelector(".ant-card") as HTMLElement;
    fireEvent.keyDown(card, { key: "Enter" });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 6. Space dispara onClick em modo clickable
  it("dispara onClick ao pressionar Space em modo clickable", () => {
    const handleClick = vi.fn();
    const { container } = render(
      <Card clickable onClick={handleClick}>
        Clicável
      </Card>,
    );
    const card = container.querySelector(".ant-card") as HTMLElement;
    fireEvent.keyDown(card, { key: " " });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 7. onKeyDown do consumer é chamado antes do handler interno
  it("chama onKeyDown do consumer antes do handler interno de teclado", () => {
    const callOrder: string[] = [];
    const consumerOnKeyDown = vi.fn(() => {
      callOrder.push("consumer");
    });
    const consumerOnClick = vi.fn(() => {
      callOrder.push("click");
    });
    const { container } = render(
      <Card clickable onKeyDown={consumerOnKeyDown} onClick={consumerOnClick}>
        Clicável
      </Card>,
    );
    const card = container.querySelector(".ant-card") as HTMLElement;
    fireEvent.keyDown(card, { key: "Enter" });
    expect(callOrder[0]).toBe("consumer");
    expect(callOrder[1]).toBe("click");
  });

  // 8. Quando consumer chama preventDefault, o handler interno NÃO dispara onClick
  it("não dispara onClick interno quando consumer chama preventDefault no onKeyDown", () => {
    const handleClick = vi.fn();
    const consumerOnKeyDown = vi.fn((event: React.KeyboardEvent) => {
      event.preventDefault();
    });
    const { container } = render(
      <Card clickable onKeyDown={consumerOnKeyDown} onClick={handleClick}>
        Clicável
      </Card>,
    );
    const card = container.querySelector(".ant-card") as HTMLElement;
    fireEvent.keyDown(card, { key: "Enter" });
    expect(handleClick).not.toHaveBeenCalled();
  });

  // 9. className do consumer é preservado junto com ds-card-clickable
  it("preserva className do consumer junto com ds-card-clickable quando clickable=true", () => {
    const { container } = render(
      <Card clickable className="minha-classe-custom">
        Clicável
      </Card>,
    );
    const card = container.querySelector(".ant-card");
    expect(card).toHaveClass("minha-classe-custom");
    expect(card).toHaveClass("ds-card-clickable");
  });

  // 10. style do consumer é mesclado com cursor: pointer em modo clickable
  it("mescla style do consumer com cursor: pointer quando clickable=true", () => {
    const { container } = render(
      <Card clickable style={{ color: "red", marginTop: "8px" }}>
        Clicável
      </Card>,
    );
    const card = container.querySelector(".ant-card") as HTMLElement;
    expect(card.style.cursor).toBe("pointer");
    expect(card.style.color).toBe("red");
    expect(card.style.marginTop).toBe("8px");
  });

  // 11. Sem role quando clickable=false
  it("não tem role quando clickable=false explícito", () => {
    const { container } = render(<Card clickable={false}>Estático explícito</Card>);
    const card = container.querySelector(".ant-card");
    expect(card?.getAttribute("role")).toBeNull();
  });
});
