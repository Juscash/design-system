import React from "react";
import type { ColumnType } from "antd/es/table/interface";

const FIELD_CLASS = "ds-card-field";
const FIELD_LABEL_CLASS = "ds-card-field__label";
const FIELD_VALUE_CLASS = "ds-card-field__value";

interface CardFieldProps<T> {
  column: ColumnType<T>;
  record: T;
  index: number;
  /**
   * Quando `false`, suprime o label `caption/01` acima do valor. Útil em
   * cells de "actions" ou "checkbox" (header/footer) que renderizam só o
   * conteúdo. Default `true`.
   */
  showLabel?: boolean;
}

/**
 * Extrai o valor da coluna a partir do `dataIndex`. Suporta `string | number`
 * (acesso por chave direta) e `array` (path encadeado). Retorna `undefined`
 * quando o dataIndex não está no record.
 */
function extractValue<T>(record: T, dataIndex: ColumnType<T>["dataIndex"]): unknown {
  if (dataIndex === undefined) return undefined;
  if (Array.isArray(dataIndex)) {
    let current: unknown = record;
    for (const key of dataIndex) {
      if (current === null || current === undefined) return undefined;
      current = (current as Record<string | number, unknown>)[key];
    }
    return current;
  }
  return (record as Record<string | number | symbol, unknown>)[dataIndex as string | number];
}

/**
 * Renderiza UMA célula de card no formato `label / value` empilhado
 * verticalmente — espelhando o `table cell mobile` do Figma Prospecção
 * (`5101:54788`). Padding e gaps vivem no CSS (`.ds-card-field`).
 *
 * - `column.title` (quando string) vira o label `caption/01` 10px soft.
 * - `column.render(value, record, index)` tem prioridade sobre o
 *   `dataIndex` (igual ao antd Table).
 * - Quando `showLabel = false`, omite o label e renderiza só o valor —
 *   útil para cells sem rótulo (`title: ""` em ações/checkbox).
 */
export function CardField<T>(props: CardFieldProps<T>): React.ReactElement {
  const { column, record, index, showLabel = true } = props;
  const value = extractValue(record, column.dataIndex);
  const rendered = column.render ? column.render(value, record, index) : (value as React.ReactNode);
  const labelString = typeof column.title === "string" ? column.title : "";
  const shouldRenderLabel = showLabel && labelString !== "";

  return (
    <div className={FIELD_CLASS}>
      {shouldRenderLabel ? <span className={FIELD_LABEL_CLASS}>{labelString}</span> : null}
      <span className={FIELD_VALUE_CLASS}>{rendered}</span>
    </div>
  );
}

CardField.displayName = "Table.CardField";
