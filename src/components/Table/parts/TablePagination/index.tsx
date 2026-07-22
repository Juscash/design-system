import React from "react";
import { Pagination } from "../../../Pagination";
import { PaginationSizeChanger } from "../../../Pagination/parts/SizeChanger";

const FOOTER_CLASS = "ds-table-pagination-footer";
const FOOTER_CARDS_CLASS = "ds-table-pagination-footer--cards";
const TOTAL_CLASS = "ds-table-pagination-total";
const SIZE_CHANGER_CLASS = "ds-table-pagination-size-changer";
const SINGULAR_COUNT = 1;

interface TablePaginationProps {
  /** Página atual (1-indexed). */
  current: number;
  /** Quantidade de itens por página. */
  pageSize: number;
  /** Total de registros (server-side total ou length do dataSource). */
  total: number;
  /** Quando `true`, renderiza um Select pra alterar `pageSize`. Default `false`. */
  showSizeChanger?: boolean;
  /** Opções do size changer. Default `['5','10','25','50','100']`. */
  pageSizeOptions?: string[];
  /**
   * Renderizador opcional do contador de total. Quando ausente, usa o
   * formato pt-BR "{N} itens" (singular "1 item"). Quando `false`, o total
   * é omitido.
   */
  showTotal?: ((total: number, range: [number, number]) => React.ReactNode) | boolean;
  /** Callback disparado quando a página ou o tamanho mudam. */
  onChange: (page: number, pageSize: number) => void;
  /**
   * Quando `true`, aplica o layout vertical/centralizado de cards mobile —
   * total empilhado em cima, paginação centralizada, size changer
   * full-width abaixo (Figma Prospecção `5101:54788`). Default `false`.
   */
  cardsMode?: boolean;
}

/**
 * Renderiza o texto default do total no padrão pt-BR. Singular usa "item",
 * plural usa "itens" — sem usar bibliotecas externas de i18n.
 */
function defaultRenderTotal(total: number): React.ReactNode {
  const label = total === SINGULAR_COUNT ? "item" : "itens";
  return (
    <span className={TOTAL_CLASS}>
      {total} {label}
    </span>
  );
}

/**
 * Rodapé de paginação do Table. Compõe:
 *
 * - **Total** à esquerda — formato pt-BR "{N} itens" (override via `showTotal`).
 * - **Pagination** (DS) no meio — navegação por número de página + Anterior/Próximo.
 * - **Size changer** (Select) à direita — exibido apenas se `showSizeChanger=true`.
 *
 * Aproveita o componente `Pagination` do design system (não duplica os
 * botões prev/next nem a renderização de páginas).
 */
export function TablePagination(props: TablePaginationProps): React.ReactElement {
  const {
    current,
    pageSize,
    total,
    showSizeChanger = false,
    pageSizeOptions,
    showTotal,
    onChange,
    cardsMode = false,
  } = props;

  const rangeStart = total === 0 ? 0 : (current - 1) * pageSize + 1;
  const rangeEnd = Math.min(current * pageSize, total);
  const totalNode =
    showTotal === false
      ? null
      : typeof showTotal === "function"
        ? showTotal(total, [rangeStart, rangeEnd])
        : defaultRenderTotal(total);

  const handlePageChange = (nextPage: number, nextSize: number): void => {
    onChange(nextPage, nextSize);
  };

  const handleSizeChange = (nextSize: number): void => {
    onChange(1, nextSize);
  };

  const rootClassName = [FOOTER_CLASS, cardsMode ? FOOTER_CARDS_CLASS : ""].filter(Boolean).join(" ");

  return (
    <div className={rootClassName}>
      <div className={TOTAL_CLASS}>{totalNode}</div>
      <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange} />
      {showSizeChanger ? (
        <PaginationSizeChanger
          className={SIZE_CHANGER_CLASS}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onChange={handleSizeChange}
        />
      ) : null}
    </div>
  );
}

TablePagination.displayName = "Table.TablePagination";
