import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Loading } from ".";

describe("Loading", () => {
  it("renders correctly", () => {
    const { container } = render(<Loading />);
    expect(container.querySelector(".ant-spin")).toBeInTheDocument();
  });

  it("renders with tip", () => {
    render(<Loading tip="Loading..." />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
