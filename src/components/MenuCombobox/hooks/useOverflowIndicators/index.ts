import React from "react";

interface OverflowController {
  /** Há conteúdo escondido acima (rolar para cima é possível). */
  canScrollUp: boolean;
  /** Há conteúdo escondido abaixo (rolar para baixo é possível). */
  canScrollDown: boolean;
  /** Rola a viewport suavemente um passo na direção informada. */
  scrollStep: (direction: "up" | "down") => void;
}

const SCROLL_STEP_PX = 96;
const SCROLL_TOLERANCE_PX = 1;

/**
 * Observa a viewport rolável e indica se há overflow para cima/baixo, além de
 * expor uma função para rolar um passo. `contentKey` força recálculo quando o
 * conteúdo muda (ex.: filtro da busca). Desabilitado retorna ambos `false`.
 */
export function useOverflowIndicators(
  viewportRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
  contentKey: number,
): OverflowController {
  const [canScrollUp, setCanScrollUp] = React.useState(false);
  const [canScrollDown, setCanScrollDown] = React.useState(false);

  const recompute = React.useCallback((): void => {
    const el = viewportRef.current;
    if (!el || !enabled) {
      setCanScrollUp(false);
      setCanScrollDown(false);
      return;
    }
    const maxScroll = el.scrollHeight - el.clientHeight;
    setCanScrollUp(el.scrollTop > SCROLL_TOLERANCE_PX);
    setCanScrollDown(el.scrollTop < maxScroll - SCROLL_TOLERANCE_PX);
  }, [viewportRef, enabled]);

  React.useEffect(() => {
    recompute();
  }, [recompute, contentKey]);

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el || !enabled) return undefined;
    el.addEventListener("scroll", recompute, { passive: true });
    const observer = new ResizeObserver(recompute);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", recompute);
      observer.disconnect();
    };
  }, [viewportRef, enabled, recompute]);

  const scrollStep = React.useCallback(
    (direction: "up" | "down"): void => {
      const el = viewportRef.current;
      if (!el) return;
      const delta = direction === "up" ? -SCROLL_STEP_PX : SCROLL_STEP_PX;
      el.scrollBy({ top: delta, behavior: "smooth" });
    },
    [viewportRef],
  );

  return { canScrollUp, canScrollDown, scrollStep };
}
