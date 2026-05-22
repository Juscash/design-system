import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { RichSwitch } from ".";

describe("RichSwitch", () => {
  it("renderiza label e secondary text", () => {
    render(<RichSwitch label="Notificações" secondaryText="Receber alertas por email" />);
    expect(screen.getByText("Notificações")).toBeInTheDocument();
    expect(screen.getByText("Receber alertas por email")).toBeInTheDocument();
  });

  it("renderiza apenas label quando secondary text não é fornecido", () => {
    render(<RichSwitch label="Notificações" />);
    expect(screen.getByText("Notificações")).toBeInTheDocument();
    expect(screen.queryByText("Receber alertas por email")).not.toBeInTheDocument();
  });

  it("aplica classe checked quando marcado", () => {
    const { container } = render(<RichSwitch checked label="Notificações" />);
    const wrapper = container.querySelector(".rich-switch-wrapper");
    expect(wrapper).toHaveClass("rich-switch-checked");
  });

  it("dispara onChange ao clicar no switch interno", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { container } = render(<RichSwitch label="Notificações" onChange={handleChange} />);

    const switchEl = container.querySelector(".ant-switch");
    if (switchEl) {
      await user.click(switchEl);
      expect(handleChange).toHaveBeenCalledTimes(1);
    }
  });
});
