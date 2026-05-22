import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from ".";
import { TextArea } from "../TextArea";

describe("Input", () => {
  it("renders input with placeholder", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders disabled input", () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Input size="xs" placeholder="XS" />);
    expect(screen.getByPlaceholderText("XS")).toBeInTheDocument();

    rerender(<Input size="m" placeholder="M" />);
    expect(screen.getByPlaceholderText("M")).toBeInTheDocument();

    rerender(<Input size="l" placeholder="L" />);
    expect(screen.getByPlaceholderText("L")).toBeInTheDocument();
  });
});

describe("TextArea", () => {
  it("renders textarea with placeholder", () => {
    render(<TextArea placeholder="Enter message" />);
    expect(screen.getByPlaceholderText("Enter message")).toBeInTheDocument();
  });
});
