import type { PaginationProps as AntdPaginationProps } from "antd";

/**
 * Props do componente `Pagination` do design system.
 *
 * Estende as props do `Pagination` do Ant Design 6 removendo eixos que não
 * estão previstos no dump do Figma (`4080:17825`):
 *
 * - `showQuickJumper`/`showLessItems`/`simple`/`responsive`: não aparecem em
 *   nenhuma variante listada (`Pagination`, `PaginationButton`,
 *   `PaginationEllipsis` ou `Exemplos`). Foram suprimidos para manter a API
 *   próxima ao desenhado e evitar comportamentos sem respaldo visual.
 * - `showSizeChanger` é reimplementado pelo design system: em vez do select
 *   nativo do antd, renderiza o seletor do Figma
 *   `Data table > pagination > select 165x36` — opções do dropdown mostram
 *   apenas o número e o gatilho exibe "Itens por página: N".
 */
type CleanAntdProps = Omit<
  AntdPaginationProps,
  "showSizeChanger" | "showQuickJumper" | "showLessItems" | "simple" | "responsive"
>;

export type PaginationProps = CleanAntdProps & {
  /**
   * Exibe o seletor "Itens por página: N" ao lado da navegação. As opções do
   * dropdown mostram apenas os números (`pageSizeOptions`); o prefixo aparece
   * somente no gatilho. Ao trocar o tamanho, dispara `onShowSizeChange`
   * (quando definido) ou `onChange(1, novoTamanho)`.
   */
  showSizeChanger?: boolean;
};
