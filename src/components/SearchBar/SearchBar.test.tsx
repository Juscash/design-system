import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchBar } from "./index";

const DEFAULT_PLACEHOLDER = "Pesquise...";

/**
 * Localiza o <input> renderizado dentro do affix-wrapper do `Input` do DS.
 * Como o componente sempre tem um único input visível, querySelector basta.
 */
function findInput(container: HTMLElement): HTMLInputElement {
  const input = container.querySelector<HTMLInputElement>("input");
  if (!input) throw new Error("SearchBar input not found in DOM");
  return input;
}

describe("SearchBar", () => {
  describe("AC-1: renderização default", () => {
    it("renderiza um input com placeholder 'Pesquise...'", () => {
      const { container } = render(<SearchBar />);
      const input = findInput(container);
      expect(input).toHaveAttribute("placeholder", DEFAULT_PLACEHOLDER);
    });

    it("renderiza com a classe ds-search-bar no affix-wrapper", () => {
      const { container } = render(<SearchBar />);
      const wrapper = container.querySelector(".ds-search-bar");
      expect(wrapper).not.toBeNull();
    });

    it("renderiza o ícone Search da Lucide como prefix", () => {
      const { container } = render(<SearchBar />);
      const icon = container.querySelector(".ant-input-prefix svg");
      expect(icon).not.toBeNull();
    });
  });

  describe("AC-2: placeholder customizado", () => {
    it("respeita placeholder fornecido pelo consumer", () => {
      const { container } = render(<SearchBar placeholder="Buscar processo" />);
      const input = findInput(container);
      expect(input).toHaveAttribute("placeholder", "Buscar processo");
    });
  });

  describe("AC-3: estados de valor", () => {
    it("aplica defaultValue no modo não-controlado", () => {
      const { container } = render(<SearchBar defaultValue="Lorem" />);
      const input = findInput(container);
      expect(input.value).toBe("Lorem");
    });

    it("aplica value no modo controlado", () => {
      const { container } = render(<SearchBar value="Lorem ipsum" onChange={vi.fn()} />);
      const input = findInput(container);
      expect(input.value).toBe("Lorem ipsum");
    });
  });

  describe("AC-4: onChange dispara apenas com a string", () => {
    it("dispara onChange com o valor atual ao digitar", () => {
      const handler = vi.fn();
      const { container } = render(<SearchBar onChange={handler} />);
      const input = findInput(container);
      fireEvent.change(input, { target: { value: "abc" } });
      expect(handler).toHaveBeenCalledWith("abc");
    });
  });

  describe("AC-5: disabled", () => {
    it("desabilita o input quando disabled=true", () => {
      const { container } = render(<SearchBar disabled />);
      const input = findInput(container);
      expect(input).toBeDisabled();
    });
  });

  describe("AC-6: className e style do consumer", () => {
    it("preserva className externo concatenado no wrapper", () => {
      const { container } = render(<SearchBar className="custom-class" />);
      const wrapper = container.querySelector(".ds-search-bar");
      expect(wrapper).not.toBeNull();
      expect(wrapper).toHaveClass("custom-class");
    });
  });

  describe("AC-7: acessibilidade", () => {
    it("propaga aria-label para o input", () => {
      const { container } = render(<SearchBar aria-label="Campo de pesquisa" />);
      const input = findInput(container);
      expect(input).toHaveAttribute("aria-label", "Campo de pesquisa");
    });
  });

  describe("AC-8: displayName", () => {
    it("SearchBar.displayName é 'SearchBar'", () => {
      expect(SearchBar.displayName).toBe("SearchBar");
    });
  });
});
