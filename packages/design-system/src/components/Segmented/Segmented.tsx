import React from "react";
import { ConfigProvider, Segmented as AntdSegmented } from "antd";
import type { SegmentedProps as AntdSegmentedProps } from "antd";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import type { ThemeConfig } from "antd";
import type { ComponentToken } from "antd/es/segmented/style/index";

type SegmentedSize = "m" | "s" | "xs";
type SegmentedOptionState = "active" | "inactive";

export type SegmentedOption<T extends string | number = string> = {
  value: T;
  text?: React.ReactNode;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  counter?: React.ReactNode;
  bold?: boolean;
  state?: SegmentedOptionState;
  disabled?: boolean;
};

type NativeLabeledOption<T extends string | number = string> = {
  value: T;
  label: React.ReactNode;
  disabled?: boolean;
};

type SegmentedInputOption<T extends string | number = string> = T | NativeLabeledOption<T> | SegmentedOption<T>;

export type SegmentedProps<T extends string | number = string> = Omit<AntdSegmentedProps<T>, "size" | "options"> & {
  size?: SegmentedSize;
  options?: SegmentedInputOption<T>[];
};

function resolveSize(size: SegmentedSize): AntdSegmentedProps["size"] {
  if (size === "m") return "large";
  if (size === "s") return "middle";
  return "small";
}

const itemHeights = {
  m: 28,
  s: 24,
  xs: 16,
} as const;

const itemBorderRadius = {
  m: radius.xl,
  s: radius.xl,
  xs: radius.md,
} as const;

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

const token: Partial<ThemeConfig["token"]> = {
  borderRadius: radius.xl,
  borderRadiusSM: radius.xl,
  borderRadiusLG: radius["2xl"],
  boxShadowSecondary: shadow.s,
  boxShadowTertiary: shadow.s,
  fontSize: 13,
  fontSizeSM: 10,
  fontSizeLG: 13,
};

function isEnhancedOption<T extends string | number>(option: SegmentedInputOption<T>): option is SegmentedOption<T> {
  return (
    typeof option === "object"
    && option !== null
    && "value" in option
    && ("text" in option || "counter" in option || "bold" in option || "state" in option || "icon" in option)
  );
}

function buildEnhancedLabel<T extends string | number>(option: SegmentedOption<T>, size: SegmentedSize): React.ReactNode {
  const text = option.text ?? option.label;
  const hasCounter = option.counter !== undefined && option.counter !== null;
  const fontSize = size === "xs" ? "10px" : "13px";

  return (
    <span style={{ alignItems: "center", display: "inline-flex", gap: `${spacing[1]}px` }}>
      {option.icon ?
        <span style={{ alignItems: "center", display: "inline-flex" }}>{option.icon}</span>
      : null}
      {text !== undefined ?
        <span style={{ fontSize, fontWeight: (option.bold ?? true) ? 700 : 400, lineHeight: "1.2" }}>{text}</span>
      : null}
      {hasCounter ?
        <span
          style={{
            alignItems: "center",
            background: designSystemColors.feedback.red[500],
            borderRadius: radius.full,
            color: designSystemColors.neutral[50],
            display: "inline-flex",
            fontSize: "10px",
            fontWeight: 400,
            height: "14px",
            justifyContent: "center",
            width: "14px",
            padding: `0`,
          }}
        >
          {option.counter}
        </span>
      : null}
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

function getDefaultActiveValue<T extends string | number>(options: SegmentedInputOption<T>[] | undefined): T | undefined {
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

export function Segmented<T extends string | number = string>(props: SegmentedProps<T>): React.ReactElement {
  const { size = "m", options, styles, className, style, value, defaultValue, ...rest } = props;

  const resolvedSize = resolveSize(size);
  const baseHeight = itemHeights[size];
  const baseRadius = itemBorderRadius[size];
  const normalizedOptions = normalizeOptions(options, size);
  const computedDefaultValue = getDefaultActiveValue(options);

  const mergedStyles: AntdSegmentedProps<T>["styles"] =
    typeof styles === "function" ?
      (info) => {
        const base = styles(info) ?? {};
        const baseItem = (base as Record<string, unknown>).item as React.CSSProperties | undefined;
        return {
          ...base,
          item: {
            alignItems: "center",
            borderRadius: baseRadius,
            display: "flex",
            fontSize: size === "xs" ? 10 : 13,
            height: baseHeight,
            justifyContent: "center",
            ...(baseItem ?? {}),
          },
          icon: {
            alignItems: "center",
            display: "flex",
            fontSize: size === "xs" ? "10px" : "13px",
          },
          label: {
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          },
        };
      }
    : {
        ...(styles as Record<string, React.CSSProperties> | undefined),
        item: {
          alignItems: "center",
          borderRadius: baseRadius,
          display: "flex",
          fontSize: size === "xs" ? 10 : 13,
          height: baseHeight,
          justifyContent: "center",
          ...(((styles as Record<string, unknown> | undefined)?.item ?? {}) as React.CSSProperties),
        },
        icon: {
          alignItems: "center",
          display: "flex",
          fontSize: size === "xs" ? "10px" : "13px",
        },
        label: {
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        },
      };

  return (
    <ConfigProvider
      theme={{
        token,
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
