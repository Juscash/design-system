import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Segmented } from "./Segmented";

describe("Segmented", () => {
  it("renders segmented with options", () => {
    render(<Segmented options={["A", "B", "C"]} />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
  });
});
