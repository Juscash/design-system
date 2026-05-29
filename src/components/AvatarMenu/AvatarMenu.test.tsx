import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AvatarMenu } from ".";

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

describe("AvatarMenu", () => {
  it("renderiza com children padrão CN", () => {
    const { container } = render(<AvatarMenu />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renderiza com children customizado", () => {
    const { getByText } = render(<AvatarMenu>PV</AvatarMenu>);
    expect(getByText("PV")).toBeInTheDocument();
  });

  it("aplica boxShadow no estado focus", () => {
    const { container } = render(<AvatarMenu state="focus">CN</AvatarMenu>);
    const root = container.firstChild as HTMLElement;
    expect(root.style.boxShadow).not.toBe("");
  });

  it("não aplica boxShadow no estado default", () => {
    const { container } = render(<AvatarMenu state="default">CN</AvatarMenu>);
    const root = container.firstChild as HTMLElement;
    expect(root.style.boxShadow).toBe("");
  });
});
