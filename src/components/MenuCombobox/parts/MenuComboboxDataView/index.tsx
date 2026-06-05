import React from "react";
import { FolderOpen } from "lucide-react";
import { MenuComboboxItem } from "../MenuComboboxItem";
import { MenuComboboxGroupLabel } from "../MenuComboboxGroupLabel";
import { MenuComboboxSearch } from "../MenuComboboxSearch";
import { MenuComboboxScrollArea } from "../MenuComboboxScrollArea";
import { EmptyState } from "../../../EmptyState";
import { Checkbox } from "../../../Checkbox";
import { spacing } from "../../../../theme";
import { useControllableSelection } from "../../hooks/useControllableSelection";
import { useMenuSearch, isMenuGroup } from "../../hooks/useMenuSearch";
import type {
  MenuComboboxItemState,
  MenuComboboxOption,
  MenuComboboxOptionOrGroup,
  MenuComboboxSize,
  MenuComboboxValue,
} from "../../../../types/components/MenuCombobox";

const EMPTY_ICON_SIZE = 24;
const EMPTY_ICON_STROKE = 1.75;
const EMPTY_STATE_STYLE: React.CSSProperties = { width: "100%", padding: spacing[4], boxSizing: "border-box" };
const CHECKBOX_STYLE: React.CSSProperties = { pointerEvents: "none" };

interface RenderContext {
  size: MenuComboboxSize;
  multiple: boolean;
  isSelected: (value: string) => boolean;
  toggle: (value: string) => void;
}

interface MenuComboboxDataViewProps {
  options: MenuComboboxOptionOrGroup[];
  value?: MenuComboboxValue;
  defaultValue?: MenuComboboxValue;
  onChange?: (value: MenuComboboxValue) => void;
  multiple?: boolean;
  size?: MenuComboboxSize;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyState?: React.ReactNode;
  maxHeight?: number;
  ariaLabel: string;
}

/**
 * Deriva o estado declarativo do item: `disabled` tem prioridade, depois
 * `selected`, senão `default` (sem ternário aninhado).
 */
function optionState(disabled: boolean, selected: boolean): MenuComboboxItemState {
  if (disabled) return "disabled";
  if (selected) return "selected";
  return "default";
}

/**
 * Ícone esquerdo: no modo multi vira um `Checkbox` (não-interativo, o clique é
 * do item); no single, usa o `icon` da opção.
 */
function resolveLeftIcon(option: MenuComboboxOption, multiple: boolean, selected: boolean): React.ReactNode | string {
  if (multiple) return <Checkbox checked={selected} aria-label={option.label} style={CHECKBOX_STYLE} />;
  return option.icon;
}

/**
 * Ícone direito: no single selecionado mostra o "Check"; senão usa o `rightIcon`.
 */
function resolveRightIcon(option: MenuComboboxOption, multiple: boolean, selected: boolean): React.ReactNode | string {
  if (!multiple && selected) return "Check";
  return option.rightIcon;
}

/**
 * Renderiza uma opção como `MenuCombobox.Item`, aplicando seleção e ícones.
 */
function renderOption(option: MenuComboboxOption, ctx: RenderContext): React.ReactElement {
  const selected = ctx.isSelected(option.value);
  const disabled = option.disabled === true;
  return (
    <MenuComboboxItem
      key={option.value}
      size={ctx.size}
      type={option.type}
      state={optionState(disabled, selected)}
      icon={resolveLeftIcon(option, ctx.multiple, selected)}
      rightIcon={resolveRightIcon(option, ctx.multiple, selected)}
      label={option.label}
      description={option.description}
      onClick={() => ctx.toggle(option.value)}
    />
  );
}

/**
 * Renderiza a lista filtrada: grupos viram um `GroupLabel` + suas opções;
 * opções soltas viram itens.
 */
function renderEntries(entries: MenuComboboxOptionOrGroup[], ctx: RenderContext): React.ReactNode {
  return entries.map((entry) => {
    if (!isMenuGroup(entry)) return renderOption(entry, ctx);
    return (
      <React.Fragment key={`group-${entry.groupLabel}`}>
        <MenuComboboxGroupLabel size={ctx.size} indented={entry.indented}>
          {entry.groupLabel}
        </MenuComboboxGroupLabel>
        {entry.options.map((option) => renderOption(option, ctx))}
      </React.Fragment>
    );
  });
}

/**
 * Conta as opções visíveis (achatando grupos) — base do empty state e da
 * `contentKey` do scroll.
 */
function countOptions(entries: MenuComboboxOptionOrGroup[]): number {
  return entries.reduce((total, entry) => total + (isMenuGroup(entry) ? entry.options.length : 1), 0);
}

/**
 * Renderização data-driven do `MenuCombobox`: monta a busca (opcional), os itens
 * agrupados, a seleção (single/multi, controlado/não-controlado) e o empty state
 * (reusa o `EmptyState` do DS), tudo dentro da região rolável com teclado.
 */
export const MenuComboboxDataView: React.FC<MenuComboboxDataViewProps> = (props) => {
  const { options, value, defaultValue, onChange, multiple = false, size = "m" } = props;
  const { searchable, searchPlaceholder = "Procurar...", emptyState, maxHeight, ariaLabel } = props;
  const selection = useControllableSelection({ value, defaultValue, onChange, multiple });
  const { query, setQuery, filtered } = useMenuSearch(options);
  const visibleCount = countOptions(filtered);
  const ctx: RenderContext = { size, multiple, isSelected: selection.isSelected, toggle: selection.toggle };

  const fallbackEmpty = (
    <EmptyState
      title="Nenhum resultado encontrado."
      icon={<FolderOpen size={EMPTY_ICON_SIZE} strokeWidth={EMPTY_ICON_STROKE} />}
      style={EMPTY_STATE_STYLE}
    />
  );

  return (
    <>
      {searchable ? (
        <MenuComboboxSearch size={size} value={query} onChange={setQuery} placeholder={searchPlaceholder} />
      ) : null}
      {visibleCount === 0 ? (
        emptyState ?? fallbackEmpty
      ) : (
        <MenuComboboxScrollArea hasMenuItems ariaLabel={ariaLabel} maxHeight={maxHeight} contentKey={visibleCount}>
          {renderEntries(filtered, ctx)}
        </MenuComboboxScrollArea>
      )}
    </>
  );
};

MenuComboboxDataView.displayName = "MenuComboboxDataView";
