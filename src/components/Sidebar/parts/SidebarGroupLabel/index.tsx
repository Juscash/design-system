import React from "react";
import { SidebarCollapsedContext } from "../../utils";
import type { SidebarGroupLabelProps } from "../../../../types/components/Sidebar";

const GROUP_CLASS = "ds-sidebar-group-label";

/**
 * Componente `SidebarGroupLabel`. Rótulo de seção dentro do menu. Variante
 * `collapsed` exibe somente um separador horizontal; `expanded` (default)
 * exibe o texto em caixa-alta com cor `text/soft`. Conforme dump
 * `Sidebar group label` (4080:10290).
 */
export function SidebarGroupLabel(props: SidebarGroupLabelProps): React.ReactElement {
  const { label, collapsed = false } = props;
  const sidebarCollapsed = React.useContext(SidebarCollapsedContext);
  const isCollapsed = collapsed || sidebarCollapsed;
  if (isCollapsed) {
    return <li className={`${GROUP_CLASS} ${GROUP_CLASS}--collapsed`} role="separator" aria-label={label} />;
  }
  return (
    <li className={GROUP_CLASS}>
      <span className={`${GROUP_CLASS}__text`}>{label}</span>
    </li>
  );
}
SidebarGroupLabel.displayName = "SidebarGroupLabel";
