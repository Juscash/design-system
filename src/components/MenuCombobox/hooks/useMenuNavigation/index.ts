import React from "react";

const ITEM_SELECTOR = '[role="menuitem"]:not([aria-disabled="true"])';

/**
 * Retorna os itens de menu focáveis (não desabilitados) dentro do container.
 */
function getItems(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(container.querySelectorAll<HTMLElement>(ITEM_SELECTOR));
}

/**
 * Move o foco para o item no índice (com clamp) e o traz para a área visível.
 */
function focusItem(items: HTMLElement[], index: number): void {
  const clamped = Math.max(0, Math.min(index, items.length - 1));
  const target = items[clamped];
  if (!target) return;
  target.focus();
  target.scrollIntoView({ block: "nearest" });
}

/**
 * Move o foco para o primeiro item focável — usado ao focar a região do menu.
 */
export function focusFirstItem(container: HTMLElement | null): void {
  focusItem(getItems(container), 0);
}

/**
 * Navegação por teclado do menu (roving focus): ↑/↓ percorrem os itens,
 * Home/End vão aos extremos e Esc tira o foco. Enter/Space são tratados pelo
 * próprio item. Retorna o handler `onKeyDown` para a região `role="menu"`.
 */
export function useMenuNavigation(
  containerRef: React.RefObject<HTMLElement | null>,
): (event: React.KeyboardEvent<HTMLElement>) => void {
  return React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>): void => {
      const items = getItems(containerRef.current);
      if (items.length === 0) return;
      const current = items.indexOf(document.activeElement as HTMLElement);
      const moves: Record<string, () => void> = {
        ArrowDown: () => focusItem(items, current < 0 ? 0 : current + 1),
        ArrowUp: () => focusItem(items, current < 0 ? 0 : current - 1),
        Home: () => focusItem(items, 0),
        End: () => focusItem(items, items.length - 1),
        Escape: () => (document.activeElement as HTMLElement | null)?.blur(),
      };
      const move = moves[event.key];
      if (!move) return;
      event.preventDefault();
      move();
    },
    [containerRef],
  );
}
