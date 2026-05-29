import React from "react";
import { ArrowUp } from "lucide-react";
import { Tooltip } from "../Tooltip";
import { useBackToTopController } from "./hooks/useBackToTopController";
import type { BackToTopProps } from "../../types/components/BackToTop";
import "./index.module.css";

const DEFAULT_VISIBILITY_HEIGHT = 300;
const DEFAULT_DURATION = 450;
const DEFAULT_TOOLTIP_LABEL = "Voltar ao topo";
const ICON_SIZE = 16;
const ROOT_CLASS = "ds-back-to-top";
const VISIBLE_CLASS = "ds-back-to-top--visible";

/**
 * Combina classes próprias do design system com o `className` externo,
 * removendo valores falsy para evitar espaços duplicados.
 */
function composeClassName(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Componente `BackToTop`. Botão flutuante neutro 36x36 fixado no canto
 * inferior direito que aparece após `visibilityHeight` pixels de rolagem
 * (default 300, conforme dump
 * `figma/components/back-to-top/design-context-4237-10399.md`).
 *
 * O botão sempre existe no DOM (controlado por `opacity`/`visibility` no CSS)
 * para permitir transição suave, e está sempre envolvido por um `Tooltip` no
 * placement `left` exibindo `tooltipLabel` (default `"Voltar ao topo"`).
 */
export function BackToTop(props: BackToTopProps): React.ReactElement {
  const {
    visibilityHeight = DEFAULT_VISIBILITY_HEIGHT,
    target,
    duration = DEFAULT_DURATION,
    className,
    style,
    tooltipLabel = DEFAULT_TOOLTIP_LABEL,
    onClick,
  } = props;

  const { visible, handleClick } = useBackToTopController(visibilityHeight, duration, target, onClick);

  return (
    <Tooltip title={tooltipLabel} placement="left">
      <button
        type="button"
        aria-label={tooltipLabel}
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        className={composeClassName(ROOT_CLASS, visible && VISIBLE_CLASS, className)}
        style={style}
        onClick={handleClick}
      >
        <ArrowUp size={ICON_SIZE} aria-hidden="true" />
      </button>
    </Tooltip>
  );
}

BackToTop.displayName = "BackToTop";

export type { BackToTopProps, BackToTopScrollTarget } from "../../types/components/BackToTop";
