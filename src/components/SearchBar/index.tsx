import React from "react";
import { Search } from "lucide-react";
import { Input } from "../Input";
import type { SearchBarProps } from "../../types/components/SearchBar";
import "./index.module.css";

const ROOT_CLASS = "ds-search-bar";
const DEFAULT_PLACEHOLDER = "Pesquise...";
const ICON_SIZE = 16;

/**
 * Combina classes próprias do design system com o `className` externo,
 * removendo valores falsy para evitar espaços duplicados.
 */
function composeClassName(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Componente `SearchBar`. Wrapper do `Input` do design system com ícone de
 * busca (`Search` da Lucide, 16px) fixado como `prefix` e placeholder
 * default `"Pesquise..."`.
 *
 * Mapeamento direto do dump
 * `figma/components/search-bar/design-context-4125-10367.md`:
 * - "Input field 320 wide, h-36 bg neutral/50 border regular rounded radius/xl 8".
 * - "icon/search 16px à esquerda + placeholder Inter Regular 13 text/soft 'Pesquise...'".
 * - States: placeholder, value, focus — todos providos pelo `Input` base
 *   (tokens neutros, sombra de foco cinza, sem alteração de borda).
 *
 * O `Input` do DS já entrega altura 36 (size `m`), bg `neutral/50`, border
 * `border/regular`, radius `xl` (8), placeholder Inter Regular 13 `text/soft`
 * — não duplicamos esses tokens aqui.
 */
function SearchBar(props: SearchBarProps): React.ReactElement {
  const {
    value,
    defaultValue,
    onChange,
    placeholder = DEFAULT_PLACEHOLDER,
    className,
    style,
    disabled,
    "aria-label": ariaLabel,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange?.(event.target.value);
  };

  return (
    <Input
      size="m"
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      aria-label={ariaLabel}
      prefix={<Search size={ICON_SIZE} aria-hidden="true" />}
      className={composeClassName(ROOT_CLASS, className)}
      style={style}
    />
  );
}

SearchBar.displayName = "SearchBar";

export { SearchBar };

export type { SearchBarProps } from "../../types/components/SearchBar";
