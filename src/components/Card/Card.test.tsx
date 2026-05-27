import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Card } from ".";

describe("Card", () => {
  it("renderiza o conteúdo (children)", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renderiza um título passado via children (não há header próprio)", () => {
    render(
      <Card>
        <h3>Título no corpo</h3>
        <p>Conteúdo</p>
      </Card>,
    );
    expect(screen.getByText("Título no corpo")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
  });

  it("aplica a classe ds-card-clickable quando clickable=true", () => {
    const { container } = render(<Card clickable>Clickable card</Card>);
    const card = container.querySelector(".ant-card");
    expect(card).toHaveClass("ds-card-clickable");
  });

  it("não aplica a classe ds-card-clickable quando clickable=false", () => {
    const { container } = render(<Card>Static</Card>);
    const card = container.querySelector(".ant-card");
    expect(card).not.toHaveClass("ds-card-clickable");
  });

  it("define tabIndex=0 quando clickable=true", () => {
    const { container } = render(<Card clickable>Focusable</Card>);
    const card = container.querySelector(".ant-card") as HTMLElement;
    expect(card.getAttribute("tabindex")).toBe("0");
  });

  it("não define tabIndex quando clickable=false", () => {
    const { container } = render(<Card>Static</Card>);
    const card = container.querySelector(".ant-card");
    expect(card?.getAttribute("tabindex")).toBeNull();
  });

  it("dispara onClick quando clicado em modo clickable", () => {
    const handleClick = vi.fn();
    const { container } = render(
      <Card clickable onClick={handleClick}>
        Click me
      </Card>,
    );
    const card = container.querySelector(".ant-card") as HTMLElement;
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("preserva className do consumer quando clickable", () => {
    const { container } = render(
      <Card clickable className="custom-class">
        Card
      </Card>,
    );
    const card = container.querySelector(".ant-card");
    expect(card).toHaveClass("custom-class");
    expect(card).toHaveClass("ds-card-clickable");
  });
});
