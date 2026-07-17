import React, { useEffect, useMemo, useRef, useState } from "react";
import { ConfigProvider, Table as AntdTable } from "antd";
import type { TablePaginationConfig } from "antd/es/table/interface";
import type { TableProps as AntdTableProps } from "antd/es/table";
import { designSystemColors, radius, spacing } from "../../theme";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import type { TableProps, TableResponsiveMode, TableSkeletonConfig, TableEmptyState } from "../../types/components/Table";
import { buildColumns } from "./utils/buildColumns";
import { BulkActionBar } from "./parts/BulkActionBar";
import { TableEmptyStateRenderer } from "./parts/EmptyState";
import { TablePagination } from "./parts/TablePagination";
import { SkeletonRows } from "./parts/SkeletonRows";
import { MobileCards } from "./parts/MobileCards";
import "./index.module.css";

const FONT_SIZE_DEFAULT = 13;
const OPTION_HEIGHT = 28;
const PAGINATION_ITEM_SIZE = 32;
const CHECKBOX_INTERACTIVE_SIZE = 16;
const DEFAULT_RESPONSIVE_MODE: TableResponsiveMode = "auto";
const DEFAULT_SKELETON_ROWS = 15;
const COLOR_TRANSPARENT_WHITE_HIGHER = "rgba(255, 255, 255, 0.01)";
const COLOR_TRANSPARENT_WHITE_FULL = "rgba(255, 255, 255, 0)";

const RESPONSIVE_CLASS_MAP: Record<TableResponsiveMode, string | undefined> = {
  scroll: undefined,
  cards: "ds-table--cards",
  blocks: "ds-table--cards", // alias deprecated
  auto: "ds-table--auto",
};

const tableThemeBaseToken = {
  fontSize: FONT_SIZE_DEFAULT,
  colorText: designSystemColors.neutral[800],
  fontWeightStrong: 700,
  colorPrimary: designSystemColors.neutral[300],
  borderRadius: radius.xl,
  borderRadiusLG: radius.xl,
};

const tableSelectTokens = {
  activeBorderColor: designSystemColors.neutral[300],
  hoverBorderColor: designSystemColors.neutral[300],
  activeOutlineColor: designSystemColors.neutral[300],
  optionFontSize: FONT_SIZE_DEFAULT,
  multipleItemBorderColor: designSystemColors.neutral[300],
  optionHeight: OPTION_HEIGHT,
  optionPadding: `${spacing[1]}px ${spacing[2]}px`,
  colorText: designSystemColors.neutral[800],
  colorBgElevated: designSystemColors.neutral[50],
  optionSelectedFontWeight: 400,
  optionSelectedBg: designSystemColors.neutral[200],
  multipleItemBg: COLOR_TRANSPARENT_WHITE_HIGHER,
  borderRadiusSM: radius.xl,
};

const tablePaginationTokens = {
  itemActiveBg: COLOR_TRANSPARENT_WHITE_FULL,
  itemActiveColor: designSystemColors.neutral[800],
  itemActiveColorHover: designSystemColors.neutral[800],
  itemBg: COLOR_TRANSPARENT_WHITE_FULL,
  itemSize: PAGINATION_ITEM_SIZE,
  colorPrimary: designSystemColors.neutral[800],
  colorText: designSystemColors.neutral[800],
  colorTextDisabled: designSystemColors.neutral[400],
  colorBgTextHover: "transparent",
  borderRadius: radius.xl,
};

const tableCheckboxTokens = {
  colorPrimary: designSystemColors.brand.primary[600],
  colorPrimaryHover: designSystemColors.brand.primary[700],
  colorPrimaryBorder: designSystemColors.brand.primary[600],
  colorPrimaryBorderHover: designSystemColors.brand.primary[700],
  colorBgContainer: designSystemColors.neutral[50],
  colorText: designSystemColors.neutral[800],
  colorTextDisabled: designSystemColors.neutral[400],
  colorBorder: designSystemColors.neutral[400],
  colorBorderDisabled: designSystemColors.neutral[300],
  controlInteractiveSize: CHECKBOX_INTERACTIVE_SIZE,
  borderRadiusSM: radius.md,
  paddingXS: spacing[2],
};

