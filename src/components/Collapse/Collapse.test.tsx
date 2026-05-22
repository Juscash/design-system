import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Collapse } from "./Collapse";

const items = [{ key: "1", label: "Panel 1", children: "Content 1" }];

describe("Collapse", () => {
  it("renders collapse with items", () => {
    render(<Collapse items={items} />);
    expect(screen.getByText("Panel 1")).toBeInTheDocument();
  });
});
