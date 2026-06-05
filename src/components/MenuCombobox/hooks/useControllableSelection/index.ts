import React from "react";
import type { MenuComboboxValue } from "../../../../types/components/MenuCombobox";

interface SelectionController {
  /** Indica se o `value` está selecionado. */
  isSelected: (value: string) => boolean;
  /** Single: define o valor. Multi: alterna a presença no array. */
  toggle: (value: string) => void;
}

interface UseControllableSelectionArgs {
  value?: MenuComboboxValue;
  defaultValue?: MenuComboboxValue;
  onChange?: (value: MenuComboboxValue) => void;
  multiple?: boolean;
}

/**
 * Normaliza o valor de seleção (string | string[] | null) para `string[]`.
 */
function toArray(value: MenuComboboxValue | undefined): string[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Gerencia a seleção do menu nos modos single/multi e controlado/não-controlado.
 * No single, clicar define o valor; no multi, clicar alterna a presença.
 */
export function useControllableSelection(args: UseControllableSelectionArgs): SelectionController {
  const { value, defaultValue, onChange, multiple = false } = args;
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<string[]>(() => toArray(defaultValue));
  const selected = isControlled ? toArray(value) : internal;

  const emit = React.useCallback(
    (next: string[]): void => {
      if (!isControlled) setInternal(next);
      onChange?.(multiple ? next : (next[0] ?? null));
    },
    [isControlled, multiple, onChange],
  );

  const toggle = React.useCallback(
    (target: string): void => {
      if (!multiple) {
        emit([target]);
        return;
      }
      const next = selected.includes(target) ? selected.filter((item) => item !== target) : [...selected, target];
      emit(next);
    },
    [emit, multiple, selected],
  );

  const isSelected = React.useCallback((target: string): boolean => selected.includes(target), [selected]);

  return { isSelected, toggle };
}
