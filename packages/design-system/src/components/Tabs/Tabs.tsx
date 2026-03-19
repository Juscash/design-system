import React from "react";
import { Tabs as AntdTabs, ConfigProvider } from "antd";
import type { TabsProps as AntdTabsProps } from "antd";
import { designSystemColors, spacing } from "../../theme";

export type TabsSize = "s" | "m" | "l";
export type TabsVariant = "primary" | "secondary";

type CleanAntdProps = {
  [K in keyof AntdTabsProps as K extends "size" | "type" ? never : K]: AntdTabsProps[K];
};

export type TabsProps = CleanAntdProps & {
  dsSize?: TabsSize;
  size?: AntdTabsProps["size"];
  variant?: TabsVariant;
};

function getPrimaryTokens(): Record<string, any> {
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

function getSecondaryTokens(): Record<string, any> {
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

function getSizeTokens(dsSize?: TabsSize): Record<string, any> {
  switch (dsSize) {
    case "s":
      return {
        titleFontSize: 10,
        horizontalItemPadding: `1px ${spacing[1]}px`,
        horizontalMargin: "0",
      };
    case "l":
      return {
        titleFontSize: 13,
        horizontalItemPadding: `${spacing[1]}px ${spacing[3]}px`,
        horizontalMargin: "0",
      };
    case "m":
    default:
      return {
        titleFontSize: 13,
        horizontalItemPadding: `${spacing[1]}px ${spacing[2]}px`,
        horizontalMargin: "0",
      };
  }
}

export function Tabs(props: TabsProps): React.ReactElement {
  const { variant = "primary", dsSize = "m", size, className, ...rest } = props;

  const resolvedSize = size ? mapAntdSize(size) : dsSize;
  const sizeTokens = getSizeTokens(resolvedSize);
  const mergedClassName = ["ds-tabs", `ds-tabs-${resolvedSize}`, `ds-tabs-${variant}`, className].filter(Boolean).join(" ");

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
      <AntdTabs {...rest} className={mergedClassName} />
    </ConfigProvider>
  );
}

Tabs.displayName = "Tabs";

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
