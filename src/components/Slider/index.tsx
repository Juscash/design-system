import React from "react";
import { Slider as AntdSlider, ConfigProvider } from "antd";
import type { ComponentToken } from "antd/es/slider/style";
import { designSystemColors } from "../../theme";
import type { SliderProps } from "../../types/components/Slider";
import "./index.module.css";

const BASE_CLASS = "ds-slider";
const HANDLE_SIZE = 14;
const HANDLE_BORDER_WIDTH = 2;
const RAIL_SIZE = 6;
const DOT_SIZE = 14;

/**
 * Tokens do Slider alinhados ao Figma (`figma/components/slider/`,
 * `4069:5196`). Marker 14×14 com borda 2px em `brand.primary.500`, fill
 * `neutral.50` e Ellipse interno 12×12 (representado pelo `dotSize`).
 * Track full em `neutral.300` (rail) e track value (fill) em
 * `brand.primary.500`. Estados de hover/active mantêm a mesma estética
 * — o dump descreve apenas o estado `regular`.
 */
const sliderTokens: Partial<ComponentToken> = {
  railSize: RAIL_SIZE,
  handleSize: HANDLE_SIZE,
  handleSizeHover: HANDLE_SIZE,
  handleLineWidth: HANDLE_BORDER_WIDTH,
  handleLineWidthHover: HANDLE_BORDER_WIDTH,
  dotSize: DOT_SIZE,
  railBg: designSystemColors.neutral[300],
  railHoverBg: designSystemColors.neutral[300],
  trackBg: designSystemColors.brand.primary[500],
  trackHoverBg: designSystemColors.brand.primary[500],
  handleColor: designSystemColors.brand.primary[500],
  handleActiveColor: designSystemColors.brand.primary[500],
  handleActiveOutlineColor: designSystemColors.brand.primary[500],
  handleColorDisabled: designSystemColors.neutral[400],
  dotBorderColor: designSystemColors.neutral[300],
  dotActiveBorderColor: designSystemColors.brand.primary[500],
  trackBgDisabled: designSystemColors.neutral[400],
};

/**
 * Compõe a className final do slider: `.ds-slider` sempre presente,
 * concatenada ao `className` externo opcional vindo do consumidor.
 */
function buildClassName(external: string | undefined): string {
  return [BASE_CLASS, external ?? ""].filter(Boolean).join(" ");
}

/**
 * Slider do design system. Wrapper do `Slider` do Ant Design 6, aplicando
 * a identidade visual da JusCash via `ConfigProvider` local. Mantém toda
 * a API nativa (horizontal/vertical, single/range, marks, dots, disabled,
 * tooltip, etc.) sem props proprietárias adicionais — o dump
 * `figma/components/slider/` descreve apenas o estado visual `regular` e
 * os tipos `default`/`range` × `horizontal`/`vertical`, todos já cobertos
 * pelas combinações de `vertical` e `range` do Antd.
 */
export function Slider(props: SliderProps): React.ReactElement {
  const { className, ...rest } = props;
  const finalClassName = buildClassName(className);

  return (
    <ConfigProvider theme={{ components: { Slider: sliderTokens } }}>
      <AntdSlider {...(rest as SliderProps)} className={finalClassName} />
    </ConfigProvider>
  );
}

Slider.displayName = "Slider";

export type { SliderProps } from "../../types/components/Slider";
