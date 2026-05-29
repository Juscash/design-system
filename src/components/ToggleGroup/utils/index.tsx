import React from "react";
import * as LucideIcons from "lucide-react";
import type { ToggleGroupOption, ToggleGroupSize } from "../../../types/components/ToggleGroup";

const ITEM_LABEL_CLASS = "ds-toggle-group__label";
const ITEM_ICON_CLASS = "ds-toggle-group__icon";
const ITEM_TEXT_CLASS = "ds-toggle-group__text";
const SR_ONLY_CLASS = "ds-toggle-group__sr-only";

const ICON_SIZE_XS = 12;
const ICON_SIZE_S = 14;
const ICON_SIZE_M = 16;

/**
 * Tamanho de ícone (em px) recomendado para cada `size` do ToggleGroup.
 * Acompanha a escala definida no dump do Figma para `toggle icon button`.
 */
export function getIconPixelSize(size: ToggleGroupSize): number {
  if (size === "xs") return ICON_SIZE_XS;
  if (size === "s") return ICON_SIZE_S;
  return ICON_SIZE_M;
}

/**
 * Resolve o `icon` da opção em um `ReactNode`. Quando string, busca o
 * componente correspondente em `lucide-react` (único provedor de ícones
 * do design system).
 */
export function resolveIcon(icon: ToggleGroupOption["icon"], size: ToggleGroupSize): React.ReactNode {
  if (icon === undefined || icon === null) return undefined;
  if (typeof icon !== "string") return icon;
  const registry = LucideIcons as unknown as Record<string, unknown>;
  const candidate = registry[icon];
  if (typeof candidate !== "function" && typeof candidate !== "object") return undefined;
  const IconComponent = candidate as React.ComponentType<{ size?: number }>;
  return <IconComponent size={getIconPixelSize(size)} />;
}

/**
 * Renderiza o conteúdo interno (`label` do Antd) de uma opção do
 * ToggleGroup combinando ícone + texto. Em modo icon-only, expõe o
 * nome acessível via `<span>` com classe `sr-only`.
 */
export function buildOptionLabel(option: ToggleGroupOption, size: ToggleGroupSize): React.ReactNode {
  const resolvedIcon = resolveIcon(option.icon, size);
  const text = option.label;
  const isIconOnly = resolvedIcon !== undefined && text === undefined;
  const accessibleName = isIconOnly ? (option.ariaLabel ?? String(option.value)) : undefined;
  return (
    <span className={ITEM_LABEL_CLASS}>
      {resolvedIcon ?
        <span className={ITEM_ICON_CLASS} aria-hidden="true">
          {resolvedIcon}
        </span>
      : null}
      {text !== undefined ?
        <span className={ITEM_TEXT_CLASS}>{text}</span>
      : null}
      {accessibleName ?
        <span className={SR_ONLY_CLASS}>{accessibleName}</span>
      : null}
    </span>
  );
}
