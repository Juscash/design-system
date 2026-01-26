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
    expect(screen.getByText("Select...")).toBeInTheDocument();
  });

  it("renders disabled select", () => {
    render(<Select disabled placeholder="Disabled" options={options} />);
    expect(document.querySelector(".ant-select-disabled")).toBeInTheDocument();
  });
});
