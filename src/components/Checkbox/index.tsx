import React from "react";
import { Checkbox as AntdCheckbox, ConfigProvider } from "antd";
import { designSystemColors, spacing, radius } from "../../theme";
import type { ComponentToken } from "antd/es/checkbox/style";
import type { CheckboxComponent, CheckboxProps } from "../../types/components/Checkbox";
import "./index.module.css";

const checkboxTokens: Partial<ComponentToken> = {
  colorPrimary: designSystemColors.brand.primary[600],
  colorPrimaryHover: "transparent",
  colorPrimaryBorder: designSystemColors.brand.primary[600],
  colorPrimaryBorderHover: "transparent",
  colorBgContainer: designSystemColors.neutral[50],
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

/**
 * Checkbox do design system. Aceita `error` como prop proprietária, que aplica
 * a paleta vermelha e adiciona a classe `ds-checkbox-error` (consumida pelos
 * overrides em `global.css`).
 */
function CheckboxInner({ error, className, ...props }: CheckboxProps): React.ReactElement {
  const wrapperClassName = [className, error ? "ds-checkbox-error" : ""].filter(Boolean).join(" ");

  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: error ? errorTokens : checkboxTokens,
        },
      }}
    >
      <AntdCheckbox {...props} className={wrapperClassName} />
    </ConfigProvider>
  );
}

CheckboxInner.displayName = "Checkbox";

const CheckboxWithGroup = CheckboxInner as CheckboxComponent;
// Reexporta `Checkbox.Group` direto do Antd: o `ConfigProvider` do
// `<JuscashProvider>` já garante o tema aplicado ao grupo, e wrappar
// novamente quebraria a inferência genérica do consumidor sobre `T`.
CheckboxWithGroup.Group = AntdCheckbox.Group;

export const Checkbox = CheckboxWithGroup;
export const CheckboxGroup = AntdCheckbox.Group;

export type { CheckboxProps } from "../../types/components/Checkbox";
