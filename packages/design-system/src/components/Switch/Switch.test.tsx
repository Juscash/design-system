import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders switch", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders disabled switch", () => {
    render(<Switch disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });
});
