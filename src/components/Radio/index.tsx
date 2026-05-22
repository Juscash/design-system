import React from "react";
import { ConfigProvider, Radio as AntdRadio } from "antd";
import type { ComponentToken } from "antd/es/radio/style";
import { designSystemColors, spacing, radius } from "../../theme";
import type { RadioProps } from "../../types/components/Radio";
import "./index.module.css";

const RADIO_SIZE = 15;
const DOT_SIZE = 8;
const FOCUS_OUTLINE_WIDTH = 3;

const baseTokens: ComponentToken = {
  radioSize: RADIO_SIZE,
  dotSize: DOT_SIZE,
  dotColorDisabled: designSystemColors.neutral[400],
  wrapperMarginInlineEnd: spacing[2],
  buttonBg: designSystemColors.neutral[50],
  buttonCheckedBg: designSystemColors.neutral[50],
  buttonColor: designSystemColors.neutral[50],
  buttonPaddingInline: spacing[4],
  buttonCheckedBgDisabled: designSystemColors.neutral[300],
  buttonCheckedColorDisabled: designSystemColors.neutral[100],
  buttonSolidCheckedColor: designSystemColors.neutral[50],
  buttonSolidCheckedBg: designSystemColors.neutral[300],
  buttonSolidCheckedHoverBg: designSystemColors.neutral[50],
  buttonSolidCheckedActiveBg: designSystemColors.neutral[50],
};

const errorTokens: Partial<ComponentToken> = {
  ...baseTokens,
  buttonCheckedBg: designSystemColors.feedback.red[50],
  buttonCheckedBgDisabled: designSystemColors.feedback.red[50],
  buttonCheckedColorDisabled: designSystemColors.neutral[400],
  buttonSolidCheckedBg: designSystemColors.feedback.red[500],
  buttonSolidCheckedHoverBg: designSystemColors.feedback.red[900],
  buttonSolidCheckedActiveBg: designSystemColors.feedback.red[900],
  buttonSolidCheckedColor: designSystemColors.neutral[50],
};

function getTokenOverrides(error: boolean) {
  return error
    ? {
        borderRadiusSM: radius.md,
        colorPrimary: designSystemColors.feedback.red[500],
        colorPrimaryHover: designSystemColors.feedback.red[900],
        colorPrimaryActive: designSystemColors.feedback.red[900],
        controlOutline: `0 0 0 ${FOCUS_OUTLINE_WIDTH}px ${designSystemColors.feedback.red[50]}`,
        controlOutlineWidth: FOCUS_OUTLINE_WIDTH,
        controlOutlineColor: designSystemColors.feedback.red[50],
      }
    : {
        borderRadiusSM: radius.md,
        colorPrimary: designSystemColors.brand.primary[600],
        colorPrimaryHover: designSystemColors.brand.primary[800],
        colorPrimaryActive: designSystemColors.brand.primary[800],
        controlOutline: `0 0 0 ${FOCUS_OUTLINE_WIDTH}px ${designSystemColors.neutral[300]}`,
        controlOutlineWidth: FOCUS_OUTLINE_WIDTH,
        controlOutlineColor: designSystemColors.neutral[300],
      };
}

/**
 * Radio do design system. Aceita `error` como prop proprietÃ¡ria, que aplica
 * a paleta vermelha e adiciona a classe `ds-radio-error`.
 */
export function Radio(props: RadioProps): React.ReactElement {
  const { error, className, ...rest } = props;

  const tokens = error ? errorTokens : baseTokens;
  const tokenOverrides = getTokenOverrides(!!error);
  const mergedClassName = `${error ? "ds-radio-error" : "ds-neutral"} ${className ?? ""}`.trim();

  return (
    <ConfigProvider
      theme={{
        components: {
          Radio: tokens,
        },
        token: tokenOverrides,
      }}
    >
      <AntdRadio className={mergedClassName} {...rest} />
    </ConfigProvider>
  );
}

Radio.displayName = "Radio";

export const RadioGroup = AntdRadio.Group;
export const RadioButton = AntdRadio.Button;

export type { RadioProps } from "../../types/components/Radio";
