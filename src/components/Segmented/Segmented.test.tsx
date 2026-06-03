import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Plus } from "lucide-react";
import { Segmented } from ".";

describe("Segmented", () => {
  it("renders segmented with plain options", () => {
    render(<Segmented options={["A", "B", "C"]} />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("maps size to antd size class (m=large, s=middle, xs=small)", () => {
    const { container, rerender } = render(<Segmented options={["A", "B"]} size="m" />);
    let root = container.querySelector(".ant-segmented");
    expect(root).toHaveClass("ant-segmented-lg");

    rerender(<Segmented options={["A", "B"]} size="s" />);
    root = container.querySelector(".ant-segmented");
    expect(root).not.toHaveClass("ant-segmented-lg");
    expect(root).not.toHaveClass("ant-segmented-sm");

    rerender(<Segmented options={["A", "B"]} size="xs" />);
    root = container.querySelector(".ant-segmented");
    expect(root).toHaveClass("ant-segmented-sm");
  });

  it("applies the ds-segmented base class to the root", () => {
    const { container } = render(<Segmented options={["A", "B"]} />);
    const root = container.querySelector(".ant-segmented");
    expect(root?.className).toMatch(/ds-segmented/);
  });

  it("renders enhanced option with text only", () => {
    render(
      <Segmented
        options={[
          { value: "a", text: "Alpha" },
          { value: "b", text: "Beta" },
        ]}
      />,
    );
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("renders counter badge alongside text", () => {
    render(<Segmented options={[{ value: "a", text: "Alerts", counter: 3 }]} />);
    expect(screen.getByText("Alerts")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("accepts icon as Lucide name string", () => {
    const { container } = render(<Segmented options={[{ value: "a", text: "Add", icon: "Plus" }]} />);
    const svg = container.querySelector(".ds-segmented__icon svg");
    expect(svg).not.toBeNull();
  });

  it("accepts icon as ReactNode for backwards compatibility", () => {
    const { container } = render(<Segmented options={[{ value: "a", text: "Add", icon: <Plus size={16} /> }]} />);
    const svg = container.querySelector(".ds-segmented__icon svg");
    expect(svg).not.toBeNull();
  });

  it("renders icon-only enhanced option (no text)", () => {
    const { container } = render(
      <Segmented
        options={[
          { value: "grid", icon: "Grid" },
          { value: "list", icon: "List" },
        ]}
      />,
    );
    expect(container.querySelectorAll(".ds-segmented__icon").length).toBe(2);
  });

  it("supports the disabled flag on the whole component", () => {
    const { container } = render(<Segmented options={["A", "B"]} disabled />);
    const root = container.querySelector(".ant-segmented");
    expect(root?.className).toMatch(/ant-segmented-disabled/);
  });

  it("supports disabled at item level", () => {
    const { container } = render(
      <Segmented
        options={[
          { value: "a", text: "Alpha" },
          { value: "b", text: "Beta", disabled: true },
        ]}
      />,
    );
    const items = container.querySelectorAll(".ant-segmented-item");
    expect(items[1].className).toMatch(/ant-segmented-item-disabled/);
  });

  it("honors defaultValue selecting the right item", () => {
    const { container } = render(
      <Segmented
        defaultValue="b"
        options={[
          { value: "a", text: "Alpha" },
          { value: "b", text: "Beta" },
        ]}
      />,
    );
    const selected = container.querySelector(".ant-segmented-item-selected");
    expect(selected).toHaveTextContent("Beta");
  });

  it("renders block segmented spanning the container", () => {
    const { container } = render(<Segmented block options={["A", "B"]} />);
    const root = container.querySelector(".ant-segmented");
    expect(root?.className).toMatch(/ant-segmented-block/);
  });
});
