import React from "react";
import { Badge as AntdBadge, ConfigProvider } from "antd";
import type { BadgeProps as AntdBadgeProps } from "antd";
import type { ComponentToken } from "antd/es/badge/style";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import type { BadgeProps, BadgeStatusColor, BadgeVariant } from "../../types/components/Badge";

const COUNTER_MIN_SIZE = 16;
const BADGE_HEIGHT = 24;
const COUNTER_FONT_SIZE = 10;
const BADGE_FONT_SIZE = 13;
const DOT_SIZE = 6;

type BadgeStylesProp = AntdBadgeProps["styles"];

const baseTokens: Partial<ComponentToken> = {
  indicatorHeight: BADGE_HEIGHT,
  indicatorHeightSM: COUNTER_MIN_SIZE,
  textFontSize: BADGE_FONT_SIZE,
  textFontSizeSM: COUNTER_FONT_SIZE,
  textFontWeight: 400,
  dotSize: DOT_SIZE,
};

function getContentBaseStyles(isCounter: boolean): React.CSSProperties {
  if (isCounter) {
    return {
      minWidth: COUNTER_MIN_SIZE,
      height: COUNTER_MIN_SIZE,
      paddingInline: 0,
      paddingBlock: 0,
      borderRadius: radius.full,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: COUNTER_FONT_SIZE,
      lineHeight: "1.2",
      fontWeight: 400,
      textAlign: "center",
    };
  }

  return {
    minHeight: BADGE_HEIGHT,
    height: BADGE_HEIGHT,
    paddingInline: spacing[2],
    paddingBlock: spacing[1],
    borderRadius: radius.xl,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[1],
    fontSize: BADGE_FONT_SIZE,
    lineHeight: "1.2",
    fontWeight: 400,
  };
}

function getIndicatorResetStyles(): React.CSSProperties {
  return {
    backgroundColor: "transparent",
    border: "none",
    paddingInline: 0,
    paddingBlock: 0,
    minWidth: "auto",
    height: "auto",
    boxShadow: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

function getSecondaryStatusStyles(statusColor: BadgeStatusColor): React.CSSProperties {
  switch (statusColor) {
    case "error":
      return { backgroundColor: designSystemColors.feedback.red[50], color: designSystemColors.feedback.red[900] };
    case "warning":
      return { backgroundColor: designSystemColors.feedback.orange[50], color: designSystemColors.feedback.orange[900] };
    case "caution":
      return { backgroundColor: designSystemColors.feedback.yellow[50], color: designSystemColors.feedback.yellow[900] };
    case "info":
      return { backgroundColor: designSystemColors.feedback.blue[50], color: designSystemColors.feedback.blue[900] };
    case "success":
    default:
      return { backgroundColor: designSystemColors.brand.primary[50], color: designSystemColors.brand.primary[900] };
  }
}

function getVariantStyles(variant: BadgeVariant, statusColor?: BadgeStatusColor): React.CSSProperties {
  if (variant === "secondary" && statusColor) {
    return getSecondaryStatusStyles(statusColor);
  }

  switch (variant) {
    case "secondary":
      return { backgroundColor: designSystemColors.neutral[200], color: designSystemColors.neutral[800] };
    case "tertiary":
      return { backgroundColor: designSystemColors.brand.primary[50], color: designSystemColors.brand.primary[900] };
    case "outline":
      return {
        backgroundColor: "transparent",
        color: designSystemColors.neutral[800],
        borderColor: designSystemColors.neutral[300],
        borderWidth: 1,
        borderStyle: "solid",
      };
    case "ghost":
      return { backgroundColor: "transparent", color: designSystemColors.neutral[800] };
    case "destructive":
    case "counter":
      return { backgroundColor: designSystemColors.feedback.red[500], color: designSystemColors.neutral[50] };
    case "primary":
    default:
      return { backgroundColor: designSystemColors.brand.primary[600], color: designSystemColors.neutral[50] };
  }
}

function mergeBadgeStyles(
  styles: BadgeStylesProp | undefined,
  indicatorStyles: React.CSSProperties,
): BadgeStylesProp {
  if (!styles) {
    return { indicator: indicatorStyles };
  }

  if (typeof styles === "function") {
    return (info) => {
      const resolved = styles(info) as Record<string, React.CSSProperties>;
      return {
        ...resolved,
        indicator: {
          ...indicatorStyles,
          ...(resolved?.indicator ?? null),
        },
      };
    };
  }

  return {
    ...styles,
    indicator: {
      ...indicatorStyles,
      ...(styles.indicator ?? null),
    },
  };
}

/**
 * Badge do design system. Suporta variantes proprietárias `primary`,
 * `secondary`, `tertiary`, `outline`, `ghost`, `destructive` e `counter` e
 * sub-paletas em `secondary` via `statusColor`.
 */
export function Badge(props: BadgeProps): React.ReactElement {
  const { variant = "primary", statusColor, leftIcon, rightIcon, count, children, className, styles, showZero, ...rest } = props;

  const isCounter = variant === "counter";
  const shouldShowCounter = typeof count === "number";
  const resolvedShowZero = isCounter ? count === 0 || showZero : showZero;
  const hasFocusClass = className?.includes("pseudo-focus") || className?.includes("pseudo-focus-within");

  const variantStyles = getVariantStyles(variant, statusColor);
  const contentStyles = {
    ...getContentBaseStyles(isCounter),
    ...variantStyles,
    ...(hasFocusClass ? { boxShadow: shadow.focus } : null),
  } satisfies React.CSSProperties;

  const hasLabel = children !== undefined && children !== null;
  const badgeContent =
    isCounter ?
      shouldShowCounter ? <span style={contentStyles}>{count}</span>
      : undefined
    : hasLabel || leftIcon || rightIcon ?
      <span style={contentStyles}>
        {leftIcon ? <span style={{ display: "inline-flex", alignItems: "center" }}>{leftIcon}</span> : null}
        {hasLabel ? <span>{children}</span> : null}
        {rightIcon ? <span style={{ display: "inline-flex", alignItems: "center" }}>{rightIcon}</span> : null}
      </span>
    : undefined;

  const indicatorStyles = getIndicatorResetStyles();

  return (
    <ConfigProvider
      theme={{
        components: {
          Badge: baseTokens,
        },
      }}
    >
      <AntdBadge
        className={className}
        count={badgeContent}
        size={isCounter ? "small" : "default"}
        showZero={resolvedShowZero}
        styles={mergeBadgeStyles(styles, indicatorStyles)}
        {...rest}
      />
    </ConfigProvider>
  );
}

Badge.displayName = "Badge";

export type { BadgeProps, BadgeVariant, BadgeStatusColor } from "../../types/components/Badge";
