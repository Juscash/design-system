import React from "react";
import type { BackToTopScrollTarget } from "../../../../types/components/BackToTop";

const INSTANT_SCROLL_THRESHOLD = 16;
const EASE_CUBIC_DIVISOR = 3;
const EASE_MID_POINT = 0.5;
const EASE_PROGRESS_FACTOR = 4;

/**
 * Indica se o `BackToTopScrollTarget` é a janela global. Faz a checagem
 * estrutural (atributos `scrollY`/`pageYOffset`) em vez de `instanceof Window`
 * porque em ambientes de teste (jsdom) o construtor `Window` não é o mesmo
 * que o do `window` global, o que invalida o `instanceof`.
 */
function isWindowTarget(scrollTarget: BackToTopScrollTarget): scrollTarget is Window {
  return typeof window !== "undefined" && scrollTarget === window;
}

/**
 * Lê a posição vertical de rolagem corrente de um `BackToTopScrollTarget`.
 * Para `Window`, prioriza `scrollY` (com fallback para `pageYOffset`); para
 * `HTMLElement`, usa `scrollTop`.
 */
function getScrollTop(scrollTarget: BackToTopScrollTarget): number {
  if (isWindowTarget(scrollTarget)) {
    return scrollTarget.scrollY ?? scrollTarget.pageYOffset;
  }
  return scrollTarget.scrollTop;
}

/**
 * Define a posição vertical de rolagem corrente de um `BackToTopScrollTarget`.
 */
function setScrollTop(scrollTarget: BackToTopScrollTarget, value: number): void {
  if (isWindowTarget(scrollTarget)) {
    scrollTarget.scrollTo(0, value);
    return;
  }
  scrollTarget.scrollTop = value;
}

/**
 * Curva de aceleração `easeInOutCubic` usada na animação programática de
 * rolagem.
 */
function easeInOutCubic(progress: number): number {
  if (progress < EASE_MID_POINT) {
    return EASE_PROGRESS_FACTOR * progress * progress * progress;
  }
  const adjusted = 2 * progress - 2;
  return 1 + (adjusted * adjusted * adjusted) / EASE_CUBIC_DIVISOR;
}

/**
 * Resolve o target observado, ignorando ambientes sem `window` (SSR).
 */
function resolveTarget(
  target: (() => BackToTopScrollTarget) | undefined,
): BackToTopScrollTarget | null {
  if (typeof window === "undefined") return null;
  if (target) return target();
  return window;
}

/**
 * Indica se o ambiente atual pode usar `requestAnimationFrame` (browser real).
 * Centraliza o teste para manter a complexidade do `animateScrollToTop` baixa.
 */
function supportsRequestAnimationFrame(): boolean {
  return typeof window !== "undefined" && typeof window.requestAnimationFrame === "function";
}

/**
 * Anima a rolagem até o topo respeitando `duration` (ms) com `easeInOutCubic`.
 * Quando o browser não expõe `requestAnimationFrame` ou a posição inicial está
 * próxima ao topo, a rolagem é aplicada de forma instantânea.
 */
function animateScrollToTop(scrollTarget: BackToTopScrollTarget, duration: number): void {
  const start = getScrollTop(scrollTarget);
  if (start <= INSTANT_SCROLL_THRESHOLD || duration <= 0 || !supportsRequestAnimationFrame()) {
    setScrollTop(scrollTarget, 0);
    return;
  }
  const startedAt = Date.now();
  const step = (): void => {
    const elapsed = Date.now() - startedAt;
    const progress = Math.min(1, elapsed / duration);
    const next = start - start * easeInOutCubic(progress);
    setScrollTop(scrollTarget, next);
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

/**
 * Hook interno do `BackToTop`. Observa o scroll do `target` e mantém o estado
 * `visible` sincronizado com `visibilityHeight`. Retorna o estado e o handler
 * de clique que executa a animação de rolagem até o topo.
 */
export function useBackToTopController(
  visibilityHeight: number,
  duration: number,
  target: (() => BackToTopScrollTarget) | undefined,
  onClick: (() => void) | undefined,
): { visible: boolean; handleClick: () => void } {
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const scrollTarget = resolveTarget(target);
    if (!scrollTarget) return undefined;
    const updateVisibility = (): void => {
      setVisible(getScrollTop(scrollTarget) > visibilityHeight);
    };
    updateVisibility();
    scrollTarget.addEventListener("scroll", updateVisibility, { passive: true });
    return (): void => {
      scrollTarget.removeEventListener("scroll", updateVisibility);
    };
  }, [target, visibilityHeight]);

  const handleClick = React.useCallback((): void => {
    const scrollTarget = resolveTarget(target);
    if (scrollTarget) animateScrollToTop(scrollTarget, duration);
    onClick?.();
  }, [target, duration, onClick]);

  return { visible, handleClick };
}
