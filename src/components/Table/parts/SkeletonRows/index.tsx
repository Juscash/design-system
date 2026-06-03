import React from "react";
import { Skeleton } from "../../../Skeleton";

const ROOT_CLASS = "ds-table-skeleton";
const ROW_CLASS = "ds-table-skeleton__row";
const DEFAULT_ROW_COUNT = 5;

interface SkeletonRowsProps {
  /** Quantidade de linhas a renderizar. Default 5. */
  rows?: number;
  /** Se `true` (default), aplica pulse animation do Skeleton. */
  animated?: boolean;
}

/**
 * Skeleton rows do Table — reproduz o frame `Subtitle` (Figma `8733:11508`):
 * cada linha é uma barra única `neutral/100`, radius `xl` (8 px), height
 * `43 px`, full-width. As linhas são empilhadas com gap `8 px`. NÃO há
 * cabeçalho, NÃO há border de container externo — o skeleton ocupa o
 * espaço da tabela inteira.
 *
 * Reusa o componente `Skeleton.Line` do design system (ajustamos só altura
 * via classe wrapper, mantendo a animação e a cor base do Skeleton).
 */
export function SkeletonRows(props: SkeletonRowsProps): React.ReactElement {
  const { rows = DEFAULT_ROW_COUNT, animated = true } = props;
  const items: React.ReactElement[] = [];
  for (let index = 0; index < rows; index++) {
    items.push(<Skeleton.Line key={index} animated={animated} className={ROW_CLASS} aria-hidden="true" />);
  }
  return (
    <div className={ROOT_CLASS} role="status" aria-live="polite" aria-busy="true" aria-label="Carregando...">
      {items}
    </div>
  );
}

SkeletonRows.displayName = "Table.SkeletonRows";
