import React from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import type { SidebarToggleButtonProps } from "../../../../types/components/Sidebar";

const TOGGLE_CLASS = "ds-sidebar-toggle";
const TOGGLE_ICON_SIZE = 14;

/**
 * Componente `SidebarToggleButton`. Botão de 32x32 que alterna o estado
 * expandido/colapsado da `Sidebar`. Conforme dump `Sidebar mini button`
 * (4080:10304) com 2 estados (default / hover&active).
 */
export function SidebarToggleButton(props: SidebarToggleButtonProps): React.ReactElement {
  const { expanded = true, onClick, "aria-label": ariaLabel } = props;
  const fallback = expanded ? "Recolher menu" : "Expandir menu";
  return (
    <button
      type="button"
      className={TOGGLE_CLASS}
      aria-expanded={expanded}
      aria-label={ariaLabel ?? fallback}
      onClick={onClick}
    >
      {expanded ? <ChevronsLeft size={TOGGLE_ICON_SIZE} /> : <ChevronsRight size={TOGGLE_ICON_SIZE} />}
    </button>
  );
}
SidebarToggleButton.displayName = "SidebarToggleButton";
