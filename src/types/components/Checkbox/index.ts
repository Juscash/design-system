import type { ReactElement } from "react";
import type { CheckboxProps as AntdCheckboxProps, Checkbox as AntdCheckbox } from "antd";

export type CheckboxProps = AntdCheckboxProps & {
  /** Aplica a paleta vermelha (`feedback.red.500`) para representar erro de validação. */
  error?: boolean;
  /**
   * Quando `true`, o texto do label trunca com `...` (ellipsis) **dinamicamente**
   * conforme a largura do container pai — o wrapper ocupa 100% do container e
   * o texto encurta quando excede o espaço.
   */
  truncate?: boolean;
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
