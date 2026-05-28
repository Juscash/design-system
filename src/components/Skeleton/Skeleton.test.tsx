import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton } from ".";

describe("Skeleton — composto", () => {
  it("renderiza com role='status'", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renderiza com aria-live='polite'", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });

  it("renderiza com aria-busy='true'", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
  });

  it("renderiza com aria-label default 'Carregando...'", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Carregando...");
  });

  it("aria-label customizável via prop", () => {
    render(<Skeleton aria-label="Aguardando dados..." />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Aguardando dados...");
  });

  it("contém descendente com classe ds-skeleton-avatar", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector(".ds-skeleton-avatar")).toBeInTheDocument();
  });

  it("contém descendente com classe ds-skeleton-line", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector(".ds-skeleton-line")).toBeInTheDocument();
  });

  it("contém descendente com classe ds-skeleton-object", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector(".ds-skeleton-object")).toBeInTheDocument();
  });

  it("subcomponentes internos têm aria-hidden='true'", () => {
    const { container } = render(<Skeleton />);
    const avatar = container.querySelector(".ds-skeleton-avatar");
    const line = container.querySelector(".ds-skeleton-line");
    const obj = container.querySelector(".ds-skeleton-object");
    expect(avatar).toHaveAttribute("aria-hidden", "true");
    expect(line).toHaveAttribute("aria-hidden", "true");
    expect(obj).toHaveAttribute("aria-hidden", "true");
  });

  it("animated=true (default) inclui ds-skeleton-animated nos subcomponentes", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector(".ds-skeleton-avatar")).toHaveClass("ds-skeleton-animated");
    expect(container.querySelector(".ds-skeleton-line")).toHaveClass("ds-skeleton-animated");
    expect(container.querySelector(".ds-skeleton-object")).toHaveClass("ds-skeleton-animated");
  });

  it("animated=false omite ds-skeleton-animated nos subcomponentes", () => {
    const { container } = render(<Skeleton animated={false} />);
    expect(container.querySelector(".ds-skeleton-avatar")).not.toHaveClass("ds-skeleton-animated");
    expect(container.querySelector(".ds-skeleton-line")).not.toHaveClass("ds-skeleton-animated");
    expect(container.querySelector(".ds-skeleton-object")).not.toHaveClass("ds-skeleton-animated");
  });

  it("className do consumer é preservado no wrapper", () => {
    const { container } = render(<Skeleton className="minha-classe" />);
    expect(container.firstChild).toHaveClass("minha-classe");
  });

  it("style do consumer é preservado no wrapper", () => {
    const { container } = render(<Skeleton style={{ opacity: 0.7 }} />);
    expect(container.firstChild).toHaveStyle({ opacity: "0.7" });
  });

  it("não possui tabIndex no wrapper", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).not.toHaveAttribute("tabIndex");
  });

  it("displayName do composto é 'Skeleton'", () => {
    expect(Skeleton.displayName).toBe("Skeleton");
  });
});

describe("Skeleton.Avatar — subcomponente isolado", () => {
  it("renderiza <div> com classe ds-skeleton-avatar", () => {
    const { container } = render(<Skeleton.Avatar />);
    const el = container.firstChild as HTMLElement;
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveClass("ds-skeleton-avatar");
  });

  it("animated=true (default) inclui ds-skeleton-animated", () => {
    const { container } = render(<Skeleton.Avatar />);
    expect(container.firstChild).toHaveClass("ds-skeleton-animated");
  });

  it("animated=false omite ds-skeleton-animated", () => {
    const { container } = render(<Skeleton.Avatar animated={false} />);
    expect(container.firstChild).not.toHaveClass("ds-skeleton-animated");
  });

  it("className do consumer é preservado", () => {
    const { container } = render(<Skeleton.Avatar className="avatar-extra" />);
    expect(container.firstChild).toHaveClass("avatar-extra");
  });

  it("style do consumer é preservado", () => {
    const { container } = render(<Skeleton.Avatar style={{ width: 64 }} />);
    expect(container.firstChild).toHaveStyle({ width: "64px" });
  });

  it("displayName é 'Skeleton.Avatar'", () => {
    expect(Skeleton.Avatar.displayName).toBe("Skeleton.Avatar");
  });
});

describe("Skeleton.Line — subcomponente isolado", () => {
  it("renderiza <div> com classe ds-skeleton-line", () => {
    const { container } = render(<Skeleton.Line />);
    const el = container.firstChild as HTMLElement;
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveClass("ds-skeleton-line");
  });

  it("animated=true (default) inclui ds-skeleton-animated", () => {
    const { container } = render(<Skeleton.Line />);
    expect(container.firstChild).toHaveClass("ds-skeleton-animated");
  });

  it("animated=false omite ds-skeleton-animated", () => {
    const { container } = render(<Skeleton.Line animated={false} />);
    expect(container.firstChild).not.toHaveClass("ds-skeleton-animated");
  });

  it("className do consumer é preservado", () => {
    const { container } = render(<Skeleton.Line className="line-extra" />);
    expect(container.firstChild).toHaveClass("line-extra");
  });

  it("style do consumer é preservado", () => {
    const { container } = render(<Skeleton.Line style={{ height: 24 }} />);
    expect(container.firstChild).toHaveStyle({ height: "24px" });
  });

  it("displayName é 'Skeleton.Line'", () => {
    expect(Skeleton.Line.displayName).toBe("Skeleton.Line");
  });
});

describe("Skeleton.Object — subcomponente isolado", () => {
  it("renderiza <div> com classe ds-skeleton-object", () => {
    const { container } = render(<Skeleton.Object />);
    const el = container.firstChild as HTMLElement;
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveClass("ds-skeleton-object");
  });

  it("animated=true (default) inclui ds-skeleton-animated", () => {
    const { container } = render(<Skeleton.Object />);
    expect(container.firstChild).toHaveClass("ds-skeleton-animated");
  });

  it("animated=false omite ds-skeleton-animated", () => {
    const { container } = render(<Skeleton.Object animated={false} />);
    expect(container.firstChild).not.toHaveClass("ds-skeleton-animated");
  });

  it("className do consumer é preservado", () => {
    const { container } = render(<Skeleton.Object className="object-extra" />);
    expect(container.firstChild).toHaveClass("object-extra");
  });

  it("style do consumer é preservado", () => {
    const { container } = render(<Skeleton.Object style={{ height: 200 }} />);
    expect(container.firstChild).toHaveStyle({ height: "200px" });
  });

  it("displayName é 'Skeleton.Object'", () => {
    expect(Skeleton.Object.displayName).toBe("Skeleton.Object");
  });
});
