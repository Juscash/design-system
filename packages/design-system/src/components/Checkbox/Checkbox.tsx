"use client";

import React from "react";
import { Checkbox as AntdCheckbox, ConfigProvider } from "antd";
import type { CheckboxProps as AntdCheckboxProps } from "antd";
import { designSystemColors, spacing, radius } from "../../theme";
import type { ComponentToken } from "antd/es/checkbox/style";

export type CheckboxProps = AntdCheckboxProps & {
  error?: boolean;
};

const checkboxTokens: Partial<ComponentToken> = {
  colorPrimary: designSystemColors.brand.primary[600],
  colorPrimaryHover: designSystemColors.brand.primary[700],
  colorPrimaryBorder: designSystemColors.brand.primary[600],
  colorPrimaryBorderHover: designSystemColors.brand.primary[700],
  colorBgContainer: designSystemColors.neutral[50] ?? "#ffffff",
  colorText: designSystemColors.neutral[800],
  colorTextDisabled: designSystemColors.neutral[400],
  colorBorder: designSystemColors.neutral[300],
  colorBorderDisabled: designSystemColors.neutral[300],
  controlInteractiveSize: 16,
  borderRadiusSM: radius.md,
  paddingXS: spacing[2],
};

const errorTokens: Partial<ComponentToken> = {
  ...checkboxTokens,
  colorPrimary: designSystemColors.feedback.red[500],
  colorPrimaryHover: designSystemColors.feedback.red[900],
  colorPrimaryBorder: designSystemColors.feedback.red[500],
  colorPrimaryBorderHover: designSystemColors.feedback.red[900],
  colorBorder: designSystemColors.feedback.red[500],
};

export function Checkbox({
  error,
  ...props
}: CheckboxProps): React.ReactElement {
  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: error ? errorTokens : checkboxTokens,
        },
      }}
    >
      <AntdCheckbox {...props} />
    </ConfigProvider>
  );
}

export function CheckboxGroup(
  props: React.ComponentProps<typeof AntdCheckbox.Group>,
): React.ReactElement {
  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: checkboxTokens,
        },
      }}
    >
      <AntdCheckbox.Group {...props} />
    </ConfigProvider>
  );
}

Checkbox.Group = CheckboxGroup;
