import React from "react";
import { Tabs as AntdTabs, ConfigProvider } from "antd";
import type { TabsProps as AntdTabsProps } from "antd";
import { designSystemColors, spacing } from "../../theme";
import type { TabsProps, TabsSize, TabsVariant } from "../../types/components/Tabs";
import "./index.module.css";

const TAB_FONT_SIZE_M = 13;
const TAB_FONT_SIZE_S = 10;

type TabsComponentToken = Record<string, unknown>;

function getPrimaryTokens(): TabsComponentToken {
  return {
    itemColor: designSystemColors.neutral[500],
    itemActiveColor: designSystemColors.brand.primary[600],
    itemHoverColor: designSystemColors.brand.primary[600],
    itemSelectedColor: designSystemColors.brand.primary[600],
    inkBarColor: designSystemColors.brand.primary[600],
    horizontalItemGutter: 0,
    horizontalItemMargin: "0",
  };
}

function getSecondaryTokens(): TabsComponentToken {
  return {
    itemColor: designSystemColors.neutral[500],
    itemActiveColor: designSystemColors.brand.secondary[600],
    itemHoverColor: designSystemColors.brand.secondary[600],
    itemSelectedColor: designSystemColors.brand.secondary[600],
    inkBarColor: designSystemColors.brand.secondary[600],
    horizontalItemGutter: 0,
    horizontalItemMargin: "0",
  };
}

function getSizeTokens(dsSize: TabsSize): TabsComponentToken {
  switch (dsSize) {
    case "s":
      return {
        titleFontSize: TAB_FONT_SIZE_S,
        horizontalItemPadding: `1px ${spacing[1]}px`,
        horizontalMargin: "0",
      };
    case "l":
      return {
        titleFontSize: TAB_FONT_SIZE_M,
        horizontalItemPadding: `${spacing[1]}px ${spacing[3]}px`,
        horizontalMargin: "0",
      };
    case "m":
    default:
      return {
        titleFontSize: TAB_FONT_SIZE_M,
        horizontalItemPadding: `${spacing[1]}px ${spacing[2]}px`,
        horizontalMargin: "0",
      };
  }
}

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

function getVariantTokens(variant: TabsVariant): TabsComponentToken {
  return variant === "secondary" ? getSecondaryTokens() : getPrimaryTokens();
}

/**
 * Tabs do design system. Aceita `variant` (`primary|secondary`) que controla
 * paleta de seleção e `dsSize` (`s|m|l`) para altura e espaçamento.
 */
export function Tabs(props: TabsProps): React.ReactElement {
  const { variant = "primary", dsSize = "m", size, className, ...rest } = props;

  const resolvedSize = size ? mapAntdSize(size) : dsSize;
  const sizeTokens = getSizeTokens(resolvedSize);
  const mergedClassName = ["ds-tabs", `ds-tabs-${resolvedSize}`, `ds-tabs-${variant}`, className].filter(Boolean).join(" ");

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: { ...getVariantTokens(variant), ...sizeTokens },
        },
      }}
    >
      <AntdTabs {...rest} className={mergedClassName} />
    </ConfigProvider>
  );
}

Tabs.displayName = "Tabs";

export type { TabsProps, TabsSize, TabsVariant } from "../../types/components/Tabs";
