import React from "react";
import { Input as AntdInput, ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";
import type { AliasToken } from "antd/es/theme/interface";
import type { ComponentToken } from "antd/es/input/style/token";
import * as LucideIcons from "lucide-react";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import type { InputProps, InputSize } from "../../types/components/Input";
import "./index.module.css";

const BASE_CLASS = "ds-input";
const WRAPPER_CLASS = "ds-input-wrapper";
const WRAPPER_ERROR_CLASS = "ds-input-wrapper--error";
const WRAPPER_DISABLED_CLASS = "ds-input-wrapper--disabled";
const LABEL_CLASS = "ds-input-label";
const HELPER_CLASS = "ds-input-helper";

const HEIGHT_XS = 24;
const HEIGHT_S = 32;
const HEIGHT_M = 36;
const HEIGHT_L = 40;

// Tipografia do value/placeholder: `body/02 - 13px` Inter Regular — igual em
// todos os sizes (Figma, symbols `size=*, state=value`).
const INPUT_FONT_SIZE = 13;
// Ícone das decorações (`prefix`/`suffix`): 16px dentro do slot de 20px,
// igual em todos os sizes (Figma `.decoration`, `type=icon, size=default`).
const DECORATION_ICON_SIZE = 16;
// O Figma usa paddingBlock 8 em todos os sizes; no xs (24px) isso cortaria o
// texto (8 + 8 + 15.6 > 24), então usamos 2px para manter o texto centrado e
// inteiro — mesmo resultado visual do Figma.
const PADDING_BLOCK_XS = 2;

interface SizeTokensResult {
  componentToken: Partial<ComponentToken>;
  globalToken: Partial<AliasToken>;
  height: number;
}

/**
 * Mapeia o `size` proprietário para os tokens do Antd Input: `controlHeight`
 * (24/32/36/40), `paddingInline`/`paddingBlock` (12/8 do Figma) e
 * `borderRadius` (`md` para `xs`, `xl` para os demais).
 */
function getSizeTokens(size: InputSize): SizeTokensResult {
  const componentToken: Partial<ComponentToken> = {
    inputFontSize: INPUT_FONT_SIZE,
    paddingInline: spacing[3],
    paddingBlock: spacing[2],
  };

  if (size === "xs") {
    return {
      componentToken: { ...componentToken, paddingBlock: PADDING_BLOCK_XS },
      globalToken: { borderRadius: radius.md, controlHeight: HEIGHT_XS },
      height: HEIGHT_XS,
    };
  }
  if (size === "s") {
    return { componentToken, globalToken: { borderRadius: radius.xl, controlHeight: HEIGHT_S }, height: HEIGHT_S };
  }
  if (size === "l") {
    return { componentToken, globalToken: { borderRadius: radius.xl, controlHeight: HEIGHT_L }, height: HEIGHT_L };
  }
  return { componentToken, globalToken: { borderRadius: radius.xl, controlHeight: HEIGHT_M }, height: HEIGHT_M };
}

/**
 * Tokens fixos do Input (independem do `size`). Hover/focus mantêm a borda em
 * `neutral.300` (o Figma não troca a cor). O foco aplica `shadow.focus` (anel
 * cinza) ou `shadow.focusError` (anel vermelho) no estado de erro.
 */
const baseTokens: Partial<ComponentToken> = {
  activeBorderColor: designSystemColors.neutral[300],
  hoverBorderColor: designSystemColors.neutral[300],
  activeShadow: shadow.focus,
  errorActiveShadow: shadow.focusError,
  activeBg: designSystemColors.neutral[50],
};

/** Compõe a className do input. Sempre inclui `.ds-input`. */
function buildClassName(external: string | undefined): string {
  return [BASE_CLASS, external ?? ""].filter(Boolean).join(" ");
}

/** Compõe a className do wrapper com modificadores de erro/disabled. */
function buildWrapperClassName(isError: boolean, isDisabled: boolean): string {
  return [WRAPPER_CLASS, isError ? WRAPPER_ERROR_CLASS : "", isDisabled ? WRAPPER_DISABLED_CLASS : ""]
    .filter(Boolean)
    .join(" ");
}

/**
 * Resolve `prefix`/`suffix`: aceita `ReactNode` (passa direto) ou string com
 * nome de ícone Lucide (instancia em 16px — tamanho fixo das decorações).
 */
function resolveAffix(affix: React.ReactNode | string | undefined): React.ReactNode {
  if (affix === undefined || affix === null) return undefined;
  if (typeof affix !== "string") return affix;
  const registry = LucideIcons as unknown as Record<string, unknown>;
  const Candidate = registry[affix];
  if (typeof Candidate !== "function" && typeof Candidate !== "object") return affix;
  const IconComponent = Candidate as React.ComponentType<{ size?: number }>;
  return <IconComponent size={DECORATION_ICON_SIZE} />;
}

/**
 * Monta o `ThemeConfig` do `ConfigProvider` local: tokens do Input (base +
 * size) e os tokens globais de cor (borda, erro, disabled, bg, texto e
 * placeholder) conforme o Figma.
 */
function buildInputTheme(sizeTokens: SizeTokensResult): ThemeConfig {
  return {
    components: {
      Input: { ...baseTokens, ...sizeTokens.componentToken },
    },
    token: {
      ...sizeTokens.globalToken,
      colorBorder: designSystemColors.neutral[300],
      colorError: designSystemColors.feedback.red[500],
      colorTextDisabled: designSystemColors.text.disabled,
      colorBgContainerDisabled: designSystemColors.neutral[50],
      colorBgContainer: designSystemColors.neutral[50],
      colorTextPlaceholder: designSystemColors.text.soft,
      colorText: designSystemColors.text.dark,
    },
  };
}

/**
 * Input do design system. Embrulha o Antd Input com tokens proprietários e
 * compõe a pilha vertical do Figma: `label` (16px) → campo → `helperText`
 * (13px), com gaps de 8px.
 *
 * Props proprietárias: `size` (xs/s/m/l), `label`, `helperText`,
 * `prefix`/`suffix` (decorações — `ReactNode` ou nome de ícone Lucide).
 */
function Input(props: InputProps): React.ReactElement {
  const { size = "m", style, status, className, prefix, suffix, label, helperText, disabled, id, ...rest } = props;

  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const sizeTokens = getSizeTokens(size);
  const isError = status === "error";
  const wrapperClassName = buildWrapperClassName(isError, Boolean(disabled));
  const hasLabel = label !== undefined && label !== null;
  const hasHelper = helperText !== undefined && helperText !== null;

  return (
    <ConfigProvider theme={buildInputTheme(sizeTokens)}>
      <div className={wrapperClassName}>
        {hasLabel ?
          <label className={LABEL_CLASS} htmlFor={inputId}>
            {label}
          </label>
        : null}
        <AntdInput
          id={inputId}
          styles={{
            prefix: { marginInlineEnd: spacing[2] },
            suffix: { marginInlineStart: spacing[2] },
          }}
          className={buildClassName(className)}
          style={{ height: `${sizeTokens.height}px`, ...style }}
          prefix={resolveAffix(prefix)}
          suffix={resolveAffix(suffix)}
          status={status}
          disabled={disabled}
          {...rest}
        />
        {hasHelper ?
          <span className={HELPER_CLASS}>{helperText}</span>
        : null}
      </div>
    </ConfigProvider>
  );
}

Input.displayName = "Input";

export { Input };

export type { InputProps, InputSize } from "../../types/components/Input";
