import React from "react";
import { Tooltip as AntdTooltip, ConfigProvider } from "antd";
import type { TooltipProps as AntdTooltipProps } from "antd";
import { designSystemColors, radius } from "../../theme";

export type TooltipProps = AntdTooltipProps;

export const Tooltip: React.FC<TooltipProps> = ({ children, ...rest }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tooltip: {
            colorBgSpotlight: designSystemColors.neutral[800], // Dark background (#262626)
            colorTextLightSolid: designSystemColors.neutral[50], // Light text (#FAFAFA)
            borderRadius: radius.md, // 4px
            fontFamily: '"Inter", sans-serif',
            fontSize: 13,
            lineHeight: 1.2,
          },
        },
        token: {
          fontFamily: '"Inter", sans-serif',
        },
      }}
    >
      <AntdTooltip {...rest}>{children}</AntdTooltip>
    </ConfigProvider>
  );
};

Tooltip.displayName = "Tooltip";
