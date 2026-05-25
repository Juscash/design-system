import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Switch } from ".";

describe("Switch", () => {
  it("renders switch", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("applies ds-switch base class", () => {
    const { container } = render(<Switch />);
    const sw = container.querySelector(".ant-switch");
    expect(sw?.className).toMatch(/ds-switch/);
  });

  it("renders disabled switch", () => {
    render(<Switch disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("renders checked switch", () => {
    render(<Switch defaultChecked />);
    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("aria-checked", "true");
  });

  it("applies ds-switch-error class when error prop is true", () => {
    const { container } = render(<Switch error />);
    const sw = container.querySelector(".ant-switch");
    expect(sw?.className).toMatch(/ds-switch-error/);
  });

  it("renders loading switch", () => {
    const { container } = render(<Switch loading />);
    expect(container.querySelector(".ant-switch-loading")).not.toBeNull();
  });

  it("calls onChange when toggled", () => {
    const onChange = vi.fn();
    render(<Switch onChange={onChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe(true);
  });

  it("does not call onChange when disabled", () => {
    const onChange = vi.fn();
    render(<Switch onChange={onChange} disabled />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders checkedChildren and unCheckedChildren", () => {
    const { container, rerender } = render(<Switch checkedChildren="ON" unCheckedChildren="OFF" />);
    // unchecked default shows OFF
    expect(container.textContent).toMatch(/OFF/);
    rerender(<Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />);
    expect(container.textContent).toMatch(/ON/);
  });

  it("supports size=small via Antd prop", () => {
    const { container } = render(<Switch size="small" />);
    expect(container.querySelector(".ant-switch-small")).not.toBeNull();
  });

  it("forwards custom className alongside ds-switch", () => {
    const { container } = render(<Switch className="custom-cls" />);
    const sw = container.querySelector(".ant-switch");
    expect(sw?.className).toMatch(/custom-cls/);
    expect(sw?.className).toMatch(/ds-switch/);
  });
});
