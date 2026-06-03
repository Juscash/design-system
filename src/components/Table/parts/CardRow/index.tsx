import React from "react";
import type { Key } from "react";
import type { ColumnsType } from "antd/es/table/interface";
import type { TableProps as AntdTableProps } from "antd/es/table";
import { Checkbox } from "../../../Checkbox";
import { CardField } from "../CardField";

const CARD_CLASS = "ds-card";
const CARD_SELECTED_CLASS = "ds-card--selected";
const SECTION_HEADER_CLASS = "ds-card__header";
const SECTION_BODY_CLASS = "ds-card__body";
const SECTION_FOOTER_CLASS = "ds-card__footer";
const HEADER_FIELDS_CLASS = "ds-card__header-fields";
const HEADER_CHECKBOX_CLASS = "ds-card__header-checkbox";

export interface CardRowProps<T> {
  /** Record do dataSource representado por este card. */
  record: T;
  /** Índice do record no dataSource. */
  index: number;
  /** Chave única do record (resolvida via `rowKey` do antd). */
  recordKey: Key;
  /** Colunas do nível header. */
  headerCols: ColumnsType<T>;
  /** Colunas do nível body. */
  bodyCols: ColumnsType<T>;
  /** Colunas do nível footer. */
  footerCols: ColumnsType<T>;
  /** Configuração de seleção (mesma do antd Table). */
  rowSelection?: AntdTableProps<T>["rowSelection"];
  /** Lista mestre de selectedRowKeys vinda do consumidor (modo controlled). */
  selectedRowKeys: Key[];
  /** Callback para atualizar a seleção (chamado quando user toca no checkbox do card). */
  onSelectionToggle: (key: Key, selected: boolean, record: T) => void;
}

/**
 * Renderiza UM cartão da tabela em modo `cards` — conforme Figma Prospecção
 * (`5101:54788`).
 *
 * Estrutura:
 * - **Header**: cells de `cardLayout.header` à esquerda + checkbox de seleção
 *   à direita (quando há `rowSelection`). Divider full-width tocando as
 *   bordas do card (via `border-bottom` no CSS).
 * - **Body**: cells restantes (não em header nem footer), stacked sem
 *   separadores internos. Divider full-width antes do footer.
 * - **Footer**: cells de `cardLayout.footer` (geralmente ações). Sem
 *   separador no fundo (limite final do card).
 *
 * Os níveis ficam ocultos quando não há cells associadas. Quando nenhum
 * `cardLayout.header` é passado, o header ainda aparece se houver
 * `rowSelection` (só com o checkbox).
 */
export function CardRow<T>(props: CardRowProps<T>): React.ReactElement {
  const { record, index, recordKey, headerCols, bodyCols, footerCols, rowSelection, selectedRowKeys, onSelectionToggle } =
    props;

  const isSelected = selectedRowKeys.includes(recordKey);
  const showCheckbox = rowSelection !== undefined;
  const checkboxType = rowSelection?.type ?? "checkbox";
  const isRadioMode = checkboxType === "radio";
  const hasHeaderCols = headerCols.length > 0;
  const showHeader = hasHeaderCols || showCheckbox;

  const handleToggle = (next: boolean): void => {
    onSelectionToggle(recordKey, next, record);
  };

  const cardClassName = [CARD_CLASS, isSelected ? CARD_SELECTED_CLASS : ""].filter(Boolean).join(" ");

  return (
    <div className={cardClassName} role="row" aria-selected={isSelected || undefined}>
      {showHeader ? (
        <div className={SECTION_HEADER_CLASS}>
          <div className={HEADER_FIELDS_CLASS}>
            {headerCols.map((col, colIndex) => (
              <CardField
                key={`h-${String((col as { key?: Key }).key ?? colIndex)}`}
                column={col}
                record={record}
                index={index}
              />
            ))}
          </div>
          {showCheckbox ? (
            <span className={HEADER_CHECKBOX_CLASS}>
              {isRadioMode ? (
                <input
                  type="radio"
                  checked={isSelected}
                  onChange={(event) => handleToggle(event.target.checked)}
                  aria-label="Selecionar linha"
                />
              ) : (
                <Checkbox
                  checked={isSelected}
                  onChange={(event) => handleToggle(event.target.checked)}
                  aria-label="Selecionar linha"
                />
              )}
            </span>
          ) : null}
        </div>
      ) : null}

      {bodyCols.length > 0 ? (
        <div className={SECTION_BODY_CLASS}>
          {bodyCols.map((col, colIndex) => (
            <CardField
              key={`b-${String((col as { key?: Key }).key ?? colIndex)}`}
              column={col}
              record={record}
              index={index}
            />
          ))}
        </div>
      ) : null}

      {footerCols.length > 0 ? (
        <div className={SECTION_FOOTER_CLASS}>
          {footerCols.map((col, colIndex) => (
            <CardField
              key={`f-${String((col as { key?: Key }).key ?? colIndex)}`}
              column={col}
              record={record}
              index={index}
              showLabel={false}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

CardRow.displayName = "Table.CardRow";
