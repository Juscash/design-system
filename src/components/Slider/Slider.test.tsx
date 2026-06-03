import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Slider } from ".";

describe("Slider", () => {
  it("renders slider", () => {
    render(<Slider defaultValue={50} />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("applies ds-slider base class", () => {
    const { container } = render(<Slider defaultValue={50} />);
    const root = container.querySelector(".ant-slider");
    expect(root?.className).toMatch(/ds-slider/);
  });

  it("forwards custom className alongside ds-slider", () => {
    const { container } = render(<Slider defaultValue={50} className="custom-cls" />);
    const root = container.querySelector(".ant-slider");
    expect(root?.className).toMatch(/custom-cls/);
    expect(root?.className).toMatch(/ds-slider/);
  });

  it("renders disabled slider", () => {
    const { container } = render(<Slider defaultValue={50} disabled />);
    expect(container.querySelector(".ant-slider-disabled")).not.toBeNull();
  });

  it("renders horizontal range slider with two handles", () => {
    render(<Slider range defaultValue={[25, 75]} />);
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  it("renders vertical slider", () => {
    const { container } = render(<Slider vertical defaultValue={50} />);
    expect(container.querySelector(".ant-slider-vertical")).not.toBeNull();
  });

  it("renders vertical range slider with two handles", () => {
    const { container } = render(<Slider vertical range defaultValue={[25, 75]} />);
    expect(container.querySelector(".ant-slider-vertical")).not.toBeNull();
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  it("respects min, max and aria attributes from antd", () => {
    render(<Slider defaultValue={10} min={0} max={100} />);
    const handle = screen.getByRole("slider");
    expect(handle).toHaveAttribute("aria-valuemin", "0");
    expect(handle).toHaveAttribute("aria-valuemax", "100");
    expect(handle).toHaveAttribute("aria-valuenow", "10");
  });

  it("accepts onChange handler without errors", () => {
    const onChange = vi.fn();
    const { container } = render(<Slider defaultValue={50} onChange={onChange} />);
    const handle = screen.getByRole("slider");
    handle.focus();
    // Verifica que o slider monta sem erros com onChange e que mantém
    // o foco no handle (key navigation depende de side effects do
    // rc-slider que dependem de layout, não confiáveis em jsdom).
    expect(container.querySelector(".ant-slider")).not.toBeNull();
    expect(document.activeElement).toBe(handle);
  });

  it("forwards inline style to the wrapping element", () => {
    const { container } = render(<Slider defaultValue={50} style={{ marginTop: 24 }} />);
    const root = container.querySelector(".ant-slider") as HTMLElement;
    expect(root.style.marginTop).toBe("24px");
  });
});

