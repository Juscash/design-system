import type { CSSProperties, ReactNode } from "react";

/**
 * Tamanho discreto do `InputChips`, espelhando o eixo do `Input` do DS:
 * `xs` (24px), `s` (32px), `m` (36px — default), `l` (40px).
 *
 * Spec Figma `8292:10349` — página `Doc-page`, section `Component`:
 * "4 sizes (Regular/Large/Small/Mini) × 2 chips (Without chips / With chips)".
 * Mapeamento: Regular→`m`, Large→`l`, Small→`s`, Mini→`xs`.
 */
export type InputChipsSize = "xs" | "s" | "m" | "l";

export interface InputChipsProps {
  /** Lista de chips controlada. Quando definida, ignora `defaultValue`. */
  value?: string[];
  /** Lista inicial (uncontrolled). */
  defaultValue?: string[];
  /** Callback executado quando a lista de chips muda (add/remove). */
  onChange?: (chips: string[]) => void;
  /** Tamanho do input/chips. Default `m`. */
  size?: InputChipsSize;
  /** Placeholder do input nativo. Default `"Digite e aperte enter"`. */
  placeholder?: string;
  /** Label exibida acima do input. Spec Figma: Inter Regular 16, `text/dark`. */
  label?: ReactNode;
  /** Desabilita input e chips. */
  disabled?: boolean;
  /** className aplicada ao wrapper externo. */
  className?: string;
  /** style aplicado ao wrapper externo. */
  style?: CSSProperties;
}
