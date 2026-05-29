import React from "react";
import { Input as AntdInput, ConfigProvider } from "antd";
import type { AliasToken } from "antd/es/theme/interface";
import type { ComponentToken } from "antd/es/input/style/token";
import * as LucideIcons from "lucide-react";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import { applyMask } from "../../utils/applyMask";
import { BUILTIN_ERROR_MESSAGES, getBuiltinValidator } from "../../utils/validateInput";
import type { InputMask } from "../../types/utils/applyMask";
import type { InputProps, InputSize } from "../../types/components/Input";
import "./index.module.css";

const BASE_CLASS = "ds-input";

const HEIGHT_XS = 24;
const HEIGHT_S = 32;
const HEIGHT_M = 36;
const HEIGHT_L = 40;
// Tipografia do value/placeholder: `body/02 - 13px` Inter Regular (Figma).
// Confirmado para todos os sizes (xs, s, m, l) via inspeção dos symbols
// `size=*, state=value` na página Componentes do Figma.
const INPUT_FONT_SIZE = 13;
// No xs (altura 24px), o paddingBlock de 8px do Figma faz o texto cortar:
// 8+8 padding + 15.6 line-height (13×1.2) = 31.6 > 24. Reduzimos para 2px,
// preservando 20px úteis para a fonte. Demais sizes mantêm spacing[2] = 8.
const PADDING_BLOCK_XS = 2;
const WARNING_FOCUS_SHADOW = "0 0 0 3px rgba(134, 116, 0, 0.1)";

const ICON_SIZE_XS = 12;
const ICON_SIZE_S = 14;
const ICON_SIZE_M = 16;

interface SizeTokensResult {
  componentToken: Partial<ComponentToken>;
  globalToken: Partial<AliasToken>;
  height: number;
}

/**
 * Mapeia o `size` proprietário (`xs|s|m|l`) para os tokens do Antd Input.
 * `controlHeight` define a altura externa; `paddingBlock`/`paddingInline`
 * vêm de `spacing/2` e `spacing/3` (Figma). `borderRadius` é `radius.md`
 * para `xs` e `radius.xl` para os demais.
 */
function getSizeTokens(size: InputSize): SizeTokensResult {
  const baseToken: Partial<ComponentToken> = {
    inputFontSize: INPUT_FONT_SIZE,
    paddingInline: spacing[3],
  };

  if (size === "xs") {
    return {
      componentToken: { ...baseToken, paddingBlock: PADDING_BLOCK_XS },
      globalToken: { borderRadius: radius.md, controlHeight: HEIGHT_XS },
      height: HEIGHT_XS,
    };
  }
  if (size === "s") {
    return {
      componentToken: { ...baseToken, paddingBlock: spacing[2] },
      globalToken: { borderRadius: radius.xl, controlHeight: HEIGHT_S },
      height: HEIGHT_S,
    };
  }
  if (size === "l") {
    return {
      componentToken: { ...baseToken, paddingBlock: spacing[2] },
      globalToken: { borderRadius: radius.xl, controlHeight: HEIGHT_L },
      height: HEIGHT_L,
    };
  }
  return {
    componentToken: { ...baseToken, paddingBlock: spacing[2] },
    globalToken: { borderRadius: radius.xl, controlHeight: HEIGHT_M },
    height: HEIGHT_M,
  };
}

/**
 * Tokens fixos do Input (independem do `size`). Hover/active mantêm a cor
 * de borda `neutral.300` — o Figma não muda a cor da borda no hover/focus.
 * O foco aplica `shadow.focus` (cinza) ou `shadow.focusError` quando em erro.
 */
const baseTokens: Partial<ComponentToken> = {
  activeBorderColor: designSystemColors.neutral[300],
  hoverBorderColor: designSystemColors.neutral[300],
  activeShadow: shadow.focus,
  errorActiveShadow: shadow.focusError,
  warningActiveShadow: WARNING_FOCUS_SHADOW,
  activeBg: designSystemColors.neutral[50],
};

/**
 * Compõe a className aplicada ao input (ou ao affix-wrapper quando há
 * prefix/suffix). Sempre inclui `.ds-input`; preserva className externa.
 */
function buildClassName(external: string | undefined): string {
  return [BASE_CLASS, external ?? ""].filter(Boolean).join(" ");
}

/**
 * Retorna o tamanho de ícone (em px) recomendado para cada tamanho do input.
 * Aplicado quando `prefix`/`suffix` é informado como string Lucide.
 */
function getIconPixelSize(size: InputSize): number {
  if (size === "xs") return ICON_SIZE_XS;
  if (size === "s") return ICON_SIZE_S;
  return ICON_SIZE_M;
}

/**
 * Resolve `prefix`/`suffix`: aceita `ReactNode` (passa direto) ou string com
 * nome de ícone Lucide (instancia com tamanho derivado do `size`).
 */
