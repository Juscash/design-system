import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { BackToTop } from "./index";

const VISIBLE_CLASS = "ds-back-to-top--visible";
const ROOT_CLASS = "ds-back-to-top";

/**
 * Define a posição de scroll do `window` de forma compatível com jsdom,
 * onde `pageYOffset` e `scrollY` são getters definidos no protótipo.
 */
function setWindowScrollY(value: number): void {
  Object.defineProperty(window, "pageYOffset", { configurable: true, value });
  Object.defineProperty(window, "scrollY", { configurable: true, value });
}

/**
 * Localiza o botão renderizado por seletor de classe — `getByRole` com
 * `aria-hidden="true"` exigiria atributos especiais. Como o componente sempre
 * existe no DOM (toggle via CSS), querySelector é suficiente.
 */
function findButton(): HTMLButtonElement {
  const button = document.querySelector<HTMLButtonElement>(`.${ROOT_CLASS}`);
  if (!button) throw new Error("BackToTop button not found in DOM");
  return button;
}

describe("BackToTop", () => {
  beforeEach(() => {
    setWindowScrollY(0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("AC-1: renderização default", () => {
    it("renderiza um botão com aria-label 'Voltar ao topo'", () => {
      render(<BackToTop />);
      const button = findButton();
      expect(button).toHaveAttribute("aria-label", "Voltar ao topo");
    });

    it("o botão tem type='button' para não submeter forms", () => {
      render(<BackToTop />);
      const button = findButton();
      expect(button).toHaveAttribute("type", "button");
    });

    it("o botão tem a classe ds-back-to-top", () => {
      render(<BackToTop />);
      const button = findButton();
      expect(button).toHaveClass(ROOT_CLASS);
    });
  });

  describe("AC-2: visibilidade controlada por scroll", () => {
    it("inicia escondido (sem classe ds-back-to-top--visible) quando scrollY = 0", () => {
      render(<BackToTop />);
      const button = findButton();
      expect(button).not.toHaveClass(VISIBLE_CLASS);
    });

    it("fica visível após rolar mais que visibilityHeight (default 300)", () => {
      render(<BackToTop />);
      const button = findButton();
      act(() => {
        setWindowScrollY(400);
        window.dispatchEvent(new Event("scroll"));
      });
      expect(button).toHaveClass(VISIBLE_CLASS);
    });

    it("permanece escondido quando scrollY <= visibilityHeight", () => {
      render(<BackToTop />);
      const button = findButton();
      act(() => {
        setWindowScrollY(200);
        window.dispatchEvent(new Event("scroll"));
      });
      expect(button).not.toHaveClass(VISIBLE_CLASS);
    });

    it("respeita visibilityHeight customizado", () => {
      render(<BackToTop visibilityHeight={100} />);
      const button = findButton();
      act(() => {
        setWindowScrollY(150);
        window.dispatchEvent(new Event("scroll"));
      });
      expect(button).toHaveClass(VISIBLE_CLASS);
    });
  });

  describe("AC-3: clique rola o target para o topo", () => {
    it("ao clicar, chama window.scrollTo com top=0", () => {
      const scrollSpy = vi.fn();
      Object.defineProperty(window, "scrollTo", { configurable: true, value: scrollSpy });
      setWindowScrollY(500);
      render(<BackToTop />);
      act(() => {
        window.dispatchEvent(new Event("scroll"));
      });
      // Aciona o mock de rAF apenas neste trecho — o componente usa rAF para
      // animar a curva `easeInOutCubic` e em jsdom o callback nunca dispara
      // sozinho. Calculamos um offset baseado no `Date.now` original para que
      // o `elapsed` na primeira (e única) execução já ultrapasse a `duration`,
      // encerrando a animação sem recursão.
      const realNow = Date.now;
      let rafInvocations = 0;
      const farFutureOffset = 100000;
      const nowSpy = vi.spyOn(Date, "now").mockImplementation(() =>
        realNow() + (rafInvocations >= 1 ? farFutureOffset : 0),
      );
      const rafSpy = vi.spyOn(window, "requestAnimationFrame").mockImplementation(
        (callback) => {
          rafInvocations++;
          callback(0);
          return 0;
        },
      );
      const button = findButton();
      fireEvent.click(button);
      expect(scrollSpy).toHaveBeenCalled();
      rafSpy.mockRestore();
      nowSpy.mockRestore();
    });

    it("dispara o callback onClick recebido", () => {
      const handler = vi.fn();
      render(<BackToTop onClick={handler} />);
      const button = findButton();
      fireEvent.click(button);
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe("AC-4: tooltipLabel customizado", () => {
    it("usa o tooltipLabel fornecido como aria-label", () => {
      render(<BackToTop tooltipLabel="Voltar" />);
      const button = findButton();
      expect(button).toHaveAttribute("aria-label", "Voltar");
    });
  });

  describe("AC-5: tabIndex acompanha visibilidade", () => {
    it("tabIndex=-1 quando escondido", () => {
      render(<BackToTop />);
      const button = findButton();
      expect(button).toHaveAttribute("tabindex", "-1");
    });

    it("tabIndex=0 quando visível", () => {
      render(<BackToTop />);
      const button = findButton();
      act(() => {
        setWindowScrollY(500);
        window.dispatchEvent(new Event("scroll"));
      });
      expect(button).toHaveAttribute("tabindex", "0");
    });
  });

  describe("AC-6: className e style do consumer", () => {
    it("preserva className externo concatenado", () => {
      render(<BackToTop className="custom-class" />);
      const button = findButton();
      expect(button).toHaveClass("custom-class");
      expect(button).toHaveClass(ROOT_CLASS);
    });

    it("aplica style externo ao botão", () => {
      render(<BackToTop style={{ opacity: 0.7 }} />);
      const button = findButton();
      expect(button).toHaveStyle({ opacity: "0.7" });
    });
  });

  describe("AC-7: displayName", () => {
    it("BackToTop.displayName é 'BackToTop'", () => {
      expect(BackToTop.displayName).toBe("BackToTop");
    });
  });
});