const tableTableTokens = {
  cellPaddingBlock: spacing[2],
  cellPaddingInline: spacing[3], // 12px conforme Figma (era 8px)
  headerBg: designSystemColors.neutral[100], // neutral-100 (#f5f5f5) conforme Figma (era neutral-50)
  headerColor: designSystemColors.neutral[800],
  colorBgContainer: designSystemColors.neutral[50],
  colorBorderSecondary: designSystemColors.neutral[300],
  borderRadius: radius.xl,
  rowHoverBg: designSystemColors.neutral[100],
  rowSelectedBg: designSystemColors.neutral[200],
  rowSelectedHoverBg: designSystemColors.neutral[200],
  headerSortActiveBg: designSystemColors.neutral[100],
  headerSortHoverBg: designSystemColors.neutral[100],
  // bodySortBg DEVE ser transparent — senão a coluna ordenada renderiza
  // bg `neutral-50` enquanto as outras pegam `neutral-100` no hover, criando
  // um "buraco" visível na linha (parece padding/inset estranho).
  bodySortBg: "transparent",
  headerSplitColor: "transparent",
};

function getTableThemeTokens(): NonNullable<React.ComponentProps<typeof ConfigProvider>["theme"]> {
  return {
    token: tableThemeBaseToken,
    components: {
      Select: tableSelectTokens,
      Pagination: tablePaginationTokens,
      Checkbox: tableCheckboxTokens,
      Table: tableTableTokens,
    },
  };
}

function buildResponsiveClassName(responsive: TableResponsiveMode): string | undefined {
  return RESPONSIVE_CLASS_MAP[responsive];
}

/**
 * Resolve a quantidade de rows do skeleton a partir da prop polimórfica.
 * Aceita `true` (default 15), número (N) ou objeto com `rows`.
 */
function resolveSkeletonRows(config: TableSkeletonConfig | undefined): number {
  if (typeof config === "number") return config;
  if (typeof config === "object" && config !== null && typeof config.rows === "number") {
    return config.rows;
  }
  return DEFAULT_SKELETON_ROWS;
}

/**
 * Resolve a flag de animation do skeleton. Default `true`.
 */
function resolveSkeletonAnimated(config: TableSkeletonConfig | undefined): boolean {
  if (typeof config === "object" && config !== null && typeof config.animated === "boolean") {
    return config.animated;
  }
  return true;
}

interface ResolveEmptyArgs {
  emptyState: TableEmptyState | undefined;
  hasData: boolean;
}

function resolveEmptyText(args: ResolveEmptyArgs): React.ReactNode | undefined {
  if (!args.hasData && args.emptyState !== undefined) {
    return <TableEmptyStateRenderer config={args.emptyState} />;
  }
  return undefined;
}

interface ResolveSelectionCountArgs<T> {
  rowSelection: AntdTableProps<T>["rowSelection"];
}

function resolveSelectionCount<T>(args: ResolveSelectionCountArgs<T>): number {
  const keys = args.rowSelection?.selectedRowKeys;
  return Array.isArray(keys) ? keys.length : 0;
}

const SELECTION_HEADER_CLASS = "ds-table-selection-header";
const SELECTION_HEADER_LABEL_CLASS = "ds-table-selection-header__label";
const DS_CHECKBOX_CLASS = "ds-checkbox";

/**
 * Aplica a classe `.ds-checkbox` no `originNode` (Checkbox do antd) sem
 * mudar o componente — apenas para que as regras de visual do Checkbox
 * standalone do DS (single border, indeterminate dash, focus ring) sejam
 * herdadas via CSS global, evitando regras duplicadas no Table.
 */
