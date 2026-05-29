import type { ReactNode } from "react";
import type { BadgeProps as AntdBadgeProps, TooltipProps as AntdTooltipProps } from "antd";

export type BadgeVariant = "primary" | "secondary" | "tertiary" | "outline" | "ghost" | "destructive" | "counter";

export type BadgeStatusColor = "success" | "error" | "warning" | "info" | "caution";

type CleanAntdProps = {
  [K in keyof AntdBadgeProps as K extends "count" | "color" | "status" | "text" | "size" ? never : K]: AntdBadgeProps[K];
};

export type BadgeTooltipPlacement = AntdTooltipProps["placement"];

export type BadgeProps = CleanAntdProps & {
  variant?: BadgeVariant;
  statusColor?: BadgeStatusColor;
  /**
   * Ícone à esquerda do texto. Aceita `ReactNode` ou string com nome de
   * ícone Lucide (ex.: `"Check"`). Quando string, instancia o ícone com
   * tamanho 12px (alinhado ao Figma).
   */
  leftIcon?: ReactNode | string;
  /** Ícone à direita. Mesma regra de `leftIcon`. */
  rightIcon?: ReactNode | string;
  /** Valor numérico exibido quando `variant="counter"`. */
  count?: number;
  /**
   * Quando definido, envolve o badge em um `Tooltip` do antd. Aceita string
   * ou `ReactNode`. Quando string, interpola os placeholders:
   * - `{value}` → `count` (variant counter) ou `children` (variants label).
   * - `{label}` → `children` convertido em string.
   *
   * Ex.: `tooltip="Total: {value} processos"` no badge `<Badge variant="counter" count={42} />`
   * resolve para `"Total: 42 processos"`.
   */
  tooltip?: ReactNode;
  /** Posição do tooltip (default: `"top"`). Mapeia para `placement` do antd. */
  tooltipPlacement?: BadgeTooltipPlacement;
};
