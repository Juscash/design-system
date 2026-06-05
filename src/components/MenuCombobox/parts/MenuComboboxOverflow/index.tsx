import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { MenuComboboxOverflowProps } from "../../../../types/components/MenuCombobox";

const OVERFLOW_CLASS = "ds-menu-combobox-overflow";
const CHEVRON_SIZE = 16;

/**
 * Indicador de overflow (chevron up/down) exibido quando o conteúdo do menu
 * extrapola a altura visível. Decorativo por padrão (`aria-hidden`). Quando
 * `onClick` é fornecido, vira um afford de mouse que rola a lista — o teclado
 * usa as setas ↑/↓, por isso o indicador permanece fora da ordem de tabulação.
 */
export const MenuComboboxOverflow: React.FC<MenuComboboxOverflowProps> = ({ direction, onClick }) => {
  const Icon = direction === "up" ? ChevronUp : ChevronDown;
  const interactive = onClick !== undefined;
  const className = interactive ? `${OVERFLOW_CLASS} ${OVERFLOW_CLASS}--interactive` : OVERFLOW_CLASS;
  return (
    <div
      className={className}
      role="presentation"
      aria-hidden="true"
      onClick={onClick}
      onMouseDown={interactive ? (event) => event.preventDefault() : undefined}
    >
      <Icon size={CHEVRON_SIZE} />
    </div>
  );
};

MenuComboboxOverflow.displayName = "MenuCombobox.Overflow";
