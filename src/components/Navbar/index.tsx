import React from "react";
import type { NavbarProps } from "../../types/components/Navbar";
import "./index.module.css";

const ROOT_CLASS = "ds-navbar";
const LEFT_CLASS = "ds-navbar__left";
const RIGHT_CLASS = "ds-navbar__right";
const DEFAULT_ARIA_LABEL = "Barra de navegação";

/**
 * Compõe as classes do `<header>` raiz, mantendo `ds-navbar` e adicionando a
 * classe extra do consumidor (quando houver).
 */
function buildRootClassName(className: string | undefined): string {
  return [ROOT_CLASS, className].filter(Boolean).join(" ");
}

/**
 * Navbar do design system. Barra superior horizontal (Figma `4146:12875`):
 * fundo `neutral/50` (#fafafa), borda inferior `border/regular` (#d4d4d4) e
 * padding `16` (token `spacing[4]`), com `flex / justify-between`.
 *
 * Duas regiões compostas pelo consumidor: `left` (logo/botão de menu) e
 * `right` (ações), cada uma em `flex gap-8 items-center`. No mobile (< 1024px)
 * o padding horizontal cai para `8`.
 *
 * Utilitários de responsividade (classes globais), com corte no breakpoint
 * `m` (1024px): `ds-navbar-hide-mobile` oculta o item no mobile (< 1024px);
 * `ds-navbar-hide-desktop` oculta no desktop (≥ 1024px) — ex.: o hamburger que
 * abre o Drawer só no mobile; `ds-navbar-center-mobile` centraliza o item
 * (ex.: logo) na barra no mobile.
 *
 * Renderiza `<header role="banner">` com `aria-label` customizável (default
 * `"Barra de navegação"`). Altura ~64px (padding 16 + conteúdo de 32px).
 */
export function Navbar(props: NavbarProps): React.ReactElement {
  const { left, right, className, style, "aria-label": ariaLabel = DEFAULT_ARIA_LABEL, ...rest } = props;

  return (
    <header
      {...rest}
      role="banner"
      aria-label={ariaLabel}
      className={buildRootClassName(className)}
      style={style}
    >
      <div className={LEFT_CLASS}>{left}</div>
      <div className={RIGHT_CLASS}>{right}</div>
    </header>
  );
}

Navbar.displayName = "Navbar";

export type { NavbarProps } from "../../types/components/Navbar";
