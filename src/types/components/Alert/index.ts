import type { HTMLAttributes, ReactNode } from "react";

/**
 * Variante de cor do Alert. Conforme dump
 * `figma/components/alert/design-context-4077-7402.md` — o componente
 * tem dois estados de cor: `neutral` (default, com texto e ícone em
 * `--color-text-dark`) e `error` (texto e ícone em
 * `--color-feedback-red-500`).
 */
export type AlertVariant = "neutral" | "error";

/**
 * Remove props nativas do `<div>` que o componente controla internamente
 * (`role` é fixado em `"alert"`; `children` recebe nova semântica de
 * "conteúdo da linha 1").
 */
type CleanDivProps = Omit<HTMLAttributes<HTMLDivElement>, "role" | "children">;

/**
 * Props do componente `Alert`. Combina props nativas do `<div>` com props
 * proprietárias derivadas do dump do Figma (`figma/components/alert/`).
 *
 * O dump separa explicitamente o flag de exibição do ícone (`showLeftIcon`,
 * `showRightIcon`, `showLine2`, `showButton`) do conteúdo (`leftIcon`,
 * `rightIcon`, `line2`, `buttonLabel`), por isso o componente expõe
 * ambos os eixos. Total de props proprietárias = 11, acima do limite
 * geral (8); aceito porque a estrutura é ditada pelo dump.
 */
export type AlertProps = CleanDivProps & {
  /**
   * Variante de cor. `"neutral"` (default) ou `"error"`. Conforme dump
   * (4077:8730 e 4077:8746).
   */
  type?: AlertVariant;
  /**
   * Conteúdo da linha 1 (`<p>` superior do bloco de texto). No dump aparece
   * como o placeholder "Line 1".
   */
  children?: ReactNode;
  /**
   * Conteúdo da linha 2 (`<p>` inferior do bloco de texto). Só é renderizado
   * quando `showLine2` é `true`. No dump aparece como o placeholder
   * "Line 2".
   */
  line2?: ReactNode;
  /**
   * Mostra a linha 2 de texto. Default `false`. Conforme dump.
   */
  showLine2?: boolean;
  /**
   * Mostra o aligner do ícone esquerdo. Default `true`. Conforme dump.
   */
  showLeftIcon?: boolean;
  /**
   * Mostra o aligner do ícone direito. Default `false`. Conforme dump.
   */
  showRightIcon?: boolean;
  /**
   * Mostra o botão à direita do conteúdo. Default `false`. Conforme dump.
   */
  showButton?: boolean;
  /**
   * Ícone à esquerda. Renderizado dentro do aligner quando `showLeftIcon`
   * é `true`. Aceita o nome de um ícone do `lucide-react` como string
   * (ex.: `"Check"`, `"CircleAlert"`) — o componente resolve para
   * `<Icon size={16} />` internamente. Também aceita `ReactNode` direto.
   */
  leftIcon?: ReactNode | string | null;
  /**
   * Ícone à direita. Renderizado dentro do aligner quando `showRightIcon`
   * é `true`. Aceita o nome de um ícone do `lucide-react` como string
   * (ex.: `"X"`) ou `ReactNode` direto.
   */
  rightIcon?: ReactNode | string | null;
  /**
   * Texto exibido no botão à direita. Default `"Label"` (literal do dump).
   */
  buttonLabel?: string;
  /**
   * Callback disparado no `onClick` do botão à direita. Só relevante
   * quando `showButton` é `true`.
   */
  onButtonClick?: () => void;
};
