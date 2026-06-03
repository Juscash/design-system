import type { HTMLAttributes, ReactNode } from "react";

/**
 * Variantes de produto do `Container`. Define o ecossistema visual em que
 * o container é usado, controlando `max-width` e a partir de qual
 * breakpoint o conteúdo fica fixo (centralizado com margem dinâmica).
 *
 * - `"product"` — demais produtos JusCash (apps internos). Conteúdo
 *   fluido até 1919px; fixo a partir de 1920px (`max-width 1800px`).
 * - `"site"` — site institucional. Conteúdo fluido até 1365px; fixo a
 *   partir de 1366px (`max-width 1086px`).
 *
 * Conforme dump `figma/fundamentos/container/design-context-8347-11528.json`
 * (frame 8347:11528). A foundation correspondente vive em
 * `src/theme/foundations/container/index.ts`.
 */
export type ContainerVariant = "product" | "site";

/**
 * Tag HTML usada como elemento raiz do `Container`. Default `"div"`. As
 * opções semânticas `"main"` e `"section"` cobrem o uso típico em
 * layouts (área principal logo após sidebar/header).
 */
export type ContainerAs = "div" | "main" | "section";

/**
 * Remove props do `<div>` que o componente controla internamente. O
 * componente sempre injeta a classe raiz; o consumidor pode acrescentar
 * via `className`.
 */
type CleanDivProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type ContainerProps = CleanDivProps & {
  /**
   * Variante de produto. Default `"product"`.
   */
  variant?: ContainerVariant;
  /**
   * Tag HTML do elemento raiz. Default `"div"`. Use `"main"` para a área
   * principal da página (uma única vez por documento) e `"section"` para
   * regiões nomeadas.
   */
  as?: ContainerAs;
  /**
   * Conteúdo do container.
   */
  children?: ReactNode;
};
