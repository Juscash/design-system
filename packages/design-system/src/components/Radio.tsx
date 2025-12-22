"use client";

import React from "react";
import { ConfigProvider, Radio as AntdRadio } from "antd";
import type { RadioProps as AntdRadioProps } from "antd";
import { designSystemColors, spacing, radius } from "../theme";
import type { ComponentToken } from "antd/es/radio/style";

export type RadioProps = AntdRadioProps & {
  error?: boolean;
};

const baseTokens: ComponentToken = {
  radioSize: 16,
  dotSize: 8,
  dotColorDisabled: designSystemColors.neutral[400],
  wrapperMarginInlineEnd: spacing[2],

  // Button-style radios (para manter consistência se usados)
  buttonBg: designSystemColors.neutral[50],
  buttonCheckedBg: designSystemColors.neutral[50],
  buttonColor: designSystemColors.brand.primary[600],
  buttonPaddingInline: spacing[4],
  buttonCheckedBgDisabled: designSystemColors.neutral[300],
  buttonCheckedColorDisabled: designSystemColors.neutral[100],
  buttonSolidCheckedColor: designSystemColors.brand.primary[600],
  buttonSolidCheckedBg: designSystemColors.neutral[50],
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

export function Radio(props: RadioProps): React.ReactElement {
  const { error, className, ...rest } = props;

  const tokens = error ? errorTokens : baseTokens;
  const tokenOverrides = error
    ? {
        borderRadiusSM: radius.md,
        colorPrimary: designSystemColors.feedback.red[500],
        colorPrimaryHover: designSystemColors.feedback.red[900],
        colorPrimaryActive: designSystemColors.feedback.red[900],
      }
    : {
        borderRadiusSM: radius.md,
      };

  return (
    <ConfigProvider
      theme={{
        components: {
          Radio: tokens,
        },
        token: tokenOverrides,
      }}
    >
      <AntdRadio className={className} {...rest} />
    </ConfigProvider>
  );
}

export const RadioGroup = AntdRadio.Group;
export const RadioButton = AntdRadio.Button;
