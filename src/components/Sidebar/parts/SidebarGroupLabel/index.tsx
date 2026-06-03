import React from "react";
import { Plus, ChevronDown, ChevronRight } from "lucide-react";
import { SidebarCollapsedContext } from "../../utils";
import type { SidebarGroupLabelProps, SidebarGroupLabelType } from "../../../../types/components/Sidebar";

const GROUP_CLASS = "ds-sidebar-group-label";
const MINI_BUTTON_CLASS = "ds-sidebar-mini-button";
const MINI_ICON_SIZE = 14;

/** Ícone do botão à direita por tipo (Figma `.sidebar mini button`). */
const ACTION_ICON: Record<Exclude<SidebarGroupLabelType, "base">, React.ReactNode> = {
  action: <Plus size={MINI_ICON_SIZE} />,
  expanded: <ChevronDown size={MINI_ICON_SIZE} />,
  collapsed: <ChevronRight size={MINI_ICON_SIZE} />,
};

/**
 * Componente `SidebarGroupLabel`. Rótulo de seção (texto `10px` bold, cor
 * `text/soft`) conforme o Figma `sidebar group label` (4080:10290). Os tipos
 * `action`/`expanded`/`collapsed` exibem um botão à direita (plus/chevrons).
 * Em uma `Sidebar` colapsada o rótulo é omitido.
 */
export function SidebarGroupLabel(props: SidebarGroupLabelProps): React.ReactElement | null {
  const { label, type = "base", onActionClick } = props;
  const sidebarCollapsed = React.useContext(SidebarCollapsedContext);
  if (sidebarCollapsed) return null;
  const actionIcon = type === "base" ? null : ACTION_ICON[type];
  return (
    <li className={GROUP_CLASS}>
      <span className={`${GROUP_CLASS}__text`}>{label}</span>
      {actionIcon ? (
        <button type="button" className={MINI_BUTTON_CLASS} aria-label={label} onClick={onActionClick}>
          {actionIcon}
        </button>
      ) : null}
    </li>
  );
}
SidebarGroupLabel.displayName = "SidebarGroupLabel";
