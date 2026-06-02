import React from "react";
import type { TableBulkActions } from "../../../../types/components/Table";

const ROOT_CLASS = "ds-table-bulk-bar";
const LABEL_CLASS = "ds-table-bulk-bar__label";
const ACTIONS_CLASS = "ds-table-bulk-bar__actions";

interface BulkActionBarProps {
  /** Quantidade de itens selecionados. Define a visibilidade da barra. */
  count: number;
  /** Configuração de label + ações vinda do consumidor. */
  config: TableBulkActions;
}

/**
 * Renderiza o label default no formato pt-BR "{N} item(ns) selecionado(s)"
 * conforme o Figma `8124:10663`. Plural feito direto na string sem cair
 * em singular/plural separado (regra de UX do design system).
 */
function defaultLabel(count: number): React.ReactNode {
  return `${count} item(ns) selecionado(s)`;
}

/**
 * Barra de bulk action — aparece acima da tabela quando há linhas
 * selecionadas. Layout: label à esquerda + slot de ações à direita.
 * Altura fixa 56px (Figma `barHeight`), padding-left 12px.
 *
 * Visibilidade controlada por `count`: 0 ou negativo retorna `null`.
 */
export function BulkActionBar(props: BulkActionBarProps): React.ReactElement | null {
  const { count, config } = props;
  if (count <= 0) return null;

  const renderLabel = config.label ?? defaultLabel;

  return (
    <div className={ROOT_CLASS} role="region" aria-label="Ações em lote">
      <span className={LABEL_CLASS}>{renderLabel(count)}</span>
      <div className={ACTIONS_CLASS}>{config.actions}</div>
    </div>
  );
}

BulkActionBar.displayName = "Table.BulkActionBar";
