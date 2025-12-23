"use client";

import React from "react";
import { ConfigProvider, Card as AntdCard } from "antd";
import type { CardProps as AntdCardProps } from "antd";
import { designSystemColors, radius, spacing } from "../theme";
import type { ComponentToken } from "antd/es/card/style";

export type CardProps = AntdCardProps;

const baseTokens: Partial<ComponentToken> = {
  bodyPadding: spacing[6],
  headerBg: designSystemColors.neutral[50],
};

export function Card(props: CardProps): React.ReactElement {
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
        },
      }}
    >
      <AntdCard {...props} />
    </ConfigProvider>
  );
}
