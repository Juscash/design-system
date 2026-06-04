import type { HTMLAttributes } from "react";

/**
 * Variantes visuais do componente `Loading`. Conforme dump
 * `figma/components/loading/design-context-4163-13165.md`:
 *
 * - `"dots"`  — 3 círculos `size-13` em sequência, animados de cima para
 *   baixo (4 frames: todos no topo, dot1 desce, dot2 desce, dot3 desce).
 * - `"spinner"` — anel circular 40x40 rotacionando continuamente.
 */
export type LoadingVariant = "dots" | "spinner";

/**
 * Props do componente `Loading`. Indicador visual de carregamento em duas
 * variantes (`"dots"` e `"spinner"`). Estende atributos nativos do `<div>`
 * para que o consumer possa passar `className`, `style`, `id`, etc.
 *
 * O wrapper externo carrega os atributos ARIA padrão de status
 * (`role="status"`, `aria-live="polite"`, `aria-busy="true"`); o `aria-label`
 * é o único campo configurável e default `"Carregando..."`.
 */
export interface LoadingProps extends Omit<HTMLAttributes<HTMLDivElement>, "aria-label"> {
  /**
   * Variante visual. Default `"spinner"`.
   */
  variant?: LoadingVariant;
  /**
   * Diâmetro (px) do spinner. Default `40`. A espessura do anel escala junto.
   * Não afeta a variante `"dots"`.
   */
  size?: number;
  /**
   * Rótulo acessível anunciado por leitores de tela. Default `"Carregando..."`.
   */
  "aria-label"?: string;
}
