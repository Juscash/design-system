"use client";

import React from "react";
import { Checkbox as AntdCheckbox, ConfigProvider } from "antd";
import type { CheckboxProps as AntdCheckboxProps } from "antd";
import { designSystemColors, spacing, radius } from "../theme";
import type { ComponentToken } from "antd/es/checkbox/style";

export type CheckboxProps = AntdCheckboxProps;

const checkboxTokens: Partial<ComponentToken> = {
  colorPrimary: designSystemColors.brand.primary[600],
  colorPrimaryHover: designSystemColors.brand.primary[700],
  colorPrimaryBorder: designSystemColors.brand.primary[600],
  colorPrimaryBorderHover: designSystemColors.brand.primary[700],
  colorBgContainer: designSystemColors.neutral[50] ?? "#ffffff",
  colorText: designSystemColors.neutral[800],
  colorTextDisabled: designSystemColors.neutral[400],
  colorBorder: designSystemColors.neutral[400],
  colorBorderDisabled: designSystemColors.neutral[300],
  controlInteractiveSize: 16,
  borderRadiusSM: radius.md,
  paddingXS: spacing[2],
};

export function Checkbox(props: CheckboxProps): React.ReactElement {
  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: checkboxTokens,
        },
      }}
    >
      <AntdCheckbox {...props} />
    </ConfigProvider>
  );
}
