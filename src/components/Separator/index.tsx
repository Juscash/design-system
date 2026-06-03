import React from "react";
import type { SeparatorProps } from "../../types/components/Separator";
import "./index.module.css";

const ROOT_CLASS = "ds-separator";
const HORIZONTAL_CLASS = "ds-separator--horizontal";
const VERTICAL_CLASS = "ds-separator--vertical";

/**
 * Separator do design system. Linha 1px usada para dividir conteúdo em
 * seções distintas. Aceita o eixo `direction` (`"horizontal"` default ou
 * `"vertical"`). Conforme dump `figma/components/separator/`.
 *
 * Renderiza um `<div role="separator">` com classes utilitárias da camada
 * Juscash. A cor é o token `--color-border-regular` (#d4d4d4). Não envolve
 * componente do Antd: a antd `Divider` tem comportamento próprio (texto
 * inline, margins built-in) que não bate com o dump.
 */
export function Separator(props: SeparatorProps): React.ReactElement {
  const { direction = "horizontal", className, ...rest } = props;

  const isVertical = direction === "vertical";
  const directionClass = isVertical ? VERTICAL_CLASS : HORIZONTAL_CLASS;
  const composedClassName = [ROOT_CLASS, directionClass, className].filter(Boolean).join(" ");

  return (
    <div
      {...rest}
      role="separator"
      aria-orientation={isVertical ? "vertical" : undefined}
      className={composedClassName}
    />
  );
}

Separator.displayName = "Separator";

export type { SeparatorProps, SeparatorDirection } from "../../types/components/Separator";
