import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Progress } from ".";

describe("Progress", () => {
  it("renders progress bar with progressbar role", () => {
    render(<Progress percent={40} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("applies ds-progress base class", () => {
    const { container } = render(<Progress percent={40} />);
    const root = container.querySelector(".ant-progress");
    expect(root?.className).toMatch(/ds-progress/);
  });

  it("forwards custom className alongside ds-progress", () => {
    const { container } = render(<Progress percent={40} className="custom-cls" />);
    const root = container.querySelector(".ant-progress");
    expect(root?.className).toMatch(/custom-cls/);
    expect(root?.className).toMatch(/ds-progress/);
  });

  it("renders as the line variant always", () => {
    const { container } = render(<Progress percent={40} />);
    expect(container.querySelector(".ant-progress-line")).not.toBeNull();
  });

  it("does not render the info/percent text", () => {
    const { container } = render(<Progress percent={40} />);
    expect(container.querySelector(".ant-progress-text")).toBeNull();
  });

  it("exposes aria-valuenow according to percent", () => {
    render(<Progress percent={25} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "25");
  });

  it("supports 0% with no fill rendered", () => {
    render(<Progress percent={0} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "0");
  });

  it("supports 100% with bar fully filled", () => {
    render(<Progress percent={100} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "100");
  });

  it("forwards inline style to the wrapping element", () => {
    const { container } = render(<Progress percent={40} style={{ marginTop: 24 }} />);
    const root = container.querySelector(".ant-progress") as HTMLElement;
    expect(root.style.marginTop).toBe("24px");
  });

  it("forwards aria-label to the progress bar", () => {
    render(<Progress percent={40} aria-label="Carregando documento" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "Carregando documento");
  });
});
