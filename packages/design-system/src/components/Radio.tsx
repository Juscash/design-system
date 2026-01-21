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
        // Focus states for error - usando cor 50 como fallback para 300
        controlOutline: `0 0 0 3px ${designSystemColors.feedback.red[50]}`,
        controlOutlineWidth: 3,
        controlOutlineColor: designSystemColors.feedback.red[50],
      }
    : {
        borderRadiusSM: radius.md,
        colorPrimary: designSystemColors.brand.primary[600],
        colorPrimaryHover: designSystemColors.brand.primary[800],
        colorPrimaryActive: designSystemColors.brand.primary[800],
        // Focus states for normal state
        controlOutline: `0 0 0 3px ${designSystemColors.neutral[300]}`,
        controlOutlineWidth: 3,
        controlOutlineColor: designSystemColors.neutral[300],
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

// Componente RichRadioGroup para suportar label e secondary text
export interface RichRadioOption {
  value: string;
  label: string;
  secondaryText?: string;
  disabled?: boolean;
}

export interface RichRadioGroupProps {
  options: RichRadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export function RichRadioGroup({
  options,
  value,
  onChange,
  disabled = false,
  error = false,
  className,
}: RichRadioGroupProps): React.ReactElement {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing[3],
    padding: `${spacing[1]}px 0`,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 'normal',
    color: designSystemColors.neutral[800],
    lineHeight: 1.2,
    flex: 1,
  };

  const secondaryTextStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 'normal',
    color: designSystemColors.neutral[500],
    lineHeight: 1.2,
  };

  return (
    <div className={className} style={containerStyle}>
      {options.map((option) => (
        <div key={option.value} style={itemStyle}>
          <Radio
            checked={value === option.value}
            disabled={disabled || option.disabled}
            error={error}
            onChange={() => onChange?.(option.value)}
          />
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span style={labelStyle}>
              {option.label}
            </span>
            {option.secondaryText && (
              <span style={secondaryTextStyle}>
                {option.secondaryText}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
