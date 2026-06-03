import React from "react";
import type { ColumnsType, ColumnType } from "antd/es/table/interface";
import type { TableSortIcons } from "../../../../types/components/Table";
import { pickSortIcon, type SortOrder } from "../sortIcons";

const SORT_ICON_CLASS = "ds-table-sort-icon";

/**
 * Extrai uma string descritiva do `title` da coluna, usada como `data-label`
 * na td (necessária no modo `cards`/`auto` que troca o cabeçalho horizontal
 * por rótulos repetidos em cada célula).
 */
function extractColumnLabel<T>(col: ColumnType<T>): string {
  if (typeof col.title === "string") return col.title;
  if (typeof col.title === "number") return String(col.title);
  return "";
}

interface BuildColumnsArgs<T> {
  columns: ColumnsType<T> | undefined;
  sortIcons: TableSortIcons | undefined;
}

/**
 * Normaliza `ellipsis: true` para `ellipsis: { showTitle: false }`. O antd
 * adiciona um atributo HTML `title=` em th/td quando `ellipsis: true` —
 * isso dispara o tooltip nativo do browser (caixinha amarela do SO) em
 * cima de qualquer Tooltip do DS. Como o tooltip do design system é
 * opt-in via `render`, suprimimos o `title` HTML aqui por padrão.
 *
 * Se o consumidor já passou um objeto `ellipsis` com `showTitle` definido,
 * preservamos a escolha dele.
 */
function normalizeEllipsis<T>(col: ColumnType<T>): ColumnType<T>["ellipsis"] {
  if (col.ellipsis === true) return { showTitle: false };
  if (typeof col.ellipsis === "object" && col.ellipsis !== null) {
    if (col.ellipsis.showTitle === undefined) {
      return { ...col.ellipsis, showTitle: false };
    }
    return col.ellipsis;
  }
  return col.ellipsis;
}

/**
 * Reescreve as colunas para injetar:
 *
 * 1. `sortIcon` dinâmico via `pickSortIcon` (`ChevronsUpDown` por default;
 *    consumidor pode sobrescrever por estado via prop `sortIcons`).
 * 2. `onCell` com `data-label` propagado para suportar o modo `cards`/`auto`
 *    (rótulo da coluna acima do valor em cada cartão).
 * 3. Normalização de `ellipsis` para evitar o atributo HTML `title=` nativo
 *    (suprime o tooltip do browser em favor do `Tooltip` do DS quando
 *    o consumidor optar via `render`).
 *
 * **Não embrulha valores nem títulos em Tooltip** — se o consumidor precisar
 * de tooltip numa célula, ele passa via `render: (value) => <Tooltip ...>...`
 * por conta própria. Isso evita tooltip indesejado em cada string da tabela.
 */
export function buildColumns<T>(args: BuildColumnsArgs<T>): ColumnsType<T> | undefined {
  return args.columns?.map((col) => {
    const typedCol = col as ColumnType<T>;
    const label = extractColumnLabel(typedCol);
    const existingOnCell = typedCol.onCell;
    const existingOnHeaderCell = typedCol.onHeaderCell;
    const normalizedEllipsis = normalizeEllipsis(typedCol);
    return {
      ...col,
      ...(normalizedEllipsis !== undefined && { ellipsis: normalizedEllipsis }),
      // Antd v6 default `showSorterTooltip: true` envolve o th em Tooltip nativo
      // (com `title=`). Desligamos por padrão — o DS não usa tooltip nativo do
      // browser. Consumidor pode reativar passando `showSorterTooltip` na coluna.
      ...(col.sorter && col.showSorterTooltip === undefined && { showSorterTooltip: false }),
      ...(col.sorter &&
        !col.sortIcon && {
          sortIcon: ({ sortOrder }: { sortOrder: SortOrder }) => (
            <span className={SORT_ICON_CLASS}>{pickSortIcon(sortOrder, args.sortIcons)}</span>
          ),
        }),
      onCell: (record: T, index?: number) => {
        const base = existingOnCell ? existingOnCell(record, index) : {};
        return { ...base, "data-label": label };
      },
      // Antd v6 adiciona automaticamente o atributo HTML `title=<col.title>`
      // no `<th>` quando a coluna tem `ellipsis` (mesmo com showTitle: false,
      // que só afeta tbody). Forçamos `title=""` aqui — string vazia faz o
      // React renderizar o atributo, mas o browser não exibe o tooltip
      // nativo. Isso preserva o `Tooltip` do DS como única fonte de tooltip.
      onHeaderCell: (column) => {
        const base = existingOnHeaderCell ? existingOnHeaderCell(column) : {};
        return { ...base, title: "" };
      },
    };
  });
}
