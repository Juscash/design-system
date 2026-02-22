import React from "react";
import { ConfigProvider } from "antd";
import {
  CircleCheck,
  CircleX,
  AlertCircle,
  Info,
  Inbox,
} from "lucide-react";
import { designSystemColors, spacing, radius } from "../../theme";
import { Body1, Body2, Heading3 } from "../Typography/Typography";
import type { CustomTypographyProps } from "../Typography/Typography";

type EmptyStateVariant = "neutral" | "error" | "success" | "info" | "warning";
type EmptyStateSize = "xs" | "s" | "m";

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
  size?: EmptyStateSize;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  fullScreen?: boolean;
  centered?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function getVariantIcon(variant: EmptyStateVariant, size: EmptyStateSize) {
  const iconSize = size === "xs" ? 32 : size === "s" ? 48 : 64;

  switch (variant) {
    case "success":
      return <CircleCheck size={iconSize} />;
    case "error":
      return <CircleX size={iconSize} />;
    case "warning":
      return <AlertCircle size={iconSize} />;
    case "info":
      return <Info size={iconSize} />;
    case "neutral":
    default:
      return <Inbox size={iconSize} />;
  }
}

function getVariantColor(variant: EmptyStateVariant): string {
  switch (variant) {
    case "success":
      return designSystemColors.feedback.green[500];
    case "error":
      return designSystemColors.feedback.red[500];
    case "warning":
      return designSystemColors.feedback.yellow[500];
    case "info":
      return designSystemColors.feedback.blue[500];
    case "neutral":
    default:
      return designSystemColors.neutral[300];
  }
}

function getVariantBackground(variant: EmptyStateVariant): string {
  switch (variant) {
    case "success":
      return designSystemColors.feedback.green[50];
    case "error":
      return designSystemColors.feedback.red[50];
    case "warning":
      return designSystemColors.feedback.yellow[50];
    case "info":
      return designSystemColors.feedback.blue[50];
    case "neutral":
    default:
      return designSystemColors.neutral[50];
  }
}

function getSizeStyles(size: EmptyStateSize): Record<string, string> {
  switch (size) {
    case "xs":
      return {
        padding: `${spacing[3]}px`,
        gap: `${spacing[2]}px`,
      };
    case "s":
      return {
        padding: `${spacing[5]}px`,
        gap: `${spacing[3]}px`,
      };
    case "m":
    default:
      return {
        padding: `${spacing[6]}px`,
        gap: `${spacing[4]}px`,
      };
  }
}

function getIconSizeStyle(size: EmptyStateSize): number {
  switch (size) {
    case "xs":
      return 32;
    case "s":
      return 48;
    case "m":
    default:
      return 64;
  }
}

function getTitleSize(size: EmptyStateSize): React.FC<React.PropsWithChildren<{ color?: CustomTypographyProps["color"] }>> {
  switch (size) {
    case "xs":
      return Body1;
    case "s":
      return Body1;
    case "m":
    default:
      return Heading3;
  }
}

export function EmptyState({
  variant = "neutral",
  size = "m",
  icon,
  title,
  description,
  action,
  primaryAction,
  secondaryAction,
  fullScreen = false,
  centered = true,
  className = "",
  style = {},
}: EmptyStateProps): React.ReactElement {
  const iconColor = getVariantColor(variant);
  const iconBackground = getVariantBackground(variant);
  const sizeStyles = getSizeStyles(size);
  const iconSize = getIconSizeStyle(size);
  const TitleComponent = getTitleSize(size);

  const IconContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${iconSize * 1.5}px`,
        height: `${iconSize * 1.5}px`,
        borderRadius: radius.full,
        backgroundColor: iconBackground,
        color: iconColor,
      }}
    >
      {children}
    </div>
  );

  const Content = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: centered ? "center" : "flex-start",
        textAlign: centered ? "center" : "left",
        width: "100%",
        maxWidth: size === "xs" ? "100%" : "400px",
        gap: sizeStyles.gap,
        padding: sizeStyles.padding,
        ...style,
      }}
      className={`empty-state ${className}`}
    >
      {icon && <IconContainer>{icon}</IconContainer>}

      {title && (
        <TitleComponent
          color={variant === "neutral" ? "dark" : (variant as CustomTypographyProps["color"])}
        >
          {title}
        </TitleComponent>
      )}

      {description && (
        <Body2 color={variant === "neutral" ? "neutral" : (variant as CustomTypographyProps["color"])}>
          {description}
        </Body2>
      )}

      {action && <div style={{ marginTop: size === "xs" ? spacing[2] : spacing[3] }}>{action}</div>}

      {(primaryAction || secondaryAction) && (
        <div
          style={{
            display: "flex",
            flexDirection: centered ? "row" : "column",
            alignItems: centered ? "center" : "flex-start",
            gap: spacing[3],
            marginTop: size === "xs" ? spacing[2] : spacing[3],
          }}
        >
          {primaryAction && <div>{primaryAction}</div>}
          {secondaryAction && <div>{secondaryAction}</div>}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "transparent",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            width: "100%",
            backgroundColor: designSystemColors.neutral[50],
          }}
        >
          <Content />
        </div>
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "transparent",
        },
      }}
    >
      <Content />
    </ConfigProvider>
  );
}

EmptyState.displayName = "EmptyState";
