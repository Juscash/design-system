import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton } from ".";

describe("Skeleton", () => {
  it("renders correctly", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector(".ant-skeleton")).toBeInTheDocument();
  });

  it("renders avatar when prop is passed", () => {
    const { container } = render(<Skeleton avatar />);
    expect(container.querySelector(".ant-skeleton-header")).toBeInTheDocument();
  });
});
