import React from "react";
import { ConfigProvider, Segmented as AntdSegmented } from "antd";
import type { SegmentedProps as AntdSegmentedProps, ThemeConfig } from "antd";
import type { ComponentToken } from "antd/es/segmented/style/index";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import type {
  NativeLabeledOption,
  SegmentedInputOption,
  SegmentedOption,
  SegmentedProps,
  SegmentedSize,
} from "../../types/components/Segmented";

const ITEM_HEIGHT_M = 28;
const ITEM_HEIGHT_S = 24;
const ITEM_HEIGHT_XS = 16;
const FONT_SIZE_DEFAULT = 13;
const FONT_SIZE_SM = 10;
const COUNTER_DOT_SIZE = 14;

const itemHeights: Record<SegmentedSize, number> = {
  m: ITEM_HEIGHT_M,
  s: ITEM_HEIGHT_S,
  xs: ITEM_HEIGHT_XS,
};

const itemBorderRadius: Record<SegmentedSize, number> = {
  m: radius.xl,
  s: radius.xl,
  xs: radius.md,
};

const segmentedTokens: Partial<ComponentToken> = {
  trackPadding: spacing[1],
  trackBg: designSystemColors.neutral[200],
  itemColor: designSystemColors.neutral[800],
  itemHoverColor: designSystemColors.neutral[800],
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
  fontSizeSM: FONT_SIZE_SM,
  fontSizeLG: FONT_SIZE_DEFAULT,
};

function resolveSize(size: SegmentedSize): AntdSegmentedProps["size"] {
  if (size === "m") return "large";
  if (size === "s") return "middle";
  return "small";
}

function isEnhancedOption<T extends string | number>(
  option: SegmentedInputOption<T>,
): option is SegmentedOption<T> {
  return (
    typeof option === "object"
    && option !== null
    && "value" in option
    && ("text" in option || "counter" in option || "bold" in option || "state" in option || "icon" in option)
  );
}

function buildEnhancedLabel<T extends string | number>(
  option: SegmentedOption<T>,
  size: SegmentedSize,
): React.ReactNode {
  const text = option.text ?? option.label;
  const hasCounter = option.counter !== undefined && option.counter !== null;
  const fontSize = size === "xs" ? `${FONT_SIZE_SM}px` : `${FONT_SIZE_DEFAULT}px`;

  return (
    <span style={{ alignItems: "center", display: "inline-flex", gap: `${spacing[1]}px` }}>
      {option.icon ? <span style={{ alignItems: "center", display: "inline-flex" }}>{option.icon}</span> : null}
      {text !== undefined ? (
        <span style={{ fontSize, fontWeight: (option.bold ?? true) ? 700 : 400, lineHeight: "1.2" }}>{text}</span>
      ) : null}
      {hasCounter ? (
        <span
          style={{
            alignItems: "center",
            background: designSystemColors.feedback.red[500],
            borderRadius: radius.full,
            color: designSystemColors.neutral[50],
            display: "inline-flex",
            fontSize: `${FONT_SIZE_SM}px`,
            fontWeight: 400,
            height: `${COUNTER_DOT_SIZE}px`,
            justifyContent: "center",
            width: `${COUNTER_DOT_SIZE}px`,
            padding: 0,
          }}
        >
          {option.counter}
        </span>
      ) : null}
    </span>
  );
}

function normalizeOptions<T extends string | number>(
  options: SegmentedInputOption<T>[] | undefined,
  size: SegmentedSize,
): AntdSegmentedProps<T>["options"] | undefined {
  if (!options) return undefined;

  const normalized = options.map((option) => {
    if (typeof option === "string" || typeof option === "number") {
      return option;
    }
    if (!isEnhancedOption(option)) {
      return option;
    }
    return {
      value: option.value,
      disabled: option.disabled,
      label: buildEnhancedLabel(option, size),
    };
  });

  return normalized as AntdSegmentedProps<T>["options"];
}

