import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Loading } from "./index";

describe("Loading", () => {
  describe("AC-1: variant default (spinner) renderiza spinner", () => {
    it("renderiza um elemento com classe ds-loading-spinner quando nenhuma variant é passada", () => {
      render(<Loading />);
      const spinner = document.querySelector(".ds-loading-spinner");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("AC-2: variant=dots renderiza 3 elementos com classe ds-loading-dot", () => {
    it("renderiza exatamente 3 elementos com classe ds-loading-dot", () => {
      render(<Loading variant="dots" />);
      const dots = document.querySelectorAll(".ds-loading-dot");
      expect(dots).toHaveLength(3);
    });
  });

  describe("AC-3: variant=spinner renderiza spinner", () => {
    it("renderiza um elemento com classe ds-loading-spinner quando variant=spinner", () => {
      render(<Loading variant="spinner" />);
      const spinner = document.querySelector(".ds-loading-spinner");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("AC-4: atributos ARIA na raiz", () => {
    it("raiz tem role=status", () => {
      render(<Loading />);
      const root = screen.getByRole("status");
      expect(root).toBeInTheDocument();
    });

    it("raiz tem aria-live=polite", () => {
      render(<Loading />);
      const root = screen.getByRole("status");
      expect(root).toHaveAttribute("aria-live", "polite");
    });

    it("raiz tem aria-busy=true", () => {
      render(<Loading />);
      const root = screen.getByRole("status");
      expect(root).toHaveAttribute("aria-busy", "true");
    });

    it("raiz tem aria-label padrão 'Carregando...'", () => {
      render(<Loading />);
      const root = screen.getByRole("status");
      expect(root).toHaveAttribute("aria-label", "Carregando...");
    });
  });

  describe("AC-5: aria-label customizável", () => {
    it("usa o aria-label fornecido pelo consumer", () => {
      render(<Loading aria-label="Aguarde, carregando dados" />);
      const root = screen.getByRole("status");
      expect(root).toHaveAttribute("aria-label", "Aguarde, carregando dados");
    });
  });

  describe("AC-6: subelementos têm aria-hidden=true", () => {
    it("spinner tem aria-hidden=true", () => {
      render(<Loading variant="spinner" />);
      const spinner = document.querySelector(".ds-loading-spinner");
      expect(spinner).toHaveAttribute("aria-hidden", "true");
    });

    it("container de dots tem aria-hidden=true", () => {
      render(<Loading variant="dots" />);
      const dotsContainer = document.querySelector(".ds-loading-dots");
      expect(dotsContainer).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("AC-7: sem tabIndex", () => {
    it("raiz não possui atributo tabIndex", () => {
      render(<Loading />);
      const root = screen.getByRole("status");
      expect(root).not.toHaveAttribute("tabindex");
    });
  });

  describe("AC-8: className do consumer é preservado", () => {
    it("concatena className externo com a classe interna ds-loading", () => {
      render(<Loading className="minha-classe-custom" />);
      const root = screen.getByRole("status");
      expect(root).toHaveClass("ds-loading");
      expect(root).toHaveClass("minha-classe-custom");
    });
  });

  describe("AC-9: style do consumer é preservado", () => {
    it("aplica o style externo na raiz", () => {
      render(<Loading style={{ opacity: 0.5 }} />);
      const root = screen.getByRole("status");
      expect(root).toHaveStyle({ opacity: "0.5" });
    });
  });

  describe("AC-10: displayName", () => {
    it("Loading.displayName é 'Loading'", () => {
      expect(Loading.displayName).toBe("Loading");
    });
  });
});
