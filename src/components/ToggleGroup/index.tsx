import React from "react";
import { ConfigProvider, Radio as AntdRadio } from "antd";
import type { RadioChangeEvent } from "antd";
import { designSystemColors, radius, spacing } from "../../theme";
import type { ToggleGroupProps, ToggleGroupValue } from "../../types/components/ToggleGroup";
import { buildOptionLabel } from "./utils";
import "./index.module.css";

const BASE_CLASS = "ds-toggle-group";

/**
 * Compõe a className final do container do ToggleGroup, anexando o
 * modificador de variante, de size e a className passada pelo consumidor.
 */
function buildClassName(variant: string, size: string, external: string | undefined): string {
  return [BASE_CLASS, `${BASE_CLASS}--${variant}`, `${BASE_CLASS}--${size}`, external ?? ""].filter(Boolean).join(" ");
}

/**
 * Hook utilitário: aplica `tabIndex` no nó referenciado quando o valor é
 * numérico. Antd Radio.Group não propaga `tabIndex` ao DOM via spread, então
 * fazemos isso manualmente via `setAttribute`.
 */
function useTabIndex(ref: React.RefObject<HTMLDivElement | null>, tabIndex: number | undefined): void {
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (tabIndex === undefined) {
      node.removeAttribute("tabindex");
      return;
    }
    node.setAttribute("tabindex", String(tabIndex));
  }, [ref, tabIndex]);
}

const RADIO_TOKEN_OVERRIDES = {
  buttonBg: "transparent",
  buttonCheckedBg: designSystemColors.neutral[50],
  buttonColor: designSystemColors.text.soft,
  buttonPaddingInline: spacing[2],
  buttonCheckedBgDisabled: "transparent",
  buttonCheckedColorDisabled: designSystemColors.text.disabled,
};

const TOKEN_OVERRIDES = {
  borderRadius: radius.md,
  colorPrimary: designSystemColors.neutral[50],
  colorPrimaryHover: designSystemColors.neutral[50],
  colorPrimaryActive: designSystemColors.neutral[50],
  colorBorder: designSystemColors.border.regular,
};

/**
 * ToggleGroup do design system. Grupo de botões toggle com comportamento
 * `single` (radio): apenas uma opção pode ficar ativa por vez.
 *
 * Embrulha o `Radio.Group` do Antd em modo `optionType="button"` e aplica
 * a identidade visual proprietária via `ConfigProvider` local + CSS Module.
 *
 * Variantes (dump Figma `toggle-group/`):
 * - `ghost` — track cinza, items sem border; item active com bg branco.
 * - `outlined` — borda no grupo, items separados por divisor; item active
 *   destacado por bg branco.
 */
export function ToggleGroup(props: ToggleGroupProps): React.ReactElement {
  const {
    value,
    defaultValue,
    onChange,
    options,
    variant = "ghost",
    size = "m",
    disabled,
    className,
    style,
    tabIndex,
    "aria-label": ariaLabel,
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  useTabIndex(ref, tabIndex);

  const items = options.map((option) => ({
    value: option.value,
    label: buildOptionLabel(option, size),
    disabled: option.disabled,
  }));

  const handleChange = (event: RadioChangeEvent): void => {
    if (onChange) onChange(event.target.value as ToggleGroupValue);
  };

  // Antd Radio.Group entra em modo controlado quando a key `value` está em
  // `props` (mesmo `undefined`). Por isso só anexamos `value`/`defaultValue`
  // quando definidos pelo consumidor — preserva uncontrolled quando o
  // consumidor passa apenas `defaultValue` ou nenhum dos dois.
  const controlledProps = value !== undefined ? { value } : {};
  const uncontrolledProps = defaultValue !== undefined ? { defaultValue } : {};

  return (
    <ConfigProvider theme={{ components: { Radio: RADIO_TOKEN_OVERRIDES }, token: TOKEN_OVERRIDES }}>
      <AntdRadio.Group
        ref={ref}
        className={buildClassName(variant, size, className)}
        style={style}
        {...controlledProps}
        {...uncontrolledProps}
        onChange={handleChange}
        optionType="button"
        buttonStyle="outline"
        disabled={disabled}
        options={items}
        aria-label={ariaLabel}
      />
    </ConfigProvider>
  );
}

ToggleGroup.displayName = "ToggleGroup";

export type {
  ToggleGroupOption,
  ToggleGroupProps,
  ToggleGroupSize,
  ToggleGroupValue,
  ToggleGroupVariant,
} from "../../types/components/ToggleGroup";