function withDsCheckboxClass(node: React.ReactNode): React.ReactNode {
  if (!React.isValidElement(node)) return node;
  const props = node.props as { className?: string };
  const className = [DS_CHECKBOX_CLASS, props.className].filter(Boolean).join(" ");
  return React.cloneElement(node as React.ReactElement<{ className?: string }>, { className });
}

/**
 * Aplica `.ds-checkbox` em todos os checkboxes do antd Table (header
 * "selecionar todos" + checkbox de cada linha) via `columnTitle` /
 * `renderCell`. Em modo `cards/auto` ainda compõe `<span label>{checkbox}`
 * para que a barra "Selecionar todos" mostre o controle ao lado do label.
 *
 * Estado indeterminate ("-") do master checkbox é nativo do antd; o visual
 * (traço branco) vem das regras de `.ds-checkbox` no Checkbox standalone.
 */
function wrapSelectionColumnTitle<T>(
  rowSelection: AntdTableProps<T>["rowSelection"],
  responsive: TableResponsiveMode,
): AntdTableProps<T>["rowSelection"] {
  if (!rowSelection) return rowSelection;
  const cardsLike = responsive === "cards" || responsive === "auto" || responsive === "blocks";
  const original = rowSelection.columnTitle;
  const wrappedTitle =
    cardsLike && typeof original === "string"
      ? (checkboxNode: React.ReactNode): React.ReactNode => (
          <span className={SELECTION_HEADER_CLASS}>
            <span className={SELECTION_HEADER_LABEL_CLASS}>{original}</span>
            {withDsCheckboxClass(checkboxNode)}
          </span>
        )
      : typeof original === "function"
      ? (checkboxNode: React.ReactNode): React.ReactNode => original(withDsCheckboxClass(checkboxNode))
      : (checkboxNode: React.ReactNode): React.ReactNode => withDsCheckboxClass(checkboxNode);

  const userRenderCell = rowSelection.renderCell;
  const wrappedRenderCell: NonNullable<AntdTableProps<T>["rowSelection"]>["renderCell"] = (
    checked,
    record,
    index,
    originNode,
  ) => {
    const base = userRenderCell ? userRenderCell(checked, record, index, originNode) : originNode;
    return withDsCheckboxClass(base as React.ReactNode);
  };

  return {
    ...rowSelection,
    columnTitle: wrappedTitle,
    renderCell: wrappedRenderCell,
  };
}

/**
 * Lê os valores iniciais de página e tamanho a partir da config do consumidor.
 * Prioriza `defaultCurrent`/`current` e `defaultPageSize`/`pageSize`.
 */
function resolveInitialPaging(config: TablePaginationConfig | undefined): { page: number; pageSize: number } {
  const page = config?.defaultCurrent ?? config?.current ?? 1;
  const pageSize = config?.defaultPageSize ?? config?.pageSize ?? 5;
  return { page, pageSize };
}

/**
 * Aplica paginação client-side ao `dataSource`. Quando `total` é fornecido pelo
 * consumidor (server-side), retorna `dataSource` inalterado (consumidor já
 * cortou). Caso contrário, fatia conforme `page`/`pageSize`.
 */
function applyClientPaging<T>(
  dataSource: readonly T[] | undefined,
  page: number,
  pageSize: number,
  serverTotal: number | undefined,
): readonly T[] | undefined {
  if (!dataSource) return dataSource;
  if (serverTotal !== undefined) return dataSource;
  const start = (page - 1) * pageSize;
  return dataSource.slice(start, start + pageSize);
}

/**
 * Table do design system. Aplica tokens próprios via `ConfigProvider` local,
 * usa o `Skeleton` para o estado de carregamento, `EmptyState` para o estado
 * vazio e o `Pagination` (DS) para a navegação por página — sem reimplementar
 * comportamento que já existe no DS. Adiciona barra de bulk action
 * (`bulkActions`) e modo responsive como cards (Figma `4143:12201`).
 */
