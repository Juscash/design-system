import React from "react";
import { MenuComboboxOverflow } from "../MenuComboboxOverflow";
import { useMenuNavigation, focusFirstItem } from "../../hooks/useMenuNavigation";
import { useOverflowIndicators } from "../../hooks/useOverflowIndicators";

const WRAP_CLASS = "ds-menu-combobox-scroll";
const VIEWPORT_CLASS = "ds-menu-combobox-viewport";

interface MenuComboboxScrollAreaProps {
  /** Conteúdo rolável (itens, group labels). */
  children: React.ReactNode;
  /** Aplica `role="menu"` + navegação por teclado quando há itens. */
  hasMenuItems: boolean;
  /** Rótulo acessível da região `role="menu"`. */
  ariaLabel: string;
  /** Altura máxima (px) — habilita scroll + indicadores de overflow. */
  maxHeight?: number;
  /** `tabIndex` da região `role="menu"`. Default `0`. */
  tabIndex?: number;
  /** Muda quando o conteúdo muda — força recálculo do overflow. */
  contentKey: number;
}

/**
 * Região rolável do menu: aplica `role="menu"`, navegação por teclado (roving
 * focus) e, quando `maxHeight` é definido, scroll real com indicadores de
 * overflow clicáveis que só aparecem quando há conteúdo a rolar naquela direção.
 */
export const MenuComboboxScrollArea: React.FC<MenuComboboxScrollAreaProps> = (props) => {
  const { children, hasMenuItems, ariaLabel, maxHeight, tabIndex, contentKey } = props;
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const handleKeyDown = useMenuNavigation(viewportRef);
  const scrollEnabled = maxHeight !== undefined;
  const { canScrollUp, canScrollDown, scrollStep } = useOverflowIndicators(viewportRef, scrollEnabled, contentKey);

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>): void => {
    if (event.target === viewportRef.current) focusFirstItem(viewportRef.current);
  };

  const menuProps = hasMenuItems
    ? { role: "menu", "aria-label": ariaLabel, tabIndex: tabIndex ?? 0, onKeyDown: handleKeyDown, onFocus: handleFocus }
    : {};

  return (
    <div className={WRAP_CLASS}>
      {canScrollUp && <MenuComboboxOverflow direction="up" onClick={() => scrollStep("up")} />}
      <div
        ref={viewportRef}
        className={VIEWPORT_CLASS}
        style={scrollEnabled ? { maxHeight, overflowY: "auto" } : undefined}
        {...menuProps}
      >
        {children}
      </div>
      {canScrollDown && <MenuComboboxOverflow direction="down" onClick={() => scrollStep("down")} />}
    </div>
  );
};

MenuComboboxScrollArea.displayName = "MenuComboboxScrollArea";
