"use client";

import React from "react";
import { Alert as AntdAlert, ConfigProvider } from "antd";
import type { AlertProps as AntdAlertProps } from "antd";
// import type { ComponentToken } from "antd/es/alert/style/token";

type AlertVariant = "neutral" | "error" | "success" | "info" | "warning";
import { CircleCheck, CircleX, AlertCircle, Info } from "lucide-react";
import { designSystemColors, radius, spacing } from "../../theme";

type CleanAntdProps = {
  [K in keyof AntdAlertProps as K extends "type"
    ? never
    : K]: AntdAlertProps[K];
};

export type AlertProps = CleanAntdProps & {
  type?: AlertVariant;
  showLine2?: boolean;
  showButton?: boolean;
  showLeftIcon?: boolean;
};

function getNeutralTokens(): Record<string, any> {
  return {
    colorInfoBg: designSystemColors.neutral[50],
    colorInfoBorder: designSystemColors.neutral[300],
    colorTextCount: designSystemColors.neutral[500],
    colorTextHeading: designSystemColors.neutral[800],
    colorText: designSystemColors.neutral[500],
    colorIcon: designSystemColors.neutral[800], // Explicit icon color if needed
  };
}

function getErrorTokens(): Record<string, any> {
  return {
    colorErrorBg: designSystemColors.neutral[50], // Keep neutral bg
    colorErrorBorder: designSystemColors.neutral[300], // Keep neutral border
    colorTextHeading: designSystemColors.feedback.red[500], // Red title
    colorText: designSystemColors.feedback.red[500], // Red description
    colorError: designSystemColors.feedback.red[500], // Red icon
  };
}

function getSuccessTokens(): Record<string, any> {
  return {
    colorSuccessBg: designSystemColors.neutral[50],
    colorSuccessBorder: designSystemColors.neutral[300],
    colorTextHeading: designSystemColors.feedback.green[500],
    colorText: designSystemColors.feedback.green[500],
    colorSuccess: designSystemColors.feedback.green[500],
  };
}

function getInfoTokens(): Record<string, any> {
  return {
    colorInfoBg: designSystemColors.neutral[50],
    colorInfoBorder: designSystemColors.neutral[300],
    colorTextHeading: designSystemColors.feedback.blue[500],
    colorText: designSystemColors.feedback.blue[500],
    colorInfo: designSystemColors.feedback.blue[500],
  };
}

function getWarningTokens(): Record<string, any> {
  return {
    colorWarningBg: designSystemColors.neutral[50],
    colorWarningBorder: designSystemColors.neutral[300],
    colorTextHeading: designSystemColors.feedback.yellow[500],
    colorText: designSystemColors.feedback.yellow[500],
    colorWarning: designSystemColors.feedback.yellow[500],
  };
}

export function Alert(props: AlertProps): React.ReactElement {
  const {
    type = "neutral",
    showLine2,
    showButton,
    showLeftIcon,
    ...rest
  } = props;

  const finalShowIcon = rest.showIcon ?? showLeftIcon;
  const hasDescription = !!(rest.description || showLine2);

  const getDefaultIcon = () => {
    const iconProps = { size: 16 };
    switch (type) {
      case "success":
        return <CircleCheck {...iconProps} />;
      case "info":
        return <Info {...iconProps} />;
      case "warning":
        return <AlertCircle {...iconProps} />;
      case "error":
        return <CircleX {...iconProps} />;
      case "neutral":
      default:
        return <Info {...iconProps} />;
    }
  };

  const resolvedIcon = rest.icon || (finalShowIcon ? getDefaultIcon() : null);

  const iconNode =
    hasDescription && resolvedIcon && React.isValidElement(resolvedIcon)
      ? React.cloneElement(resolvedIcon as React.ReactElement<any>, {
          style: {
            marginTop: 4,
            ...((resolvedIcon as React.ReactElement<any>).props?.style || {}),
          },
        })
      : resolvedIcon;

  const antdType =
    type === "neutral" ? "info" : (type as AntdAlertProps["type"]);

  const getVariantTokens = () => {
    switch (type) {
      case "neutral":
        return getNeutralTokens();
      case "error":
        return getErrorTokens();
      case "success":
        return getSuccessTokens();
      case "info":
        return getInfoTokens();
      case "warning":
        return getWarningTokens();
      default:
        // For standard Antd types without override, we might want to enforce our style too.
        // But mapped types usually cover it.
        return {};
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Alert: {
            ...getVariantTokens(),
            paddingContentVertical: spacing[2], // 8px
            paddingContentHorizontal: spacing[4], // 16px
            borderRadiusLG: radius.xl, // 8px (container)
            withDescriptionIconSize: 16, // heading/06 - 20px
            defaultPadding: `${spacing[2]}px ${spacing[4]}px`,
          },
        },
      }}
    >
      <AntdAlert
        {...rest}
        type={antdType}
        showIcon={finalShowIcon}
        icon={iconNode}
        className={type === "neutral" ? "ant-alert-neutral" : ""}
        style={{
          ...rest.style,
        }}
      />
    </ConfigProvider>
  );
}

Alert.displayName = "Alert";
