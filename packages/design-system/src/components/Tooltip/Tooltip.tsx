import React from "react";
import { Tooltip as AntdTooltip, ConfigProvider } from "antd";
import type { TooltipProps as AntdTooltipProps } from "antd";
import { designSystemColors, radius } from "../../theme";

export type TooltipProps = AntdTooltipProps;

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  classNames,
  styles,
  overlayClassName,
  overlayStyle,
  overlayInnerStyle,
  ...rest
}) => {
  const rootClassName = ["ds-tooltip", overlayClassName, classNames?.root].filter(Boolean).join(" ");

  return (
    <ConfigProvider
      theme={{
        components: {
          Tooltip: {
            colorBgSpotlight: designSystemColors.neutral[800], // Dark background (#262626)
            colorTextLightSolid: designSystemColors.neutral[50], // Light text (#FAFAFA)
            borderRadius: radius.xl, // 8px
            fontFamily: '"Inter", sans-serif',
            fontSize: 13,
            lineHeight: 1.2,
            colorBorder: designSystemColors.neutral[800],
          },
        },
        token: {
          fontFamily: '"Inter", sans-serif',
        },
      }}
    >
      <AntdTooltip
        classNames={{
          ...classNames,
          root: rootClassName,
        }}
        styles={{
          ...styles,
          root: {
            maxWidth: 200,
            ...overlayStyle,
            ...styles?.root,
          },
          container: {
            ...overlayInnerStyle,
            ...styles?.container,
          },
        }}
        {...rest}
      >
        {children}
      </AntdTooltip>
    </ConfigProvider>
  );
};

Tooltip.displayName = "Tooltip";
