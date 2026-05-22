import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { TextArea } from ".";

describe("TextArea", () => {
  it("renderiza com placeholder", () => {
    render(<TextArea placeholder="Digite aqui" />);
    expect(screen.getByPlaceholderText("Digite aqui")).toBeInTheDocument();
  });

  it("respeita defaultValue", () => {
    render(<TextArea defaultValue="Valor inicial" />);
    expect(screen.getByDisplayValue("Valor inicial")).toBeInTheDocument();
  });

  it("dispara onChange ao digitar", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<TextArea onChange={handleChange} placeholder="Digite" />);

    const textarea = screen.getByPlaceholderText("Digite");
    await user.type(textarea, "olá");
    expect(handleChange).toHaveBeenCalled();
  });

  it("renderiza em estado disabled", () => {
    render(<TextArea disabled placeholder="Desabilitado" />);
    expect(screen.getByPlaceholderText("Desabilitado")).toBeDisabled();
  });

  it("aplica className customizada", () => {
    const { container } = render(<TextArea className="custom-class" />);
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });
});
