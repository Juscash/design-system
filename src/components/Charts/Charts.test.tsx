import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Charts } from "./index";

/**
 * Testes do namespace Charts.
 *
 * `@ant-design/charts` usa Canvas/WebGL e NÃO renderiza em jsdom.
 * Por isso, testamos apenas:
 *   1. Existência dos sub-componentes no namespace (verificação de função).
 *   2. `Charts.Tooltip` — HTML puro, sem dependência de canvas.
 */

describe("Charts — namespace", () => {
  it("Charts.Line existe como função", () => {
    expect(typeof Charts.Line).toBe("function");
  });

  it("Charts.Column existe como função", () => {
    expect(typeof Charts.Column).toBe("function");
  });

  it("Charts.Bar existe como função", () => {
    expect(typeof Charts.Bar).toBe("function");
  });

  it("Charts.Pie existe como função", () => {
    expect(typeof Charts.Pie).toBe("function");
  });

  it("Charts.Donut existe como função", () => {
    expect(typeof Charts.Donut).toBe("function");
  });

  it("Charts.Area existe como função", () => {
    expect(typeof Charts.Area).toBe("function");
  });

  it("Charts.Radar existe como função", () => {
    expect(typeof Charts.Radar).toBe("function");
  });

  it("Charts.Tooltip existe como função", () => {
    expect(typeof Charts.Tooltip).toBe("function");
  });
});

describe("Charts.Tooltip — variant 1", () => {
  const items = [
    { label: "Visitors", value: 275, colorIndex: 1 as const },
    { label: "Sessions", value: 100, colorIndex: 2 as const },
  ];

  it("renderiza título quando fornecido", () => {
    render(
      <Charts.Tooltip variant="1" title="February" items={items} />
    );
    expect(screen.getByText("February")).toBeInTheDocument();
  });

  it("renderiza label e value de cada item", () => {
    render(
      <Charts.Tooltip variant="1" title="February" items={items} />
    );
    expect(screen.getByText("Visitors")).toBeInTheDocument();
    expect(screen.getByText("275")).toBeInTheDocument();
    expect(screen.getByText("Sessions")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renderiza indicador bar para cada item", () => {
    const { container } = render(
      <Charts.Tooltip variant="1" title="February" items={items} />
    );
    const bars = container.querySelectorAll(".juscash-charts-tooltip__bar");
    expect(bars).toHaveLength(items.length);
  });

  it("aplica classe juscash-charts-tooltip ao container", () => {
    const { container } = render(
      <Charts.Tooltip variant="1" title="February" items={items} />
    );
    const root = container.firstElementChild;
    expect(root).toHaveClass("juscash-charts-tooltip");
  });

  it("aplica classe --v1 ao container", () => {
    const { container } = render(
      <Charts.Tooltip variant="1" title="February" items={items} />
    );
    const root = container.firstElementChild;
    expect(root).toHaveClass("juscash-charts-tooltip--v1");
  });

  it("aplica role=tooltip ao container", () => {
    render(
      <Charts.Tooltip variant="1" title="February" items={items} />
    );
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });
});

describe("Charts.Tooltip — variant 2", () => {
  const items = [{ label: "Visitors", value: "275", colorIndex: 1 as const }];

  it("renderiza square, label e value do primeiro item", () => {
    const { container } = render(
      <Charts.Tooltip variant="2" items={items} />
    );
    expect(screen.getByText("Visitors")).toBeInTheDocument();
    expect(screen.getByText("275")).toBeInTheDocument();
    const square = container.querySelector(".juscash-charts-tooltip__square");
    expect(square).toBeInTheDocument();
  });

  it("aplica classe --v2 ao container", () => {
    const { container } = render(
      <Charts.Tooltip variant="2" items={items} />
    );
    const root = container.firstElementChild;
    expect(root).toHaveClass("juscash-charts-tooltip--v2");
  });

  it("aplica role=tooltip ao container", () => {
    render(
      <Charts.Tooltip variant="2" items={items} />
    );
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });
});

describe("Charts.Tooltip — variant 3", () => {
  const items = [{ label: "Desktop", value: "200", colorIndex: 1 as const }];

  it("renderiza divider, título, label e value", () => {
    const { container } = render(
      <Charts.Tooltip variant="3" title="March" items={items} />
    );
    expect(screen.getByText("March")).toBeInTheDocument();
    expect(screen.getByText("Desktop")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    const divider = container.querySelector(".juscash-charts-tooltip__divider");
    expect(divider).toBeInTheDocument();
  });

  it("aplica classe --v3 ao container", () => {
    const { container } = render(
      <Charts.Tooltip variant="3" title="March" items={items} />
    );
    const root = container.firstElementChild;
    expect(root).toHaveClass("juscash-charts-tooltip--v3");
  });

  it("aplica role=tooltip ao container", () => {
    render(
      <Charts.Tooltip variant="3" title="March" items={items} />
    );
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });
});

describe("Charts.Tooltip — colorIndex no inline style", () => {
  it("variant 1: bar do item com colorIndex=1 usa #f54a00", () => {
    const items = [{ label: "A", value: "10", colorIndex: 1 as const }];
    const { container } = render(
      <Charts.Tooltip variant="1" items={items} />
    );
    const bar = container.querySelector(".juscash-charts-tooltip__bar");
    expect(bar).toHaveStyle({ backgroundColor: "#f54a00" });
  });

  it("variant 1: bar do item com colorIndex=2 usa #009689", () => {
    const items = [{ label: "B", value: "20", colorIndex: 2 as const }];
    const { container } = render(
      <Charts.Tooltip variant="1" items={items} />
    );
    const bar = container.querySelector(".juscash-charts-tooltip__bar");
    expect(bar).toHaveStyle({ backgroundColor: "#009689" });
  });

  it("variant 2: square do item com colorIndex=3 usa #104e64", () => {
    const items = [{ label: "C", value: "30", colorIndex: 3 as const }];
    const { container } = render(
      <Charts.Tooltip variant="2" items={items} />
    );
    const square = container.querySelector(".juscash-charts-tooltip__square");
    expect(square).toHaveStyle({ backgroundColor: "#104e64" });
  });

  it("variant 3: divider do item com colorIndex=4 usa #ffb900", () => {
    const items = [{ label: "D", value: "40", colorIndex: 4 as const }];
    const { container } = render(
      <Charts.Tooltip variant="3" items={items} />
    );
    const divider = container.querySelector(".juscash-charts-tooltip__divider");
    expect(divider).toHaveStyle({ backgroundColor: "#ffb900" });
  });

  it("colorIndex ausente: usa colorIndex 1 (chart-1 #f54a00)", () => {
    const items = [{ label: "E", value: "50" }];
    const { container } = render(
      <Charts.Tooltip variant="1" items={items} />
    );
    const bar = container.querySelector(".juscash-charts-tooltip__bar");
    expect(bar).toHaveStyle({ backgroundColor: "#f54a00" });
  });
});

describe("Charts.Tooltip — className do consumer", () => {
  it("preserva className extra passada pelo consumer", () => {
    const items = [{ label: "X", value: "1" }];
    const { container } = render(
      <Charts.Tooltip variant="1" items={items} className="my-custom-class" />
    );
    const root = container.firstElementChild;
    expect(root).toHaveClass("my-custom-class");
    expect(root).toHaveClass("juscash-charts-tooltip");
  });
});
