import React from "react";
import type {
  MenuComboboxGroup,
  MenuComboboxOption,
  MenuComboboxOptionOrGroup,
} from "../../../../types/components/MenuCombobox";

interface SearchController {
  /** Texto bruto digitado. */
  query: string;
  /** Atualiza o texto da busca. */
  setQuery: (value: string) => void;
  /** Opções/grupos após o filtro (grupos sem matches são removidos). */
  filtered: MenuComboboxOptionOrGroup[];
}

/**
 * Indica se o item do array `options` é um grupo (possui `options` aninhadas).
 */
export function isMenuGroup(item: MenuComboboxOptionOrGroup): item is MenuComboboxGroup {
  return (item as MenuComboboxGroup).options !== undefined;
}

/**
 * Casa a opção contra a query normalizada (substring case-insensitive no label).
 */
function optionMatches(option: MenuComboboxOption, query: string): boolean {
  return option.label.toLowerCase().includes(query);
}

/**
 * Filtra opções soltas e grupos por `query`. Grupos cujas opções zeram após o
 * filtro são descartados. Query vazia retorna a lista original.
 */
function filterOptions(options: MenuComboboxOptionOrGroup[], query: string): MenuComboboxOptionOrGroup[] {
  if (query === "") return options;
  const result: MenuComboboxOptionOrGroup[] = [];
  options.forEach((item) => {
    if (!isMenuGroup(item)) {
      if (optionMatches(item, query)) result.push(item);
      return;
    }
    const inner = item.options.filter((option) => optionMatches(option, query));
    if (inner.length > 0) result.push({ ...item, options: inner });
  });
  return result;
}

/**
 * Hook de busca do modo data-driven: mantém o texto digitado e deriva a lista
 * filtrada (memoizada) a partir das `options`.
 */
export function useMenuSearch(options: MenuComboboxOptionOrGroup[]): SearchController {
  const [query, setQuery] = React.useState("");
  const normalized = query.trim().toLowerCase();
  const filtered = React.useMemo(() => filterOptions(options, normalized), [options, normalized]);
  return { query, setQuery, filtered };
}
