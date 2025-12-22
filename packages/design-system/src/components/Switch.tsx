"use client";

import React from "react";
import { ConfigProvider, Switch as AntdSwitch } from "antd";
import type { SwitchProps as AntdSwitchProps } from "antd";
import { designSystemColors, spacing } from "../theme";
import type { ComponentToken } from "antd/es/switch/style";

export type SwitchProps = AntdSwitchProps & {
  error?: boolean;
};

const baseTokens: Partial<ComponentToken> = {
  trackHeight: 24,
  trackHeightSM: 20,
  trackMinWidth: 44,
  trackMinWidthSM: 36,
  trackPadding: 2,
  handleSize: 20,
  handleSizeSM: 16,
  handleBg: designSystemColors.neutral[50],
  handleShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  innerMinMargin: spacing[2],
  innerMaxMargin: spacing[3],
  innerMinMarginSM: spacing[1],
  innerMaxMarginSM: spacing[2],
};

const baseTokenOverrides = {
  colorPrimary: designSystemColors.brand.primary[600],
  colorPrimaryHover: designSystemColors.brand.primary[700],
  colorPrimaryActive: designSystemColors.brand.primary[800],
  colorBorder: designSystemColors.neutral[300],
  colorBgContainer: designSystemColors.neutral[200],
  colorText: designSystemColors.neutral[50],
};

const errorTokenOverrides = {
  colorPrimary: designSystemColors.feedback.red[500],
  colorPrimaryHover: designSystemColors.feedback.red[900],
  colorPrimaryActive: designSystemColors.feedback.red[900],
  colorBorder: designSystemColors.neutral[300],
  colorBgContainer: designSystemColors.neutral[200],
  colorText: designSystemColors.neutral[50],
};

export function Switch(props: SwitchProps): React.ReactElement {
  const { error, ...rest } = props;

  const tokenOverrides = error ? errorTokenOverrides : baseTokenOverrides;

  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: baseTokens,
        },
        token: tokenOverrides,
      }}
    >
      <AntdSwitch {...rest} />
    </ConfigProvider>
  );
}
