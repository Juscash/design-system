"use client";

import React from "react";
import { Tabs as AntdTabs, ConfigProvider } from "antd";
import type { TabsProps as AntdTabsProps } from "antd";
import { designSystemColors, spacing } from "../../theme";

// ============================================
// TYPES
// ============================================

export type TabsSize = "s" | "m" | "l";
export type TabsVariant = "primary" | "secondary";

type CleanAntdProps = {
  [K in keyof AntdTabsProps as K extends "size" | "type"
    ? never
    : K]: AntdTabsProps[K];
};

export type TabsProps = CleanAntdProps & {
  dsSize?: TabsSize;
  size?: AntdTabsProps["size"];
  variant?: TabsVariant;
};

// ============================================
// TOKEN FUNCTIONS
// ============================================

function getPrimaryTokens(): Record<string, any> {
  return {
    itemColor: designSystemColors.neutral[500], // color/neutral/500
    itemActiveColor: designSystemColors.brand.primary[600], // color/brand/primary/600
    itemHoverColor: designSystemColors.brand.primary[600],
    itemSelectedColor: designSystemColors.brand.primary[600],
    inkBarColor: designSystemColors.brand.primary[600],
  };
}

function getSecondaryTokens(): Record<string, any> {
  return {
    itemColor: designSystemColors.neutral[500],
    itemActiveColor: designSystemColors.brand.secondary[600], // color/brand/secondary/600
    itemHoverColor: designSystemColors.brand.secondary[600],
    itemSelectedColor: designSystemColors.brand.secondary[600],
    inkBarColor: designSystemColors.brand.secondary[600],
  };
}

function getSizeTokens(dsSize?: TabsSize): Record<string, any> {
  switch (dsSize) {
    case "s":
      return {
        titleFontSize: 13, // body/02
        horizontalItemPadding: `${spacing[2]}px 0`, // 8px
        horizontalMargin: `0 0 0 ${spacing[4]}px`,
      };
    case "l":
      return {
        titleFontSize: 16, // heading? Check figma, usually larger
        horizontalItemPadding: `${spacing[4]}px 0`, // 16px
        horizontalMargin: `0 0 0 ${spacing[6]}px`, // 32px
      };
    case "m":
    default:
      return {
        titleFontSize: 14,
        horizontalItemPadding: `${spacing[3]}px 0`, // 12px
        horizontalMargin: `0 0 0 ${spacing[5]}px`, // 32px
      };
  }
}

// ============================================
// COMPONENT
// ============================================

export function Tabs(props: TabsProps): React.ReactElement {
  const { variant = "primary", dsSize = "m", size, ...rest } = props;

  const resolvedSize = size ? mapAntdSize(size) : dsSize;
  const sizeTokens = getSizeTokens(resolvedSize);

  const getVariantTokens = () => {
    switch (variant) {
      case "secondary":
        return getSecondaryTokens();
      case "primary":
      default:
        return getPrimaryTokens();
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: { ...getVariantTokens(), ...sizeTokens },
        },
      }}
    >
      <AntdTabs {...rest} />
    </ConfigProvider>
  );
}

Tabs.displayName = "Tabs";

// ============================================
// HELPERS
// ============================================

function mapAntdSize(size: AntdTabsProps["size"]): TabsSize {
  switch (size) {
    case "small":
      return "s";
    case "large":
      return "l";
    default:
      return "m";
  }
}
