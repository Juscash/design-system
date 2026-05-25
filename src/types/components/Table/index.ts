import type { TableProps as AntdTableProps } from "antd/es/table";

/**
 * Estratégia de responsividade do `Table`.
 *
 * - `scroll` (padrão): mantém o layout horizontal e habilita scroll
 *   horizontal interno quando a soma das colunas excede a largura do
 *   container. Consumidor define `scroll.x` para forçar a largura.
 * - `blocks`: cada linha vira um cartão vertical com o label da coluna
 *   acima do valor (sem cabeçalho fixo). Útil em sidebars/colunas
 *   estreitas ou ao consumir a `Table` exclusivamente em mobile.
 * - `auto`: usa `scroll` em viewports `≥ 768px` (breakpoint `s`) e
 *   automaticamente vira `blocks` em viewports menores.
 */
export type TableResponsiveMode = "scroll" | "blocks" | "auto";

export type TableProps<T> = AntdTableProps<T> & {
  /** Estratégia de responsividade. Default `scroll`. */
  responsive?: TableResponsiveMode;
};
