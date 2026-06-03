import type { PaginationProps as AntdPaginationProps } from "antd";

/**
 * Props do componente `Pagination` do design system.
 *
 * Estende as props do `Pagination` do Ant Design 6 removendo eixos que não
 * estão previstos no dump do Figma (`4080:17825`):
 *
 * - `showSizeChanger`/`showQuickJumper`/`showLessItems`/`simple`/`responsive`:
 *   não aparecem em nenhuma variante listada (`Pagination`, `PaginationButton`,
 *   `PaginationEllipsis` ou `Exemplos`). Foram suprimidos para manter a API
 *   próxima ao desenhado e evitar comportamentos sem respaldo visual.
 */
type CleanAntdProps = Omit<
  AntdPaginationProps,
  "showSizeChanger" | "showQuickJumper" | "showLessItems" | "simple" | "responsive"
>;

export type PaginationProps = CleanAntdProps;
