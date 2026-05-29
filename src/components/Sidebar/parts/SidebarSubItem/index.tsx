import React from "react";
import { composeClassName } from "../../utils";
import type { SidebarItemProps } from "../../../../types/components/Sidebar";

const SUBITEM_CLASS = "ds-sidebar-subitem";
const SUBITEM_ACTIVE_CLASS = "ds-sidebar-subitem--active";

/**
 * Componente `SidebarSubItem`. Item de 2º nível conforme dump
 * `Sidebar item expanded 2nd level` (4080:10277, 208x136, default/active).
 */
export function SidebarSubItem(props: Omit<SidebarItemProps, "hasSubmenu" | "children">): React.ReactElement {
  const { label, active = false, onClick, href } = props;
  const className = composeClassName(SUBITEM_CLASS, active && SUBITEM_ACTIVE_CLASS);
  const ariaCurrent = active ? "page" : undefined;
  const content = <span className="ds-sidebar-subitem__label">{label}</span>;
  return (
    <li className="ds-sidebar-subitem__wrapper">
      {href ? (
        <a className={className} href={href} aria-current={ariaCurrent} onClick={onClick}>
          {content}
        </a>
      ) : (
        <button type="button" className={className} aria-current={ariaCurrent} onClick={onClick}>
          {content}
        </button>
      )}
    </li>
  );
}
SidebarSubItem.displayName = "SidebarSubItem";
