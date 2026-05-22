import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { RichRadio } from ".";

describe("RichRadio", () => {
  it("renderiza label e secondary text", () => {
    render(<RichRadio label="Plano Premium" secondaryText="R$ 99/mês" />);
    expect(screen.getByText("Plano Premium")).toBeInTheDocument();
    expect(screen.getByText("R$ 99/mês")).toBeInTheDocument();
  });

  it("renderiza apenas label quando secondary text não é fornecido", () => {
    render(<RichRadio label="Plano Básico" />);
    expect(screen.getByText("Plano Básico")).toBeInTheDocument();
    expect(screen.queryByText("R$ 99/mês")).not.toBeInTheDocument();
  });

  it("aplica classe checked quando marcado", () => {
    const { container } = render(<RichRadio checked label="Premium" />);
    const wrapper = container.querySelector(".rich-radio-wrapper");
    expect(wrapper).toHaveClass("rich-radio-checked");
  });

  it("dispara onChange ao clicar no radio interno", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { container } = render(<RichRadio label="Premium" onChange={handleChange} />);

    const input = container.querySelector('input[type="radio"]');
    if (input) {
      await user.click(input);
      expect(handleChange).toHaveBeenCalledTimes(1);
    }
  });
});
