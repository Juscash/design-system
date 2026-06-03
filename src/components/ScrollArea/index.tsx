import React from "react";
import type { ScrollAreaOrientation, ScrollAreaProps } from "../../types/components/ScrollArea";
import "./index.module.css";

const ROOT_CLASS = "ds-scroll-area";
const VERTICAL_CLASS = "ds-scroll-area--vertical";
const HORIZONTAL_CLASS = "ds-scroll-area--horizontal";
const DEFAULT_TAB_INDEX = 0;

/**
 * Resolve a classe de orientação aplicada ao container. `"vertical"` trava
 * o eixo X, `"horizontal"` trava o Y e `"both"` não adiciona modificador
 * (ambos os eixos rolam).
 */
function getOrientationClass(orientation: ScrollAreaOrientation): string | undefined {
  if (orientation === "vertical") return VERTICAL_CLASS;
  if (orientation === "horizontal") return HORIZONTAL_CLASS;
  return undefined;
}

/**
 * ScrollArea do design system. Container que estiliza a scrollbar nativa
 * mantendo o comportamento padrão do navegador e a funcionalidade de
 * teclado. Conforme dump `figma/components/scroll-area/`.
 *
 * Não envolve componente do Antd: o Antd não expõe um equivalente direto
 * de scroll container estilizado. As dimensões (width/height) são
 * definidas pelo consumidor via `className`/`style`.
 *
 * Acessibilidade: o container recebe `tabIndex={0}` por padrão para
 * permitir foco via Tab e rolagem por setas/PageUp/PageDown. Se um
 * `aria-label` for fornecido, o papel `region` é aplicado automaticamente.
 */
export function ScrollArea(props: ScrollAreaProps): React.ReactElement {
  const {
    orientation = "vertical",
    className,
    children,
    tabIndex = DEFAULT_TAB_INDEX,
    role,
    "aria-label": ariaLabel,
    ...rest
  } = props;

  const composedClassName = [ROOT_CLASS, getOrientationClass(orientation), className].filter(Boolean).join(" ");
  const resolvedRole = role ?? (ariaLabel ? "region" : undefined);

  return (
    <div {...rest} className={composedClassName} tabIndex={tabIndex} role={resolvedRole} aria-label={ariaLabel}>
      {children}
    </div>
  );
}

ScrollArea.displayName = "ScrollArea";

export type { ScrollAreaOrientation, ScrollAreaProps } from "../../types/components/ScrollArea";
