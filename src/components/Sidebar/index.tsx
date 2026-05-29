import React from "react";
import { composeClassName, SidebarCollapsedContext } from "./utils";
import { SidebarItem } from "./parts/SidebarItem";
import { SidebarSubItem } from "./parts/SidebarSubItem";
import { SidebarGroupLabel } from "./parts/SidebarGroupLabel";
import { SidebarToggleButton } from "./parts/SidebarToggleButton";
import type { SidebarProps } from "../../types/components/Sidebar";
import "./index.module.css";

const ROOT_CLASS = "ds-sidebar";
const ROOT_COLLAPSED_CLASS = "ds-sidebar--collapsed";

/**
 * Componente `Sidebar`. Menu lateral colapsável (240px ⇄ 72px) com 3 variantes
 * visuais (`juscash`, `sij`, `prompt-tester`) conforme matriz 6 variantes do
 * Figma `4080:14598`. Disponibiliza o estado `expanded` ao subtree via Context
 * para que `SidebarItem`/`SidebarGroupLabel` se ajustem automaticamente.
 */
export function Sidebar(props: SidebarProps): React.ReactElement {
  const {
    expanded = true,
    variant = "juscash",
    children,
    className,
    style,
    "aria-label": ariaLabel = "Menu lateral",
  } = props;
  const collapsed = !expanded;
  return (
    <SidebarCollapsedContext.Provider value={collapsed}>
      <aside
        role="navigation"
        aria-label={ariaLabel}
        className={composeClassName(
          ROOT_CLASS,
          `${ROOT_CLASS}--${variant}`,
          collapsed && ROOT_COLLAPSED_CLASS,
          className,
        )}
        style={style}
      >
        <ul className="ds-sidebar__list">{children}</ul>
      </aside>
    </SidebarCollapsedContext.Provider>
  );
}
Sidebar.displayName = "Sidebar";

export { SidebarItem, SidebarSubItem, SidebarGroupLabel, SidebarToggleButton };

export type {
  SidebarProps,
  SidebarItemProps,
  SidebarGroupLabelProps,
  SidebarToggleButtonProps,
  SidebarVariant,
} from "../../types/components/Sidebar";
