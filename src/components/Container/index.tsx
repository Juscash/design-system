import React from "react";
import type { ContainerProps, ContainerVariant } from "../../types/components/Container";
import "./index.module.css";

const ROOT_CLASS = "ds-container";
const PRODUCT_CLASS = "ds-container--product";
const SITE_CLASS = "ds-container--site";

/**
 * Resolve a classe modificadora de variante. Mapeia `variant="product"` em
 * `ds-container--product` e `variant="site"` em `ds-container--site`.
 */
function resolveVariantClass(variant: ContainerVariant): string {
  return variant === "site" ? SITE_CLASS : PRODUCT_CLASS;
}

/**
 * Compõe o `className` raiz agregando a classe base, a classe
 * modificadora da variante e o `className` extra do consumidor.
 */
function composeRootClassName(variant: ContainerVariant, extra: string | undefined): string {
  return [ROOT_CLASS, resolveVariantClass(variant), extra].filter(Boolean).join(" ");
}

/**
 * Componente `Container` do design system. Layout primitive que define a
 * área útil de conteúdo dentro do layout (logo após sidebar/header),
 * centralizando o conteúdo e aplicando `max-width` por breakpoint
 * conforme a variante de produto.
 *
 * Conforme dump `figma/fundamentos/container/design-context-8347-11528.json`
 * e tokens `src/theme/foundations/container/index.ts`:
 *
 * - `variant="product"` (default) — Demais produtos JusCash. Fluido até
 *   1919px; fixo a partir de 1920px com `max-width 1800px`.
 * - `variant="site"` — Site institucional. Fluido até 1365px; fixo a
 *   partir de 1366px com `max-width 1086px`.
 *
 * Padding horizontal e superior fixos em 24px em todos os modos. Tag
 * raiz configurável via `as` (`"div"` default, `"main"`, `"section"`).
 *
 * Não envolve componente do Antd: o componente é um primitivo visual
 * (`<div>`/`<main>`/`<section>`) próprio, com estilo definido em
 * `index.module.css`.
 */
export function Container(props: ContainerProps): React.ReactElement {
  const { variant = "product", as = "div", className, children, ...rest } = props;
  const composedClassName = composeRootClassName(variant, className);

  return React.createElement(as, { ...rest, className: composedClassName }, children);
}

Container.displayName = "Container";

export type { ContainerProps, ContainerVariant, ContainerAs } from "../../types/components/Container";
