import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Select } from "./Select";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
];

describe("Select", () => {
  it("renders select with placeholder", () => {
    render(<Select placeholder="Select..." options={options} />);
    expect(screen.getByText("Select...")).toBeTruthy();
  });

  it("renders disabled select", () => {
    render(<Select disabled placeholder="Disabled" options={options} />);
    expect(document.querySelector(".ant-select-disabled")).toBeTruthy();
  });

  it("applies dsSize class for figma-specific sizing", () => {
    render(<Select dsSize="xs" placeholder="Mini" options={options} />);
    expect(document.querySelector(".ds-select-xs")).toBeTruthy();
  });

  it("renders prefix content when provided", () => {
    render(<Select prefix={<span data-testid="select-prefix">*</span>} placeholder="Prefixed" options={options} />);
    expect(screen.getByTestId("select-prefix")).toBeTruthy();
  });
});
