import React from "react";
import { ConfigProvider, Segmented as AntdSegmented } from "antd";
import type { SegmentedProps as AntdSegmentedProps, ThemeConfig } from "antd";
import type { ComponentToken } from "antd/es/segmented/style/index";
import * as LucideIcons from "lucide-react";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import { Tooltip } from "../Tooltip";
import type { TooltipProps } from "../../types/components/Tooltip";
import type { SegmentedInputOption, SegmentedOption, SegmentedProps, SegmentedSize } from "../../types/components/Segmented";
import "./index.module.css";

type ReactNode = React.ReactNode;

const BASE_CLASS = "ds-segmented";
const SIZE_XS_CLASS = "ds-segmented-xs";
const LABEL_CLASS = "ds-segmented__label";
const ICON_CLASS = "ds-segmented__icon";
const TEXT_CLASS = "ds-segmented__text";
const TEXT_XS_CLASS = "ds-segmented__text--xs";
const COUNTER_CLASS = "ds-segmented__counter";

const FONT_SIZE_DEFAULT = 13;
const FONT_SIZE_XS = 10;

const ICON_SIZE_XS = 12;
const ICON_SIZE_S = 14;
const ICON_SIZE_M = 16;

const TRACK_HEIGHT_M = 36;

const segmentedTokens: Partial<ComponentToken> = {
  trackPadding: spacing[1],
  trackBg: designSystemColors.neutral[200],
  itemColor: designSystemColors.neutral[800],
  itemHoverColor: designSystemColors.neutral[800],
  // Hover alinhado ao Button do DS: `color/neutral/100` (#f5f5f5).
  itemHoverBg: designSystemColors.neutral[100],
  itemActiveBg: designSystemColors.neutral[200],
  itemSelectedBg: designSystemColors.neutral[50],
  itemSelectedColor: designSystemColors.neutral[800],
};

const tokenOverrides: Partial<NonNullable<ThemeConfig["token"]>> = {
  borderRadius: radius.xl,
  borderRadiusSM: radius.xl,
  borderRadiusLG: radius["2xl"],
  boxShadowSecondary: shadow.s,
  boxShadowTertiary: shadow.s,
  fontSize: FONT_SIZE_DEFAULT,
  fontSizeSM: FONT_SIZE_XS,
  fontSizeLG: FONT_SIZE_DEFAULT,
  // Override do Antd: `large` default é 40px; Figma define `m=36px`. Como o
  // override roda dentro do ConfigProvider local do Segmented, só afeta o
  // próprio componente.
  controlHeightLG: TRACK_HEIGHT_M,
};

/**
 * Converte o size proprietário (`m|s|xs`) para o size aceito pelo Antd
 * (`large|middle|small`). `m → large`, `s → middle`, `xs → small`.
 */
function resolveSize(size: SegmentedSize): AntdSegmentedProps["size"] {
  if (size === "m") return "large";
  if (size === "s") return "middle";
  return "small";
}

/**
 * Retorna o tamanho de ícone (em px) recomendado para cada tamanho do
 * Segmented. Aplicado quando `icon` é informado como string Lucide.
 */
function getIconPixelSize(size: SegmentedSize): number {
  if (size === "xs") return ICON_SIZE_XS;
  if (size === "s") return ICON_SIZE_S;
  return ICON_SIZE_M;
}

/**
 * Resolve o `icon` em um `ReactNode`. Quando string, busca o componente
 * correspondente em `lucide-react` e instancia com o tamanho derivado do
 * `size` do Segmented. Quando `ReactNode`, retorna como está.
 */
function resolveIcon(icon: ReactNode | string | undefined, size: SegmentedSize): ReactNode {
  if (icon === undefined || icon === null) return undefined;
  if (typeof icon !== "string") return icon;
  const registry = LucideIcons as unknown as Record<string, unknown>;
  const Candidate = registry[icon];
  if (typeof Candidate !== "function" && typeof Candidate !== "object") return undefined;
  const IconComponent = Candidate as React.ComponentType<{ size?: number }>;
  return <IconComponent size={getIconPixelSize(size)} />;
}

/**
 * Type-guard que identifica a opção enriquecida (com `text`, `icon` ou
 * `counter`) versus uma `NativeLabeledOption` do Antd ou primitivo cru.
 */
function isEnhancedOption<T extends string | number>(option: SegmentedInputOption<T>): option is SegmentedOption<T> {
  return (
    typeof option === "object"
    && option !== null
    && "value" in option
    && ("text" in option || "counter" in option || "icon" in option)
  );
}

/**
 * Monta o conteúdo bruto (label ReactNode) de uma opção enriquecida
 * combinando ícone, texto e counter via classes do CSS Module — sem
 * inline styles. Não inclui Tooltip: a envoltura ocorre em `wrapWithTooltip`.
 */
