import type { ReactNode } from "react";
import type { SegmentedProps as AntdSegmentedProps } from "antd";

export type SegmentedSize = "m" | "s" | "xs";

/**
 * Opção enriquecida do Segmented. `text` é a string exibida; `icon` aceita
 * o nome de um ícone Lucide (ex.: `"List"`) ou um `ReactNode`. O `counter`
 * é renderizado como badge numérica vermelha ao lado do texto.
 */
export type SegmentedOption<T extends string | number = string> = {
  value: T;
  text?: string;
  icon?: ReactNode | string;
  counter?: number | string;
  disabled?: boolean;
  /**
   * Nome acessível da opção. Usado por leitores de tela quando a opção é
   * **icon-only** (sem `text`). Se omitido em uma opção icon-only, o
   * componente usa `value.toString()` como fallback — passe um rótulo
   * claro sempre que possível.
   */
  ariaLabel?: string;
};

/**
 * Opção nativa do Antd Segmented — usada quando o consumidor quer compor
 * o `label` por conta própria sem o enhancement.
 */
export type NativeLabeledOption<T extends string | number = string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

export type SegmentedInputOption<T extends string | number = string> = T | NativeLabeledOption<T> | SegmentedOption<T>;

export type SegmentedProps<T extends string | number = string> = Omit<AntdSegmentedProps<T>, "size" | "options"> & {
  size?: SegmentedSize;
  options?: SegmentedInputOption<T>[];
};
