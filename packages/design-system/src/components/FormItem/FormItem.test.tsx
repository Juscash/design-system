import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormItem } from "./FormItem";

describe("FormItem", () => {
  it("renders form item with label", () => {
    render(
      <FormItem label="Label">
        <input />
      </FormItem>,
    );
    expect(screen.getByText("Label")).toBeInTheDocument();
  });
});
