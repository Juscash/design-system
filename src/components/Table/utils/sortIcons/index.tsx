import React from "react";
import { ChevronsUpDown } from "lucide-react";
import type { TableSortIcons } from "../../../../types/components/Table";

const SORT_ICON_SIZE = 16;
const SORT_ICON_STROKE = 1.75;

/**
 * Estado de ordenação repassado pelo antd no `sortIcon` da coluna.
 * `null` ou `undefined` significa não-ordenada.
 */
export type SortOrder = "ascend" | "descend" | null | undefined;

/**
 * Retorna o ícone do estado de ordenação. Por padrão, o design system usa
 * `ChevronsUpDown` da `lucide-react` em **todos os estados** (default,
 * ascending, descending) — a coluna ativa muda apenas a cor do ícone (de
 * `neutral/400` para `text/dark`) via CSS `.ds-table-sort-icon` quando o
 * th estiver na classe `.ant-table-column-sort`.
 *
 * O consumidor pode sobrescrever via prop `sortIcons` (default/ascending/
 * descending) caso queira diferenciar visualmente os estados.
 */
export function pickSortIcon(sortOrder: SortOrder, sortIcons: TableSortIcons | undefined): React.ReactNode {
  if (sortOrder === "ascend" && sortIcons?.ascending !== undefined) return sortIcons.ascending;
  if (sortOrder === "descend" && sortIcons?.descending !== undefined) return sortIcons.descending;
  if (sortIcons?.default !== undefined) return sortIcons.default;
  return <ChevronsUpDown size={SORT_ICON_SIZE} strokeWidth={SORT_ICON_STROKE} />;
}
