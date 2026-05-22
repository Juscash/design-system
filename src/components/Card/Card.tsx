import React from "react";
import { ConfigProvider, Card as AntdCard } from "antd";
import type { CardProps as AntdCardProps } from "antd";
import { designSystemColors, radius, spacing, shadow } from "../../theme";
import type { ComponentToken } from "antd/es/card/style";

export type CardProps = AntdCardProps & {
  clickable?: boolean;
};

const baseTokens: Partial<ComponentToken> = {
  bodyPadding: spacing[6],
  headerBg: designSystemColors.neutral[50],
};

export function Card({ clickable, style, className, ...props }: CardProps): React.ReactElement {
  const AntdCardComponent = AntdCard as unknown as React.ComponentType<CardProps>;

  const clickableStyle: React.CSSProperties = clickable
    ? {
        cursor: "pointer",
        ...style,
      }
    : { ...style };

  const mergedClassName = [className, clickable ? "ds-card-clickable" : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: baseTokens,
        },
        token: {
          borderRadius: radius.xl,
          borderRadiusLG: radius.xl,
          colorBorder: designSystemColors.neutral[300],
          colorBorderSecondary: designSystemColors.neutral[300],
          colorBgContainer: designSystemColors.neutral[50],
          boxShadow: shadow.xs,
          boxShadowTertiary: shadow.xs,
          boxShadowSecondary: shadow.m,
        },
      }}
    >
      <AntdCardComponent
        hoverable={clickable}
        tabIndex={clickable ? 0 : undefined}
        style={clickableStyle}
        className={mergedClassName}
        {...props}
      />
    </ConfigProvider>
  );
}
