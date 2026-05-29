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

  it("renders disabled input (input element is disabled)", () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
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

  it("applies error status class on the wrapper", () => {
    const { container } = render(<Input status="error" placeholder="Erro" />);
    const inputEl = container.querySelector("input.ant-input");
    expect(inputEl?.className).toMatch(/ant-input-status-error/);
  });

  it("applies warning status class on the wrapper", () => {
    const { container } = render(<Input status="warning" placeholder="Aviso" />);
    const inputEl = container.querySelector("input.ant-input");
    expect(inputEl?.className).toMatch(/ant-input-status-warning/);
  });

  it("calls onChange when text is typed", () => {
    const onChange = vi.fn();
    render(<Input placeholder="Digite" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText("Digite"), { target: { value: "abc" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.value).toBe("abc");
  });

  it("input element has disabled attribute when prop is true", () => {
    render(<Input placeholder="Disabled" disabled />);
    const input = screen.getByPlaceholderText("Disabled") as HTMLInputElement;
    expect(input.disabled).toBe(true);
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
    const { container } = render(<Input suffix="Eye" placeholder="x" />);
    const svg = container.querySelector(".ant-input-suffix svg");
    expect(svg).not.toBeNull();
  });

  it("forwards custom className alongside ds-input", () => {
    const { container } = render(<Input className="custom-cls" placeholder="x" />);
    const inputEl = container.querySelector("input.ant-input");
    expect(inputEl?.className).toMatch(/custom-cls/);
    expect(inputEl?.className).toMatch(/ds-input/);
  });

  it("formats CPF as user types", () => {
    const onChange = vi.fn();
    render(<Input mask="cpf" onChange={onChange} aria-label="cpf" />);
    const input = screen.getByLabelText("cpf") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "12345678900" } });
    expect(input.value).toBe("123.456.789-00");
    expect(onChange.mock.calls[0][1]).toBe("12345678900");
  });

  it("formats CNJ as user types", () => {
    const onChange = vi.fn();
    render(<Input mask="cnj" onChange={onChange} aria-label="cnj" />);
    const input = screen.getByLabelText("cnj") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "12345678901234567890" } });
    expect(input.value).toBe("1234567-89.0123.4.56.7890");
    expect(onChange.mock.calls[0][1]).toBe("12345678901234567890");
  });

  it("formats OAB with digits + UF", () => {
    const onChange = vi.fn();
    render(<Input mask="oab" onChange={onChange} aria-label="oab" />);
    const input = screen.getByLabelText("oab") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "123456SP" } });
    expect(input.value).toBe("123456/SP");
  });

  it("strips non-digits for mask=numero", () => {
    const onChange = vi.fn();
    render(<Input mask="numero" onChange={onChange} aria-label="num" />);
    const input = screen.getByLabelText("num") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "abc123def456" } });
    expect(input.value).toBe("123456");
  });

  it("formats currency dynamically (mask=moeda)", () => {
    const onChange = vi.fn();
    render(<Input mask="moeda" onChange={onChange} aria-label="moeda" />);
    const input = screen.getByLabelText("moeda") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "123456" } });
    expect(input.value).toBe("R$ 1.234,56");
  });

  it("filters by custom regex (mask=custom)", () => {
    const onChange = vi.fn();
    render(<Input mask="custom" maskPattern={/[0-9]/} onChange={onChange} aria-label="custom" />);
    const input = screen.getByLabelText("custom") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "a1b2c3" } });
    expect(input.value).toBe("123");
  });

  it("propagates raw value as second onChange argument", () => {
    const onChange = vi.fn();
    render(<Input mask="cpf" onChange={onChange} aria-label="cpf2" />);
    fireEvent.change(screen.getByLabelText("cpf2"), { target: { value: "999.888.777-66" } });
    expect(onChange.mock.calls[0][0].target.value).toBe("999.888.777-66");
    expect(onChange.mock.calls[0][1]).toBe("99988877766");
  });
});
