import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { KpiCard } from ".";

describe("KpiCard", () => {
  it("renders label and value (default no-icon variant)", () => {
    render(<KpiCard label="Devedores" value="1.234" />);
    expect(screen.getByText("Devedores")).toBeInTheDocument();
    expect(screen.getByText("1.234")).toBeInTheDocument();
  });

  it("applies base class and no-icon variant", () => {
    const { container } = render(<KpiCard label="X" value={1} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toMatch(/ds-kpi-card/);
    expect(root.className).toMatch(/ds-kpi-card--no-icon/);
    expect(root.className).toMatch(/ds-kpi-card--align-left/);
  });

  it("supports align=center when no icon", () => {
    const { container } = render(<KpiCard label="X" value={1} align="center" />);
    expect(container.firstElementChild?.className).toMatch(/ds-kpi-card--align-center/);
  });

  it("ignores align when icon is provided (size variant used)", () => {
    const { container } = render(<KpiCard label="X" value={1} icon="Users" align="center" />);
    expect(container.firstElementChild?.className).toMatch(/ds-kpi-card--with-icon/);
    expect(container.firstElementChild?.className).toMatch(/ds-kpi-card--size-l/);
    expect(container.firstElementChild?.className).not.toMatch(/--align-/);
  });

  it("renders Lucide icon when icon is a string", () => {
    const { container } = render(<KpiCard label="X" value={1} icon="Users" />);
    expect(container.querySelector(".ds-kpi-card__icon svg")).not.toBeNull();
  });

  it("renders ReactNode icon when icon is a node", () => {
    const { container } = render(<KpiCard label="X" value={1} icon={<span data-testid="custom-icon" />} />);
    expect(container.querySelector('[data-testid="custom-icon"]')).not.toBeNull();
  });

  it("supports size=m with icon", () => {
    const { container } = render(<KpiCard label="X" value={1} icon="Users" size="m" />);
    expect(container.firstElementChild?.className).toMatch(/ds-kpi-card--size-m/);
  });

  it("renders badge with up direction", () => {
    render(<KpiCard label="X" value={1} badge={{ value: "+12%", direction: "up" }} />);
    expect(screen.getByText("+12%")).toBeInTheDocument();
    expect(screen.getByLabelText(/Tendência de alta/)).toBeInTheDocument();
  });

  it("renders badge with down direction", () => {
    render(<KpiCard label="X" value={1} badge={{ value: "-4%", direction: "down" }} />);
    expect(screen.getByText("-4%")).toBeInTheDocument();
    expect(screen.getByLabelText(/Tendência de baixa/)).toBeInTheDocument();
  });

  it("renders subtitle when provided and has icon", () => {
    render(<KpiCard label="X" value={1} icon="Users" subtitle="Últimos 30 dias" />);
    expect(screen.getByText("Últimos 30 dias")).toBeInTheDocument();
  });

  it("activates clickable when onClick is provided", () => {
    const onClick = vi.fn();
    const { container } = render(<KpiCard label="Receita" value="R$ 100" onClick={onClick} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toMatch(/ds-kpi-card--clickable/);
    expect(root.getAttribute("role")).toBe("button");
    expect(root.getAttribute("tabindex")).toBe("0");
    expect(root.getAttribute("aria-label")).toBe("Receita: R$ 100");
    fireEvent.click(root);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("triggers onClick on Enter key when clickable", () => {
    const onClick = vi.fn();
    const { container } = render(<KpiCard label="X" value={1} onClick={onClick} />);
    fireEvent.keyDown(container.firstElementChild as HTMLElement, { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("triggers onClick on Space key when clickable", () => {
    const onClick = vi.fn();
    const { container } = render(<KpiCard label="X" value={1} onClick={onClick} />);
    fireEvent.keyDown(container.firstElementChild as HTMLElement, { key: " " });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not activate clickable when only label/value", () => {
    const { container } = render(<KpiCard label="X" value={1} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).not.toMatch(/ds-kpi-card--clickable/);
    expect(root.getAttribute("role")).toBeNull();
  });

  it("accepts clickable=true without onClick", () => {
    const { container } = render(<KpiCard label="X" value={1} clickable />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toMatch(/ds-kpi-card--clickable/);
    expect(root.getAttribute("role")).toBe("button");
  });

  it("forwards custom className alongside ds-kpi-card", () => {
    const { container } = render(<KpiCard label="X" value={1} className="custom-cls" />);
    expect(container.firstElementChild?.className).toMatch(/custom-cls/);
    expect(container.firstElementChild?.className).toMatch(/ds-kpi-card/);
  });

  it("applies tone=neutral", () => {
    const { container } = render(<KpiCard label="X" value={1} icon="Search" tone="neutral" />);
    expect(container.firstElementChild?.className).toMatch(/ds-kpi-card--tone-neutral/);
  });

  it("detects empty state when value is '—'", () => {
    const { container } = render(<KpiCard label="X" value="—" icon="Search" />);
    expect(container.firstElementChild?.className).toMatch(/ds-kpi-card--empty/);
  });

  it("detects empty state when value is '-'", () => {
    const { container } = render(<KpiCard label="X" value="-" />);
    expect(container.firstElementChild?.className).toMatch(/ds-kpi-card--empty/);
  });

  it("detects empty state when value is empty string", () => {
    const { container } = render(<KpiCard label="X" value="" />);
    expect(container.firstElementChild?.className).toMatch(/ds-kpi-card--empty/);
  });

  it("does not mark as empty when value has data", () => {
    const { container } = render(<KpiCard label="X" value="1.234" />);
    expect(container.firstElementChild?.className).not.toMatch(/ds-kpi-card--empty/);
  });

  it("renders without crashing when tooltipCard is provided", () => {
    expect(() => render(<KpiCard label="X" value="1" tooltipCard="Total: {value}" />)).not.toThrow();
  });

  it("renders without crashing when tooltipValue is provided", () => {
    expect(() => render(<KpiCard label="X" value="1" tooltipValue="{label}: {value}" />)).not.toThrow();
  });

  it("renders without crashing when tooltipBadge is provided with badge", () => {
    expect(() =>
      render(<KpiCard label="X" value="1" badge={{ value: "+10%", direction: "up" }} tooltipBadge="Variação de {value}" />),
    ).not.toThrow();
  });

  it("renders without tooltips by default (no aria-describedby on render)", () => {
    const { container } = render(<KpiCard label="X" value="1" />);
    expect(container.querySelectorAll("[aria-describedby]").length).toBe(0);
  });
});
