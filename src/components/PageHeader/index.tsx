import React from "react";
import { Card } from "../Card";
import type { PageHeaderHeadingLevel, PageHeaderProps } from "../../types/components/PageHeader";
import "./index.module.css";

const DEFAULT_LEVEL: PageHeaderHeadingLevel = 1;

const CARD_CLASS = "ds-page-header-card";
const BASE_CLASS = "ds-page-header";
const TITLE_AREA_CLASS = "ds-page-header__title-area";
const TITLE_CLASS = "ds-page-header__title";
const DESCRIPTION_CLASS = "ds-page-header__description";
const ACTIONS_CLASS = "ds-page-header__actions";

type HeadingTagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Renderiza o título no nível semântico solicitado (`h1`–`h6`), com a
 * classe de estilo do design system. Usa template literal para mapear
 * `level → "h{level}"` evitando literais numéricos no corpo da função.
 */
function renderTitle(level: PageHeaderHeadingLevel, title: React.ReactNode): React.ReactElement {
  const Tag = `h${level}` as HeadingTagName;
  return <Tag className={TITLE_CLASS}>{title}</Tag>;
}

/**
 * Cabeçalho de página padrão do design system. Renderiza um `Card`
 * contendo título, descrição opcional e um slot livre de ações
 * (`actions`) à direita. O layout é sempre responsivo: horizontal em
 * telas ≥ 768 px e empilhado (ações no topo) em telas < 768 px.
 */
export function PageHeader(props: PageHeaderProps): React.ReactElement {
  const { title, description, actions, level = DEFAULT_LEVEL, className, style } = props;

  const cardClassName = [CARD_CLASS, className].filter(Boolean).join(" ");

  return (
    <Card className={cardClassName} style={style}>
      <div className={BASE_CLASS}>
        <div className={TITLE_AREA_CLASS}>
          {title ? renderTitle(level, title) : null}
          {description ?
            <p className={DESCRIPTION_CLASS}>{description}</p>
          : null}
        </div>
        {actions ?
          <div className={ACTIONS_CLASS}>{actions}</div>
        : null}
      </div>
    </Card>
  );
}

PageHeader.displayName = "PageHeader";

export type { PageHeaderProps, PageHeaderHeadingLevel } from "../../types/components/PageHeader";
