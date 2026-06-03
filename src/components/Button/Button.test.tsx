import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Plus } from "lucide-react";
import { Button } from ".";
import { shadow } from "../../theme";

describe("Button", () => {
  it("renders the button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("renders primary button", () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button", { name: /primary/i })).toBeInTheDocument();
  });

  it("renders secondary button", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button", { name: /secondary/i })).toBeInTheDocument();
  });

  it("renders neutral button", () => {
    render(<Button variant="neutral">Neutral</Button>);
    expect(screen.getByRole("button", { name: /neutral/i })).toBeInTheDocument();
  });

  it("renders outline button", () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button", { name: /outline/i })).toBeInTheDocument();
  });

  it("renders ghost button", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button", { name: /ghost/i })).toBeInTheDocument();
  });

  it("renders destructive button", () => {
    render(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByRole("button", { name: /destructive/i })).toBeInTheDocument();
  });

  it("renders disabled button", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button", { name: /disabled/i })).toBeDisabled();
  });

  it("renders all sizes (xs, s, m)", () => {
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
      <Button variant="ghost" className="pseudo-focus-visible" aria-label="Ghost focus">
        Ghost Focus
      </Button>,
    );
    const button = screen.getByRole("button", { name: /ghost focus/i });
    expect(button).toHaveStyle({ boxShadow: shadow.focus });
  });

  it("applies DS focus shadow for icon-only button when pseudo focus is active", () => {
    render(<Button variant="primary" className="pseudo-focus-visible" icon={<Plus size={16} />} aria-label="Add icon" />);
    const button = screen.getByRole("button", { name: /add icon/i });
    expect(button).toHaveStyle({ boxShadow: shadow.focus });
  });

  it("variant prop takes precedence over type", () => {
    const { rerender } = render(
      <Button variant="destructive" type="primary">
        Button
      </Button>,
    );
    const buttonEl = screen.getByRole("button", { name: /button/i });
    expect(buttonEl).toBeInTheDocument();
    rerender(
      <Button variant="outline" type="primary">
        Button
      </Button>,
    );
    expect(screen.getByRole("button", { name: /button/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button", { name: /click/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Disabled
      </Button>,
    );
    fireEvent.click(screen.getByRole("button", { name: /disabled/i }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders icon-only button with aria-label as accessible name", () => {
    render(<Button icon={<Plus size={16} />} aria-label="Adicionar item" />);
    expect(screen.getByRole("button", { name: /adicionar item/i })).toBeInTheDocument();
  });

  it("applies block class when block prop is passed", () => {
    render(
      <Button block variant="primary">
        Block
      </Button>,
    );
    const button = screen.getByRole("button", { name: /block/i });
    expect(button.className).toMatch(/ant-btn-block/);
  });

  it("renders as anchor when href is provided", () => {
    render(
      <Button href="https://example.com" variant="outline">
        Link
      </Button>,
    );
    expect(screen.getByRole("link", { name: /link/i })).toBeInTheDocument();
  });

  it("renders loading spinner inside button", () => {
    render(
      <Button loading variant="primary">
        Loading
      </Button>,
    );
    const button = screen.getByRole("button", { name: /loading/i });
    expect(button.className).toMatch(/ant-btn-loading/);
  });

  it("supports iconPlacement end", () => {
    render(
      <Button icon={<Plus size={16} />} iconPlacement="end" variant="primary">
        Próximo
      </Button>,
    );
    const button = screen.getByRole("button", { name: /próximo/i });
    expect(button.className).toMatch(/ant-btn-icon-end/);
  });

  it("forwards className from consumer alongside internal module class", () => {
    render(<Button className="custom-class">Forward</Button>);
    const button = screen.getByRole("button", { name: /forward/i });
    expect(button.className).toMatch(/custom-class/);
  });
});
