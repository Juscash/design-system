import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FormItem } from "./FormItem";

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

describe("FormItem", () => {
  it("renders form item with label", () => {
    render(
      <FormItem label="Label">
        <input />
      </FormItem>,
    );
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("passes size to child component when child has no size", () => {
    const Child = ({ size }: { size?: string }) => <div data-testid="child" data-size={size} />;

    render(
      <FormItem label="Label" size="xs">
        <Child />
      </FormItem>,
    );

    expect(screen.getByTestId("child")).toHaveAttribute("data-size", "xs");
  });

  it("does not override child size when already provided", () => {
    const Child = ({ size }: { size?: string }) => <div data-testid="child" data-size={size} />;

    render(
      <FormItem label="Label" size="xs">
        <Child size="l" />
      </FormItem>,
    );

    expect(screen.getByTestId("child")).toHaveAttribute("data-size", "l");
  });
});
