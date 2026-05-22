import React from "react";
import { Heart } from "lucide-react";
import { Button } from "../Button";
import { designSystemColors, radius, spacing } from "../../theme/foundations";
import type { EmptyStateProps } from "../../types/components/EmptyState";

const iconWrapperStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  minWidth: 48,
  minHeight: 48,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: spacing[1],
  borderRadius: radius["2xl"],
  background: designSystemColors.neutral[200],
  color: designSystemColors.neutral[800],
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  maxWidth: 300,
  fontFamily: "Inter, sans-serif",
  fontSize: 13,
  lineHeight: "1.2",
  fontWeight: 700,
  color: designSystemColors.neutral[800],
  textAlign: "center",
};

const descriptionStyle: React.CSSProperties = {
  margin: 0,
  maxWidth: 300,
  fontFamily: "Inter, sans-serif",
  fontSize: 13,
  lineHeight: "1.2",
  fontWeight: 400,
  color: designSystemColors.neutral[500],
  textAlign: "center",
};

/**
 * Estado vazio padrão do design system. Renderiza um ícone, título, descrição
 * opcional e um botão de ação opcional, todos centralizados.
 */
export function EmptyState(props: EmptyStateProps): React.ReactElement {
  const { title, description, actionLabel, actionButtonProps, icon, className, style } = props;

  return (
    <div
      className={className}
      style={{
        width: 314,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing[4],
        ...style,
      }}
    >
      <div aria-hidden="true" style={iconWrapperStyle}>
        {icon ?? <Heart size={24} strokeWidth={1.75} />}
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: spacing[2],
        }}
      >
        <p style={titleStyle}>{title}</p>
        {description ? <p style={descriptionStyle}>{description}</p> : null}
        {actionLabel ? (
          <Button type="primary" size="s" {...actionButtonProps}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

EmptyState.displayName = "EmptyState";

export type { EmptyStateProps } from "../../types/components/EmptyState";