function resolveAffix(affix: React.ReactNode | string | undefined, size: InputSize): React.ReactNode {
  if (affix === undefined || affix === null) return undefined;
  if (typeof affix !== "string") return affix;
  const registry = LucideIcons as unknown as Record<string, unknown>;
  const Candidate = registry[affix];
  if (typeof Candidate !== "function" && typeof Candidate !== "object") return affix;
  const IconComponent = Candidate as React.ComponentType<{ size?: number }>;
  return <IconComponent size={getIconPixelSize(size)} />;
}

/**
 * Calcula o valor inicial controlado internamente quando `mask` está ativa.
 * Aceita `controlledValue` (se informado) ou `defaultValue`; aplica a máscara
 * para garantir consistência visual desde o primeiro render.
 */
function getInitialMaskedValue(
  mask: InputMask,
  controlledValue: InputProps["value"],
  defaultValue: InputProps["defaultValue"],
  pattern: RegExp | undefined,
  transform: InputProps["maskTransform"],
): string {
  const seed = controlledValue ?? defaultValue ?? "";
  if (seed === "") return "";
  return applyMask(String(seed), mask, pattern, transform).formatted;
}

/**
 * Cria um evento sintético com `target.value` igual ao valor formatado,
 * preservando os demais campos do evento React original. Necessário porque
 * a aplicação da máscara substitui o valor digitado.
 */
function buildMaskedEvent(event: React.ChangeEvent<HTMLInputElement>, formatted: string): React.ChangeEvent<HTMLInputElement> {
  const proxyTarget = { ...event.target, value: formatted } as HTMLInputElement;
  return { ...event, target: proxyTarget, currentTarget: proxyTarget };
}

/**
 * Input do design system. Embrulha o Antd Input com tokens proprietários.
 *
 * Props proprietárias:
 * - `size` — discreta (`xs|s|m|l`) controlando altura (24/32/36/40).
 * - `mask` — máscara de formatação (`cpf|cnj|oab|rg|numero|moeda|custom`).
 * - `maskPattern` — regex de filtro quando `mask="custom"`.
 */
function Input(props: InputProps): React.ReactElement {
  const {
    size = "m",
    style,
    status,
    className,
    prefix,
    suffix,
    mask,
    maskPattern,
    maskTransform,
    onChange,
    onBlur,
    validate,
    errorMessage,
    type,
    value: controlledValue,
    defaultValue,
    ...rest
  } = props;
  const sizeTokens = getSizeTokens(size);
  const finalClassName = buildClassName(className);
  const resolvedPrefix = resolveAffix(prefix, size);
  const resolvedSuffix = resolveAffix(suffix, size);

  const isMasked = mask !== undefined;
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState<string>(() =>
    isMasked ? getInitialMaskedValue(mask, controlledValue, defaultValue, maskPattern, maskTransform) : "",
  );
  const [internalError, setInternalError] = React.useState<string | undefined>(undefined);

  const displayValue = (() => {
    if (!isMasked) return controlledValue;
    if (isControlled) return applyMask(String(controlledValue ?? ""), mask, maskPattern, maskTransform).formatted;
    return internalValue;
  })();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (internalError !== undefined) setInternalError(undefined);
    if (!isMasked) {
      onChange?.(event);
      return;
    }
    const { formatted, raw } = applyMask(event.target.value, mask, maskPattern, maskTransform);
    if (!isControlled) setInternalValue(formatted);
    onChange?.(buildMaskedEvent(event, formatted), raw);
  };

  const runValidation = (formatted: string, raw: string): string | undefined => {
    if (formatted === "") return undefined;
    const builtin = getBuiltinValidator(mask, type);
    if (builtin && !builtin(isMasked ? raw : formatted)) {
      if (type === "email") return BUILTIN_ERROR_MESSAGES.email;
      if (mask === "cpf") return BUILTIN_ERROR_MESSAGES.cpf;
      if (mask === "cnj") return BUILTIN_ERROR_MESSAGES.cnj;
    }
    return validate?.(formatted, isMasked ? raw : undefined);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    const formatted = event.target.value;
    const raw = isMasked ? applyMask(formatted, mask, maskPattern, maskTransform).raw : formatted;
    const error = runValidation(formatted, raw);
    setInternalError(error);
    onBlur?.(event);
  };

  const effectiveError = errorMessage ?? internalError;
  const effectiveStatus = effectiveError !== undefined ? "error" : status;

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            ...baseTokens,
            ...sizeTokens.componentToken,
          },
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
      }}
    >
      <div className="ds-input-wrapper">
        <AntdInput
          styles={{
            prefix: { marginRight: spacing[2] },
            suffix: { marginLeft: spacing[2] },
          }}
          className={finalClassName}
          style={{
            height: `${sizeTokens.height}px`,
            ...style,
          }}
          type={type}
          prefix={resolvedPrefix}
          suffix={resolvedSuffix}
          {...rest}
          value={isMasked ? displayValue : controlledValue}
          defaultValue={isMasked ? undefined : defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
          status={effectiveStatus}
        />
        {effectiveError !== undefined && (
          <span className="ds-input-error-message" role="alert">
            {effectiveError}
          </span>
        )}
      </div>
    </ConfigProvider>
  );
}

Input.displayName = "Input";

export { Input };

export type { InputProps, InputSize } from "../../types/components/Input";