function getDefaultActiveValue<T extends string | number>(
  options: SegmentedInputOption<T>[] | undefined,
): T | undefined {
  if (!options || options.length === 0) return undefined;

  const normalized = options.filter(
    (option): option is NativeLabeledOption<T> | SegmentedOption<T> =>
      typeof option === "object" && option !== null && "value" in option && !option.disabled,
  );

  if (normalized.length === 0) return undefined;

  const firstExplicitActive = normalized.find((option) => {
    if (!isEnhancedOption(option)) return false;
    return (option.state ?? "active") === "active";
  });

  return (firstExplicitActive ?? normalized[0]).value;
}

interface BuildStylesArgs {
  baseHeight: number;
  baseRadius: number;
  fontSize: number;
  iconFontSize: string;
}

function buildItemStyle(args: BuildStylesArgs, extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    alignItems: "center",
    borderRadius: args.baseRadius,
    display: "flex",
    fontSize: args.fontSize,
    height: args.baseHeight,
    justifyContent: "center",
    ...extra,
  };
}

function buildBaseStyles(args: BuildStylesArgs): Record<string, React.CSSProperties> {
  return {
    item: buildItemStyle(args),
    icon: {
      alignItems: "center",
      display: "flex",
      fontSize: args.iconFontSize,
    },
    label: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
  };
}

function mergeStyles<T extends string | number>(
  args: BuildStylesArgs,
  styles: AntdSegmentedProps<T>["styles"],
): AntdSegmentedProps<T>["styles"] {
  if (typeof styles === "function") {
    return (info) => {
      const base = styles(info) ?? {};
      const baseItem = (base as Record<string, unknown>).item as React.CSSProperties | undefined;
      return {
        ...base,
        ...buildBaseStyles(args),
        item: buildItemStyle(args, baseItem ?? {}),
      };
    };
  }

  const existing = (styles as Record<string, React.CSSProperties> | undefined) ?? {};
  return {
    ...existing,
    ...buildBaseStyles(args),
    item: buildItemStyle(args, (existing.item as React.CSSProperties | undefined) ?? {}),
  };
}

/**
 * Segmented control do design system. Suporta sub-tipo de opções proprietário
 * com `icon`, `counter`, `bold` e `state`, além das opções nativas do Antd.
 */
export function Segmented<T extends string | number = string>(props: SegmentedProps<T>): React.ReactElement {
  const { size = "m", options, styles, className, style, value, defaultValue, ...rest } = props;

  const resolvedSize = resolveSize(size);
  const baseHeight = itemHeights[size];
  const baseRadius = itemBorderRadius[size];
  const fontSize = size === "xs" ? FONT_SIZE_SM : FONT_SIZE_DEFAULT;
  const iconFontSize = size === "xs" ? `${FONT_SIZE_SM}px` : `${FONT_SIZE_DEFAULT}px`;

  const normalizedOptions = normalizeOptions(options, size);
  const computedDefaultValue = getDefaultActiveValue(options);
  const mergedStyles = mergeStyles<T>({ baseHeight, baseRadius, fontSize, iconFontSize }, styles);

  return (
    <ConfigProvider
      theme={{
        token: tokenOverrides,
        components: {
          Segmented: segmentedTokens,
        },
      }}
    >
      <AntdSegmented
        className={className}
        defaultValue={value === undefined && defaultValue === undefined ? computedDefaultValue : defaultValue}
        options={normalizedOptions ?? []}
        size={resolvedSize}
        style={style}
        styles={mergedStyles}
        value={value}
        {...rest}
      />
    </ConfigProvider>
  );
}

Segmented.displayName = "Segmented";

export type {
  SegmentedProps,
  SegmentedSize,
  SegmentedOption,
  SegmentedOptionState,
  SegmentedInputOption,
  NativeLabeledOption,
} from "../../types/components/Segmented";
