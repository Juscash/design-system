import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { MenuComboboxOverflowProps } from "../../../../types/components/MenuCombobox";

const OVERFLOW_CLASS = "ds-menu-combobox-overflow";
const CHEVRON_SIZE = 16;

/**
 * Indicador de overflow (chevron up/down) usado quando o conteúdo do menu
 * extrapola sua altura visível. Não é interativo — apenas dica visual.
 */
export const MenuComboboxOverflow: React.FC<MenuComboboxOverflowProps> = ({ direction }) => {
  const Icon = direction === "up" ? ChevronUp : ChevronDown;
  return (
    <div className={OVERFLOW_CLASS} role="presentation" aria-hidden="true">
      <Icon size={CHEVRON_SIZE} />
    </div>
  );
};

MenuComboboxOverflow.displayName = "MenuCombobox.Overflow";
