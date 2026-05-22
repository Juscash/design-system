import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Plus } from "lucide-react";
import { Button } from ".";
import { shadow } from "../../theme";

describe("Button", () => {
  it("renders the button with text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("renders primary button", () => {
    render(<Button variant="primary">Primary</Button>);
    expect(
      screen.getByRole("button", { name: /primary/i }),
    ).toBeInTheDocument();
  });

  it("renders secondary button", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(
      screen.getByRole("button", { name: /secondary/i }),
    ).toBeInTheDocument();
  });

  it("renders destructive button", () => {
    render(<Button variant="destructive">Destructive</Button>);
    expect(
      screen.getByRole("button", { name: /destructive/i }),
    ).toBeInTheDocument();
  });

  it("renders disabled button", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button", { name: /disabled/i })).toBeDisabled();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Button size="xs">XS</Button>);
    expect(screen.getByRole("button", { name: /xs/i })).toBeInTheDocument();

    rerender(<Button size="s">S</Button>);
    expect(screen.getByRole("button", { name: /^s$/i })).toBeInTheDocument();

    rerender(<Button size="m">M</Button>);
    expect(screen.getByRole("button", { name: /^m$/i })).toBeInTheDocument();
  });

  it("does not apply focus shadow in default primary state", () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole("button", { name: /primary/i });
    expect(button).not.toHaveStyle({ boxShadow: shadow.focus });
  });

  it("applies DS focus shadow for ghost variant when pseudo focus is active", () => {
    render(
      <Button
        variant="ghost"
        className="pseudo-focus-visible"
        aria-label="Ghost focus"
      >
        Ghost Focus
      </Button>,
    );
    const button = screen.getByRole("button", { name: /ghost focus/i });
    expect(button).toHaveStyle({ boxShadow: shadow.focus });
  });

  it("applies DS focus shadow for icon-only button when pseudo focus is active", () => {
    render(
      <Button
        variant="primary"
        className="pseudo-focus-visible"
        icon={<Plus size={16} />}
        aria-label="Add icon"
      />,
    );
    const button = screen.getByRole("button", { name: /add icon/i });
    expect(button).toHaveStyle({ boxShadow: shadow.focus });
  });

  it("keeps custom variants rendering without regression", () => {
    render(
      <>
        <Button variant="ghost">Ghost</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="neutral">Neutral</Button>
      </>,
    );

    expect(screen.getByRole("button", { name: /ghost/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /outline/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /neutral/i }),
    ).toBeInTheDocument();
  });

  it("renders with variant prop taking precedence over type", () => {
    const { rerender } = render(<Button variant="destructive">Button</Button>);
    expect(screen.getByRole("button", { name: /button/i })).toBeInTheDocument();

    rerender(<Button variant="secondary">Button</Button>);
    expect(screen.getByRole("button", { name: /button/i })).toBeInTheDocument();

    rerender(<Button variant="outline">Button</Button>);
    expect(screen.getByRole("button", { name: /button/i })).toBeInTheDocument();
  });
});
