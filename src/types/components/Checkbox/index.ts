import type { ReactElement } from "react";
import type { CheckboxProps as AntdCheckboxProps, Checkbox as AntdCheckbox } from "antd";

export type CheckboxProps = AntdCheckboxProps & {
  /** Aplica a paleta vermelha (`feedback.red.500`) para representar erro de validação. */
  error?: boolean;
  /**
   * Quando `true`, o texto do label trunca com `...` (ellipsis) caso ultrapasse
   * a largura disponível. Combine com `width` (ou container externo limitado)
   * — sem largura limitada, não há o que truncar.
   */
  truncate?: boolean;
  /**
   * Largura máxima do wrapper do checkbox (aplica `max-width`). Aceita número
   * (interpretado como pixels) ou string CSS (`"200px"`, `"50%"`, `"30ch"`).
   *
   * Default: `undefined` (sem limite). Quando `truncate=true` e `width` é
   * `undefined`, é aplicado o default `240` (240px) — largura do "list" do
   * Figma para Checkbox.Group.
   */
  width?: number | string;
  /**
   * Quando `true`, renderiza no formato **rich** (Figma `rich checkbox`,
   * 240×44) — card clicável com `label` principal e `secondaryText` opcional
   * ao lado do checkbox. Cliques em qualquer ponto do card togglam o estado.
   */
  rich?: boolean;
  /** Texto principal exibido ao lado do checkbox no modo `rich`. Quando ausente, usa `children`. */
  label?: string;
  /** Texto secundário (`caption/01 - 10px`) abaixo do `label` no modo `rich`. */
  secondaryText?: string;
};

export type CheckboxComponent = ((props: CheckboxProps) => ReactElement) & {
  displayName?: string;
  Group: typeof AntdCheckbox.Group;
};
