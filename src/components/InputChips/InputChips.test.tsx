import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InputChips } from ".";

const PLACEHOLDER = "Digite e aperte enter";

describe("InputChips", () => {
  it("renders the default placeholder when no chips exist", () => {
    render(<InputChips />);
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
  });

  it("renders the label associated with the input", () => {
    render(<InputChips label="Tags" />);
    const label = screen.getByText("Tags");
    const input = screen.getByPlaceholderText(PLACEHOLDER);
    expect(label).toBeInTheDocument();
    expect(label.tagName.toLowerCase()).toBe("label");
    expect(label.getAttribute("for")).toBe(input.getAttribute("id"));
  });

  it("renders pre-existing chips from defaultValue", () => {
    render(<InputChips defaultValue={["React", "TS"]} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TS")).toBeInTheDocument();
  });

  it("adds a chip when Enter is pressed", () => {
    const onChange = vi.fn();
    render(<InputChips onChange={onChange} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(input, { target: { value: "novo" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("novo")).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith(["novo"]);
  });

  it("trims whitespace before adding the chip", () => {
    render(<InputChips />);
    const input = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(input, { target: { value: "  alpha  " } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("alpha")).toBeInTheDocument();
  });

  it("ignores empty strings on Enter", () => {
    const onChange = vi.fn();
    render(<InputChips onChange={onChange} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not add duplicate chips", () => {
    const onChange = vi.fn();
    render(<InputChips defaultValue={["alpha"]} onChange={onChange} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(input, { target: { value: "alpha" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getAllByText("alpha")).toHaveLength(1);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("removes a chip when the X button is clicked", () => {
    const onChange = vi.fn();
    render(<InputChips defaultValue={["alpha", "beta"]} onChange={onChange} />);
    const removeBeta = screen.getByLabelText("Remover beta");
    fireEvent.click(removeBeta);
    expect(screen.queryByText("beta")).not.toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith(["alpha"]);
  });

  it("removes the last chip when Backspace is pressed with empty input", () => {
    const onChange = vi.fn();
    render(<InputChips defaultValue={["alpha", "beta"]} onChange={onChange} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.keyDown(input, { key: "Backspace" });
    expect(screen.queryByText("beta")).not.toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith(["alpha"]);
  });

  it("does NOT remove a chip when Backspace is pressed while typing", () => {
    const onChange = vi.fn();
    render(<InputChips defaultValue={["alpha"]} onChange={onChange} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.keyDown(input, { key: "Backspace" });
    expect(screen.getByText("alpha")).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders all sizes (xs, s, m, l)", () => {
    const sizes = ["xs", "s", "m", "l"] as const;
    for (const size of sizes) {
      const { container, unmount } = render(<InputChips size={size} />);
      const field = container.querySelector(`.juscash-input-chips__field--${size}`);
      expect(field).not.toBeNull();
      unmount();
    }
  });

  it("supports controlled mode (value + onChange)", () => {
    function Controlled(): React.ReactElement {
      const [chips, setChips] = useState<string[]>([]);
      return <InputChips value={chips} onChange={setChips} />;
    }
    render(<Controlled />);
    const input = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(input, { target: { value: "x" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("x")).toBeInTheDocument();
  });

  it("freezes internal state when value is provided (truly controlled)", () => {
    render(<InputChips value={["fixed"]} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(input, { target: { value: "novo" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("fixed")).toBeInTheDocument();
    expect(screen.queryByText("novo")).not.toBeInTheDocument();
  });

  it("disables input and remove buttons when disabled", () => {
    render(<InputChips disabled defaultValue={["alpha"]} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER);
    expect(input).toBeDisabled();
    const removeButton = screen.getByLabelText("Remover alpha");
    expect(removeButton).toBeDisabled();
  });

  it("ignores Enter when disabled", () => {
    const onChange = vi.fn();
    render(<InputChips disabled onChange={onChange} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("applies a custom className to the root", () => {
    const { container } = render(<InputChips className="custom-cls" />);
    const root = container.querySelector(".juscash-input-chips");
    expect(root?.className).toMatch(/custom-cls/);
  });

  it("uses a custom placeholder when provided", () => {
    render(<InputChips placeholder="Type a tag" />);
    expect(screen.getByPlaceholderText("Type a tag")).toBeInTheDocument();
  });
});
