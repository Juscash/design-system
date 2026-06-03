import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ToggleGroup } from ".";
import type { ToggleGroupOption } from "../../types/components/ToggleGroup";

const textOptions: ToggleGroupOption[] = [
  { value: "a", label: "Opção A" },
  { value: "b", label: "Opção B" },
  { value: "c", label: "Opção C" },
];

describe("ToggleGroup", () => {
  it("renderiza todos os itens passados em options", () => {
    render(<ToggleGroup options={textOptions} aria-label="grupo" />);
    expect(screen.getByText("Opção A")).toBeInTheDocument();
    expect(screen.getByText("Opção B")).toBeInTheDocument();
    expect(screen.getByText("Opção C")).toBeInTheDocument();
  });

  it("aplica classe base ds-toggle-group e modificadores padrão", () => {
    const { container } = render(<ToggleGroup options={textOptions} />);
    const root = container.querySelector(".ant-radio-group");
    expect(root?.className).toMatch(/ds-toggle-group/);
    expect(root?.className).toMatch(/ds-toggle-group--ghost/);
    expect(root?.className).toMatch(/ds-toggle-group--m/);
  });

  it("aplica modificador da variante outlined quando solicitado", () => {
    const { container } = render(<ToggleGroup variant="outlined" options={textOptions} />);
    const root = container.querySelector(".ant-radio-group");
    expect(root?.className).toMatch(/ds-toggle-group--outlined/);
  });

  it("aplica modificador de tamanho s e xs", () => {
    const { container: cS } = render(<ToggleGroup size="s" options={textOptions} />);
    expect(cS.querySelector(".ant-radio-group")?.className).toMatch(/ds-toggle-group--s/);

    const { container: cXs } = render(<ToggleGroup size="xs" options={textOptions} />);
    expect(cXs.querySelector(".ant-radio-group")?.className).toMatch(/ds-toggle-group--xs/);
  });

  it("dispara onChange com o novo valor selecionado", () => {
    const onChange = vi.fn();
    render(<ToggleGroup options={textOptions} defaultValue="a" onChange={onChange} />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[1]);
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("respeita comportamento single (radio): só uma opção fica ativa", () => {
    const { container } = render(<ToggleGroup options={textOptions} defaultValue="a" />);
    const initial = screen.getAllByRole("radio") as HTMLInputElement[];
    expect(initial[0].checked).toBe(true);
    expect(initial[1].checked).toBe(false);

    const labels = container.querySelectorAll<HTMLLabelElement>("label.ant-radio-button-wrapper");
    fireEvent.click(labels[1]);

    const after = screen.getAllByRole("radio") as HTMLInputElement[];
    expect(after[0].checked).toBe(false);
    expect(after[1].checked).toBe(true);
  });

  it("desabilita todos os itens quando disabled é true", () => {
    render(<ToggleGroup options={textOptions} disabled />);
    for (const r of screen.getAllByRole("radio")) {
      expect(r).toBeDisabled();
    }
  });

  it("desabilita item individual quando option.disabled é true", () => {
    render(
      <ToggleGroup
        options={[
          { value: "x", label: "Ativo" },
          { value: "y", label: "Desligado", disabled: true },
        ]}
      />,
    );
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).not.toBeDisabled();
    expect(radios[1]).toBeDisabled();
  });

  it("renderiza ícone resolvido pelo nome do Lucide", () => {
    const { container } = render(
      <ToggleGroup
        options={[{ value: "b", icon: "Bold", ariaLabel: "Negrito" }]}
        aria-label="formatação"
      />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("expõe nome acessível em modo icon-only via texto sr-only", () => {
    render(
      <ToggleGroup
        options={[{ value: "b", icon: "Bold", ariaLabel: "Negrito" }]}
        aria-label="formatação"
      />,
    );
    expect(screen.getByText("Negrito")).toBeInTheDocument();
  });

  it("aceita className extra preservando a classe base", () => {
    const { container } = render(<ToggleGroup options={textOptions} className="custom-cls" />);
    const root = container.querySelector(".ant-radio-group");
    expect(root?.className).toMatch(/custom-cls/);
    expect(root?.className).toMatch(/ds-toggle-group/);
  });

  it("aplica aria-label no container raiz", () => {
    const { container } = render(<ToggleGroup options={textOptions} aria-label="Período" />);
    const root = container.querySelector(".ant-radio-group");
    expect(root?.getAttribute("aria-label")).toBe("Período");
  });

  it("aplica tabIndex no container quando informado", () => {
    const { container } = render(<ToggleGroup options={textOptions} tabIndex={0} />);
    const root = container.querySelector(".ant-radio-group");
    expect(root?.getAttribute("tabindex")).toBe("0");
  });
});
