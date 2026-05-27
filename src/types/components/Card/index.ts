import type { CardProps as AntdCardProps } from "antd";

export type CardProps = AntdCardProps & {
  /**
   * Quando `true`, marca o card como interativo:
   * - aplica `cursor: pointer` e `tabIndex={0}` (entra na ordem de Tab);
   * - habilita o estado `hover` (shadow.m) e o ring de `focus`
   *   (`shadow.focus` = 3px `neutral/300`) via CSS Module.
   *
   * Regra do design (Figma `4069:6522` — frame "Description"): "Inclua o
   * hover e focus apenas em cards clicáveis, que redirecionam para outra
   * página ou ação". Para cards estáticos (container puro), mantenha
   * `clickable` desligado.
   */
  clickable?: boolean;
};
