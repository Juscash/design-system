import type { HTMLAttributes, ReactNode } from "react";

/**
 * Eixo de rolagem do `ScrollArea`. Default `"vertical"` (rolagem apenas no
 * eixo Y), `"horizontal"` (rolagem apenas no eixo X) ou `"both"` (rolagem
 * nos dois eixos). Conforme dump `figma/components/scroll-area/`.
 */
export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

/**
 * Remove props nativas do `<div>` controladas internamente pelo componente
 * (apenas `children` é redefinido para aceitar `ReactNode` explicitamente).
 */
type CleanDivProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type ScrollAreaProps = CleanDivProps & {
  /**
   * Eixo da rolagem. `"vertical"` (default) trava o eixo X, `"horizontal"`
   * trava o eixo Y e `"both"` libera os dois.
   */
  orientation?: ScrollAreaOrientation;
  /** Conteúdo scrollável renderizado dentro do container. */
  children?: ReactNode;
};
