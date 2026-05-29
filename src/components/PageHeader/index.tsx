import React from "react";
import { Card } from "../Card";
import type { PageHeaderHeadingLevel, PageHeaderProps, PageHeaderVariant } from "../../types/components/PageHeader";
import "./index.module.css";

const DEFAULT_LEVEL: PageHeaderHeadingLevel = 1;
const DEFAULT_VARIANT: PageHeaderVariant = "responsive";

const CARD_CLASS = "ds-page-header-card";
const BASE_CLASS = "ds-page-header";
const TITLE_AREA_CLASS = "ds-page-header__title-area";
const TITLE_CLASS = "ds-page-header__title";
const DESCRIPTION_CLASS = "ds-page-header__description";
const ACTIONS_CLASS = "ds-page-header__actions";

const VARIANT_CLASS_MAP: Record<PageHeaderVariant, string | undefined> = {
  default: undefined,
  responsive: "ds-page-header--responsive",
  stacked: "ds-page-header--stacked",
};

/**
 * Retorna a classe modificadora correspondente à variante de layout.
 */
function getVariantClass(variant: PageHeaderVariant): string | undefined {
  return VARIANT_CLASS_MAP[variant];
}

/**
 * Compõe a lista de classes do wrapper interno do cabeçalho.
 */
function buildHeaderClassName(variant: PageHeaderVariant): string {
  return [BASE_CLASS, getVariantClass(variant)].filter(Boolean).join(" ");
}

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
 * contendo título obrigatório, descrição opcional e um slot livre de
 * ações (`actions`) à direita — que migra para o topo no layout
 * `responsive` (em telas < 768px) ou `stacked` (sempre empilhado).
 *
 * Veja `docs/componentes/PageHeader.md` para o parecer técnico completo.
 */
export function PageHeader(props: PageHeaderProps): React.ReactElement {
  const { title, description, actions, variant = DEFAULT_VARIANT, level = DEFAULT_LEVEL, className, style } = props;

  const headerClassName = buildHeaderClassName(variant);
  const cardClassName = [CARD_CLASS, className].filter(Boolean).join(" ");

  return (
    <Card className={cardClassName} style={style}>
      <div className={headerClassName}>
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

export type { PageHeaderProps, PageHeaderHeadingLevel, PageHeaderVariant } from "../../types/components/PageHeader";
