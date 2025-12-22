"use client";

import React from "react";
import { ConfigProvider, Segmented as AntdSegmented } from "antd";
import type { SegmentedProps as AntdSegmentedProps } from "antd";
import { designSystemColors, spacing, radius } from "../theme";
import type { ThemeConfig } from "antd";
import type { ComponentToken } from "antd/es/segmented/style/index";

type SegmentedSize = "small" | "regular" | "large" | "middle";

export type SegmentedProps<T extends string | number = string> = Omit<
  AntdSegmentedProps<T>,
  "size"
> & {
  size?: SegmentedSize;
};

function resolveSize(
  size?: SegmentedSize
): AntdSegmentedProps["size"] | undefined {
  if (!size) return undefined;
  if (size === "regular" || size === "middle") return "middle";
  if (size === "large") return "large";
  return "small";
}

const itemHeights = {
  small: 16,
  middle: 24,
  large: 28,
} as const;

const borderRadius = {
  small: radius.md,
  middle: radius.xl,
  large: radius.xl,
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
  fontSize: 13,
  fontSizeSM: 10,
  fontSizeLG: 13,
};

export function Segmented<T extends string | number = string>(
  props: SegmentedProps<T>
): React.ReactElement {
  const { size, styles, ...rest } = props;
  const resolvedSize = resolveSize(size);
  const effectiveSize = resolvedSize ?? "middle";
  const baseHeight = itemHeights[effectiveSize as "small" | "middle" | "large"];
  const borderRadiusValue =
    borderRadius[effectiveSize as "small" | "middle" | "large"];
  const mergedStyles: AntdSegmentedProps<T>["styles"] =
    typeof styles === "function"
      ? (info) => {
          const base = styles(info) ?? {};
          const baseItem = (base as Record<string, unknown>).item as
            | React.CSSProperties
            | undefined;
          return {
            ...base,
            item: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: baseHeight,
              borderRadius: borderRadiusValue,
              ...(baseItem ?? {}),
            },
            icon: {
              fontSize: "10px",
              display: "flex",
            },
            label: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          };
        }
      : {
          ...(styles as Record<string, React.CSSProperties> | undefined),
          item: {
            height: baseHeight,
            borderRadius: borderRadiusValue,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...(((styles as Record<string, unknown> | undefined)?.item ??
              {}) as React.CSSProperties),
          },
          icon: {
            fontSize: "10px",
            display: "flex",
          },
          label: {
            display: "flex",
            alignItems: "center",
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
      <AntdSegmented size={resolvedSize} styles={mergedStyles} {...rest} />
    </ConfigProvider>
  );
}
