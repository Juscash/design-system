"use client";

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

export function Card({
  clickable,
  style,
  ...props
}: CardProps): React.ReactElement {
  const AntdCardComponent =
    AntdCard as unknown as React.ComponentType<CardProps>;

  const mergedStyle = clickable ? { cursor: "pointer", ...style } : style;

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: baseTokens,
        },
        token: {
          borderRadius: radius.xl,
          colorBorder: designSystemColors.neutral[300],
          colorBorderSecondary: designSystemColors.neutral[300],
          colorBgContainer: designSystemColors.neutral[50],
          boxShadowTertiary: shadow.m,
        },
      }}
    >
      <AntdCardComponent hoverable={clickable} style={mergedStyle} {...props} />
    </ConfigProvider>
  );
}
