import type { HTMLAttributes } from "react";

/**
 * Eixo do separator. Default `"horizontal"` (linha 1px de altura ocupando a
 * largura do container) ou `"vertical"` (linha 1px de largura ocupando a
 * altura do container). Conforme dump `figma/components/separator/`.
 */
export type SeparatorDirection = "horizontal" | "vertical";

/**
 * Remove props nativas do `<div>` que o componente controla internamente
 * (papel ARIA e orientação).
 */
type CleanDivProps = Omit<HTMLAttributes<HTMLDivElement>, "role" | "aria-orientation">;

export type SeparatorProps = CleanDivProps & {
  /**
   * Direção da linha. `"horizontal"` (default) ocupa a largura do container;
   * `"vertical"` ocupa a altura.
   */
  direction?: SeparatorDirection;
};
