import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from ".";

describe("Input", () => {
  it("renders input with placeholder", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("applies ds-input base class", () => {
    const { container } = render(<Input placeholder="x" />);
    const inputEl = container.querySelector("input.ant-input");
    expect(inputEl?.className).toMatch(/ds-input/);
  });

  it("renders all sizes (xs, s, m, l)", () => {
    const { rerender } = render(<Input size="xs" placeholder="XS" />);
    expect(screen.getByPlaceholderText("XS")).toBeInTheDocument();
    rerender(<Input size="s" placeholder="S" />);
    expect(screen.getByPlaceholderText("S")).toBeInTheDocument();
    rerender(<Input size="m" placeholder="M" />);
    expect(screen.getByPlaceholderText("M")).toBeInTheDocument();
    rerender(<Input size="l" placeholder="L" />);
    expect(screen.getByPlaceholderText("L")).toBeInTheDocument();
  });

  it("renders the label and associates it to the input", () => {
    render(<Input label="E-mail" placeholder="seu@email.com" />);
    const label = screen.getByText("E-mail");
    const input = screen.getByPlaceholderText("seu@email.com");
    expect(label).toBeInTheDocument();
    expect(label.getAttribute("for")).toBe(input.getAttribute("id"));
  });

  it("renders helperText below the field", () => {
    render(<Input label="Label" helperText="Texto auxiliar" placeholder="x" />);
    expect(screen.getByText("Texto auxiliar")).toBeInTheDocument();
  });

  it("marks the wrapper with error modifier when status is error", () => {
    const { container } = render(<Input status="error" helperText="Senha incorreta" placeholder="x" />);
    expect(container.querySelector(".ds-input-wrapper--error")).not.toBeNull();
    const inputEl = container.querySelector("input.ant-input");
    expect(inputEl?.className).toMatch(/ant-input-status-error/);
  });

  it("marks the wrapper with disabled modifier when disabled", () => {
    const { container } = render(<Input disabled label="Label" placeholder="Disabled" />);
    expect(container.querySelector(".ds-input-wrapper--disabled")).not.toBeNull();
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("calls onChange when text is typed", () => {
    const onChange = vi.fn();
    render(<Input placeholder="Digite" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText("Digite"), { target: { value: "abc" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.value).toBe("abc");
  });

  it("renders readonly input without disabling typing API", () => {
    render(<Input readOnly value="Apenas leitura" />);
    const input = screen.getByDisplayValue("Apenas leitura") as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  it("supports controlled value via prop", () => {
    const { rerender } = render(<Input value="A" onChange={() => undefined} />);
    expect((screen.getByDisplayValue("A") as HTMLInputElement).value).toBe("A");
    rerender(<Input value="B" onChange={() => undefined} />);
    expect((screen.getByDisplayValue("B") as HTMLInputElement).value).toBe("B");
  });

  it("renders prefix as ReactNode when provided", () => {
    const { container } = render(<Input prefix={<span data-testid="prefix">$</span>} placeholder="x" />);
    expect(container.querySelector('[data-testid="prefix"]')).not.toBeNull();
  });

  it("renders suffix as ReactNode when provided", () => {
    const { container } = render(<Input suffix={<span data-testid="suffix">×</span>} placeholder="x" />);
    expect(container.querySelector('[data-testid="suffix"]')).not.toBeNull();
  });

  it("accepts prefix as Lucide name string", () => {
    const { container } = render(<Input prefix="Search" placeholder="x" />);
    const svg = container.querySelector(".ant-input-prefix svg");
    expect(svg).not.toBeNull();
  });

  it("accepts suffix as Lucide name string", () => {
    const { container } = render(<Input suffix="EyeOff" placeholder="x" />);
    const svg = container.querySelector(".ant-input-suffix svg");
    expect(svg).not.toBeNull();
  });

  it("makes the suffix clickable via onSuffixClick", () => {
    const onSuffixClick = vi.fn();
    const { container } = render(<Input suffix="EyeOff" onSuffixClick={onSuffixClick} placeholder="x" />);
    const button = container.querySelector(".ant-input-suffix button.ds-input-affix-button") as HTMLButtonElement | null;
    expect(button).not.toBeNull();
    fireEvent.click(button as HTMLButtonElement);
    expect(onSuffixClick).toHaveBeenCalledTimes(1);
  });

  it("calls onPrefixClick when the prefix button is clicked", () => {
    const onPrefixClick = vi.fn();
    const { container } = render(<Input prefix="Search" onPrefixClick={onPrefixClick} placeholder="x" />);
    const button = container.querySelector(".ant-input-prefix button.ds-input-affix-button") as HTMLButtonElement | null;
    expect(button).not.toBeNull();
    fireEvent.click(button as HTMLButtonElement);
    expect(onPrefixClick).toHaveBeenCalledTimes(1);
  });

  it("forwards custom className alongside ds-input", () => {
    const { container } = render(<Input className="custom-cls" placeholder="x" />);
    const inputEl = container.querySelector("input.ant-input");
    expect(inputEl?.className).toMatch(/custom-cls/);
    expect(inputEl?.className).toMatch(/ds-input/);
  });
});
