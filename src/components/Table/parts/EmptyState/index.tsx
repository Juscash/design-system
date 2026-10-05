import React, { isValidElement } from "react";
import { Inbox } from "lucide-react";
import { EmptyState as RootEmptyState } from "../../../EmptyState";
import { resolveLucideIcon } from "../../../../utils/resolveLucideIcon";
import { designSystemColors, spacing } from "../../../../theme";
import type { TableEmptyState } from "../../../../types/components/Table";

const ROOT_CLASS = "ds-table-empty-state";
const DEFAULT_TITLE = "Nenhum registro encontrado.";
const DEFAULT_ICON_SIZE = 24;
const DEFAULT_ICON_STROKE = 1.75;
const TEXT_FONT_SIZE = 13;

/**
 * Centralização do placeholder no container. Vai inline (mesmo padrão do
 * `EmptyState` raiz) porque o `index.module.css` do Table não chega ao
 * consumidor: o `dist/index.css` publicado é só `fonts.css` + `theme/global.css`.
 * A classe `ROOT_CLASS` é mantida como gancho de estilo para o consumidor.
 */
const wrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: `${spacing[12]}px ${spacing[4]}px`,
  color: designSystemColors.neutral[800],
  fontFamily: "Inter, sans-serif",
  fontSize: TEXT_FONT_SIZE,
  lineHeight: 1.2,
};

interface TableEmptyStateRendererProps {
  /** Configuração vinda da prop `emptyState` do Table. */
  config: TableEmptyState | undefined;
}

/**
 * Resolve se a config é um ReactNode pronto (controle total) ou um objeto
 * `{ title, description, icon }` que dispara o layout default do DS.
 *
 * Aceita: `null` → false; outros React nodes/elementos → true.
 */
function isReactNodeConfig(config: TableEmptyState | undefined): config is React.ReactNode {
  if (config === undefined || config === null) return false;
  if (isValidElement(config)) return true;
  if (typeof config === "string" || typeof config === "number") return true;
  return false;
}

/**
 * Renderizador do estado vazio do Table. Cobre 3 caminhos:
 *
 * 1. `emptyState` é um ReactNode → renderiza direto.
 * 2. `emptyState` é objeto `{ title, description, icon }` → usa o
 *    `EmptyState` global do design system com os textos custom passados.
 * 3. `emptyState` ausente → fallback simples "Nenhum registro encontrado."
 *    (mesmo do `locale.emptyText`).
 */
export function TableEmptyStateRenderer(props: TableEmptyStateRendererProps): React.ReactElement {
  const { config } = props;

  if (isReactNodeConfig(config)) {
    return (
      <div className={ROOT_CLASS} style={wrapperStyle}>
        {config}
      </div>
    );
  }

  if (config && typeof config === "object") {
    const { title, description, icon } = config;
    const resolvedIcon =
      icon !== undefined
        ? resolveLucideIcon(icon, DEFAULT_ICON_SIZE)
        : <Inbox size={DEFAULT_ICON_SIZE} strokeWidth={DEFAULT_ICON_STROKE} />;
    return (
      <div className={ROOT_CLASS} style={wrapperStyle}>
        <RootEmptyState title={title ?? DEFAULT_TITLE} description={description} icon={resolvedIcon} />
      </div>
    );
  }

  return (
    <div className={ROOT_CLASS} style={wrapperStyle}>
      {DEFAULT_TITLE}
    </div>
  );
}

TableEmptyStateRenderer.displayName = "Table.EmptyState";
