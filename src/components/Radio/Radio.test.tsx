import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Radio, RadioGroup } from ".";

describe("Radio", () => {
  it("renders radio with label", () => {
    render(<Radio>Option A</Radio>);
    expect(screen.getByText("Option A")).toBeInTheDocument();
  });

  it("renders radio group", () => {
    render(
      <RadioGroup>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });
});
