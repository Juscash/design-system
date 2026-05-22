import React from "react";
import { Button as AntdButton, ConfigProvider } from "antd";
import type { ButtonToken } from "antd/es/button/style/token";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import type { ButtonProps, ButtonSize, ButtonType } from "../../types/components/Button";

const HEIGHT_XS = 24;
const HEIGHT_S = 32;
const HEIGHT_M = 36;
const FONT_SIZE_XS = 10;
const FONT_SIZE_DEFAULT = 13;

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
    defaultColor: designSystemColors.neutral[800],
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
    colorBorderDisabled: designSystemColors.neutral[200],
    defaultBg: "transparent",
    defaultBgDisabled: "transparent",
    colorBgContainerDisabled: "transparent",
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
    colorBorderDisabled: "transparent",
    colorBgContainerDisabled: "transparent",
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

function getSizeTokens(buttonSize: ButtonSize): Partial<ButtonToken> {
  if (buttonSize === "xs") {
    return {
      fontSize: FONT_SIZE_XS,
      controlHeight: HEIGHT_XS,
      paddingInline: spacing[2],
      borderRadius: radius.md,
    };
  }
  if (buttonSize === "s") {
    return {
      fontSize: FONT_SIZE_DEFAULT,
      controlHeight: HEIGHT_S,
      paddingInline: spacing[3],
      borderRadius: radius.xl,
    };
  }
  return {
    fontSize: FONT_SIZE_DEFAULT,
    controlHeight: HEIGHT_M,
    paddingInline: spacing[4],
    borderRadius: radius.xl,
  };
}

const VARIANT_TOKEN_BUILDERS: Record<Exclude<ButtonType, "outline">, () => Partial<ButtonToken>> = {
  primary: getPrimaryTokens,
  secondary: getSecondaryTokens,
  ghost: getGhostTokens,
  destructive: getDestructiveTokens,
  neutral: getNeutralTokens,
};

function getPaddingBlock(size: ButtonSize, isIconOnly: boolean): number | undefined {
  if (isIconOnly) return 0;
  if (size === "xs" || size === "s") return spacing[1];
  if (size === "m") return spacing[2];
  return undefined;
}

function getIconOnlySize(size: ButtonSize, isIconOnly: boolean): number | undefined {
  if (!isIconOnly) return undefined;
  if (size === "xs") return HEIGHT_XS;
  if (size === "s") return HEIGHT_S;
  return HEIGHT_M;
}

function buildButtonStyle(
  size: ButtonSize,
  isIconOnly: boolean,
  hasFocusClass: boolean,
  externalStyle: React.CSSProperties | undefined,
): React.CSSProperties {
  const paddingBlockValue = getPaddingBlock(size, isIconOnly);
  const iconOnlySize = getIconOnlySize(size, isIconOnly);

  if (paddingBlockValue === undefined && iconOnlySize === undefined) {
    return {
      boxShadow: hasFocusClass ? shadow.focus : undefined,
      ...externalStyle,
    };
  }

  return {
    ...(iconOnlySize !== undefined
      ? {
          width: `${iconOnlySize}px`,
          minWidth: `${iconOnlySize}px`,
          height: `${iconOnlySize}px`,
          paddingLeft: "0px",
          paddingRight: "0px",
        }
      : null),
    paddingTop: paddingBlockValue !== undefined ? `${paddingBlockValue}px` : undefined,
    paddingBottom: paddingBlockValue !== undefined ? `${paddingBlockValue}px` : undefined,
    boxShadow: hasFocusClass ? shadow.focus : undefined,
    ...externalStyle,
  };
}

/**
 * Botão do design system. Aceita as variantes proprietárias `primary`,
 * `secondary`, `outline`, `ghost`, `destructive` e `neutral`, e três tamanhos
 * (`xs|s|m`). Tanto `type` quanto `variant` são aceitos como sinônimos.
 */
export function Button(props: ButtonProps): React.ReactElement {
  const { type, variant, size = "m", style, children, icon, ...rest } = props;

  const resolvedType: ButtonType = variant || type || "primary";
  const isIconOnly = icon !== undefined && !children;
  const className = typeof rest.className === "string" ? rest.className : "";
  const hasFocusClass = className.includes("pseudo-focus-visible") || className.includes("pseudo-focus");

  const sizeTokens = getSizeTokens(size);
  const buttonStyle = buildButtonStyle(size, isIconOnly, hasFocusClass, style);

  const antdType: "primary" | "default" = resolvedType === "outline" ? "default" : "primary";
  const variantTokens: Partial<ButtonToken> =
    resolvedType === "outline" ? getOutlinedTokens() : VARIANT_TOKEN_BUILDERS[resolvedType]();

  return (
    <ConfigProvider
      theme={{
        components: { Button: { ...variantTokens, ...sizeTokens } },
      }}
    >
      <AntdButton
        type={antdType}
        style={buttonStyle}
        icon={icon}
        {...(children !== undefined ? { children } : null)}
        {...rest}
      />
    </ConfigProvider>
  );
}

Button.displayName = "Button";

export type { ButtonProps, ButtonSize, ButtonType } from "../../types/components/Button";
