import type { ReactNode } from "react";
import type { SelectProps as AntdSelectProps } from "antd";

export type SelectSize = "xs" | "s" | "m" | "l";

type CleanAntdProps = {
  [K in keyof AntdSelectProps as K extends "size" ? never : K]: AntdSelectProps[K];
};

export type SelectProps = CleanAntdProps & {
  /** Altura discreta (`xs` 24 · `s` 32 · `m` 36 · `l` 40). Default `m`. */
  size?: SelectSize;
  /**
   * Rótulo exibido acima do campo (Inter 16px, `text/dark`). Em `disabled`
   * fica `text/disabled`. Figma `4062:8036`.
   */
  label?: ReactNode;
  /**
   * Texto auxiliar abaixo do campo (Inter 13px, `text/soft`). Em
   * `status="error"` fica `feedback/red/500`. Figma `4062:8037`.
   */
  helperText?: ReactNode;
};
