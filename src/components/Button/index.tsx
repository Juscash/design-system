import React from "react";
import { Button as AntdButton, ConfigProvider } from "antd";
import type { ButtonToken } from "antd/es/button/style/token";
import * as LucideIcons from "lucide-react";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import type { ButtonProps, ButtonSize, ButtonType } from "../../types/components/Button";
import "./index.module.css";

const BASE_CLASS = "ds-button";

const ICON_SIZE_XS = 12;
const ICON_SIZE_S = 14;
const ICON_SIZE_M = 16;

const HEIGHT_XS = 24;
const HEIGHT_S = 32;
const HEIGHT_M = 36;
const FONT_SIZE_XS = 10;
const FONT_SIZE_DEFAULT = 13;

/**
 * Tokens da variante `primary`. Fundo verde JusCash (brand 600), texto
 * branco neutro 50. Hover e active idênticos (brand 800), conforme Figma.
 */
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

/**
 * Tokens da variante `secondary`. Fundo azul secundário (brand secondary 700),
 * texto branco. Hover/active escurecem para secondary 800.
 */
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

/**
 * Tokens da variante `outline`. Botão com borda neutra 300 e texto neutro 800;
 * em hover ganha fundo neutro 100, mantendo borda e texto.
 */
function getOutlinedTokens(): Partial<ButtonToken> {
  return {
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
    colorBorderDisabled: designSystemColors.border.disabled,
    defaultBg: "transparent",
    defaultBgDisabled: "transparent",
    colorBgContainerDisabled: "transparent",
    primaryShadow: "none",
    defaultShadow: "none",
  };
}

/**
 * Tokens da variante `ghost`. Fundo totalmente transparente em default; em
 * hover/active ganha fundo neutro 100. Texto neutro 800 em estados visíveis.
 */
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

/**
 * Tokens da variante `destructive`. Fundo vermelho `feedback.red.500` em
 * default e `feedback.red.900` em hover/active. Texto branco neutro 50.
 */
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

/**
 * Tokens da variante `neutral`. Fundo neutro 200 em default e neutro 400 em
 * hover/active. Texto sempre neutro 800.
 */
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

/**
 * Tokens de tamanho (`xs`, `s`, `m`). Define `controlHeight`, `fontSize`,
 * `paddingInline` e `borderRadius` conforme a página Componentes do Figma:
 *
 * - `xs`: 24px de altura, fonte 10px (caption/01), padding 8px, radius 4px (`md`)
 * - `s`:  32px de altura, fonte 13px (body/02), padding 12px, radius 8px (`xl`)
 * - `m`:  36px de altura, fonte 13px (body/02), padding 16px, radius 8px (`xl`)
 */
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

/**
 * Calcula o `paddingBlock` (topo e base) aplicado ao botão. Botões
 * icon-only não recebem padding vertical (são quadrados); botões com texto
 * usam 4px (xs/s) ou 8px (m) para reservar espaço de baseline.
 */
function getPaddingBlock(size: ButtonSize, isIconOnly: boolean): number | undefined {
  if (isIconOnly) return 0;
  if (size === "xs" || size === "s") return spacing[1];
  if (size === "m") return spacing[2];
  return undefined;
}

/**
 * Quando o botão é icon-only, a largura iguala a altura definida pelo tamanho.
 * Retorna `undefined` para botões com texto (largura fluida).
 */
function getIconOnlySize(size: ButtonSize, isIconOnly: boolean): number | undefined {
  if (!isIconOnly) return undefined;
  if (size === "xs") return HEIGHT_XS;
  if (size === "s") return HEIGHT_S;
  return HEIGHT_M;
}

/**
 * Monta o objeto de style inline final do botão. Reúne padding vertical,
 * dimensões quadradas para icon-only, sombra de foco quando a classe
 * `pseudo-focus-visible|pseudo-focus` está presente (addon do Storybook) e
 * o style externo passado pelo consumidor.
 */
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
    ...(iconOnlySize !== undefined ?
      {
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
 * Retorna o tamanho de ícone (em px) recomendado para cada tamanho de botão.
 * Aplicado automaticamente quando `icon` é informado como string.
 */
function getIconPixelSize(size: ButtonSize): number {
  if (size === "xs") return ICON_SIZE_XS;
  if (size === "s") return ICON_SIZE_S;
  return ICON_SIZE_M;
}

/**
 * Resolve a prop `icon` em um `ReactNode`. Quando `icon` é uma string,
 * busca o componente correspondente em `lucide-react` (ex.: `"Search"` →
 * `<Search size={iconSize} />`). Para `ReactNode`, retorna como está.
 */
function resolveIcon(icon: React.ReactNode | string | undefined, size: ButtonSize): React.ReactNode {
  if (icon === undefined || icon === null) return undefined;
  if (typeof icon !== "string") return icon;
  const registry = LucideIcons as unknown as Record<string, unknown>;
  const Candidate = registry[icon];
  if (typeof Candidate !== "function" && typeof Candidate !== "object") return undefined;
  const IconComponent = Candidate as React.ComponentType<{ size?: number }>;
  return <IconComponent size={getIconPixelSize(size)} />;
}

/**
 * Botão do design system. Aceita as variantes proprietárias `primary`,
 * `secondary`, `outline`, `ghost`, `destructive` e `neutral`, e três tamanhos
 * (`xs|s|m`). Tanto `type` quanto `variant` são aceitos como sinônimos —
 * `variant` tem prioridade.
 *
 * A prop `icon` aceita um `ReactNode` (ex.: `<Search size={16} />`) ou o
 * **nome** de um ícone do `lucide-react` como string (ex.: `"Search"`).
 * Quando string, o tamanho do ícone é derivado do `size` do botão.
 *
 * Quando recebe `icon` sem `children`, o botão é renderizado em modo
 * icon-only (largura quadrada, sem `paddingInline`). Nesse caso o consumidor
 * **deve** passar `aria-label` para cumprir o critério WCAG 4.1.2.
 */
export function Button(props: ButtonProps): React.ReactElement {
  const { type, variant, size = "m", style, children, icon, className: externalClassName, ...rest } = props;

  const resolvedType: ButtonType = variant || type || "primary";
  const resolvedIcon = resolveIcon(icon, size);
  const isIconOnly = resolvedIcon !== undefined && !children;
  const externalClass = typeof externalClassName === "string" ? externalClassName : "";
  const hasFocusClass = externalClass.includes("pseudo-focus-visible") || externalClass.includes("pseudo-focus");
  const finalClassName = [BASE_CLASS, externalClass].filter(Boolean).join(" ");

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
        icon={resolvedIcon}
        className={finalClassName}
        {...(children !== undefined ? { children } : null)}
        {...rest}
      />
    </ConfigProvider>
  );
}

Button.displayName = "Button";

export type { ButtonProps, ButtonSize, ButtonType } from "../../types/components/Button";
