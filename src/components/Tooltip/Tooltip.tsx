import React from "react";
import { Tooltip as AntdTooltip, ConfigProvider } from "antd";
import type { TooltipProps as AntdTooltipProps } from "antd";
import { designSystemColors, radius } from "../../theme";

export type TooltipProps = AntdTooltipProps;

type TooltipSemanticClassNames = {
  root?: string;
  container?: string;
  arrow?: string;
};

type TooltipSemanticStyles = {
  root?: React.CSSProperties;
  container?: React.CSSProperties;
  arrow?: React.CSSProperties;
};

function resolveSemanticValue<T extends object>(
  value: T | ((info: { props: TooltipProps }) => T) | undefined,
  props: TooltipProps,
) {
  if (typeof value === "function") {
    return value({ props });
  }

  return value;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  classNames,
  styles,
  overlayClassName,
  overlayStyle,
  overlayInnerStyle,
  ...rest
}) => {
  const tooltipProps: TooltipProps = {
    children,
    classNames,
    styles,
    overlayClassName,
    overlayStyle,
    overlayInnerStyle,
    ...rest,
  };

  const resolvedClassNames = resolveSemanticValue<TooltipSemanticClassNames>(classNames, tooltipProps) ?? {};
  const resolvedStyles = resolveSemanticValue<TooltipSemanticStyles>(styles, tooltipProps) ?? {};

  const rootClassName = ["ds-tooltip", overlayClassName, resolvedClassNames.root].filter(Boolean).join(" ");

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
          ...resolvedClassNames,
          root: rootClassName,
        }}
        styles={{
          ...resolvedStyles,
          root: {
            maxWidth: 200,
            ...overlayStyle,
            ...resolvedStyles.root,
          },
          container: {
            ...overlayInnerStyle,
            ...resolvedStyles.container,
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
