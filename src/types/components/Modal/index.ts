import type { ModalProps as AntdModalProps } from "antd";

export type ModalSize = "s" | "m" | "l";

type CleanAntdProps = {
  [K in keyof AntdModalProps as K extends "width" ? never : K]: AntdModalProps[K];
};

export type ModalProps = CleanAntdProps & {
  /**
   * Tamanho do modal seguindo o Design System JusCash:
   * - `s`: 400px
   * - `m`: 640px (padrão desktop scrollable)
   * - `l`: 900px (desktop large)
   * @default "m"
   */
  dsSize?: ModalSize;
  /** Largura customizada do modal (sobrescreve `dsSize`) */
  width?: AntdModalProps["width"];
};
