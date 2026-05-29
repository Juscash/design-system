import type { CSSProperties } from "react";

/**
 * Tipo do retorno da função `target` do `BackToTop`. Pode ser um elemento HTML
 * scrollável ou a própria `Window` (default), conforme dump
 * `figma/components/back-to-top/design-context-4237-10399.md`.
 */
export type BackToTopScrollTarget = HTMLElement | Window;

/**
 * Props do componente `BackToTop`. Botão flutuante neutro 36x36 que aparece
 * após o usuário rolar `visibilityHeight` pixels a partir do topo e, ao ser
 * clicado, rola suavemente até o início da página.
 *
 * Mapeamento do dump (`figma/components/back-to-top/design-context-4237-10399.md`):
 * - "O botão deve aparecer apenas após o usuário rolar 300 px a partir do topo
 *   e desaparecer quando o usuário estiver próximo ao início da página."
 * - Posição fixed `bottom-24 right-24` (desktop) / `bottom-16 right-16` (mobile).
 * - Tooltip obrigatório com texto `"Voltar ao topo"` no placement `left`.
 *
 * Limite de 8 props conforme `CLAUDE.md > Limites duros`.
 */
export interface BackToTopProps {
  /**
   * Distância de rolagem (px) a partir do topo necessária para o botão
   * aparecer. Default `300` — conforme regra de exibição do dump.
   */
  visibilityHeight?: number;
  /**
   * Função que retorna o container scrollável observado. Default `() => window`.
   */
  target?: () => BackToTopScrollTarget;
  /**
   * Duração (ms) da animação de rolagem ao clicar no botão. Default `450`.
   * Usado para animar a rolagem programaticamente até o topo.
   */
  duration?: number;
  /** Classe CSS adicional aplicada ao botão. */
  className?: string;
  /** Estilo inline adicional aplicado ao botão. */
  style?: CSSProperties;
  /**
   * Texto exibido no tooltip e usado como `aria-label` do botão. Default
   * `"Voltar ao topo"` — conforme dump (`Tooltip 8735:14976`).
   */
  tooltipLabel?: string;
  /** Callback disparado ao clicar no botão (após iniciar a rolagem). */
  onClick?: () => void;
}
