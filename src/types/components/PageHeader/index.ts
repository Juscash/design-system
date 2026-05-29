import type { CSSProperties, ReactNode } from "react";

/**
 * Nível semântico do título renderizado pelo `PageHeader`. Por padrão usa
 * `1` (h1) — o consumidor pode reduzir quando o cabeçalho aparece em um
 * contexto que já possui outro h1.
 */
export type PageHeaderHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Variantes de layout do `PageHeader`.
 *
 * - `default`: texto à esquerda, ações à direita — independentemente da
 *   largura disponível.
 * - `responsive` (padrão): horizontal em telas ≥ 768 px, empilhado
 *   (ações no topo) em telas < 768 px.
 * - `stacked`: ações no topo, texto embaixo — em qualquer largura.
 */
export type PageHeaderVariant = "default" | "responsive" | "stacked";

export interface PageHeaderProps {
  /** Título principal do cabeçalho. Aceita string ou `ReactNode`. */
  title?: ReactNode;
  /** Descrição opcional renderizada abaixo do título. */
  description?: ReactNode;
  /**
   * Slot livre para ações à direita (ou no topo, em layout empilhado).
   * Tipicamente um botão primário + botão `outline` com menu de opções,
   * mas aceita qualquer `ReactNode`.
   */
  actions?: ReactNode;
  /** Layout do componente. Default `responsive`. */
  variant?: PageHeaderVariant;
  /** Nível semântico do título (h1..h6). Default `1`. */
  level?: PageHeaderHeadingLevel;
  /** Classe extra aplicada ao `Card` raiz. */
  className?: string;
  /** Estilo inline extra aplicado ao `Card` raiz. */
  style?: CSSProperties;
}
