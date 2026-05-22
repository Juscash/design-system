import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tag } from ".";

describe("Tag", () => {
  it("renders tag with text", () => {
    render(<Tag>Status</Tag>);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders success tag", () => {
    render(<Tag success>Success</Tag>);
    expect(screen.getByText("Success")).toBeInTheDocument();
  });

  it("renders error tag", () => {
    render(<Tag error>Error</Tag>);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("renders warning tag", () => {
    render(<Tag warning>Warning</Tag>);
    expect(screen.getByText("Warning")).toBeInTheDocument();
  });
});
