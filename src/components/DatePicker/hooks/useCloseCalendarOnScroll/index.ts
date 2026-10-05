import { useEffect } from "react";
import { POPUP_CLASS } from "../../shared";
import { HEADER_DROPDOWN_CLASS } from "../../parts/HeaderSelect/context";

/**
 * Portais que pertencem ao calendário: o popup em si e o dropdown de mês/ano do
 * header, que o Antd renderiza no `body` — fora da árvore do popup.
 */
const OWN_PORTALS_SELECTOR = `.${POPUP_CLASS}, .${HEADER_DROPDOWN_CLASS}`;

/**
 * Fecha o calendário do `DatePicker` quando a página rola por trás dele —
 * mesmo comportamento do `useCloseSelectOnScroll` do `Select`.
 *
 * O Antd renderiza o popup num portal (`document.body`), calculando a posição
 * só na abertura. Rolar a página com o cursor sobre o próprio popup (fora da
 * cadeia de ancestrais do input) não o realinha nem fecha — ele fica flutuando
 * sobreposto ao conteúdo.
 *
 * A checagem é por classe, e não por `ref` como no `Select`, porque o
 * calendário tem DOIS portais próprios: o popup (`ds-datepicker-popup`) e o
 * dropdown de mês/ano do header (`ds-datepicker-header-select-dropdown`), que
 * fica fora do popup. Scroll originado em qualquer um dos dois é ignorado, para
 * não fechar o calendário enquanto o usuário rola a lista de meses/anos. Um ref
 * dentro do `panelRender` também deixaria de fora o `.ant-picker-panel-container`,
 * que é ancestral do painel e rola na horizontal em viewport estreita.
 */
export function useCloseCalendarOnScroll(open: boolean, onClose: () => void): void {
  useEffect(() => {
    if (!open) return;

    function handleScroll(event: Event): void {
      const target = event.target;
      const scrolledInsideCalendar = target instanceof Element && target.closest(OWN_PORTALS_SELECTOR) !== null;
      if (scrolledInsideCalendar) return;
      onClose();
    }

    document.addEventListener("scroll", handleScroll, { capture: true, passive: true });

    return () => document.removeEventListener("scroll", handleScroll, { capture: true });
  }, [open, onClose]);
}
