import type { Key } from "react";
import type { ColumnsType, ColumnType } from "antd/es/table/interface";
import type { TableCardLayout } from "../../../../types/components/Table";

/**
 * Converte a propriedade `header`/`footer` (Key | Key[] | undefined) em um
 * `Set<Key>` para lookup O(1). Aceita string e number conforme o tipo `Key`.
 */
function toKeySet(value: Key | Key[] | undefined): Set<Key> {
  if (value === undefined) return new Set();
  if (Array.isArray(value)) return new Set(value);
  return new Set([value]);
}

/**
 * Particiona as colunas do Table em três grupos para renderização em modo
 * `cards`: `header`, `body` e `footer` — conforme `cardLayout`. A `key` de
 * cada coluna é comparada com os Sets de header/footer; o que não bate vai
 * para body.
 *
 * Preserva a ORDEM ORIGINAL das colunas dentro de cada grupo (sem reordenar
 * de acordo com a lista do usuário em `cardLayout.header/footer`) — assim
 * uma coluna `posicao` declarada antes de `nome` em `columns` aparece antes
 * mesmo se `header: ["nome", "posicao"]`.
 *
 * **Default sem `cardLayout`:** quando o consumidor não fornece a prop,
 * promovemos a PRIMEIRA coluna a header e o restante vai pro body — assim
 * todo card vem com 2 níveis (header + body) por padrão.
 */
export function partitionColumns<T>(
  columns: ColumnsType<T> | undefined,
  cardLayout: TableCardLayout | undefined,
): {
  headerCols: ColumnsType<T>;
  bodyCols: ColumnsType<T>;
  footerCols: ColumnsType<T>;
} {
  const source = columns ?? [];

  if (cardLayout === undefined) {
    const headerCols: ColumnsType<T> = source.length > 0 ? [source[0]] : [];
    const bodyCols: ColumnsType<T> = source.slice(1);
    return { headerCols, bodyCols, footerCols: [] };
  }

  const headerKeys = toKeySet(cardLayout.header);
  const footerKeys = toKeySet(cardLayout.footer);

  const headerCols: ColumnsType<T> = [];
  const bodyCols: ColumnsType<T> = [];
  const footerCols: ColumnsType<T> = [];

  for (const col of source) {
    const key = (col as ColumnType<T>).key;
    if (key !== undefined && headerKeys.has(key)) {
      headerCols.push(col);
    } else if (key !== undefined && footerKeys.has(key)) {
      footerCols.push(col);
    } else {
      bodyCols.push(col);
    }
  }

  return { headerCols, bodyCols, footerCols };
}
