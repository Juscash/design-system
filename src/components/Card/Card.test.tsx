import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from ".";

describe("Card", () => {
  it("renders card with content", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders card with title", () => {
    render(<Card title="Title">Content</Card>);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});
