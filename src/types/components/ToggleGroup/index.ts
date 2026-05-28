import type { CSSProperties, ReactNode } from "react";

/**
 * Variantes visuais do ToggleGroup conforme dump do Figma
 * (`figma/components/toggle-group/`). `ghost` mostra track cinza
 * (`neutral/200`); `outlined` usa borda no grupo (`neutral/300`).
 */
export type ToggleGroupVariant = "ghost" | "outlined";

/**
 * Tamanhos discretos do ToggleGroup. Alinhados ao dump:
 * - `m` (text 50×36, icon 36×36) — default.
 * - `s` (text 50×32, icon 32×32) — alias do `small`/`default` no Figma.
 * - `xs` (text 34×24, icon 24×24) — alias do `mini` no Figma.
 */
export type ToggleGroupSize = "xs" | "s" | "m";

/**
 * Valor atômico aceito por uma opção do ToggleGroup. Mantemos `string`
 * e `number` para refletir o que o Antd Radio.Group aceita (`Radio.Group`
 * permite primitive values via `options`).
 */
export type ToggleGroupValue = string | number;

/**
 * Opção do ToggleGroup. Cada item pode ter `label`, `icon` ou ambos:
 * - Apenas `label` → renderiza como botão de texto.
 * - Apenas `icon`  → renderiza como botão icon-only (use `ariaLabel`).
 * - `label` + `icon` → texto + ícone.
 */
export interface ToggleGroupOption {
  /**
   * Texto exibido no item. Pode ser omitido quando `icon` for fornecido
   * (modo icon-only); nesse caso, informe `ariaLabel` para leitores de tela.
   */
  label?: string;
  /** Valor associado à opção (único dentro do grupo). */
  value: ToggleGroupValue;
  /** Ícone do item. Aceita nome de ícone Lucide (string) ou `ReactNode`. */
  icon?: string | ReactNode;
  /** Desabilita o item individualmente. */
  disabled?: boolean;
  /**
   * Nome acessível usado quando o item é icon-only. Se omitido, o componente
   * faz fallback para `value.toString()`.
   */
  ariaLabel?: string;
}

/**
 * Props públicas do ToggleGroup. Comportamento `single` (radio behavior):
 * apenas uma opção pode ficar ativa por vez.
 */
export interface ToggleGroupProps {
  /** Valor selecionado em modo controlado. */
  value?: ToggleGroupValue;
  /** Valor selecionado inicial em modo não controlado. */
  defaultValue?: ToggleGroupValue;
  /** Callback disparado quando a seleção muda. */
  onChange?: (value: ToggleGroupValue) => void;
  /** Opções renderizadas dentro do grupo. */
  options: ToggleGroupOption[];
  /** Variante visual do grupo. Default `ghost`. */
  variant?: ToggleGroupVariant;
  /** Tamanho do grupo. Default `m`. */
  size?: ToggleGroupSize;
  /** Desabilita o grupo inteiro. */
  disabled?: boolean;
  /** className aplicada ao container raiz. */
  className?: string;
  /** style aplicado ao container raiz. */
  style?: CSSProperties;
  /** Nome acessível do grupo. Exposto via `aria-label`. */
  "aria-label"?: string;
  /** Permite focar o grupo via teclado quando definido em ≥ 0. */
  tabIndex?: number;
}
