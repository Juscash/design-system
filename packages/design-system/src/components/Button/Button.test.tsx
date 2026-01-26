import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders the button with text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("renders primary button", () => {
    render(<Button type="primary">Primary</Button>);
    expect(
      screen.getByRole("button", { name: /primary/i }),
    ).toBeInTheDocument();
  });

  it("renders secondary button", () => {
    render(<Button type="secondary">Secondary</Button>);
    expect(
      screen.getByRole("button", { name: /secondary/i }),
    ).toBeInTheDocument();
  });

  it("renders destructive button", () => {
    render(<Button type="destructive">Destructive</Button>);
    expect(
      screen.getByRole("button", { name: /destructive/i }),
    ).toBeInTheDocument();
  });

  it("renders disabled button", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button", { name: /disabled/i })).toBeDisabled();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Button dsSize="xs">XS</Button>);
    expect(screen.getByRole("button", { name: /xs/i })).toBeInTheDocument();

    rerender(<Button dsSize="s">S</Button>);
    expect(screen.getByRole("button", { name: /^s$/i })).toBeInTheDocument();

    rerender(<Button dsSize="m">M</Button>);
    expect(screen.getByRole("button", { name: /^m$/i })).toBeInTheDocument();
  });
});
