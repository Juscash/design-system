import type { CSSProperties, ReactNode } from "react";

/**
 * Nível semântico do título renderizado pelo `PageHeader`. Por padrão usa
 * `1` (h1) — o consumidor pode reduzir quando o cabeçalho aparece em um
 * contexto que já possui outro h1.
 */
export type PageHeaderHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface PageHeaderProps {
  /** Título principal do cabeçalho. Aceita string ou `ReactNode`. */
  title?: ReactNode;
  /** Descrição opcional renderizada abaixo do título. */
  description?: ReactNode;
  /**
   * Slot livre para ações à direita — sobem para o topo automaticamente
   * em telas estreitas (< 768 px). Tipicamente um botão primário + botão
   * `outline` com menu de opções, mas aceita qualquer `ReactNode`.
   */
  actions?: ReactNode;
  /** Nível semântico do título (h1..h6). Default `1`. */
  level?: PageHeaderHeadingLevel;
  /** Classe extra aplicada ao `Card` raiz. */
  className?: string;
  /** Estilo inline extra aplicado ao `Card` raiz. */
  style?: CSSProperties;
}