export function Table<T>(props: TableProps<T>): React.ReactElement {
  const {
    columns,
    dataSource,
    bordered = false,
    className,
    tableLayout,
    scroll = undefined,
    pagination,
    locale,
    responsive = DEFAULT_RESPONSIVE_MODE,
    responsiveBreakpoint = 768,
    cardRender: _cardRenderIgnored,
    cardLayout,
    rowKey,
    emptyState,
    bulkActions,
    skeleton,
    sortIcons,
    rowSelection,
    loading,
    ...rest
  } = props;

  const paginationConfig = pagination === false ? undefined : (pagination as TablePaginationConfig | undefined);
  const paginationEnabled = pagination !== false;

  // Detecção de modo cards: `responsive='cards'` força sempre; `'auto'`
  // depende do viewport (<= breakpoint - 1 px). `'scroll'` jamais ativa
  // cards. `'blocks'` é alias deprecated de `'cards'`.
  const mobileMatches = useMediaQuery(`(max-width: ${responsiveBreakpoint - 1}px)`);
  const isCardsMode = responsive === "cards" || responsive === "blocks" || (responsive === "auto" && mobileMatches);

  const showSkeleton = Boolean(skeleton) || Boolean(loading);
  const skeletonRowsCount = useMemo(() => resolveSkeletonRows(skeleton), [skeleton]);
  const skeletonAnimated = useMemo(() => resolveSkeletonAnimated(skeleton), [skeleton]);

  const initialPaging = useMemo(() => resolveInitialPaging(paginationConfig), [paginationConfig]);
  const [internalPage, setInternalPage] = useState<number>(initialPaging.page);
  const [internalPageSize, setInternalPageSize] = useState<number>(initialPaging.pageSize);

  // Modo controlled exige BOTH valor + onChange (padrão React de inputs
  // controlados). Sem `onChange`, `current`/`pageSize` viram apenas valores
  // iniciais — caso contrário o size changer e a paginação ficariam travados
  // no valor inicial sem forma de mudar.
  const hasOnChange = typeof paginationConfig?.onChange === "function";
  const isPageControlled = paginationConfig?.current !== undefined && hasOnChange;
  const isPageSizeControlled = paginationConfig?.pageSize !== undefined && hasOnChange;
  const currentPage = isPageControlled ? (paginationConfig?.current as number) : internalPage;
  const currentPageSize = isPageSizeControlled ? (paginationConfig?.pageSize as number) : internalPageSize;

  const customColumns = useMemo(() => buildColumns<T>({ columns, sortIcons }), [columns, sortIcons]);

  // Antd v6 reinjeta `title=<string>` em `<th>`s com ellipsis+sorter mesmo
  // após `ellipsis.showTitle: false` + `onHeaderCell({title: ''})`. Para
  // garantir que o tooltip nativo do browser NUNCA dispare, observamos o
  // wrapper e limpamos qualquer `title` remanescente em cells com ellipsis.
  // O `Tooltip` do DS continua sendo a única fonte de tooltip quando o
  // consumidor opta via `render`.
  //
  // IMPORTANTE: este `useRef`/`useEffect` PRECISA ficar ANTES de qualquer
  // early return (ex.: o skeleton de loading abaixo). Caso contrário a
  // contagem de hooks muda entre renders (full → skeleton) e o React lança
  // "Rendered fewer hooks than expected". Quando o skeleton é exibido o
  // `wrapperRef` não é montado e o efeito apenas faz no-op (`if (!wrapper)`).
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const cleanTitles = (): void => {
      wrapper.querySelectorAll(".ant-table-cell-ellipsis[title]").forEach((cell) => {
        const t = cell.getAttribute("title");
        if (t !== null && t !== "") cell.setAttribute("title", "");
      });
    };
    cleanTitles();
    const observer = new MutationObserver(cleanTitles);
    observer.observe(wrapper, { subtree: true, attributes: true, attributeFilter: ["title"] });
    return () => observer.disconnect();
  });

  const rawDataSource = dataSource as readonly T[] | undefined;
  const totalRecords = paginationConfig?.total ?? rawDataSource?.length ?? 0;

  const handlePaginationChange = (nextPage: number, nextSize: number): void => {
    if (!isPageControlled) setInternalPage(nextPage);
    if (!isPageSizeControlled) setInternalPageSize(nextSize);
    paginationConfig?.onChange?.(nextPage, nextSize);
  };

  // Loading: substitui a tabela pela seção de skeleton (Figma
  // `8733:10563`/`8733:11508`). Sem header, sem container border — só N
  // barras `neutral/100` empilhadas com gap 8 px. A paginação NÃO some:
  // quando o consumidor usa a paginação integrada (objeto `pagination`),
  // o footer permanece visível e navegável durante o carregamento — assim
  // trocar de página/tamanho re-dispara o fetch sem "sumiço" do controle.
  if (showSkeleton) {
    return (
      <ConfigProvider theme={getTableThemeTokens()}>
        <SkeletonRows rows={skeletonRowsCount} animated={skeletonAnimated} />
        {paginationEnabled && paginationConfig !== undefined && (
          <TablePagination
            current={currentPage}
            pageSize={currentPageSize}
            total={totalRecords}
            showSizeChanger={Boolean(paginationConfig.showSizeChanger)}
            pageSizeOptions={(paginationConfig.pageSizeOptions as string[] | undefined) ?? undefined}
            showTotal={paginationConfig.showTotal}
            onChange={handlePaginationChange}
            cardsMode={isCardsMode}
          />
        )}
      </ConfigProvider>
    );
  }
  const visibleData = paginationEnabled
    ? applyClientPaging(rawDataSource, currentPage, currentPageSize, paginationConfig?.total)
    : rawDataSource;
  const hasData = Array.isArray(rawDataSource) && rawDataSource.length > 0;

  const mergedClassName = ["ds-table", buildResponsiveClassName(responsive), className].filter(Boolean).join(" ");

  const resolvedEmptyText = resolveEmptyText({ emptyState, hasData });
  const mergedLocale = {
    emptyText: "Nenhum registro encontrado.",
    ...(resolvedEmptyText !== undefined && { emptyText: resolvedEmptyText }),
    ...locale,
  };

  const selectionCount = resolveSelectionCount<T>({ rowSelection });
  const showBulkBar = bulkActions !== undefined && selectionCount > 0;
  const finalRowSelection = wrapSelectionColumnTitle<T>(rowSelection, responsive);

  return (
    <ConfigProvider theme={getTableThemeTokens()}>
      <div ref={wrapperRef} className={isCardsMode ? "ds-table-wrapper--cards" : undefined}>
        {showBulkBar && <BulkActionBar count={selectionCount} config={bulkActions} />}
        {isCardsMode ? (
          <MobileCards
            data={visibleData}
            columns={columns}
            cardLayout={cardLayout}
            rowSelection={rowSelection}
            rowKey={rowKey}
            emptyState={emptyState}
          />
        ) : (
          <AntdTable
            {...(rest as AntdTableProps<T>)}
            rowKey={rowKey}
            rowSelection={finalRowSelection}
            dataSource={visibleData as AntdTableProps<T>["dataSource"]}
            pagination={false}
            tableLayout={tableLayout}
            scroll={scroll}
            bordered={bordered}
            columns={customColumns}
            className={mergedClassName}
            locale={mergedLocale}
            loading={false}
          />
        )}
        {paginationEnabled && hasData && (
          <TablePagination
            current={currentPage}
            pageSize={currentPageSize}
            total={totalRecords}
            showSizeChanger={Boolean(paginationConfig?.showSizeChanger)}
            pageSizeOptions={(paginationConfig?.pageSizeOptions as string[] | undefined) ?? undefined}
            showTotal={paginationConfig?.showTotal}
            onChange={handlePaginationChange}
            cardsMode={isCardsMode}
          />
        )}
      </div>
    </ConfigProvider>
  );
}

Table.displayName = "Table";

export type {
  TableProps,
  TableResponsiveMode,
  TableEmptyState,
  TableBulkActions,
  TableSkeletonConfig,
  TableSortIcons,
} from "../../types/components/Table";
