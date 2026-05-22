import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Drawer } from "./Drawer";
import { Button } from "antd";
import React, { useState } from "react";

// Helper component for testing functionality
const TestDrawer = ({ title = "Test Drawer", ...props }: any) => {
  const [open, setOpen] = useState(true);
  const onClose = () => setOpen(false);
  return (
    <Drawer title={title} open={open} onClose={onClose} {...props}>
      <p>Drawer Content</p>
    </Drawer>
  );
};

describe("Drawer", () => {
  // Note: Drawers render into document.body by default (portal).
  // Testing libraries typically handle portals automatically, appearing in baseElement.

  it("renders correctly when open", () => {
    const { baseElement } = render(<TestDrawer />);
    expect(baseElement.querySelector(".ant-drawer-title")).toHaveTextContent(
      "Test Drawer",
    );
    expect(screen.getByText("Drawer Content")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    const { baseElement } = render(
      <Drawer title="Test" open={true} onClose={onClose}>
        Content
      </Drawer>,
    );

    const closeBtn = baseElement.querySelector(".ant-drawer-close");
    if (closeBtn) {
      fireEvent.click(closeBtn);
      expect(onClose).toHaveBeenCalled();
    } else {
      // Should exist standard close button
      throw new Error("Close button not found");
    }
  });
});
