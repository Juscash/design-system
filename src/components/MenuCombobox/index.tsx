import React from "react";
import { MenuComboboxItem } from "./parts/MenuComboboxItem";
import { MenuComboboxGroupLabel } from "./parts/MenuComboboxGroupLabel";
import { MenuComboboxSearch } from "./parts/MenuComboboxSearch";
import { MenuComboboxOverflow } from "./parts/MenuComboboxOverflow";
import type { MenuComboboxComponent, MenuComboboxProps } from "../../types/components/MenuCombobox";
import "./index.module.css";

const BASE_CLASS = "ds-menu-combobox";
const DEFAULT_ARIA_LABEL = "Menu";
const SEARCH_DISPLAY_NAME = "MenuCombobox.Search";

/**
 * Junta classes filtrando valores falsy. Mantido inline pra evitar utility
 * externa minúscula.
 */
function joinClassNames(...tokens: Array<string | false | undefined>): string {
  return tokens.filter(Boolean).join(" ");
}

/**
 * Separa o(s) filho(s) `MenuCombobox.Search` dos demais. O search precisa
 * renderizar FORA do nó com `role="menu"` (regra ARIA `aria-required-children`:
 * `menu` só aceita `menuitem`/`group`/`separator`, não `searchbox`/`textbox`).
 * Os demais filhos (itens, group labels, overflow) ficam dentro do nó com
 * `role="menu"` para satisfazer também a regra `aria-required-parent`
 * (`menuitem` precisa de ancestral `menu`).
 */
function partitionSearchFromChildren(children: React.ReactNode): {
  searchChildren: React.ReactNode[];
  otherChildren: React.ReactNode[];
} {
  const searchChildren: React.ReactNode[] = [];
  const otherChildren: React.ReactNode[] = [];
  React.Children.toArray(children).forEach((child) => {
    if (!React.isValidElement(child)) {
      otherChildren.push(child);
      return;
    }
    const childType = child.type as React.ComponentType<unknown> | string;
    if (typeof childType !== "string" && childType.displayName === SEARCH_DISPLAY_NAME) {
      searchChildren.push(child);
      return;
    }
    otherChildren.push(child);
  });
  return { searchChildren, otherChildren };
}

/**
 * Container raiz do menu. Aplica padding via `spacing` e o `aria-label`
 * (fallback `"Menu"`). A estrutura ARIA é condicional:
 *
 * - Sem `MenuCombobox.Search`: o próprio wrapper recebe `role="menu"` e
 *   `aria-label`, contendo todos os filhos.
 * - Com `MenuCombobox.Search`: o wrapper externo é um `<div>` sem role
 *   específico (apenas a classe visual). O search é renderizado primeiro,
 *   fora do `role="menu"`. Os demais filhos (`Item`, `GroupLabel`,
 *   `Overflow`) ficam dentro de um `<div role="menu" aria-label=…>` interno.
 *   Isso satisfaz simultaneamente `aria-required-children` (menu só com
 *   filhos permitidos) e `aria-required-parent` (menuitens com ancestral
 *   menu).
 */
const MenuComboboxRoot: React.FC<MenuComboboxProps> = (props) => {
  const { spacing = "8", children, className, style, "aria-label": ariaLabel = DEFAULT_ARIA_LABEL } = props;
  const wrapperClassName = joinClassNames(BASE_CLASS, `${BASE_CLASS}--spacing-${spacing}`, className);
  const { searchChildren, otherChildren } = partitionSearchFromChildren(children);
  if (searchChildren.length === 0) {
    return (
      <div className={wrapperClassName} style={style} role="menu" aria-label={ariaLabel}>
        {children}
      </div>
    );
  }
  return (
    <div className={wrapperClassName} style={style}>
      {searchChildren}
      <div role="menu" aria-label={ariaLabel}>
        {otherChildren}
      </div>
    </div>
  );
};

MenuComboboxRoot.displayName = "MenuCombobox";

/**
 * MenuCombobox do design system. Conjunto de primitivos visuais para
 * construir popups de menu/dropdown/combobox — NÃO é um Select completo.
 * Conforme dump `figma/components/menu-combobox/design-context-4115-13286.md`.
 *
 * Composição:
 * - `MenuCombobox` (container).
 * - `MenuCombobox.Item` (entrada do menu).
 * - `MenuCombobox.GroupLabel` (rótulo de seção).
 * - `MenuCombobox.Search` (input de busca embarcado).
 * - `MenuCombobox.Overflow` (chevron up/down).
 */
const MenuCombobox = MenuComboboxRoot as MenuComboboxComponent;
MenuCombobox.Item = MenuComboboxItem;
MenuCombobox.GroupLabel = MenuComboboxGroupLabel;
MenuCombobox.Search = MenuComboboxSearch;
MenuCombobox.Overflow = MenuComboboxOverflow;

export { MenuCombobox };

export type {
  MenuComboboxProps,
  MenuComboboxItemProps,
  MenuComboboxGroupLabelProps,
  MenuComboboxSearchProps,
  MenuComboboxOverflowProps,
  MenuComboboxSize,
  MenuComboboxItemType,
  MenuComboboxItemState,
  MenuComboboxSpacing,
  MenuComboboxOverflowDirection,
  MenuComboboxComponent,
} from "../../types/components/MenuCombobox";
