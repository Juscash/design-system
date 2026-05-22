import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { RichRadioGroup } from ".";
import type { RichRadioOption } from "../../types/components/RichRadioGroup";

const options: RichRadioOption[] = [
  { value: "a", label: "Plano A", secondaryText: "R$ 10" },
  { value: "b", label: "Plano B", secondaryText: "R$ 20" },
  { value: "c", label: "Plano C", secondaryText: "R$ 30" },
];

describe("RichRadioGroup", () => {
  it("renderiza todas as opções", () => {
    render(<RichRadioGroup options={options} value="a" />);
    expect(screen.getByText("Plano A")).toBeInTheDocument();
    expect(screen.getByText("Plano B")).toBeInTheDocument();
    expect(screen.getByText("Plano C")).toBeInTheDocument();
  });

  it("dispara onChange ao selecionar uma opção", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { container } = render(<RichRadioGroup options={options} value="a" onChange={handleChange} />);

    const radios = container.querySelectorAll('input[type="radio"]');
    if (radios[1]) {
      await user.click(radios[1]);
      expect(handleChange).toHaveBeenCalledWith("b");
    }
  });

  it("respeita opções desabilitadas individualmente", () => {
    const optionsWithDisabled: RichRadioOption[] = [
      { value: "a", label: "Plano A" },
      { value: "b", label: "Plano B", disabled: true },
    ];
    const { container } = render(<RichRadioGroup options={optionsWithDisabled} value="a" />);

    const radios = container.querySelectorAll('input[type="radio"]');
    expect(radios[1]).toBeDisabled();
  });

  it("desabilita todas as opções quando `disabled` é true", () => {
    const { container } = render(<RichRadioGroup options={options} value="a" disabled />);
    const radios = container.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => expect(radio).toBeDisabled());
  });
});
