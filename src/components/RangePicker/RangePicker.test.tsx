import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import dayjs from "dayjs";
import { RangePicker } from ".";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class ResizeObserverMock {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

describe("RangePicker", () => {
  it("renderiza com os placeholders padrão", () => {
    const { container } = render(<RangePicker />);
    const inputs = container.querySelectorAll("input");
    expect(inputs[0]?.getAttribute("placeholder")).toBe("Data inicial");
    expect(inputs[1]?.getAttribute("placeholder")).toBe("Data final");
  });

  it("aceita placeholders customizados", () => {
    const { container } = render(<RangePicker placeholder={["De", "Até"]} />);
    const inputs = container.querySelectorAll("input");
    expect(inputs[0]?.getAttribute("placeholder")).toBe("De");
    expect(inputs[1]?.getAttribute("placeholder")).toBe("Até");
  });

  it("renderiza o ícone de calendário (Lucide)", () => {
    const { container } = render(<RangePicker />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("aplica a classe base ds-datepicker", () => {
    const { container } = render(<RangePicker />);
    expect(container.querySelector(".ds-datepicker")).toBeInTheDocument();
  });

  it.each([
    ["xs", "24px"],
    ["s", "32px"],
    ["m", "36px"],
    ["l", "40px"],
  ] as const)("aplica a altura do size %s", (size, height) => {
    const { container } = render(<RangePicker size={size} />);
    const root = container.querySelector(".ds-datepicker") as HTMLElement;
    expect(root.style.height).toBe(height);
  });

  it("é editável por padrão (inputs não readonly)", () => {
    const { container } = render(<RangePicker />);
    const inputs = container.querySelectorAll("input");
    inputs.forEach((input) => expect(input.readOnly).toBe(false));
  });

  it("exibe o intervalo controlado no formato DD/MM/YYYY", () => {
    const { container } = render(<RangePicker value={[dayjs("2025-05-15"), dayjs("2025-06-08")]} />);
    const inputs = container.querySelectorAll("input");
    expect(inputs[0]?.value).toBe("15/05/2025");
    expect(inputs[1]?.value).toBe("08/06/2025");
  });

  it("respeita o estado disabled", () => {
    const { container } = render(<RangePicker disabled />);
    const inputs = container.querySelectorAll("input");
    inputs.forEach((input) => expect(input).toBeDisabled());
  });

  it("renderiza normalmente quando recebe a prop tooltip", () => {
    render(<RangePicker tooltip="Ajuda" placeholder={["Início", "Fim"]} />);
    expect(screen.getByPlaceholderText("Início")).toBeInTheDocument();
  });

  it("renderiza com showToday e dateTooltip sem quebrar", () => {
    render(<RangePicker showToday dateTooltip={() => "Dia de pagamento"} placeholder={["A", "B"]} />);
    expect(screen.getByPlaceholderText("A")).toBeInTheDocument();
  });
});
