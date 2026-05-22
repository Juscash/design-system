import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Tabs } from ".";

describe("Tabs Component", () => {
  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content 2",
    },
  ];

  it("renders correctly", () => {
    render(<Tabs items={items} defaultActiveKey="1" />);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("switches tabs on click", () => {
    render(<Tabs items={items} defaultActiveKey="1" />);

    // Check initial state
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();

    // Click on second tab
    fireEvent.click(screen.getByText("Tab 2"));

    // Check new state
    expect(screen.getByText("Content 2")).toBeInTheDocument();
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  });

  it("calls onChange callback", () => {
    const handleChange = vi.fn();
    render(<Tabs items={items} defaultActiveKey="1" onChange={handleChange} />);

    fireEvent.click(screen.getByText("Tab 2"));
    expect(handleChange).toHaveBeenCalledWith("2");
  });

  it("renders with secondary variant", () => {
    const { container } = render(<Tabs items={items} variant="secondary" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { rerender, container } = render(<Tabs items={items} dsSize="s" />);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<Tabs items={items} dsSize="l" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
