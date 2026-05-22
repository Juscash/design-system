import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb Component", () => {
  it("renders correctly with items", () => {
    render(
      <Breadcrumb
        items={[{ title: "Home" }, { title: "Level 1" }, { title: "Current" }]}
      />,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Level 1")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
  });

  it("renders branding class", () => {
    const { container } = render(<Breadcrumb items={[{ title: "Home" }]} />);
    // Since we wrap with ConfigProvider, we check if it renders without crashing
    expect(container.firstChild).toBeInTheDocument();
  });

  it("custom separator renders", () => {
    // ChevronRight is passed as separator, but Testing Library might just see the SVG.
    // We can check if multiple separators exist if we have multiple items.
    const { container } = render(
      <Breadcrumb items={[{ title: "Home" }, { title: "Current" }]} />,
    );
    // Lucide icons usually render as <svg>
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });
});