function buildEnhancedLabel<T extends string | number>(option: SegmentedOption<T>, size: SegmentedSize): ReactNode {
  const text = option.text;
  const hasCounter = option.counter !== undefined && option.counter !== null;
  const textClassName = size === "xs" ? `${TEXT_CLASS} ${TEXT_XS_CLASS}` : TEXT_CLASS;
  const resolvedIcon = resolveIcon(option.icon, size);

  return (
    <span className={LABEL_CLASS}>
      {resolvedIcon ?
        <span className={ICON_CLASS}>{resolvedIcon}</span>
      : null}
      {text !== undefined ?
        <span className={textClassName}>{text}</span>
      : null}
      {hasCounter ?
        <span className={COUNTER_CLASS}>{option.counter}</span>
      : null}
    </span>
  );
}

/**
 * Resolve a prop `tooltip` da opção em `TooltipProps`. Aceita string
 * (atalho para `{ title: string }`) ou o objeto completo do `Tooltip` do DS.
 */
function resolveTooltipProps(tooltip: string | TooltipProps | undefined): TooltipProps | undefined {
  if (tooltip === undefined) return undefined;
  if (typeof tooltip === "string") return { title: tooltip };
  return tooltip;
}

/**
 * Envolve o label da opção em Tooltip do DS conforme regra do Figma:
 * "Segmented com label podem ter tooltip opcionalmente. Segmented de
 * ícone sempre devem ter tooltip com o nome da ação, sem exceção."
 *
 * - Opções com `text`: tooltip só é renderizado se `option.tooltip` for
 *   passado explicitamente.
 * - Opções icon-only (sem `text`): tooltip é sempre renderizado —
 *   preferência por `option.tooltip`, fallback em `option.ariaLabel` e,
 *   em último caso, em `String(option.value)`.
 */
function wrapWithTooltip<T extends string | number>(label: ReactNode, option: SegmentedOption<T>): ReactNode {
  const hasIcon = option.icon !== undefined && option.icon !== null;
  const hasText = option.text !== undefined && option.text !== null;
  const isIconOnly = hasIcon && !hasText;
  const tooltipFromProp = resolveTooltipProps(option.tooltip);

  if (tooltipFromProp !== undefined) return <Tooltip {...tooltipFromProp}>{label}</Tooltip>;
  if (!isIconOnly) return label;
  const fallbackTitle = option.ariaLabel ?? String(option.value);
  return <Tooltip title={fallbackTitle}>{label}</Tooltip>;
}

/**
 * Normaliza a lista de opções para o formato `{ value, label, title }`
 * aceito pelo Antd. Toda opção recebe `title: ""` para suprimir o
 * atributo HTML `title` que o `@rc-component/segmented` deriva
 * automaticamente do label — quem comunica a ação é o `<Tooltip>` do DS,
 * não o tooltip nativo do navegador. Opções enriquecidas recebem o label
 * composto (ícone + texto + counter); icon-only ou com `tooltip`
 * explícito são envoltas em `<Tooltip>` via `wrapWithTooltip`.
 */
function normalizeOptions<T extends string | number>(
  options: SegmentedInputOption<T>[] | undefined,
  size: SegmentedSize,
): AntdSegmentedProps<T>["options"] | undefined {
  if (!options) return undefined;
  const normalized = options.map((option) => {
    if (typeof option === "string" || typeof option === "number") {
      return { value: option as T, label: option, title: "" };
    }
    if (!isEnhancedOption(option)) {
      const nativeOption = option as { value: T; label: ReactNode; disabled?: boolean };
      return { ...nativeOption, title: "" };
    }
    const label = buildEnhancedLabel(option, size);
    return {
      value: option.value,
      disabled: option.disabled,
      label: wrapWithTooltip(label, option),
      title: "",
    };
  });
  return normalized as AntdSegmentedProps<T>["options"];
}

/**
 * Compõe a className final aplicada ao Antd Segmented (`.ds-segmented`
 * + modifier de size + className externa, se fornecida). O modifier
 * `ds-segmented-xs` é necessário para o CSS Module aplicar tipografia
 * caption no nível do `.ant-segmented-item-label`.
 */
function buildClassName(external: string | undefined, size: SegmentedSize): string {
  const sizeModifier = size === "xs" ? SIZE_XS_CLASS : "";
  return [BASE_CLASS, sizeModifier, external ?? ""].filter(Boolean).join(" ");
}

/**
 * Segmented control do design system. Suporta sub-tipo de opções
 * proprietário com `icon` (string Lucide ou ReactNode), `text` e
 * `counter`, além das opções nativas do Antd. Tamanho é discreto
 * (`m|s|xs`) e o ícone é dimensionado automaticamente.
 */
export function Segmented<T extends string | number = string>(props: SegmentedProps<T>): React.ReactElement {
  const { size = "m", options, className, ...rest } = props;
  const resolvedSize = resolveSize(size);
  const normalizedOptions = normalizeOptions(options, size);

  return (
    <ConfigProvider
      theme={{
        token: tokenOverrides,
        components: { Segmented: segmentedTokens },
      }}
    >
      <AntdSegmented className={buildClassName(className, size)} options={normalizedOptions ?? []} size={resolvedSize} {...rest} />
    </ConfigProvider>
  );
}

Segmented.displayName = "Segmented";

export type {
  SegmentedProps,
  SegmentedSize,
  SegmentedOption,
  SegmentedInputOption,
  NativeLabeledOption,
} from "../../types/components/Segmented";
