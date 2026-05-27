import React from "react";
import { ConfigProvider, Card as AntdCard } from "antd";
import { designSystemColors, radius, spacing, shadow } from "../../theme";
import type { ComponentToken } from "antd/es/card/style";
import type { CardProps } from "../../types/components/Card";
import "./index.module.css";

const CARD_CLICKABLE_CLASS = "ds-card-clickable";

// O Card do Figma não tem header próprio — título/conteúdo entram via
// `children`. Só configuramos o padding do corpo (`spacing[6]` = 24).
const baseTokens: Partial<ComponentToken> = {
  bodyPadding: spacing[6],
};

/**
 * Card do design system, com fundo `neutral/50`, borda 1px `neutral/300`,
 * raio `radius.xl` (8) e sombra `shadow.xs` por padrão.
 *
 * Quando `clickable` é `true`, o card vira interativo: recebe `tabIndex=0`,
 * `cursor: pointer`, a classe `ds-card-clickable` (que ativa `:hover` com
 * `shadow.m` e `:focus-visible` com `shadow.focus` — definidos em
 * `index.module.css`). O hover/focus do antd (`hoverable`) é habilitado
 * apenas neste caso. Regra do design no Figma 4069:6522:
 * "Inclua o hover e focus apenas em cards clicáveis".
 */
export function Card({ clickable, style, className, ...props }: CardProps): React.ReactElement {
  const composedStyle: React.CSSProperties = clickable ? { cursor: "pointer", ...style } : { ...(style ?? {}) };
  const composedClassName = [className, clickable ? CARD_CLICKABLE_CLASS : undefined].filter(Boolean).join(" ") || undefined;

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
      <AntdCard
        hoverable={clickable}
        tabIndex={clickable ? 0 : undefined}
        style={composedStyle}
        className={composedClassName}
        {...props}
      />
    </ConfigProvider>
  );
}

Card.displayName = "Card";

export type { CardProps } from "../../types/components/Card";
