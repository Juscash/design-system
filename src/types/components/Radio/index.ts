import type { RadioProps as AntdRadioProps } from "antd";

export type RadioProps = AntdRadioProps & {
  /** Aplica a paleta vermelha (`feedback.red.500`) para representar erro de validação. */
  error?: boolean;
  /**
   * Quando `true`, o texto do label trunca com `...` (ellipsis) caso ultrapasse
   * a largura disponível. Combine com `width` para definir a largura limite.
   */
  truncate?: boolean;
  /**
   * Largura máxima do wrapper (aplica `max-width`). Aceita número (pixels) ou
   * string CSS. Quando `truncate=true` e `width` é `undefined`, usa `240px`.
   */
  width?: number | string;
};
