"use client";

import React from "react";
import {
  Button as AntdButton,
  type ButtonProps as AntdButtonProps,
  ConfigProvider,
} from "antd";
import type { ButtonToken } from "antd/es/button/style/token";
import { designSystemColors } from "../../theme";
import { radius, shadow, spacing } from "../../theme";

type ButtonType =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "neutral";

type ButtonSize = "xs" | "s" | "m";

type CleanAntdProps = Omit<
  AntdButtonProps,
  "type" | "size" | "danger" | "variant"
>;

export type ButtonProps = CleanAntdProps & {
  type?: ButtonType;
  variant?: ButtonType;
  size?: ButtonSize;
};
function getPrimaryTokens(): Partial<ButtonToken> {
  return {
    colorPrimary: designSystemColors.brand.primary[600],
    colorPrimaryHover: designSystemColors.brand.primary[800],
    colorPrimaryActive: designSystemColors.brand.primary[800],
    colorTextLightSolid: designSystemColors.neutral[50],
    colorBgContainerDisabled: designSystemColors.neutral[300],
    colorTextDisabled: designSystemColors.neutral[400],
    primaryShadow: "none",
  };
}

function getSecondaryTokens(): Partial<ButtonToken> {
  return {
    colorPrimary: designSystemColors.brand.secondary[700],
    colorPrimaryHover: designSystemColors.brand.secondary[800],
    colorPrimaryActive: designSystemColors.brand.secondary[800],
    colorTextLightSolid: designSystemColors.neutral[50],

    colorBgContainerDisabled: designSystemColors.neutral[300],
    colorTextDisabled: designSystemColors.neutral[400],
    primaryShadow: "none",
  };
}

function getOutlinedTokens(): Partial<ButtonToken> {
  return {
    colorSuccessTextHover: designSystemColors.neutral[800],

    defaultColor: designSystemColors.neutral[50],
    defaultBorderColor: designSystemColors.neutral[300],

    colorText: designSystemColors.neutral[800],
    defaultActiveColor: designSystemColors.neutral[800],
    textTextHoverColor: designSystemColors.neutral[800],
    textTextActiveColor: designSystemColors.neutral[800],
    defaultHoverColor: designSystemColors.neutral[800],
    textTextColor: designSystemColors.neutral[800],
    defaultActiveBorderColor: designSystemColors.neutral[300],
    defaultHoverBorderColor: designSystemColors.neutral[300],

    defaultHoverBg: designSystemColors.neutral[100],
    defaultActiveBg: designSystemColors.neutral[100],

    colorTextDisabled: designSystemColors.neutral[400],
    colorBgContainerDisabled: designSystemColors.neutral[50],
    colorBorderDisabled: designSystemColors.neutral[200],

    defaultBgDisabled: designSystemColors.neutral[50],

    primaryShadow: "none",
    defaultShadow: "none",
  };
}
function getGhostTokens(): Partial<ButtonToken> {
  return {
    colorPrimary: "transparent",
    colorBgBase: "transparent",
    colorBgContainer: "transparent",
    colorPrimaryBg: "transparent",
    colorPrimaryBorder: "transparent",
    colorTextLightSolid: designSystemColors.neutral[800],
    colorPrimaryBorderHover: "transparent",
    colorPrimaryActive: designSystemColors.neutral[100],
    colorPrimaryHover: designSystemColors.neutral[100],
    colorTextDisabled: designSystemColors.neutral[400],
    primaryShadow: "none",
  };
}

function getDestructiveTokens(): Partial<ButtonToken> {
  return {
    colorPrimary: designSystemColors.feedback.red[500],
    colorPrimaryBorder: "transparent",
    primaryShadow: "none",
    colorTextLightSolid: designSystemColors.neutral[50],

    colorPrimaryHover: designSystemColors.feedback.red[900],
    colorPrimaryActive: designSystemColors.feedback.red[900],

    colorBgContainerDisabled: designSystemColors.neutral[300],
    colorTextDisabled: designSystemColors.neutral[400],
  };
}

function getNeutralTokens(): Partial<ButtonToken> {
  return {
    colorPrimary: designSystemColors.neutral[200],
    primaryShadow: "none",
    colorPrimaryHover: designSystemColors.neutral[400],
    colorPrimaryActive: designSystemColors.neutral[400],
    colorTextLightSolid: designSystemColors.neutral[800],
    colorTextDisabled: designSystemColors.neutral[400],
    colorBgContainerDisabled: designSystemColors.neutral[300],
  };
}

