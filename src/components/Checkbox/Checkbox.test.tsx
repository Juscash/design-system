import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Checkbox } from ".";

describe("Checkbox", () => {
  it("renders checkbox with label", () => {
    render(<Checkbox>Accept terms</Checkbox>);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("renders disabled checkbox", () => {
    render(<Checkbox disabled>Disabled</Checkbox>);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("renders checked checkbox", () => {
    render(<Checkbox checked>Checked</Checkbox>);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
