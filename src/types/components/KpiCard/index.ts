import type { MouseEventHandler, ReactNode } from "react";

/** Tamanho do KpiCard quando há ícone — afeta o container do ícone e padding. */
export type KpiCardSize = "m" | "l";

/** Alinhamento horizontal do conteúdo. Aplica-se apenas ao KpiCard sem ícone. */
export type KpiCardAlign = "left" | "center";

/** Direção da tendência exibida no badge. Define o ícone Lucide interno. */
export type KpiCardTrendDirection = "up" | "down";

/**
 * Tonalidade de cor do KpiCard com ícone. Define background do container
 * do ícone e cor do valor numérico (quando há dado).
 *
 * - `primary` (verde, default) — conforme "Qtd. de processos" no Figma.
 * - `secondary` (azul) — conforme "Negócios com a JusCash" no Figma.
 * - `neutral` (cinza) — conforme "Processos analisados" nas telas tablet
 *   do Figma. Card sem destaque visual; valor permanece em preto.
 *
 * Não aplica ao card sem ícone.
 */
export type KpiCardTone = "primary" | "secondary" | "neutral";

/** Descrição do badge de tendência exibido ao lado do valor. */
export interface KpiCardBadge {
  /** Texto curto (ex.: "+12%"). */
  value: string;
  /** Direção da tendência — define o ícone interno (TrendingUp / TrendingDown). */
  direction: KpiCardTrendDirection;
}

/**
 * Props proprietárias do `KpiCard`. Componente puro de apresentação — sem
 * `aria-busy`, `loading`, `error`. Esses estados são responsabilidade do
 * container (skeleton externo, EmptyState etc.).
 */
export interface KpiCardProps {
  /** Texto descritivo do indicador (ex.: "Devedores ativos"). */
  label: string;
  /** Valor numérico em destaque (ex.: 1234, "R$ 12.500", "—"). */
  value: string | number;
  /**
   * Ícone à esquerda. Aceita `ReactNode` ou string com nome de ícone Lucide
   * (ex.: `"Users"`). Quando definido, ativa a variante `with icon`.
   */
  icon?: ReactNode | string;
  /** Tamanho — só aplicável quando há ícone. Default `l`. */
  size?: KpiCardSize;
  /**
   * Tonalidade — só aplicável quando há ícone. `primary` é verde (default),
   * `secondary` é azul.
   */
  tone?: KpiCardTone;
  /** Alinhamento — só aplicável quando NÃO há ícone. Default `left`. */
  align?: KpiCardAlign;
  /** Subtítulo opcional abaixo do label (corresponde ao `showLine2` do Figma). */
  subtitle?: string;
  /** Badge de tendência exibido ao lado do valor. */
  badge?: KpiCardBadge;
  /** Quando `true`, ativa hover/focus/active e expõe o card como botão. */
  clickable?: boolean;
  /** Handler de clique. Quando informado, o card vira clicável automaticamente. */
  onClick?: MouseEventHandler<HTMLDivElement>;
  /** className extra mesclada ao wrapper. */
  className?: string;
  /**
   * Tooltip exibido ao hover no card inteiro. Opcional — sem prop, sem
   * tooltip. Suporta placeholder `{value}` (substituído por `String(value)`)
   * e `{label}` (substituído por `label`).
   */
  tooltipCard?: string;
  /**
   * Tooltip exibido ao hover no valor numérico. Opcional. Suporta
   * placeholder `{value}` e `{label}` — exemplo: "{value} processos".
   */
  tooltipValue?: string;
  /**
   * Tooltip exibido ao hover no badge de tendência. Opcional. Suporta
   * placeholder `{value}` (badge.value) — exemplo: "Variação: {value}".
   */
  tooltipBadge?: string;
}
