import React from "react";
import { composeClassName, SidebarCollapsedContext } from "./utils";
import { SidebarItem } from "./parts/SidebarItem";
import { SidebarSubItem } from "./parts/SidebarSubItem";
import { SidebarGroupLabel } from "./parts/SidebarGroupLabel";
import type { SidebarProps } from "../../types/components/Sidebar";
import "./index.module.css";

const ROOT_CLASS = "ds-sidebar";
const ROOT_COLLAPSED_CLASS = "ds-sidebar--collapsed";

/**
 * Componente `Sidebar`. Menu lateral colapsável (240px ⇄ 72px) conforme o
 * Figma `sidebar` (4080:14598). O estado é controlado pelo consumidor via
 * `expanded`; o valor é disponibilizado ao subtree por Context para que
 * `SidebarItem`/`SidebarGroupLabel` se ajustem automaticamente.
 */
export function Sidebar(props: SidebarProps): React.ReactElement {
  const { expanded = true, children, className, style, "aria-label": ariaLabel = "Menu lateral" } = props;
  const collapsed = !expanded;
  return (
    <SidebarCollapsedContext.Provider value={collapsed}>
      <aside
        role="navigation"
        aria-label={ariaLabel}
        className={composeClassName(ROOT_CLASS, collapsed && ROOT_COLLAPSED_CLASS, className)}
        style={style}
      >
        <ul className="ds-sidebar__list">{children}</ul>
      </aside>
    </SidebarCollapsedContext.Provider>
  );
}
Sidebar.displayName = "Sidebar";

export { SidebarItem, SidebarSubItem, SidebarGroupLabel };

export type {
  SidebarProps,
  SidebarItemProps,
  SidebarSubItemProps,
  SidebarGroupLabelProps,
  SidebarGroupLabelType,
} from "../../types/components/Sidebar";
