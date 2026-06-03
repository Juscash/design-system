import React from "react";
import { Pagination as AntdPagination, ConfigProvider } from "antd";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { designSystemColors } from "../../theme";
import type { PaginationProps } from "../../types/components/Pagination";
import "./index.module.css";

const NAV_LABEL = "Paginação";
const ARROW_ICON_SIZE = 12;
const ELLIPSIS_ICON_SIZE = 16;
const BASE_CLASS = "ds-pagination";
const ARROW_CLASS = "ds-pagination-arrow";
const PAGE_CLASS = "ds-pagination-page";
const PAGE_ACTIVE_CLASS = "ds-pagination-page--active";
const ELLIPSIS_CLASS = "ds-pagination-ellipsis";
const ITEM_FONT_SIZE = 13;
const ITEM_LINE_HEIGHT = 1.2;

/** Tokens repassados ao ConfigProvider local do Pagination. */
function getPaginationTokens(): Record<string, unknown> {
  return {
    itemSize: 32,
    itemActiveBg: "transparent",
    itemBg: "transparent",
    itemLinkBg: "transparent",
    itemInputBg: "transparent",
    colorPrimary: designSystemColors.text.dark,
    colorPrimaryHover: designSystemColors.text.dark,
    colorPrimaryBorder: designSystemColors.border.regular,
    colorText: designSystemColors.text.dark,
    colorBgContainer: "transparent",
    fontSize: ITEM_FONT_SIZE,
    lineHeight: ITEM_LINE_HEIGHT,
  };
}

/**
 * Renderiza o botão de seta (prev/next). Recebe o `type` para escolher entre
 * `Anterior`/`Próximo` e o ícone correspondente, e o `disabled` para indicar
 * estado via `aria-disabled` quando o Antd marca o elemento como desabilitado.
 */
function renderArrow(type: "prev" | "next", disabled: boolean): React.ReactElement {
  const isPrev = type === "prev";
  const label = isPrev ? "Anterior" : "Próximo";
  const ariaLabel = isPrev ? "Página anterior" : "Próxima página";
  return (
    <button
      type="button"
      className={ARROW_CLASS}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
    >
      {isPrev && <ChevronLeft size={ARROW_ICON_SIZE} aria-hidden="true" />}
      <span>{label}</span>
      {!isPrev && <ChevronRight size={ARROW_ICON_SIZE} aria-hidden="true" />}
    </button>
  );
}

/**
 * Renderiza o botão de página numérica. Quando `active`, recebe a borda
 * regular (`var(--color-border-regular)`) e `aria-current="page"`.
 */
function renderPage(page: number, active: boolean): React.ReactElement {
  const className = [PAGE_CLASS, active ? PAGE_ACTIVE_CLASS : ""].filter(Boolean).join(" ");
  return (
    <button
      type="button"
      className={className}
      aria-label={`Página ${page}`}
      aria-current={active ? "page" : undefined}
    >
      {page}
    </button>
  );
}

/**
 * Renderiza o botão de salto (jump-prev/jump-next). Container 36x36 com o
 * ícone `Ellipsis` de 16px da `lucide-react`. Clique dispara o salto padrão
 * do antd (5 páginas para frente/trás).
 */
function renderJump(type: "jump-prev" | "jump-next"): React.ReactElement {
  const ariaLabel = type === "jump-prev" ? "Saltar para páginas anteriores" : "Saltar para próximas páginas";
  return (
    <button type="button" className={ELLIPSIS_CLASS} aria-label={ariaLabel}>
      <Ellipsis size={ELLIPSIS_ICON_SIZE} aria-hidden="true" />
    </button>
  );
}

type ItemType = "page" | "prev" | "next" | "jump-prev" | "jump-next";

interface CustomItemRenderArgs {
  page: number;
  type: ItemType;
  current: number;
  disabled: boolean;
}

/**
 * Versão sem ternários aninhados que decide qual nó renderizar conforme o
 * `type` recebido do Pagination do Antd.
 */
function renderItem(args: CustomItemRenderArgs): React.ReactNode {
  if (args.type === "prev") return renderArrow("prev", args.disabled);
  if (args.type === "next") return renderArrow("next", args.disabled);
  if (args.type === "jump-prev") return renderJump("jump-prev");
  if (args.type === "jump-next") return renderJump("jump-next");
  return renderPage(args.page, args.page === args.current);
}

/**
 * Determina a página corrente usada para marcar o item ativo no `itemRender`.
 * Quando o consumidor passa `current` (modo controlado), ele tem prioridade;
 * caso contrário cai em `defaultCurrent` e finalmente em `1`.
 */
function resolveCurrentPage(props: PaginationProps): number {
  if (typeof props.current === "number") return props.current;
  if (typeof props.defaultCurrent === "number") return props.defaultCurrent;
  return 1;
}

/**
 * Pagination do design system. Wrapper do `Pagination` do Ant Design 6
 * aplicando a identidade visual descrita no dump
 * `figma/components/pagination/design-context-4080-17825.md`.
 *
 * Renderiza prev/next como botões com rótulo `Anterior`/`Próximo`, páginas
 * numeradas com radius `xl` (8px) e indicador via borda regular, e os saltos
 * (`jump-prev`/`jump-next`) como botões 36x36 com ícone `Ellipsis`.
 */
export function Pagination(props: PaginationProps): React.ReactElement {
  const { className, disabled, ...rest } = props;
  const currentPage = resolveCurrentPage(props);
  const rootClassName = [BASE_CLASS, className].filter(Boolean).join(" ");

  return (
    <ConfigProvider theme={{ components: { Pagination: getPaginationTokens() } }}>
      <nav aria-label={NAV_LABEL}>
        <AntdPagination
          {...rest}
          disabled={disabled}
          className={rootClassName}
          showSizeChanger={false}
          showQuickJumper={false}
          simple={false}
          responsive={false}
          itemRender={(page, type) =>
            renderItem({
              page,
              type: type as ItemType,
              current: currentPage,
              disabled: Boolean(disabled),
            })
          }
        />
      </nav>
    </ConfigProvider>
  );
}

Pagination.displayName = "Pagination";

export type { PaginationProps } from "../../types/components/Pagination";
