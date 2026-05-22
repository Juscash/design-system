import React from "react";
import { Tooltip as AntdTooltip, ConfigProvider } from "antd";
import { designSystemColors, radius } from "../../theme";
import type {
  TooltipProps,
  TooltipSemanticClassNames,
  TooltipSemanticStyles,
} from "../../types/components/Tooltip";
import "./index.module.css";

const MAX_TOOLTIP_WIDTH = 200;
const TOOLTIP_FONT_SIZE = 13;

/**
 * Resolve um valor semÃ¢ntico do Antd Tooltip, que pode ser objeto literal ou
 * funÃ§Ã£o `(info) => objeto`. MantÃ©m a mesma interface contratada pelo Antd.
 */
function resolveSemanticValue<T extends object>(
  value: T | ((info: { props: TooltipProps }) => T) | undefined,
  props: TooltipProps,
): T | undefined {
  if (typeof value === "function") {
    return value({ props });
  }
  return value;
}

/**
 * Tooltip do design system com fundo escuro neutral[800] e texto claro
 * neutral[50], baseado no node Figma 4041:11954.
 */
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
            // Fundo escuro: neutral[800] (#262626)
            colorBgSpotlight: designSystemColors.neutral[800],
            // Texto claro: neutral[50] (#FAFAFA)
            colorTextLightSolid: designSystemColors.neutral[50],
            borderRadius: radius.xl,
            fontFamily: '"Inter", sans-serif',
            fontSize: TOOLTIP_FONT_SIZE,
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
            maxWidth: MAX_TOOLTIP_WIDTH,
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

export type { TooltipProps } from "../../types/components/Tooltip";
