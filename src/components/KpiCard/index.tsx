import React from "react";
import { Tooltip } from "../Tooltip";
import { KpiCardBadgeView } from "./parts/KpiCardBadge";
import { KpiCardIcon } from "./parts/KpiCardIcon";
import type { KpiCardProps } from "../../types/components/KpiCard";
import "./index.module.css";

const BASE_CLASS = "ds-kpi-card";
const VARIANT_WITH_ICON = "ds-kpi-card--with-icon";
const VARIANT_NO_ICON = "ds-kpi-card--no-icon";
const SIZE_PREFIX = "ds-kpi-card--size-";
const ALIGN_PREFIX = "ds-kpi-card--align-";
const TONE_PREFIX = "ds-kpi-card--tone-";
const CLICKABLE_CLASS = "ds-kpi-card--clickable";
const EMPTY_CLASS = "ds-kpi-card--empty";

const EMPTY_VALUES = new Set(["—", "-", ""]);

/**
 * Determina se o valor deve ser tratado como "sem dado" — exibe o valor com
 * font-weight regular e cor `text/soft`. Considera string vazia, `null`,
 * `undefined`, traço `-` e travessão `—`.
 */
function isEmptyValue(value: KpiCardProps["value"]): boolean {
  if (value === null || value === undefined) return true;
  return EMPTY_VALUES.has(String(value).trim());
}

/**
 * Interpola placeholders `{value}` e `{label}` em um template de tooltip.
 * Permite ao consumer reaproveitar o valor do card no texto do tooltip
 * sem duplicação. Quando o template é vazio ou `undefined`, retorna
 * `undefined` — o que sinaliza para não renderizar o Tooltip.
 */
function interpolateTooltip(template: string | undefined, value: KpiCardProps["value"], label: string): string | undefined {
  if (template === undefined) return undefined;
  return template.replace(/\{value\}/g, String(value ?? "")).replace(/\{label\}/g, label);
}

/**
 * Compõe a className do wrapper. Inclui o BASE e as classes de variante,
 * size/align/tone e clickable conforme as props.
 */
function buildWrapperClassName(args: {
  hasIcon: boolean;
  size: NonNullable<KpiCardProps["size"]>;
  align: NonNullable<KpiCardProps["align"]>;
  tone: NonNullable<KpiCardProps["tone"]>;
  clickable: boolean;
  empty: boolean;
  external?: string;
}): string {
  const tokens = [
    BASE_CLASS,
    args.hasIcon ? VARIANT_WITH_ICON : VARIANT_NO_ICON,
    args.hasIcon ? `${SIZE_PREFIX}${args.size}` : `${ALIGN_PREFIX}${args.align}`,
    args.hasIcon ? `${TONE_PREFIX}${args.tone}` : undefined,
    args.clickable ? CLICKABLE_CLASS : undefined,
    args.empty ? EMPTY_CLASS : undefined,
    args.external,
  ];
  return tokens.filter(Boolean).join(" ");
}

/**
 * Trata `Enter`/`Space` em cards clicáveis, replicando o comportamento
 * nativo de `<button>` quando o wrapper é uma `<div>`.
 */
function handleKeyActivation(event: React.KeyboardEvent<HTMLDivElement>, onClick: KpiCardProps["onClick"]): void {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  if (!onClick) return;
  const synthetic = event as unknown as React.MouseEvent<HTMLDivElement>;
  onClick(synthetic);
}

/**
 * KpiCard do design system. Exibe um indicador (label + valor) com badge
 * opcional, ícone opcional, subtítulo opcional e suporte a clique. Tokens
 * vindos do Figma — ver `docs/componentes/KpiCard.md`.
 */
export function KpiCard(props: KpiCardProps): React.ReactElement {
  const {
    label,
    value,
    icon,
    size = "l",
    tone = "primary",
    align = "left",
    subtitle,
    badge,
    clickable: clickableProp,
    onClick,
    className,
    tooltipCard,
    tooltipValue,
    tooltipBadge,
  } = props;

  const hasIcon = icon !== undefined && icon !== null;
  const clickable = clickableProp ?? onClick !== undefined;
  const empty = isEmptyValue(value);
  const wrapperClassName = buildWrapperClassName({ hasIcon, size, align, tone, clickable, empty, external: className });

  const tooltipCardResolved = interpolateTooltip(tooltipCard, value, label);
  const tooltipValueResolved = interpolateTooltip(tooltipValue, value, label);
  const tooltipBadgeResolved = interpolateTooltip(tooltipBadge, badge?.value ?? "", label);

  const interactiveProps =
    clickable ?
      {
        "role": "button" as const,
        "tabIndex": 0,
        onClick,
        "onKeyDown": (event: React.KeyboardEvent<HTMLDivElement>) => handleKeyActivation(event, onClick),
        "aria-label": `${label}: ${value}`,
      }
    : {};

  const cardInner = (
    <div className={wrapperClassName} {...interactiveProps}>
      {hasIcon && <KpiCardIcon icon={icon} size={size} />}
      <div className="ds-kpi-card__info">
        <p className="ds-kpi-card__label">{label}</p>
        {hasIcon && subtitle && size === "m" && <p className="ds-kpi-card__subtitle">{subtitle}</p>}
        <div className="ds-kpi-card__value-row">
          {tooltipValueResolved !== undefined ?
            <Tooltip title={tooltipValueResolved}>
              <span className="ds-kpi-card__value">{value}</span>
            </Tooltip>
          : <span className="ds-kpi-card__value">{value}</span>}
          {badge && <KpiCardBadgeView badge={badge} tooltip={tooltipBadgeResolved} />}
        </div>
        {hasIcon && subtitle && size === "l" && <p className="ds-kpi-card__subtitle">{subtitle}</p>}
      </div>
    </div>
  );

  if (tooltipCardResolved !== undefined) {
    return <Tooltip title={tooltipCardResolved}>{cardInner}</Tooltip>;
  }
  return cardInner;
}

KpiCard.displayName = "KpiCard";

export type {
  KpiCardProps,
  KpiCardBadge,
  KpiCardSize,
  KpiCardAlign,
  KpiCardTone,
  KpiCardTrendDirection,
} from "../../types/components/KpiCard";
