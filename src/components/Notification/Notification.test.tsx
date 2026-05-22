import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { Notification } from "./Notification";
import { Button } from "antd";

// Mock matchMedia for Antd
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("Notification", () => {
  it("opens a notification", async () => {
    const TestComponent = () => {
      const [api, contextHolder] = Notification.useNotification();

      return (
        <div>
          {contextHolder}
          <Button
            onClick={() =>
              api.success({
                message: "Test Message",
                description: "Test Description",
              })
            }
          >
            Trigger
          </Button>
        </div>
      );
    };

    render(<TestComponent />);

    // Click button to trigger
    const button = screen.getByText("Trigger");
    await fireEvent.click(button);

    // Check if notification appears
    await waitFor(() => {
      expect(screen.getByText("Test Message")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });
  });

  it("handles multiple notifications", async () => {
    const TestComponent = () => {
      const [api, contextHolder] = Notification.useNotification();

      return (
        <div>
          {contextHolder}
          <Button
            onClick={() => api.info({ message: "Info", description: "Desc" })}
          >
            Trigger
          </Button>
        </div>
      );
    };

    render(<TestComponent />);

    await fireEvent.click(screen.getByText("Trigger"));

    await waitFor(() => {
      expect(screen.getByText("Info")).toBeInTheDocument();
    });
  });
});
