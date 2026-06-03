import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { composeClassName, resolveIcon, SidebarCollapsedContext } from "../../utils";
import type { SidebarItemProps } from "../../../../types/components/Sidebar";

const ITEM_CLASS = "ds-sidebar-item";
const ITEM_ACTIVE_CLASS = "ds-sidebar-item--active";
const ITEM_COLLAPSED_CLASS = "ds-sidebar-item--collapsed";
const CHEVRON_SIZE = 16;

/**
 * Monta o conteúdo do item expandido: a área `AL` (ícone + label) e o slot
 * final do Figma — `badge` (tipo `badge`) ou o chevron de submenu
 * (`chevron-down` aberto / `chevron-right` fechado).
 */
function ItemExpandedContent(props: {
  icon: React.ReactNode;
  label: string;
  badge?: number | string;
  hasSubmenu: boolean;
  expanded: boolean;
}): React.ReactElement {
  const { icon, label, badge, hasSubmenu, expanded } = props;
  const chevron = expanded ? <ChevronDown size={CHEVRON_SIZE} /> : <ChevronRight size={CHEVRON_SIZE} />;
  return (
    <>
      <span className="ds-sidebar-item__content">
        {icon ? <span className="ds-sidebar-item__icon">{icon}</span> : null}
        <span className="ds-sidebar-item__label">{label}</span>
      </span>
      {badge !== undefined ? <span className="ds-sidebar-item__badge">{badge}</span> : null}
      {hasSubmenu ? (
        <span className="ds-sidebar-item__chevron" aria-hidden>
          {chevron}
        </span>
      ) : null}
    </>
  );
}

/**
 * Renderiza o conteúdo do item conforme o estado da `Sidebar`: apenas o
 * ícone quando colapsada, ou a versão completa quando expandida.
 */
function ItemInner(props: {
  collapsed: boolean;
  icon: React.ReactNode;
  label: string;
  badge?: number | string;
  hasSubmenu: boolean;
  expanded: boolean;
}): React.ReactElement | null {
  const { collapsed, icon, label, badge, hasSubmenu, expanded } = props;
  if (collapsed) {
    if (!icon) return null;
    return <span className="ds-sidebar-item__icon">{icon}</span>;
  }
  return <ItemExpandedContent icon={icon} label={label} badge={badge} hasSubmenu={hasSubmenu} expanded={expanded} />;
}

/**
 * Componente `SidebarItem`. Entrada de 1º nível do menu lateral. Em uma
 * `Sidebar` colapsada exibe apenas o ícone (40x36). Quando recebe `children`
 * vira pai de submenu: exibe o chevron e renderiza os `SidebarSubItem`
 * filhos quando `expanded`.
 */
export function SidebarItem(props: SidebarItemProps): React.ReactElement {
  const { icon, label, active = false, badge, expanded = false, onClick, children, href } = props;
  const collapsed = React.useContext(SidebarCollapsedContext);
  const hasSubmenu = Boolean(children);
  const className = composeClassName(ITEM_CLASS, active && ITEM_ACTIVE_CLASS, collapsed && ITEM_COLLAPSED_CLASS);
  const ariaCurrent = active ? "page" : undefined;
  const title = collapsed ? label : undefined;
  const inner = (
    <ItemInner
      collapsed={collapsed}
      icon={resolveIcon(icon)}
      label={label}
      badge={badge}
      hasSubmenu={hasSubmenu}
      expanded={expanded}
    />
  );
  const trigger =
    href ?
      <a className={className} href={href} aria-current={ariaCurrent} title={title} onClick={onClick}>
        {inner}
      </a>
    : <button
        type="button"
        className={className}
        aria-current={ariaCurrent}
        aria-expanded={hasSubmenu && !collapsed ? expanded : undefined}
        title={title}
        onClick={onClick}
      >
        {inner}
      </button>;
  return (
    <li className="ds-sidebar-item__wrapper">
      {trigger}
      {!collapsed && hasSubmenu && expanded ?
        <ul className="ds-sidebar-item__submenu">{children}</ul>
      : null}
    </li>
  );
}
SidebarItem.displayName = "SidebarItem";
