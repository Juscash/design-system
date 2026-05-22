import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Segmented } from ".";

describe("Segmented", () => {
  it("renders segmented with plain options", () => {
    render(<Segmented options={["A", "B", "C"]} />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("does not force focus style on root by pseudo class", () => {
    const { container } = render(<Segmented options={["A", "B"]} className="pseudo-focus-visible" />);
    const segmentedRoot = container.querySelector(".ant-segmented");

    expect(segmentedRoot).not.toBeNull();
    expect(segmentedRoot).toHaveStyle({ boxShadow: "" });
  });

  it("supports only figma size aliases m, s and xs", () => {
    const { container, rerender } = render(<Segmented options={["A", "B"]} size="m" />);
    let segmentedRoot = container.querySelector(".ant-segmented");

    expect(segmentedRoot).toHaveClass("ant-segmented-lg");

    rerender(<Segmented options={["A", "B"]} size="s" />);
    segmentedRoot = container.querySelector(".ant-segmented");
    expect(segmentedRoot).not.toHaveClass("ant-segmented-lg");
    expect(segmentedRoot).not.toHaveClass("ant-segmented-sm");

    rerender(<Segmented options={["A", "B"]} size="xs" />);
    segmentedRoot = container.querySelector(".ant-segmented");
    expect(segmentedRoot).toHaveClass("ant-segmented-sm");
  });

  it("uses active item from options state as default selected", () => {
    const { container } = render(
      <Segmented
        options={[
          { value: "one", text: "One", state: "inactive" },
          { value: "two", text: "Two", state: "active" },
        ]}
      />,
    );

    const selectedItem = container.querySelector(".ant-segmented-item-selected");
    expect(selectedItem).not.toBeNull();
    expect(selectedItem).toHaveTextContent("Two");
  });

  it("renders counter and honors bold default true/false", () => {
    const { container } = render(
      <Segmented
        options={[
          { value: "one", text: "One", counter: "1" },
          { value: "two", text: "Two", bold: false },
        ]}
      />,
    );

    const oneText = screen.getByText("One");
    const twoText = screen.getByText("Two");
    const badge = screen.getByText("1");

    expect(oneText).toHaveStyle({ fontWeight: "700" });
    expect(twoText).toHaveStyle({ fontWeight: "400" });
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle({ borderRadius: "9999px" });

    const firstLabel = container.querySelector(".ant-segmented-item-label");
    expect(firstLabel).not.toBeNull();
  });
});
