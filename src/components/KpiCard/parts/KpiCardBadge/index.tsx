import React from "react";
import { Badge } from "../../../Badge";
import type { BadgeStatusColor } from "../../../../types/components/Badge";
import type { KpiCardBadge, KpiCardTrendDirection } from "../../../../types/components/KpiCard";

const UP_ICON = "TrendingUp";
const DOWN_ICON = "TrendingDown";
const UP_COLOR: BadgeStatusColor = "success";
const DOWN_COLOR: BadgeStatusColor = "error";

interface KpiCardBadgeViewProps {
  badge: KpiCardBadge;
  /** Conteúdo do tooltip ao hover. Quando ausente, não renderiza tooltip. */
  tooltip?: string;
}

/**
 * Resolve o nome do ícone Lucide do badge:
 * - `null` → undefined (sem ícone).
 * - string → o próprio nome.
 * - ausente → default da `direction` (TrendingUp / TrendingDown).
 */
function resolveBadgeIcon(icon: KpiCardBadge["icon"], direction: KpiCardTrendDirection | undefined): string | undefined {
  if (icon === null) return undefined;
  if (typeof icon === "string") return icon;
  return direction === "down" ? DOWN_ICON : UP_ICON;
}

/**
 * Resolve a paleta do badge (`statusColor` do `Badge`):
 * - `color` explícito vence.
 * - Sem `color`, cai no default da `direction` (`success` para up,
 *   `error` para down).
 */
function resolveBadgeColor(
  color: KpiCardBadge["color"],
  direction: KpiCardTrendDirection | undefined,
): BadgeStatusColor {
  if (color !== undefined) return color;
  return direction === "down" ? DOWN_COLOR : UP_COLOR;
}

/**
 * Badge do KpiCard. Renderiza internamente o componente `Badge` do
 * design system (`variant="secondary"` + `statusColor`), garantindo que o
 * visual seja idêntico ao Badge standalone. Aceita apenas ícones Lucide
 * (string) ou `null` para esconder — `ReactNode` arbitrário não é
 * suportado.
 */
export function KpiCardBadgeView({ badge, tooltip }: KpiCardBadgeViewProps): React.ReactElement {
  const direction = badge.direction;
  const leftIcon = resolveBadgeIcon(badge.icon, direction);
  const statusColor = resolveBadgeColor(badge.color, direction);

  return (
    <Badge variant="secondary" statusColor={statusColor} leftIcon={leftIcon} tooltip={tooltip}>
      {badge.value}
    </Badge>
  );
}

KpiCardBadgeView.displayName = "KpiCardBadgeView";
