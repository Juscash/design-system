import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Tooltip } from "../../../Tooltip";
import type { KpiCardBadge } from "../../../../types/components/KpiCard";

const BADGE_ICON_SIZE = 12;

interface KpiCardBadgeViewProps {
  badge: KpiCardBadge;
  /** Conteúdo do tooltip ao hover. Quando ausente, não renderiza tooltip. */
  tooltip?: string;
}

/**
 * Badge de tendência exibido ao lado do valor do KpiCard. Background
 * `brand.primary.50`, texto `brand.primary.900`, com ícone Lucide
 * `TrendingUp` ou `TrendingDown` conforme `direction`. Tooltip é opcional
 * — só renderiza quando o consumer passa `tooltip`.
 */
export function KpiCardBadgeView({ badge, tooltip }: KpiCardBadgeViewProps): React.ReactElement {
  const Icon = badge.direction === "up" ? TrendingUp : TrendingDown;
  const ariaLabel = badge.direction === "up" ? `Tendência de alta: ${badge.value}` : `Tendência de baixa: ${badge.value}`;
  const className = `ds-kpi-card__badge ds-kpi-card__badge--${badge.direction}`;
  const inner = (
    <span className={className} aria-label={ariaLabel}>
      <Icon size={BADGE_ICON_SIZE} aria-hidden="true" />
      <span>{badge.value}</span>
    </span>
  );
  if (tooltip === undefined) return inner;
  return <Tooltip title={tooltip}>{inner}</Tooltip>;
}

KpiCardBadgeView.displayName = "KpiCardBadgeView";
