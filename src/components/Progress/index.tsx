import React from "react";
import { Progress as AntdProgress, ConfigProvider } from "antd";
import type { ComponentToken } from "antd/es/progress/style";
import { designSystemColors, radius } from "../../theme";
import type { ProgressProps } from "../../types/components/Progress";
import "./index.module.css";

const BASE_CLASS = "ds-progress";
const LINE_BORDER_RADIUS = radius["2xl"];

/**
 * Tokens do Progress alinhados ao dump `figma/components/progress/`
 * (`4069:4392` / `4069:5157`): track full `neutral.300` (#d4d4d4), fill
 * `brand.primary.500`, raio das pontas `radius.2xl` (12px). O Antd cobre
 * os três valores via `defaultColor`, `remainingColor` e `lineBorderRadius`.
 */
const progressTokens: Partial<ComponentToken> = {
  defaultColor: designSystemColors.brand.primary[500],
  remainingColor: designSystemColors.neutral[300],
  lineBorderRadius: LINE_BORDER_RADIUS,
};

/**
 * Compõe a className final da barra: `.ds-progress` sempre presente,
 * concatenada ao `className` externo opcional do consumidor.
 */
function buildClassName(external: string | undefined): string {
  return [BASE_CLASS, external ?? ""].filter(Boolean).join(" ");
}

/**
 * Progress do design system. Wrapper do `Progress` do Ant Design 6
 * restrito à barra linear horizontal conforme o dump
 * `figma/components/progress/` (`4069:4392`): track 342×8 em
 * `neutral.300`, fill em `brand.primary.500`, cantos arredondados
 * `radius.2xl`, sem texto de porcentagem nem variantes em círculo.
 *
 * A11y: o Antd já provê `role="progressbar"`, `aria-valuenow`,
 * `aria-valuemin` e `aria-valuemax` no nó raiz — basta passar `percent`.
 */
export function Progress(props: ProgressProps): React.ReactElement {
  const { className, ...rest } = props;
  const finalClassName = buildClassName(className);

  return (
    <ConfigProvider theme={{ components: { Progress: progressTokens } }}>
      <AntdProgress {...rest} type="line" showInfo={false} className={finalClassName} />
    </ConfigProvider>
  );
}

Progress.displayName = "Progress";

export type { ProgressProps } from "../../types/components/Progress";
