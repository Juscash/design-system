import React from "react";
import { ConfigProvider, Card as AntdCard } from "antd";
import { designSystemColors, radius, spacing, shadow } from "../../theme";
import type { ComponentToken } from "antd/es/card/style";
import type { CardProps } from "../../types/components/Card";
import "./index.module.css";

const baseTokens: Partial<ComponentToken> = {
  bodyPadding: spacing[6],
  headerBg: designSystemColors.neutral[50],
};

/**
 * Card do design system, com sombra `xs` por padrão. Se `clickable` for
 * verdadeiro adiciona cursor pointer, tabIndex 0 e a classe
 * `ds-card-clickable` consumida pelos overrides globais de hover/focus.
 */
export function Card({ clickable, style, className, ...props }: CardProps): React.ReactElement {
  const clickableStyle: React.CSSProperties = clickable
    ? { cursor: "pointer", ...style }
    : { ...style };

  const mergedClassName = [className, clickable ? "ds-card-clickable" : undefined].filter(Boolean).join(" ");

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
      <AntdCard hoverable={clickable} tabIndex={clickable ? 0 : undefined} style={clickableStyle} className={mergedClassName} {...props} />
    </ConfigProvider>
  );
}

Card.displayName = "Card";

export type { CardProps } from "../../types/components/Card";
