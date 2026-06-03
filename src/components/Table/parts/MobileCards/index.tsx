import React, { useMemo } from "react";
import type { Key } from "react";
import type { ColumnsType } from "antd/es/table/interface";
import type { TableProps as AntdTableProps } from "antd/es/table";
import type { TableCardLayout, TableEmptyState } from "../../../../types/components/Table";
import { Checkbox } from "../../../Checkbox";
import { partitionColumns } from "../../utils/partitionColumns";
import { TableEmptyStateRenderer } from "../EmptyState";
import { CardRow } from "../CardRow";

const ROOT_CLASS = "ds-table-cards";
const SELECT_ALL_CLASS = "ds-table-cards__select-all";
const SELECT_ALL_LABEL_CLASS = "ds-table-cards__select-all-label";
const SELECT_ALL_CHECKBOX_CLASS = "ds-table-cards__select-all-checkbox";

interface MobileCardsProps<T> {
  data: readonly T[] | undefined;
  columns: ColumnsType<T> | undefined;
  cardLayout: TableCardLayout | undefined;
  rowSelection: AntdTableProps<T>["rowSelection"];
  rowKey: AntdTableProps<T>["rowKey"];
  emptyState: TableEmptyState | undefined;
}

/**
 * Resolve a chave única de um record conforme a config `rowKey` do antd:
 * string/number → acessa pelo campo; função → invoca passando o record;
 * undefined → cai em `record.key` quando existe, senão usa o index.
 */
function resolveRecordKey<T>(record: T, rowKey: AntdTableProps<T>["rowKey"], index: number): Key {
  if (typeof rowKey === "function") return rowKey(record);
  if (typeof rowKey === "string" || typeof rowKey === "number") {
    return (record as Record<string | number, unknown>)[rowKey] as Key;
  }
  const inferred = (record as { key?: Key }).key;
  return inferred ?? index;
}

/**
 * Renderiza o container de cards (modo `responsive='cards'` ou `'auto'` em
 * mobile) — substitui o antd Table completamente. Inclui:
 *
 * - Header "Selecionar todos" no topo (quando há `rowSelection`).
 * - N CardRow empilhados verticalmente com gap 8 px.
 * - Estado vazio reusa `TableEmptyStateRenderer` quando `dataSource=[]`.
 *
 * Sincroniza a seleção via `rowSelection.selectedRowKeys` (modo controlled)
 * + `rowSelection.onChange`. Suporta `type: 'radio'` no rowSelection.
 */
export function MobileCards<T>(props: MobileCardsProps<T>): React.ReactElement {
  const { data, columns, cardLayout, rowSelection, rowKey, emptyState } = props;

  const { headerCols, bodyCols, footerCols } = useMemo(
    () => partitionColumns(columns, cardLayout),
    [columns, cardLayout],
  );

  const records = (data ?? []) as readonly T[];
  const hasData = records.length > 0;
  const selectedKeys: Key[] = useMemo(
    () => (rowSelection?.selectedRowKeys as Key[] | undefined) ?? [],
    [rowSelection],
  );

  if (!hasData) {
    return <TableEmptyStateRenderer config={emptyState} />;
  }

  const showSelectAll = rowSelection !== undefined && rowSelection.type !== "radio";
  const allRecordKeys: Key[] = records.map((record, idx) => resolveRecordKey(record, rowKey, idx));
  const allSelected = allRecordKeys.length > 0 && allRecordKeys.every((key) => selectedKeys.includes(key));
  const someSelected = !allSelected && allRecordKeys.some((key) => selectedKeys.includes(key));

  const handleToggleRow = (key: Key, selected: boolean, record: T): void => {
    if (!rowSelection?.onChange) return;
    let nextKeys: Key[];
    if (rowSelection.type === "radio") {
      nextKeys = selected ? [key] : [];
    } else {
      nextKeys = selected ? [...selectedKeys, key] : selectedKeys.filter((k) => k !== key);
    }
    const nextRecords = records.filter((rec, idx) => nextKeys.includes(resolveRecordKey(rec, rowKey, idx))) as T[];
    rowSelection.onChange(nextKeys, nextRecords, { type: "single" });
    void record;
  };

  const handleToggleAll = (selected: boolean): void => {
    if (!rowSelection?.onChange) return;
    const nextKeys: Key[] = selected ? allRecordKeys : [];
    const nextRecords = selected ? (records as T[]) : ([] as T[]);
    rowSelection.onChange(nextKeys, nextRecords, { type: "all" });
  };

  return (
    <div className={ROOT_CLASS}>
      {showSelectAll ? (
        <div className={SELECT_ALL_CLASS}>
          <span className={SELECT_ALL_LABEL_CLASS}>{rowSelection?.columnTitle ?? "Selecionar todos"}</span>
          <span className={SELECT_ALL_CHECKBOX_CLASS}>
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={(event) => handleToggleAll(event.target.checked)}
              aria-label="Selecionar todos"
            />
          </span>
        </div>
      ) : null}

      {records.map((record, idx) => {
        const key = resolveRecordKey(record, rowKey, idx);
        return (
          <CardRow
            key={String(key)}
            record={record}
            index={idx}
            recordKey={key}
            headerCols={headerCols}
            bodyCols={bodyCols}
            footerCols={footerCols}
            rowSelection={rowSelection}
            selectedRowKeys={selectedKeys}
            onSelectionToggle={handleToggleRow}
          />
        );
      })}
    </div>
  );
}

MobileCards.displayName = "Table.MobileCards";
