import React from "react";
import { composeClassName, resolveIcon } from "../../utils";
import type { SidebarSubItemProps } from "../../../../types/components/Sidebar";

const SUBITEM_CLASS = "ds-sidebar-subitem";
const SUBITEM_ACTIVE_CLASS = "ds-sidebar-subitem--active";

/**
 * Componente `SidebarSubItem`. Item de 2º nível com a guia vertical (`leaf`)
 * à esquerda e os estados `default`/`active` conforme o Figma
 * `sidebar Item / expanded / 2nd level` (4080:10277).
 */
export function SidebarSubItem(props: SidebarSubItemProps): React.ReactElement {
  const { icon, label, active = false, onClick, href } = props;
  const className = composeClassName(SUBITEM_CLASS, active && SUBITEM_ACTIVE_CLASS);
  const resolvedIcon = resolveIcon(icon);
  const ariaCurrent = active ? "page" : undefined;
  const inner = (
    <>
      <span className="ds-sidebar-subitem__leaf" aria-hidden />
      <span className="ds-sidebar-subitem__content">
        {resolvedIcon ? <span className="ds-sidebar-subitem__icon">{resolvedIcon}</span> : null}
        <span className="ds-sidebar-subitem__label">{label}</span>
      </span>
    </>
  );
  const trigger =
    href ?
      <a className={className} href={href} aria-current={ariaCurrent} onClick={onClick}>
        {inner}
      </a>
    : <button type="button" className={className} aria-current={ariaCurrent} onClick={onClick}>
        {inner}
      </button>;
  return <li className="ds-sidebar-subitem__wrapper">{trigger}</li>;
}
SidebarSubItem.displayName = "SidebarSubItem";
