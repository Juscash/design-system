import React from "react";
import { Breadcrumb as AntdBreadcrumb, ConfigProvider, Dropdown } from "antd";
import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import type { MenuProps } from "antd";
import { ChevronRight, Ellipsis } from "lucide-react";
import { designSystemColors } from "../../theme";
import type { BreadcrumbProps } from "../../types/components/Breadcrumb";
import "./index.module.css";

const SEPARATOR_ICON_SIZE = 16;
const ELLIPSIS_ICON_SIZE = 16;
const ITEM_FONT_SIZE = 13;
const ITEM_LINE_HEIGHT = 1.2;
const DEFAULT_MAX = 5;
const VISIBLE_TAIL = 2;
const BASE_CLASS = "juscash-breadcrumb";
const CURRENT_ITEM_CLASS = "juscash-breadcrumb__item--current";
const ELLIPSIS_BUTTON_CLASS = "juscash-breadcrumb__ellipsis";

/**
 * Resolve `max`: `false`/`null` desativam o limite; número define o
 * tamanho máximo antes de colapsar. Default `5`.
 */
function resolveMax(max: BreadcrumbProps["max"]): number | null {
  if (max === false || max === null) return null;
  if (max === undefined) return DEFAULT_MAX;
  return max;
}

/**
 * Converte um item do Breadcrumb em uma entrada de menu/dropdown. Usa o
 * `title` como label e o `href` (quando existir) como link clicável.
 */
function itemToMenuEntry(item: ItemType, key: number): NonNullable<MenuProps["items"]>[number] {
  const label = item.href ? <a href={item.href}>{item.title}</a> : item.title;
  return { key, label };
}

/**
 * Renderiza o botão `...` que abre o dropdown com os itens colapsados.
 */
function buildEllipsisItem(hidden: ItemType[]): ItemType {
  const menuItems: MenuProps["items"] = hidden.map(itemToMenuEntry);
  return {
    title: (
      <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomCenter">
        <button type="button" className={ELLIPSIS_BUTTON_CLASS} aria-label="Mostrar itens ocultos">
          <Ellipsis size={ELLIPSIS_ICON_SIZE} aria-hidden="true" />
        </button>
      </Dropdown>
    ),
  };
}

/**
 * Colapsa a lista de itens conforme `max`. Quando `max === null` (desativado)
 * ou a lista cabe no limite, retorna a lista original. Quando excede,
 * retorna `[primeiro, ellipsis, ...últimos 2]`.
 */
function collapseItems(items: ItemType[], max: number | null): ItemType[] {
  if (max === null) return items;
  if (items.length <= max) return items;
  const first = items[0];
  const tail = items.slice(-VISIBLE_TAIL);
  const hidden = items.slice(1, items.length - VISIBLE_TAIL);
  return [first, buildEllipsisItem(hidden), ...tail];
}

/**
 * Aplica a classe `--current` ao último item (negrito + cor `text/dark`).
 */
function markCurrentItem(items: ItemType[]): ItemType[] {
  return items.map((item, index) => {
    const isLast = index === items.length - 1;
    if (!isLast) return item;
    return { ...item, title: <span className={CURRENT_ITEM_CLASS}>{item.title}</span> };
  });
}

/**
 * Breadcrumb do design system, conforme página `Componentes/Breadcrumb` do
 * Figma. Mapeamento dos tokens em `docs/componentes/Breadcrumb.md`.
 *
 * Suporta colapso automático via prop `max` (default `5`): quando a trilha
 * excede o limite, renderiza `primeiro item + ellipsis (combobox) + 2 últimos`.
 * O ícone `Ellipsis` ao ser clicado abre um dropdown com os itens ocultos.
 */
export function Breadcrumb(props: BreadcrumbProps): React.ReactElement {
  const { items, max, className, ...rest } = props;

  const resolvedMax = resolveMax(max);
  const finalClassName = [BASE_CLASS, className].filter(Boolean).join(" ");
  const sourceItems = items ?? [];
  const collapsed = collapseItems(sourceItems, resolvedMax);
  const mappedItems = markCurrentItem(collapsed);

  return (
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            itemColor: designSystemColors.text.soft,
            linkColor: designSystemColors.text.soft,
            linkHoverColor: designSystemColors.text.dark,
            separatorColor: designSystemColors.text.soft,
            lastItemColor: designSystemColors.text.dark,
            fontSize: ITEM_FONT_SIZE,
            lineHeight: ITEM_LINE_HEIGHT,
            colorBgTextHover: "transparent",
          },
        },
        token: {},
      }}
    >
      <AntdBreadcrumb
        separator={<ChevronRight size={SEPARATOR_ICON_SIZE} color={designSystemColors.text.soft} aria-hidden="true" />}
        {...rest}
        className={finalClassName}
        items={mappedItems}
      />
    </ConfigProvider>
  );
}

Breadcrumb.displayName = "Breadcrumb";

export type { BreadcrumbProps, BreadcrumbMax } from "../../types/components/Breadcrumb";
