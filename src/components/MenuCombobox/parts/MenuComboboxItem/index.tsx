import React from "react";
import { resolveLucideIcon } from "../../../../utils/resolveLucideIcon";
import { Loading } from "../../../Loading";
import type { MenuComboboxItemProps } from "../../../../types/components/MenuCombobox";

const ITEM_CLASS = "ds-menu-combobox-item";
const ICON_GLYPH_SIZE = 16;

/**
 * Junta classes filtrando valores falsy.
 */
function joinClassNames(...tokens: Array<string | false | undefined>): string {
  return tokens.filter(Boolean).join(" ");
}

/**
 * Compõe a className do item conforme `size`, `type` e `state`. O `type` é
 * sempre explicitado (`--type-default`/`--type-destructive`) para permitir os
 * fundos type-aware de hover/active/selected.
 */
function buildItemClassName(args: {
  size: NonNullable<MenuComboboxItemProps["size"]>;
  type: NonNullable<MenuComboboxItemProps["type"]>;
  state: NonNullable<MenuComboboxItemProps["state"]>;
}): string {
  return joinClassNames(
    ITEM_CLASS,
    `${ITEM_CLASS}--size-${args.size}`,
    `${ITEM_CLASS}--type-${args.type}`,
    args.state !== "default" ? `${ITEM_CLASS}--${args.state}` : undefined,
  );
}

/**
 * Trata teclas `Enter` e `Space` no item, replicando o comportamento nativo de
 * `<button>` enquanto preserva `role="menuitem"`.
 */
function handleItemKeyDown(event: React.KeyboardEvent<HTMLDivElement>, onClick?: () => void): void {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  onClick?.();
}

/**
 * Renderiza o slot direito do item: spinner de loading (reusa o `Loading` do DS,
 * 16px, anel de gradiente verde, decorativo), ícone à direita, ou nada.
 */
function renderRightSlot(isLoading: boolean, rightIcon: React.ReactNode): React.ReactElement | null {
  if (isLoading) return <Loading variant="spinner" size={ICON_GLYPH_SIZE} aria-hidden />;
  if (rightIcon === null) return null;
  return <span className={`${ITEM_CLASS}__right-icon`}>{rightIcon}</span>;
}

/**
 * Item do menu (`role="menuitem"`). Aceita ícone à esquerda/direita (`ReactNode`
 * ou nome Lucide), texto principal (`label`) e uma 2ª linha opcional
 * (`description`). `disabled`/`loading` bloqueiam o clique e ajustam o cursor.
 * Hover/active/focus são reais (CSS), não props. Encaminha `ref` e demais props
 * ao `<div>` raiz, permitindo uso como trigger de `Tooltip`/`Popover`.
 */
export const MenuComboboxItem = React.forwardRef<HTMLDivElement, MenuComboboxItemProps>(function MenuComboboxItem(
  props,
  ref,
) {
  const { size = "m", type = "default", state = "default", icon, rightIcon, label, description, onClick, ...rest } =
    props;
  const isDisabled = state === "disabled";
  const isLoading = state === "loading";
  const isSelected = state === "selected";
  const isInteractive = !isDisabled && !isLoading;
  const itemClassName = buildItemClassName({ size, type, state });
  const leftIcon = resolveLucideIcon(icon, ICON_GLYPH_SIZE);
  const resolvedRightIcon = resolveLucideIcon(rightIcon, ICON_GLYPH_SIZE);

  return (
    <div
      ref={ref}
      {...rest}
      className={itemClassName}
      role="menuitem"
      tabIndex={isInteractive ? -1 : undefined}
      aria-disabled={isDisabled || isLoading ? true : undefined}
      aria-current={isSelected ? "true" : undefined}
      aria-busy={isLoading ? true : undefined}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={isInteractive ? (event) => handleItemKeyDown(event, onClick) : undefined}
    >
      {leftIcon !== null && <span className={`${ITEM_CLASS}__icon`}>{leftIcon}</span>}
      <span className={`${ITEM_CLASS}__text`}>
        {label !== undefined && <span className={`${ITEM_CLASS}__label`}>{label}</span>}
        {description !== undefined && <span className={`${ITEM_CLASS}__description`}>{description}</span>}
      </span>
      {renderRightSlot(isLoading, resolvedRightIcon)}
    </div>
  );
});

MenuComboboxItem.displayName = "MenuCombobox.Item";
