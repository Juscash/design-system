import React from "react";
import { MenuComboboxItem } from "./parts/MenuComboboxItem";
import { MenuComboboxGroupLabel } from "./parts/MenuComboboxGroupLabel";
import { MenuComboboxSearch } from "./parts/MenuComboboxSearch";
import { MenuComboboxOverflow } from "./parts/MenuComboboxOverflow";
import { MenuComboboxScrollArea } from "./parts/MenuComboboxScrollArea";
import { MenuComboboxDataView } from "./parts/MenuComboboxDataView";
import { joinClassNames } from "../../utils/joinClassNames";
import type { MenuComboboxComponent, MenuComboboxProps } from "../../types/components/MenuCombobox";
import "./index.module.css";

const BASE_CLASS = "ds-menu-combobox";
const DEFAULT_ARIA_LABEL = "Menu";
const SEARCH_DISPLAY_NAME = "MenuCombobox.Search";
const ITEM_DISPLAY_NAME = "MenuCombobox.Item";

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
 * Modo composição: o Search renderiza fora do `role="menu"`; o restante vai para
 * a região rolável (com teclado e indicadores de overflow).
 */
function renderComposition(props: MenuComboboxProps, ariaLabel: string): React.ReactNode {
  const { children, maxHeight, tabIndex } = props;
  const { searchChildren, restChildren, hasMenuItem } = partitionChildren(children);
  return (
    <>
      {searchChildren}
      <MenuComboboxScrollArea
        hasMenuItems={hasMenuItem}
        ariaLabel={ariaLabel}
        maxHeight={maxHeight}
        tabIndex={tabIndex}
        contentKey={restChildren.length}
      >
        {restChildren}
      </MenuComboboxScrollArea>
    </>
  );
}

/**
 * Modo data-driven: monta busca, itens, seleção e empty state a partir de
 * `options`.
 */
function renderData(props: MenuComboboxProps, ariaLabel: string): React.ReactNode {
  return (
    <MenuComboboxDataView
      options={props.options ?? []}
      value={props.value}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      multiple={props.multiple}
      size={props.size}
      searchable={props.searchable}
      searchPlaceholder={props.searchPlaceholder}
      emptyState={props.emptyState}
      maxHeight={props.maxHeight}
      ariaLabel={ariaLabel}
    />
  );
}

/**
 * Container raiz do menu/combobox. Largura `100%` (preenche o trigger/popup) com
 * fundo `neutral/50`, borda, raio `xl` e sombra `m`. Suporta dois modos:
 * composição via `children` ou data-driven via `options`. A estrutura ARIA é
 * condicional (`role="menu"` só envolve menuitens; o Search fica fora dele).
 */
const MenuComboboxRoot: React.FC<MenuComboboxProps> = (props) => {
  const { spacing = "8", className, style, options, "aria-label": ariaLabel = DEFAULT_ARIA_LABEL } = props;
  const wrapperClassName = joinClassNames(BASE_CLASS, `${BASE_CLASS}--spacing-${spacing}`, className);
  const content = options !== undefined ? renderData(props, ariaLabel) : renderComposition(props, ariaLabel);
  return (
    <div className={wrapperClassName} style={style}>
      {content}
    </div>
  );
};

MenuComboboxRoot.displayName = "MenuCombobox";

/**
 * MenuCombobox do design system. Conteúdo de popups de menu/dropdown/combobox
 * (sem trigger nem positioning), conforme Figma "Menu/combobox" (4115:13286).
 *
 * Composição:
 * - `MenuCombobox` (container, largura 100%).
 * - `MenuCombobox.Item` (entrada do menu).
 * - `MenuCombobox.GroupLabel` (rótulo de seção).
 * - `MenuCombobox.Search` (input de busca embarcado).
 * - `MenuCombobox.Overflow` (chevron indicador de scroll).
 *
 * Empty state e loading de menu reusam os componentes `EmptyState` e `Loading`
 * do próprio design system.
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
  MenuComboboxOption,
  MenuComboboxGroup,
  MenuComboboxOptionOrGroup,
  MenuComboboxValue,
} from "../../types/components/MenuCombobox";
