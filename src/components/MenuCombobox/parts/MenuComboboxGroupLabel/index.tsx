import React from "react";
import { joinClassNames } from "../../../../utils/joinClassNames";
import type { MenuComboboxGroupLabelProps } from "../../../../types/components/MenuCombobox";

const GROUP_LABEL_CLASS = "ds-menu-combobox-group-label";

/**
 * Rótulo de seção dentro do menu. Não é interativo. `indented=true` aplica
 * recuo horizontal para alinhar com itens que têm ícone.
 */
export const MenuComboboxGroupLabel: React.FC<MenuComboboxGroupLabelProps> = (props) => {
  const { size = "m", indented = false, children } = props;
  const className = joinClassNames(
    GROUP_LABEL_CLASS,
    `${GROUP_LABEL_CLASS}--size-${size}`,
    indented ? `${GROUP_LABEL_CLASS}--indented` : undefined,
  );
  return (
    <div className={className} role="presentation">
      {children}
    </div>
  );
};

MenuComboboxGroupLabel.displayName = "MenuCombobox.GroupLabel";
