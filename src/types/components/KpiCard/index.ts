import type { MouseEventHandler, ReactNode } from "react";
import type { BadgeStatusColor } from "../Badge";

/** Tamanho do KpiCard quando há ícone — afeta o container do ícone e padding. */
export type KpiCardSize = "m" | "l";

/** Alinhamento horizontal do conteúdo. Aplica-se apenas ao KpiCard sem ícone. */
export type KpiCardAlign = "left" | "center";

/** Direção da tendência exibida no badge. Define o ícone Lucide default. */
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

/**
 * Paleta do badge — reutiliza exatamente os mesmos presets do componente
 * `Badge` do design system (`BadgeStatusColor`), garantindo consistência
 * visual entre o KpiCard e o Badge standalone. Valores permitidos:
 *
 * - `success` — verde (`brand.primary.50` / `brand.primary.900`).
 * - `error` — vermelho (`feedback.red.50` / `feedback.red.900`).
 * - `warning` — laranja (`feedback.orange.50` / `feedback.orange.900`).
 * - `caution` — amarelo (`feedback.yellow.50` / `feedback.yellow.900`).
 * - `info` — azul (`feedback.blue.50` / `feedback.blue.900`).
 *
 * Cores arbitrárias não são suportadas — a regra é manter o badge dentro
 * da paleta semântica oficial.
 */
export type KpiCardBadgeColor = BadgeStatusColor;

/**
 * Descrição do badge exibido ao lado do valor.
 *
 * Renderizado internamente pelo componente `Badge` do design system —
 * herda APENAS o que o `Badge` aceita (mesmas paletas, mesmas regras
 * tipográficas). Cores e ícones arbitrários NÃO são suportados.
 *
 * Customizações:
 * - `direction` (default `"up"`) define o ícone e a paleta padrão:
 *   up → `TrendingUp` + `success` (verde), down → `TrendingDown` +
 *   `error` (vermelho).
 * - `icon` sobrescreve o ícone padrão. Aceita apenas o NOME de um ícone
 *   do `lucide-react` (string). Use `null` para esconder o ícone.
 * - `color` sobrescreve a paleta padrão. Aceita apenas um dos presets
 *   semânticos definidos em `KpiCardBadgeColor`.
 */
export interface KpiCardBadge {
  /** Texto curto (ex.: "+12%", "novo", "alerta"). */
  value: string;
  /**
   * Direção da tendência — define o ícone e cor default quando `icon` e
   * `color` não são passados. Default `"up"`.
   */
  direction?: KpiCardTrendDirection;
  /**
   * Nome de um ícone do `lucide-react` (ex.: `"Award"`, `"Check"`). Use
   * `null` para omitir o ícone. Quando ausente, usa o default da
   * `direction` (`TrendingUp` / `TrendingDown`). `ReactNode` NÃO é aceito
   * — Lucide é o único provedor de ícones do design system.
   */
  icon?: string | null;
  /**
   * Paleta do badge. Preset semântico (mesmo set do `Badge`). Quando
   * ausente, usa o default da `direction`.
   */
  color?: KpiCardBadgeColor;
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
