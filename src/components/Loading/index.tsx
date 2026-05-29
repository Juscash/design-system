import React from "react";
import type { LoadingProps, LoadingVariant } from "../../types/components/Loading";
import "./index.module.css";

const ROOT_CLASS = "ds-loading";
const DOTS_CONTAINER_CLASS = "ds-loading-dots";
const DOT_CLASS = "ds-loading-dot";
const SPINNER_CLASS = "ds-loading-spinner";
const DEFAULT_ARIA_LABEL = "Carregando...";
const DEFAULT_VARIANT: LoadingVariant = "spinner";

/**
 * Combina classes próprias do design system com `className` externo. Filtra
 * valores falsy para evitar espaços duplicados na string final.
 */
function composeClassName(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Renderiza os 3 dots animados da variante `"dots"`. Cada dot tem o seu
 * próprio modificador (`--1`, `--2`, `--3`) que aplica `animation-delay`
 * distintos no CSS Module.
 */
function renderDots(): React.ReactElement {
  return (
    <div className={DOTS_CONTAINER_CLASS} aria-hidden="true">
      <span className={`${DOT_CLASS} ${DOT_CLASS}--1`} />
      <span className={`${DOT_CLASS} ${DOT_CLASS}--2`} />
      <span className={`${DOT_CLASS} ${DOT_CLASS}--3`} />
    </div>
  );
}

/**
 * Renderiza o anel circular rotacional da variante `"spinner"`.
 */
function renderSpinner(): React.ReactElement {
  return <span className={SPINNER_CLASS} aria-hidden="true" />;
}

/**
 * Componente `Loading`. Indicador visual de carregamento em duas variantes
 * (`"dots"` e `"spinner"`) extraídas do dump
 * `figma/components/loading/design-context-4163-13165.md`.
 *
 * Acessibilidade: o wrapper externo carrega `role="status"`,
 * `aria-live="polite"`, `aria-busy="true"` e `aria-label` (default
 * `"Carregando..."`). Os elementos visuais internos recebem
 * `aria-hidden="true"` para evitar leitura redundante.
 *
 * Em `prefers-reduced-motion: reduce`, as animações são desligadas via media
 * query no CSS Module.
 */
export function Loading(props: LoadingProps): React.ReactElement {
  const {
    variant = DEFAULT_VARIANT,
    "aria-label": ariaLabel = DEFAULT_ARIA_LABEL,
    className,
    ...rest
  } = props;

  const isDots = variant === "dots";

  return (
    <div
      {...rest}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={ariaLabel}
      className={composeClassName(ROOT_CLASS, className)}
    >
      {isDots ? renderDots() : renderSpinner()}
    </div>
  );
}

Loading.displayName = "Loading";

export type { LoadingProps, LoadingVariant } from "../../types/components/Loading";
