import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
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
  it("renderiza com placeholders padrão", () => {
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

  it("respeita o estado disabled", () => {
    const { container } = render(<RangePicker disabled />);
    const inputs = container.querySelectorAll("input");
    inputs.forEach((input) => expect(input).toBeDisabled());
  });
});
