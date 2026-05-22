import React from "react";
import { ConfigProvider, Switch as AntdSwitch } from "antd";
import type { ComponentToken } from "antd/es/switch/style";
import { designSystemColors, shadow, spacing } from "../../theme";
import type { SwitchProps } from "../../types/components/Switch";

const TRACK_HEIGHT = 24;
const TRACK_HEIGHT_SM = 20;
const TRACK_MIN_WIDTH = 44;
const TRACK_MIN_WIDTH_SM = 36;
const TRACK_PADDING = 2;
const HANDLE_SIZE = 20;
const HANDLE_SIZE_SM = 16;

const baseTokens: Partial<ComponentToken> = {
  trackHeight: TRACK_HEIGHT,
  trackHeightSM: TRACK_HEIGHT_SM,
  trackMinWidth: TRACK_MIN_WIDTH,
  trackMinWidthSM: TRACK_MIN_WIDTH_SM,
  trackPadding: TRACK_PADDING,
  handleSize: HANDLE_SIZE,
  handleSizeSM: HANDLE_SIZE_SM,
  handleBg: designSystemColors.neutral[50],
  handleShadow: shadow.xs,
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

/**
 * Switch do design system. Aceita `error` como prop proprietária, que aplica
 * a paleta vermelha aos estados.
 */
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

Switch.displayName = "Switch";

export type { SwitchProps } from "../../types/components/Switch";
