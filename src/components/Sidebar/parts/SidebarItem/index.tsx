import React from "react";
import { ChevronDown } from "lucide-react";
import { composeClassName, resolveIcon, SidebarCollapsedContext } from "../../utils";
import type { SidebarItemProps } from "../../../../types/components/Sidebar";

const ITEM_CLASS = "ds-sidebar-item";
const ITEM_ACTIVE_CLASS = "ds-sidebar-item--active";
const ITEM_COLLAPSED_CLASS = "ds-sidebar-item--collapsed";
const CHEVRON_SIZE = 16;

/**
 * Renderiza o conteúdo interno do item (ícone, label, badge, chevron).
 * Extrai a montagem para manter `SidebarItem` abaixo do limite de 50 linhas.
 */
function ItemInnerContent(props: {
  icon: React.ReactNode;
  label: string;
  badge?: number | string;
  hasSubmenu: boolean;
  expanded: boolean;
  collapsed: boolean;
}): React.ReactElement {
  const { icon, label, badge, hasSubmenu, expanded, collapsed } = props;
  return (
    <>
      {icon ? <span className="ds-sidebar-item__icon">{icon}</span> : null}
      {!collapsed ? <span className="ds-sidebar-item__label">{label}</span> : null}
      {!collapsed && badge !== undefined ? (
        <span className="ds-sidebar-item__badge" aria-label={`${badge} novos`}>
          {badge}
        </span>
      ) : null}
      {!collapsed && hasSubmenu ? (
        <span
          className={composeClassName(
            "ds-sidebar-item__chevron",
            expanded && "ds-sidebar-item__chevron--open",
          )}
          aria-hidden
        >
          <ChevronDown size={CHEVRON_SIZE} />
        </span>
      ) : null}
    </>
  );
}

/**
 * Componente `SidebarItem`. Representa uma entrada de 1º nível do menu lateral.
 * Quando `hasSubmenu` está ativo, alterna a visibilidade dos itens filhos
 * (2º nível). Em estado colapsado da `Sidebar` o item renderiza apenas o
 * ícone (88x144 segundo dump `Sidebar item collapsed` 4080:10111).
 */
export function SidebarItem(props: SidebarItemProps): React.ReactElement {
  const { icon, label, active = false, expanded = false, badge, hasSubmenu = false, onClick, children, href } = props;
  const collapsed = React.useContext(SidebarCollapsedContext);
  const className = composeClassName(
    ITEM_CLASS,
    active && ITEM_ACTIVE_CLASS,
    collapsed && ITEM_COLLAPSED_CLASS,
  );
  const inner = (
    <ItemInnerContent
      icon={resolveIcon(icon)}
      label={label}
      badge={badge}
      hasSubmenu={hasSubmenu}
      expanded={expanded}
      collapsed={collapsed}
    />
  );
  const ariaCurrent = active ? "page" : undefined;
  const title = collapsed ? label : undefined;
  const trigger = href ? (
    <a className={className} href={href} aria-current={ariaCurrent} title={title} onClick={onClick}>
      {inner}
    </a>
  ) : (
    <button
      type="button"
      className={className}
      aria-current={ariaCurrent}
      aria-expanded={hasSubmenu ? expanded : undefined}
      title={title}
      onClick={onClick}
    >
      {inner}
    </button>
  );
  return (
    <li className="ds-sidebar-item__wrapper">
      {trigger}
      {!collapsed && hasSubmenu && expanded && children ? (
        <ul className="ds-sidebar-item__submenu">{children}</ul>
      ) : null}
    </li>
  );
}
SidebarItem.displayName = "SidebarItem";
