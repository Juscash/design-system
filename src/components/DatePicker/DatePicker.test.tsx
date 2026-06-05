import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import dayjs from "dayjs";
import { DatePicker } from ".";

// Mocks necessários para os componentes do Ant Design rodarem no jsdom.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

class ResizeObserverMock {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

describe("DatePicker", () => {
  it("renderiza com o placeholder informado", () => {
    render(<DatePicker placeholder="Selecione data" />);
    expect(screen.getByPlaceholderText("Selecione data")).toBeInTheDocument();
  });

  it("usa o placeholder mascarado padrão", () => {
    render(<DatePicker />);
    expect(screen.getByPlaceholderText("__/__/____")).toBeInTheDocument();
  });

  it("renderiza o ícone de calendário (Lucide)", () => {
    const { container } = render(<DatePicker />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("aplica a classe base ds-datepicker", () => {
    const { container } = render(<DatePicker />);
    expect(container.querySelector(".ds-datepicker")).toBeInTheDocument();
  });

  it.each([
    ["xs", "24px"],
    ["s", "32px"],
    ["m", "36px"],
    ["l", "40px"],
  ] as const)("aplica a altura do size %s", (size, height) => {
    const { container } = render(<DatePicker size={size} />);
    const root = container.querySelector(".ds-datepicker") as HTMLElement;
    expect(root.style.height).toBe(height);
  });

  it("é editável por padrão (input não readonly)", () => {
    const { container } = render(<DatePicker />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.readOnly).toBe(false);
  });

  it("respeita inputReadOnly quando true", () => {
    const { container } = render(<DatePicker inputReadOnly />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  it("exibe o valor controlado no formato DD/MM/YYYY", () => {
    const { container } = render(<DatePicker value={dayjs("2025-05-15")} />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe("15/05/2025");
  });

  it("dispara onChange ao digitar e confirmar uma data válida", () => {
    const onChange = vi.fn();
    const { container } = render(<DatePicker onChange={onChange} />);
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "15/05/2025" } });
    fireEvent.keyDown(input, { key: "Enter", keyCode: 13 });
    expect(onChange).toHaveBeenCalled();
  });

  it("respeita o estado disabled", () => {
    const { container } = render(<DatePicker disabled />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it("renderiza o picker de mês com seu placeholder", () => {
    render(<DatePicker picker="month" placeholder="Mês" format="MM/YYYY" />);
    expect(screen.getByPlaceholderText("Mês")).toBeInTheDocument();
  });

  it("renderiza normalmente quando recebe a prop tooltip", () => {
    render(<DatePicker tooltip="Ajuda" placeholder="Com tooltip" />);
    expect(screen.getByPlaceholderText("Com tooltip")).toBeInTheDocument();
  });

  it("renderiza com showToday e dateTooltip sem quebrar", () => {
    render(<DatePicker showToday dateTooltip={() => "Dia de pagamento"} placeholder="Com extras" />);
    expect(screen.getByPlaceholderText("Com extras")).toBeInTheDocument();
  });

  it.each(["year-and-month", "only-month", "only-year", "static"] as const)(
    "renderiza com headerVariant=%s sem quebrar",
    (variant) => {
      render(<DatePicker headerVariant={variant} placeholder={`hv-${variant}`} />);
      expect(screen.getByPlaceholderText(`hv-${variant}`)).toBeInTheDocument();
    },
  );

  it("encaminha className customizada", () => {
    const { container } = render(<DatePicker className="minha-classe" />);
    expect(container.querySelector(".ds-datepicker.minha-classe")).toBeInTheDocument();
  });
});
