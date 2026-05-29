import type { CSSProperties } from "react";

/**
 * Props do componente `SearchBar`. Campo de pesquisa 320×36 com ícone de busca
 * (Search 16px da Lucide) à esquerda e placeholder default `"Pesquise..."`.
 *
 * Mapeamento do dump (`figma/components/search-bar/design-context-4125-10367.md`):
 * - "Input field 320 wide, h-36 bg neutral/50 border regular rounded radius/xl 8".
 * - "icon/search 16px à esquerda + placeholder Inter Regular 13 text/soft 'Pesquise...'".
 * - States: placeholder, value, focus (todos cobertos pelo wrapper do `Input` do DS).
 *
 * Limite de 8 props conforme `CLAUDE.md > Limites duros`.
 */
export interface SearchBarProps {
  /** Valor controlado do campo de busca. */
  value?: string;
  /** Valor inicial (modo não controlado). */
  defaultValue?: string;
  /**
   * Callback disparado a cada mudança de valor. Recebe a string atual
   * (apenas o `value` — sem `event`) para simplificar consumo em buscas.
   */
  onChange?: (value: string) => void;
  /**
   * Texto exibido quando o campo está vazio. Default `"Pesquise..."` conforme
   * o dump (linha "placeholder Inter Regular 13 text/soft 'Pesquise...'").
   */
  placeholder?: string;
  /** Classe CSS adicional aplicada ao wrapper do input. */
  className?: string;
  /** Estilo inline adicional. Permite override de `width` (default 320px). */
  style?: CSSProperties;
  /** Quando `true`, desabilita o campo. */
  disabled?: boolean;
  /** Rótulo acessível alternativo ao placeholder. */
  "aria-label"?: string;
}
