import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Plus } from "lucide-react";
import { Button } from "./Button";
import { shadow } from "../../theme";

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

  it("does not apply focus shadow in default primary state", () => {
    render(<Button type="primary">Primary</Button>);
    const button = screen.getByRole("button", { name: /primary/i });
    expect(button).not.toHaveStyle({ boxShadow: shadow.focus });
  });

  it("applies DS focus shadow for ghost variant when pseudo focus is active", () => {
    render(
      <Button
        type="ghost"
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
        type="primary"
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
        <Button type="ghost">Ghost</Button>
        <Button type="outlined">Outlined</Button>
        <Button type="neutral">Neutral</Button>
      </>,
    );

    expect(screen.getByRole("button", { name: /ghost/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /outlined/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /neutral/i }),
    ).toBeInTheDocument();
  });
});
