import type { ReactNode } from "react";
import type { InputProps as AntdInputProps } from "antd";

export type InputSize = "xs" | "s" | "m" | "l";

type CleanAntdProps = Omit<AntdInputProps, "size" | "prefix" | "suffix">;

export type InputProps = CleanAntdProps & {
  /** Altura discreta (`xs` 24 · `s` 32 · `m` 36 · `l` 40). Default `m`. */
  size?: InputSize;
  /**
   * Rótulo exibido acima do campo (Inter 16px, `text/dark`). Em `disabled`
   * fica `text/disabled`. Figma `4062:2551`.
   */
  label?: ReactNode;
  /**
   * Texto auxiliar abaixo do campo (Inter 13px, `text/soft`). Em
   * `status="error"` fica `feedback/red/500`. Figma `4062:2553`.
   */
  helperText?: ReactNode;
  /**
   * Decoração à esquerda do valor. Aceita `ReactNode` ou string com nome de
   * ícone Lucide (instanciado em 16px). Figma `.decoration` `4051:1686`.
   */
  prefix?: ReactNode | string;
  /** Decoração à direita do valor. Mesma regra de `prefix`. */
  suffix?: ReactNode | string;
};
