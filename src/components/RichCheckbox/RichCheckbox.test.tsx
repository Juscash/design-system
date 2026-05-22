import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RichCheckbox } from ".";
import userEvent from "@testing-library/user-event";

describe("RichCheckbox", () => {
  it("deve renderizar label e secondary text", () => {
    render(<RichCheckbox label="Test Label" secondaryText="Test Secondary" />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Secondary")).toBeInTheDocument();
  });

  it("deve renderizar apenas label quando secondary text não é fornecido", () => {
    render(<RichCheckbox label="Test Label" />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.queryByText("Test Secondary")).not.toBeInTheDocument();
  });

  it("deve aplicar classe checked quando marcado", () => {
    const { container } = render(<RichCheckbox checked label="Test" />);

    const wrapper = container.querySelector(".rich-checkbox-wrapper");
    expect(wrapper).toHaveClass("rich-checkbox-checked");
  });

  it("deve alternar checked ao clicar no wrapper", async () => {
    const user = userEvent.setup();
    const { container } = render(<RichCheckbox label="Test" />);

    const wrapper = container.querySelector(".rich-checkbox-wrapper");
    expect(wrapper).not.toHaveClass("rich-checkbox-checked");

    if (wrapper) {
      await user.click(wrapper);
      expect(wrapper).toHaveClass("rich-checkbox-checked");
    }
  });

  it("deve chamar onChange quando clicado", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { container } = render(<RichCheckbox label="Test" onChange={handleChange} />);

    const checkbox = container.querySelector('input[type="checkbox"]');
    if (checkbox) {
      await user.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);
    }
  });
});
