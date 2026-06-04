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
const ITEM_DISPLAY_NAME = "MenuCombobox.Item";

/**
 * Junta classes filtrando valores falsy.
 */
function joinClassNames(...tokens: Array<string | false | undefined>): string {
  return tokens.filter(Boolean).join(" ");
}

/**
 * Lê o `displayName` de um filho React (quando é um componente, não tag/string).
 */
function getChildDisplayName(child: React.ReactNode): string | undefined {
  if (!React.isValidElement(child)) return undefined;
  const childType = child.type as { displayName?: string } | string;
  return typeof childType === "string" ? undefined : childType.displayName;
}

interface PartitionedChildren {
  searchChildren: React.ReactNode[];
  restChildren: React.ReactNode[];
  hasMenuItem: boolean;
}

/**
 * Separa o `MenuCombobox.Search` (renderiza FORA do `role="menu"`, pela regra
 * ARIA `aria-required-children`) do restante, e sinaliza se há ao menos um
 * `MenuCombobox.Item` (único filho que justifica o `role="menu"`).
 */
function partitionChildren(children: React.ReactNode): PartitionedChildren {
  const searchChildren: React.ReactNode[] = [];
  const restChildren: React.ReactNode[] = [];
  let hasMenuItem = false;
  React.Children.toArray(children).forEach((child) => {
    const displayName = getChildDisplayName(child);
    if (displayName === SEARCH_DISPLAY_NAME) {
      searchChildren.push(child);
      return;
    }
    if (displayName === ITEM_DISPLAY_NAME) hasMenuItem = true;
    restChildren.push(child);
  });
  return { searchChildren, restChildren, hasMenuItem };
}

/**
 * Container raiz do menu. A estrutura ARIA é condicional para satisfazer
 * `aria-required-children` (um `role="menu"` só deve conter menuitens/grupos):
 *
 * - O `MenuCombobox.Search` sempre renderiza fora do `role="menu"`.
 * - O `role="menu"` (+ `aria-label`) só é aplicado quando há ao menos um
 *   `MenuCombobox.Item`. Composições puramente visuais (empty state, loading)
 *   ficam num wrapper neutro, sem `role="menu"`.
 */
const MenuComboboxRoot: React.FC<MenuComboboxProps> = (props) => {
  const { spacing = "8", children, className, style, tabIndex, "aria-label": ariaLabel = DEFAULT_ARIA_LABEL } = props;
  const wrapperClassName = joinClassNames(BASE_CLASS, `${BASE_CLASS}--spacing-${spacing}`, className);
  const { searchChildren, restChildren, hasMenuItem } = partitionChildren(children);

  if (searchChildren.length === 0) {
    const menuRoleProps = hasMenuItem ? { role: "menu", "aria-label": ariaLabel } : {};
    return (
      <div className={wrapperClassName} style={style} tabIndex={tabIndex} {...menuRoleProps}>
        {restChildren}
      </div>
    );
  }

  return (
    <div className={wrapperClassName} style={style} tabIndex={tabIndex}>
      {searchChildren}
      {hasMenuItem ? (
        <div role="menu" aria-label={ariaLabel}>
          {restChildren}
        </div>
      ) : (
        restChildren
      )}
    </div>
  );
};

MenuComboboxRoot.displayName = "MenuCombobox";

/**
 * MenuCombobox do design system. Conjunto de primitivos visuais para construir
 * o CONTEÚDO de popups de menu/dropdown/combobox — não inclui trigger nem
 * positioning. Conforme Figma "Menu/combobox" (node 4115:13286).
 *
 * Composição:
 * - `MenuCombobox` (container 240px).
 * - `MenuCombobox.Item` (entrada do menu).
 * - `MenuCombobox.GroupLabel` (rótulo de seção).
 * - `MenuCombobox.Search` (input de busca embarcado).
 * - `MenuCombobox.Overflow` (chevron indicador de scroll).
 *
 * Empty state e loading de menu são compostos com os componentes `EmptyState` e
 * `Loading` do próprio design system (ver stories).
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
