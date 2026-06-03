import React from "react";
import * as LucideIcons from "lucide-react";
import type { KpiCardSize } from "../../../../types/components/KpiCard";

const CONTAINER_SIZE_L = 62;
const CONTAINER_SIZE_M = 32;
const ICON_SIZE_L = 32;
const ICON_SIZE_M = 16;

interface KpiCardIconProps {
  icon: React.ReactNode | string;
  size: KpiCardSize;
}

/**
 * Caixa verde-clara (`primary/50`) que envolve o ícone à esquerda do
 * KpiCard. Tamanho do container e do ícone seguem o `size` do card.
 *
 * Quando `icon` é uma string, resolve no pacote `lucide-react` e instancia
 * o ícone com tamanho derivado do `size` (32 px para `l`, 16 px para `m`).
 */
export function KpiCardIcon({ icon, size }: KpiCardIconProps): React.ReactElement {
  const containerSize = size === "l" ? CONTAINER_SIZE_L : CONTAINER_SIZE_M;
  const iconSize = size === "l" ? ICON_SIZE_L : ICON_SIZE_M;
  const resolved = resolveIcon(icon, iconSize);
  return (
    <div className="ds-kpi-card__icon" style={{ width: containerSize, height: containerSize }} aria-hidden="true">
      {resolved}
    </div>
  );
}

KpiCardIcon.displayName = "KpiCardIcon";

/**
 * Resolve o `icon` para ReactNode renderizável. String é tratada como nome
 * de ícone Lucide; ReactNode passa direto.
 */
function resolveIcon(icon: React.ReactNode | string, iconSize: number): React.ReactNode {
  if (typeof icon !== "string") return icon;
  const registry = LucideIcons as unknown as Record<string, unknown>;
  const Candidate = registry[icon];
  if (typeof Candidate !== "function" && typeof Candidate !== "object") return icon;
  const IconComponent = Candidate as React.ComponentType<{ size?: number }>;
  return <IconComponent size={iconSize} />;
}
