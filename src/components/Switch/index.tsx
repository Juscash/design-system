import React from "react";
import { ConfigProvider, Switch as AntdSwitch } from "antd";
import type { ComponentToken } from "antd/es/switch/style";
import { designSystemColors, shadow, spacing } from "../../theme";
import type { SwitchProps } from "../../types/components/Switch";
import "./index.module.css";

const BASE_CLASS = "ds-switch";
const ERROR_CLASS = "ds-switch-error";

const TRACK_HEIGHT = 18;
const TRACK_HEIGHT_SM = 14;
const TRACK_MIN_WIDTH = 33;
const TRACK_MIN_WIDTH_SM = 26;
const TRACK_PADDING = 2;
const HANDLE_SIZE = 14;
const HANDLE_SIZE_SM = 10;

/**
 * Tokens do Switch alinhados ao Figma (track 33×18, handle 14, padding 2).
 * `handleBg` é sempre `neutral.50` (branco quase). `handleShadow` usa
 * `shadow.xs` para elevação sutil.
 */
const switchTokens: Partial<ComponentToken> = {
  trackHeight: TRACK_HEIGHT,
  trackHeightSM: TRACK_HEIGHT_SM,
  trackMinWidth: TRACK_MIN_WIDTH,
  trackMinWidthSM: TRACK_MIN_WIDTH_SM,
  trackPadding: TRACK_PADDING,
  handleSize: HANDLE_SIZE,
  handleSizeSM: HANDLE_SIZE_SM,
  handleBg: designSystemColors.neutral[50],
  handleShadow: shadow.xs,
  innerMinMargin: spacing[2],
  innerMaxMargin: spacing[3],
  innerMinMarginSM: spacing[1],
  innerMaxMarginSM: spacing[2],
};

/**
 * Tokens globais (cores) aplicados via `theme.token`. Hover/active recebem
 * a mesma cor de `colorPrimary` — Figma define que o hover não muda visual.
 *
 * - `error=false` → verde `brand.primary.600`.
 * - `error=true`  → vermelho `feedback.red.500`.
 */
function getTokenOverrides(error: boolean) {
  if (error) {
    return {
      colorPrimary: designSystemColors.feedback.red[500],
      colorPrimaryHover: designSystemColors.feedback.red[500],
      colorPrimaryActive: designSystemColors.feedback.red[500],
    };
  }
  return {
    colorPrimary: designSystemColors.brand.primary[600],
    colorPrimaryHover: designSystemColors.brand.primary[600],
    colorPrimaryActive: designSystemColors.brand.primary[600],
  };
}

/**
 * Compõe a className final: `.ds-switch` sempre presente, `.ds-switch-error`
 * em erro, mais o className externo.
 */
function buildClassName(external: string | undefined, error: boolean): string {
  return [BASE_CLASS, error ? ERROR_CLASS : "", external ?? ""].filter(Boolean).join(" ");
}

/**
 * Switch do design system. Toggle on/off binário. Props proprietárias:
 *
 * - `error` — paleta vermelha (`feedback.red.500`) para validação inválida.
 *
 * Demais props (incluindo `loading`, `disabled`, `size`, `checkedChildren`,
 * `unCheckedChildren`, `onChange`, `defaultChecked`) seguem a API do Antd.
 */
export function Switch(props: SwitchProps): React.ReactElement {
  const { error, className, ...rest } = props;
  const finalClassName = buildClassName(className, Boolean(error));

  return (
    <ConfigProvider
      theme={{
        components: { Switch: switchTokens },
        token: getTokenOverrides(Boolean(error)),
      }}
    >
      <AntdSwitch {...rest} className={finalClassName} />
    </ConfigProvider>
  );
}

Switch.displayName = "Switch";

export type { SwitchProps } from "../../types/components/Switch";
