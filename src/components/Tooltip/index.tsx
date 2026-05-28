import React from "react";
import { Tooltip as AntdTooltip, ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";
import { designSystemColors, radius } from "../../theme";
import type {
  TooltipProps,
  TooltipSemanticClassNames,
  TooltipSemanticStyles,
} from "../../types/components/Tooltip";
import "./index.module.css";

const MAX_TOOLTIP_WIDTH = 200;
const TOOLTIP_FONT_SIZE = 13;
const TOOLTIP_LINE_HEIGHT = 1.2;
const INTER_FONT_FAMILY = '"Inter", sans-serif';

/**
 * Tema local do Tooltip do design system. Mantém os tokens nativos do Antd
 * alinhados com `neutral[800]` (fundo) e `neutral[50]` (texto), conforme o
 * frame `4041:9017` do Figma. O CSS Module `index.module.css` complementa
 * com regras de padding, gap, max-width e seta.
 */
function getTooltipTheme(): ThemeConfig {
  return {
    components: {
      Tooltip: {
        colorBgSpotlight: designSystemColors.neutral[800],
        colorTextLightSolid: designSystemColors.neutral[50],
        borderRadius: radius.xl,
        fontFamily: INTER_FONT_FAMILY,
        fontSize: TOOLTIP_FONT_SIZE,
        lineHeight: TOOLTIP_LINE_HEIGHT,
        colorBorder: designSystemColors.neutral[800],
      },
    },
    token: {
      fontFamily: INTER_FONT_FAMILY,
    },
  };
}

/**
 * Resolve um valor semântico do Antd Tooltip, que pode ser objeto literal ou
 * função `(info) => objeto`. Mantém a mesma interface contratada pelo Antd.
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
 * Tooltip do design system com fundo escuro `neutral[800]` e texto claro
 * `neutral[50]`, baseado no frame Figma `4041:9017` (matriz `side`).
 */
export function Tooltip(props: TooltipProps): React.ReactElement {
  const { children, classNames, styles, overlayClassName, overlayStyle, overlayInnerStyle, ...rest } = props;

  const resolvedClassNames = resolveSemanticValue<TooltipSemanticClassNames>(classNames, props) ?? {};
  const resolvedStyles = resolveSemanticValue<TooltipSemanticStyles>(styles, props) ?? {};

  const rootClassName = ["ds-tooltip", overlayClassName, resolvedClassNames.root].filter(Boolean).join(" ");

  return (
    <ConfigProvider theme={getTooltipTheme()}>
      <AntdTooltip
        classNames={{ ...resolvedClassNames, root: rootClassName }}
        styles={{
          ...resolvedStyles,
          root: { maxWidth: MAX_TOOLTIP_WIDTH, ...overlayStyle, ...resolvedStyles.root },
          container: { ...overlayInnerStyle, ...resolvedStyles.container },
        }}
        {...rest}
      >
        {children}
      </AntdTooltip>
    </ConfigProvider>
  );
}

Tooltip.displayName = "Tooltip";

export type { TooltipProps } from "../../types/components/Tooltip";
