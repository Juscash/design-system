import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("renders page header with title", () => {
    render(<PageHeader title="Page Title" />);
    expect(screen.getByText("Page Title")).toBeInTheDocument();
  });
});
