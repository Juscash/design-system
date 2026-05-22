import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Typography, Heading1, Heading2, Body1, Caption } from "./Typography";

describe("Typography", () => {
  it("renders body1 text", () => {
    render(<Typography variant="body1">Hello World</Typography>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders heading1", () => {
    render(<Heading1>Title</Heading1>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Title",
    );
  });

  it("renders heading2", () => {
    render(<Heading2>Subtitle</Heading2>);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Subtitle",
    );
  });

  it("renders body1 paragraph", () => {
    render(<Body1>Body text</Body1>);
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });

  it("renders caption", () => {
    render(<Caption>Caption text</Caption>);
    expect(screen.getByText("Caption text")).toBeInTheDocument();
  });
});
