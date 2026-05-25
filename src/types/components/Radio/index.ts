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
  /**
   * Quando `true`, renderiza no formato **rich** (Figma `rich radio`, 240×44)
   * — card clicável com `label` principal e `secondaryText` opcional ao lado
   * do radio. Cliques em qualquer ponto do card selecionam o item.
   */
  rich?: boolean;
  /** Texto principal exibido ao lado do radio no modo `rich`. Quando ausente, usa `children`. */
  label?: string;
  /** Texto secundário (`caption/01 - 10px`) abaixo do `label` no modo `rich`. */
  secondaryText?: string;
};
