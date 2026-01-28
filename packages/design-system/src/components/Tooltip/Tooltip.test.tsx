import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders children correctly", () => {
    render(
      <Tooltip title="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("shows tooltip content on hover", async () => {
    render(
      <Tooltip title="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    const button = screen.getByText("Hover me");
    userEvent.hover(button);

    // Tooltip content is rendered in a portal, so we wait for it
    await waitFor(() => {
      expect(document.body).toHaveTextContent("Tooltip content");
    });
  });
});
