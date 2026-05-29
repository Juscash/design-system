import React from "react";
import type { NavbarProps } from "../../types/components/Navbar";
import "./index.module.css";

const ROOT_CLASS = "ds-navbar";
const BRAND_CLASS = "ds-navbar__brand";
const LEFT_CLASS = "ds-navbar__left";
const RIGHT_CLASS = "ds-navbar__right";
const DEFAULT_ARIA_LABEL = "Barra de navegação";

/**
 * Compõe as classes do `<header>` raiz, mantendo a classe base
 * `ds-navbar` e adicionando a classe extra do consumidor (quando houver).
 */
function buildRootClassName(className: string | undefined): string {
  return [ROOT_CLASS, className].filter(Boolean).join(" ");
}

/**
 * Navbar do design system. Barra superior horizontal com fundo
 * `neutral/50` (#fafafa), borda inferior `border/regular` (#d4d4d4) e
 * padding `16` (token `spacing[4]`), conforme dump
 * `figma/components/navbar/variables-4146-12875.md`.
 *
 * API slot-based: `brand` + `leftSlot` à esquerda, `rightSlot` à direita.
 * O consumidor pode também passar `children` quando quiser montar o
 * layout manualmente.
 *
 * Renderiza um `<header role="banner">` por padrão, com `aria-label`
 * customizável. A altura cresce naturalmente com o conteúdo (~64px com
 * itens de 32px e padding 16, alinhado ao screenshot do dump).
 */
export function Navbar(props: NavbarProps): React.ReactElement {
  const {
    brand,
    leftSlot,
    rightSlot,
    children,
    className,
    style,
    "aria-label": ariaLabel = DEFAULT_ARIA_LABEL,
    ...rest
  } = props;

  const hasSlots = Boolean(brand) || Boolean(leftSlot) || Boolean(rightSlot);

  return (
    <header
      {...rest}
      role="banner"
      aria-label={ariaLabel}
      className={buildRootClassName(className)}
      style={style}
    >
      {hasSlots ?
        <>
          <div className={LEFT_CLASS}>
            {brand ?
              <div className={BRAND_CLASS}>{brand}</div>
            : null}
            {leftSlot}
          </div>
          {rightSlot ?
            <div className={RIGHT_CLASS}>{rightSlot}</div>
          : null}
        </>
      : children}
    </header>
  );
}

Navbar.displayName = "Navbar";

export type { NavbarProps } from "../../types/components/Navbar";
