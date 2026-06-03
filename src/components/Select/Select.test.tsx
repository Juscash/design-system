import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Select } from ".";

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

  it("applies size class (ds-select-xs)", () => {
    render(<Select size="xs" placeholder="Mini" options={options} />);
    expect(document.querySelector(".ds-select-xs")).toBeTruthy();
  });

  it("renders the label with a matching htmlFor target", () => {
    render(<Select label="Categoria" placeholder="Selecione" options={options} />);
    const label = screen.getByText("Categoria");
    const forId = label.getAttribute("for");
    expect(forId).toBeTruthy();
    expect(document.getElementById(forId as string)).not.toBeNull();
  });

  it("renders helperText below the field", () => {
    render(<Select label="Label" helperText="Texto auxiliar" placeholder="x" options={options} />);
    expect(screen.getByText("Texto auxiliar")).toBeInTheDocument();
  });

  it("marks the wrapper with error modifier when status is error", () => {
    const { container } = render(<Select status="error" helperText="Erro" options={options} />);
    expect(container.querySelector(".ds-select-wrapper--error")).not.toBeNull();
  });

  it("marks the wrapper with disabled modifier when disabled", () => {
    const { container } = render(<Select disabled label="Label" options={options} />);
    expect(container.querySelector(".ds-select-wrapper--disabled")).not.toBeNull();
  });
});