function getSizeTokens(buttonSize?: ButtonSize): Partial<ButtonToken> {
  if (buttonSize === "xs") {
    return {
      fontSize: 10,
      controlHeight: 24,
      paddingInline: spacing[2],
      borderRadius: radius.md,
    };
  }
  if (buttonSize === "s") {
    return {
      fontSize: 13,
      controlHeight: 32,
      paddingInline: spacing[3],
      borderRadius: radius.xl,
    };
  }
  return {
    fontSize: 13,
    controlHeight: 36,
    paddingInline: spacing[4],
    borderRadius: radius.xl,
  };
}

export function Button(props: ButtonProps): React.ReactElement {
  const { type, variant, size = "m", style, children, icon, ...rest } = props;

  const resolvedType = variant || type || "primary";
  const isIconOnly = icon !== undefined && !children;
  const className = typeof rest.className === "string" ? rest.className : "";
  const hasFocusClass =
    className.includes("pseudo-focus-visible") ||
    className.includes("pseudo-focus");
  const sizeTokens = getSizeTokens(size);

  const paddingBlockValue = isIconOnly
    ? 0
    : size === "xs"
      ? spacing[1]
      : size === "s"
        ? spacing[1]
        : size === "m"
          ? spacing[2]
          : undefined;

  const iconOnlySize = isIconOnly
    ? size === "xs"
      ? 24
      : size === "s"
        ? 32
        : 36
    : undefined;

  const applyTheme = (
    tokens: Partial<ButtonToken>,
    antdType: "primary" | "default",
  ) => (
    <ConfigProvider
      theme={{
        components: { Button: { ...tokens, ...sizeTokens } },
      }}
    >
      <AntdButton
        type={antdType}
        style={
          paddingBlockValue !== undefined || iconOnlySize !== undefined
            ? {
                ...(iconOnlySize !== undefined
                  ? {
                      width: `${iconOnlySize}px`,
                      minWidth: `${iconOnlySize}px`,
                      height: `${iconOnlySize}px`,
                      paddingLeft: "0px",
                      paddingRight: "0px",
                    }
                  : null),
                paddingTop: `${paddingBlockValue}px`,
                paddingBottom: `${paddingBlockValue}px`,
                boxShadow: hasFocusClass ? shadow.focus : undefined,
                ...style,
              }
            : {
                boxShadow: hasFocusClass ? shadow.focus : undefined,
                ...style,
              }
        }
        icon={icon}
        {...(children !== undefined ? { children } : null)}
        {...rest}
      />
    </ConfigProvider>
  );

  if (resolvedType === "primary") {
    return applyTheme(getPrimaryTokens(), "primary");
  }

  if (resolvedType === "secondary") {
    return applyTheme(getSecondaryTokens(), "primary");
  }

  if (resolvedType === "ghost") {
    return applyTheme(getGhostTokens(), "primary");
  }

  if (resolvedType === "destructive") {
    return applyTheme(getDestructiveTokens(), "primary");
  }

  if (resolvedType === "neutral") {
    return applyTheme(getNeutralTokens(), "primary");
  }

  if (resolvedType === "outline") {
    return applyTheme(getOutlinedTokens(), "default");
  }

  if (size) {
    return (
      <ConfigProvider theme={{ components: { Button: { ...sizeTokens } } }}>
        <AntdButton
          type="default"
          style={
            paddingBlockValue !== undefined || iconOnlySize !== undefined
              ? {
                  ...(iconOnlySize !== undefined
                    ? {
                        width: `${iconOnlySize}px`,
                        minWidth: `${iconOnlySize}px`,
                        height: `${iconOnlySize}px`,
                        paddingLeft: "0px",
                        paddingRight: "0px",
                      }
                    : null),
                  paddingTop: `${paddingBlockValue}px`,
                  paddingBottom: `${paddingBlockValue}px`,
                  boxShadow: hasFocusClass ? shadow.focus : undefined,
                  ...style,
                }
              : {
                  boxShadow: hasFocusClass ? shadow.focus : undefined,
                  ...style,
                }
          }
          icon={icon}
          {...(children !== undefined ? { children } : null)}
          {...rest}
        />
      </ConfigProvider>
    );
  }

  return (
    <AntdButton
      type="default"
      style={{ boxShadow: hasFocusClass ? shadow.focus : undefined, ...style }}
      icon={icon}
      {...(children !== undefined ? { children } : null)}
      {...rest}
    />
  );
}

Button.displayName = "Button";
