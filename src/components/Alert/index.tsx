import React from "react";
import * as LucideIcons from "lucide-react";
import type { AlertProps } from "../../types/components/Alert";
import "./index.module.css";

const ICON_SIZE = 16;

/**
 * Resolve a prop de ícone em um `ReactNode`. Quando o valor é uma string,
 * busca o componente correspondente em `lucide-react` (ex.: `"Check"` →
 * `<Check size={16} />`). Para `ReactNode`, retorna como está.
 */
function resolveAlertIcon(icon: React.ReactNode | string | null | undefined): React.ReactNode {
  if (icon === undefined || icon === null) return null;
  if (typeof icon !== "string") return icon;
  const registry = LucideIcons as unknown as Record<string, unknown>;
  const Candidate = registry[icon];
  if (typeof Candidate !== "function" && typeof Candidate !== "object") return null;
  const IconComponent = Candidate as React.ComponentType<{ size?: number }>;
  return <IconComponent size={ICON_SIZE} />;
}

const ROOT_CLASS = "ds-alert";
const ROOT_ERROR_CLASS = "ds-alert--error";
const CONTENT_CLASS = "ds-alert-content";
const ICON_CLASS = "ds-alert-icon";
const TEXT_CLASS = "ds-alert-text";
const LINE_1_CLASS = "ds-alert-line1";
const LINE_2_CLASS = "ds-alert-line2";
const BUTTON_CLASS = "ds-alert-button";
const RIGHT_ICON_CLASS = "ds-alert-right-icon";

const DEFAULT_BUTTON_LABEL = "Label";

/**
 * Compõe o `className` raiz do componente, agregando a classe base, a
 * classe modificadora da variante de cor e o `className` extra do consumer.
 */
function composeRootClassName(type: AlertProps["type"], extra: string | undefined): string {
  const classes = [ROOT_CLASS];
  if (type === "error") {
    classes.push(ROOT_ERROR_CLASS);
  }
  if (extra) {
    classes.push(extra);
  }
  return classes.join(" ");
}

/**
 * Componente `Alert` do design system. Renderiza um container `<div>` com
 * `role="alert"` contendo: aligner de ícone à esquerda (opcional), bloco
 * de texto com duas linhas (linha 2 opcional), botão à direita (opcional)
 * e aligner de ícone à direita (opcional). Conforme dump
 * `figma/components/alert/design-context-4077-7402.md` (frame 4077:7402).
 *
 * Não embrulha o `Alert` do Antd: o `antd/Alert` traz seu próprio header
 * com fundo colorido, ícones built-in e botão de fechar, que não casam
 * com o desenho do Figma. O componente é um primitivo visual `<div>`
 * próprio, com estilo definido em `index.module.css`.
 */
export function Alert(props: AlertProps): React.ReactElement {
  const {
    type = "neutral",
    children,
    line2,
    showLine2 = false,
    showLeftIcon = true,
    showRightIcon = false,
    showButton = false,
    leftIcon = null,
    rightIcon = null,
    buttonLabel = DEFAULT_BUTTON_LABEL,
    onButtonClick,
    className,
    ...rest
  } = props;

  const resolvedLeftIcon = resolveAlertIcon(leftIcon);
  const resolvedRightIcon = resolveAlertIcon(rightIcon);

  return (
    <div {...rest} role="alert" className={composeRootClassName(type, className)}>
      <div className={CONTENT_CLASS}>
        {showLeftIcon ? (
          <div className={ICON_CLASS} aria-hidden="true">
            {resolvedLeftIcon}
          </div>
        ) : null}
        <div className={TEXT_CLASS}>
          <p className={LINE_1_CLASS}>{children}</p>
          {showLine2 ? <p className={LINE_2_CLASS}>{line2}</p> : null}
        </div>
      </div>
      {showButton ? (
        <button className={BUTTON_CLASS} type="button" onClick={onButtonClick}>
          {buttonLabel}
        </button>
      ) : null}
      {showRightIcon ? (
        <div className={RIGHT_ICON_CLASS} aria-hidden="true">
          {resolvedRightIcon}
        </div>
      ) : null}
    </div>
  );
}

Alert.displayName = "Alert";

export type { AlertProps, AlertVariant } from "../../types/components/Alert";
