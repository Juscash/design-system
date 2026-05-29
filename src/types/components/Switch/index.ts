import type { SwitchProps as AntdSwitchProps } from "antd";

export type SwitchProps = AntdSwitchProps & {
  /** Aplica a paleta vermelha (`feedback.red.500`) para representar erro de validação. */
  error?: boolean;
  /**
   * Quando `true`, renderiza no formato **rich** (Figma `rich switch group`,
   * 240×44) — card clicável com `label` principal e `secondaryText` opcional
   * ao lado do switch. Cliques em qualquer ponto do card togglam o estado.
   */
  rich?: boolean;
  /** Texto principal exibido ao lado do switch no modo `rich`. */
  label?: string;
  /** Texto secundário (`caption/01 - 10px`) abaixo do `label` no modo `rich`. */
  secondaryText?: string;
  /**
   * Quando `true` (em conjunto com `rich`), o `label` e o `secondaryText`
   * truncam com `...` (ellipsis) caso ultrapassem a largura do card. Como o
   * card rich ocupa 100% do container pai, o truncamento é dinâmico em
   * relação ao container — ex.: `<div style={{width:500}}><Switch rich truncate ... /></div>`
   * faz o card ter 500px e truncar conforme necessário.
   */
  truncate?: boolean;
};
