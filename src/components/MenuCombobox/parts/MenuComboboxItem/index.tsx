import React from "react";
import { resolveLucideIcon } from "../../../../utils/resolveLucideIcon";
import type { MenuComboboxItemProps } from "../../../../types/components/MenuCombobox";

const ITEM_CLASS = "ds-menu-combobox-item";
const ICON_SIZE = 16;

/**
 * Junta classes filtrando valores falsy.
 */
function joinClassNames(...tokens: Array<string | false | undefined>): string {
  return tokens.filter(Boolean).join(" ");
}

/**
 * Compõe a className do item conforme `size`, `type` e `state`.
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
 * Trata teclas `Enter` e `Space` no item, replicando o comportamento nativo
 * de `<button>` enquanto preserva `role="menuitem"`.
 */
function handleItemKeyDown(event: React.KeyboardEvent<HTMLDivElement>, onClick?: () => void): void {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  onClick?.();
}

/**
 * Renderiza o slot direito do item (ícone, spinner ou nada).
 */
function renderRightSlot(isLoading: boolean, rightIcon: React.ReactNode): React.ReactElement | null {
  if (isLoading) return <span className={`${ITEM_CLASS}__spinner`} aria-hidden="true" />;
  if (rightIcon === null) return null;
  return <span className={`${ITEM_CLASS}__right-icon`}>{rightIcon}</span>;
}

/**
 * Item do menu (`role="menuitem"`). Aceita ícone à esquerda e à direita,
 * ambos como `ReactNode` ou nome de ícone Lucide. Estados `disabled` e
 * `loading` desabilitam o clique e ajustam o cursor.
 */
export const MenuComboboxItem: React.FC<MenuComboboxItemProps> = (props) => {
  const { size = "m", type = "default", state = "default", icon, rightIcon, label, children, onClick } = props;
  const isDisabled = state === "disabled";
  const isLoading = state === "loading";
  const isSelected = state === "selected";
  const isInteractive = !isDisabled && !isLoading;
  const itemClassName = buildItemClassName({ size, type, state });
  const leftIcon = resolveLucideIcon(icon, ICON_SIZE);
  const resolvedRightIcon = resolveLucideIcon(rightIcon, ICON_SIZE);

  return (
    <div
      className={itemClassName}
      role="menuitem"
      tabIndex={isInteractive ? -1 : undefined}
      aria-disabled={isDisabled ? true : undefined}
      aria-current={isSelected ? "true" : undefined}
      aria-busy={isLoading ? true : undefined}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={isInteractive ? (event) => handleItemKeyDown(event, onClick) : undefined}
    >
      {leftIcon !== null && <span className={`${ITEM_CLASS}__icon`}>{leftIcon}</span>}
      <span className={`${ITEM_CLASS}__label`}>{label ?? children}</span>
      {renderRightSlot(isLoading, resolvedRightIcon)}
    </div>
  );
};

MenuComboboxItem.displayName = "MenuCombobox.Item";
