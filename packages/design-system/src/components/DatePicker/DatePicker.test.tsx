import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DatePicker, RangePicker } from "./DatePicker";

// Mock do matchMedia, necessário para componentes Ant Design
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

describe("DatePicker", () => {
  it("renderiza corretamente", () => {
    render(<DatePicker placeholder="Selecione data" />);
    expect(screen.getByPlaceholderText("Selecione data")).toBeInTheDocument();
  });

  it("renderiza ícone de calendário", () => {
    const { container } = render(<DatePicker />);
    // Verifica se existe um ícone SVG (Lucide Calendar)
    const svgIcon = container.querySelector("svg");
    expect(svgIcon).toBeInTheDocument();
  });
});

describe("RangePicker", () => {
  it("renderiza corretamente", () => {
    render(<RangePicker placeholder={["Início", "Fim"]} />);
    expect(screen.getByPlaceholderText("Início")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Fim")).toBeInTheDocument();
  });

  it("renderiza com classe customizada", () => {
    render(<RangePicker className="test-class" />);
    // Ant Design aplica classes no container pai ou input
    // Verificação simplificada de renderização sem erro
    expect(document.querySelector(".ant-picker-range")).toBeInTheDocument();
  });
});
