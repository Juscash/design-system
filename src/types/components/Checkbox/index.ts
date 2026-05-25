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
};

export type CheckboxComponent = ((props: CheckboxProps) => ReactElement) & {
  displayName?: string;
  Group: typeof AntdCheckbox.Group;
};
