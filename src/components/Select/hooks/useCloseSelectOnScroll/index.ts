import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * Fecha o dropdown do `Select` quando a página rola por trás dele.
 *
 * O Antd renderiza o dropdown num portal (`document.body`), calculando a
 * posição só na abertura. Rolar a página com o cursor sobre o próprio
 * dropdown (fora da cadeia de ancestrais do campo) não o realinha nem fecha
 * — ele fica flutuando sobreposto ao conteúdo. Scroll cujo alvo está DENTRO
 * do dropdown (`popupRef`, ex.: rolando a própria lista de opções) é
 * ignorado, para não fechar enquanto o usuário navega pelas opções.
 */
export function useCloseSelectOnScroll(open: boolean, popupRef: RefObject<HTMLElement>, onClose: () => void): void {
  useEffect(() => {
    if (!open) return;

    function handleScroll(event: Event): void {
      const target = event.target;
      const scrolledInsidePopup =
        popupRef.current !== null && target instanceof Node && popupRef.current.contains(target);
      if (scrolledInsidePopup) return;
      onClose();
    }

    document.addEventListener("scroll", handleScroll, { capture: true, passive: true });

    return () => document.removeEventListener("scroll", handleScroll, { capture: true });
  }, [open, popupRef, onClose]);
}
