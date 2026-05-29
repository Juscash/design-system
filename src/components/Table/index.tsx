import React, { useMemo } from "react";
import { ConfigProvider, Table as AntdTable } from "antd";
import type { ColumnsType, ColumnType, TablePaginationConfig } from "antd/es/table/interface";
import type { TableProps as AntdTableProps } from "antd/es/table";
import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";
import { Tooltip } from "../Tooltip";
import { designSystemColors, radius, spacing } from "../../theme";
import type { TableProps, TableResponsiveMode } from "../../types/components/Table";
import "./index.module.css";

const PAGINATION_DEFAULT_SIZE = 5;
const ICON_SIZE = 12;
const SORTER_ICON_SIZE = 16;
const FONT_SIZE_DEFAULT = 13;
const OPTION_HEIGHT = 28;
const PAGINATION_ITEM_SIZE = 32;
const SINGULAR_COUNT = 1;
const TABLE_FONT_FAMILY = "Inter, sans-serif";
const COLOR_TRANSPARENT_WHITE_HIGHER = "rgba(255, 255, 255, 0.01)";
const COLOR_TRANSPARENT_WHITE_FULL = "rgba(255, 255, 255, 0)";
const PAGINATION_GAP = 4;
const CHECKBOX_INTERACTIVE_SIZE = 16;
const DEFAULT_RESPONSIVE_MODE: TableResponsiveMode = "scroll";

const RESPONSIVE_CLASS_MAP: Record<TableResponsiveMode, string | undefined> = {
  scroll: undefined,
  blocks: "ds-table--blocks",
  auto: "ds-table--auto",
};

const DEFAULT_LOCALE = {
  emptyText: "Nenhum registro encontrado.",
};

interface DefaultPaginationArgs {
  pagination: TablePaginationConfig | false | undefined;
}

const totalTextStyle: React.CSSProperties = {
  fontFamily: TABLE_FONT_FAMILY,
  fontSize: FONT_SIZE_DEFAULT,
  lineHeight: "1.2",
  fontWeight: 400,
  color: designSystemColors.neutral[800],
};

const paginationItemStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: PAGINATION_GAP,
  fontFamily: TABLE_FONT_FAMILY,
  fontSize: FONT_SIZE_DEFAULT,
  lineHeight: "1.2",
  fontWeight: 400,
  color: designSystemColors.neutral[800],
};

function renderTotalText(total: number): React.ReactNode {
  const label = total === SINGULAR_COUNT ? "item" : "itens";
  return <span style={totalTextStyle}>{total} {label}</span>;
}

function renderPaginationItem(type: "prev" | "next"): React.ReactNode {
  const isPrev = type === "prev";
  return (
    <span style={paginationItemStyle}>
      {isPrev && <ChevronLeft size={ICON_SIZE} aria-hidden="true" />}
      {isPrev ? "Anterior" : "Próximo"}
      {!isPrev && <ChevronRight size={ICON_SIZE} aria-hidden="true" />}
    </span>
  );
}

function buildPagination({ pagination }: DefaultPaginationArgs): TablePaginationConfig | false {
  if (pagination === false) return false;

  return {
    ...pagination,
    locale: {
      ...pagination?.locale,
      items_per_page: "",
    },
    ...(!pagination?.defaultPageSize && { defaultPageSize: PAGINATION_DEFAULT_SIZE }),
    ...(!pagination?.pageSizeOptions && {
      pageSizeOptions: ["5", "10", "25", "50", "100"],
    }),
    ...(!pagination?.showTotal && {
      showTotal: renderTotalText,
    }),
    ...(!pagination?.itemRender && {
      itemRender: (_current: number, type: string, originalElement: React.ReactNode) => {
        if (type === "prev") return renderPaginationItem("prev");
        if (type === "next") return renderPaginationItem("next");
        return originalElement;
      },
    }),
  };
}

function renderSortIcon(): React.ReactElement {
  return (
    <span
      className="ds-table-sort-icon"
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
    >
      <ChevronsUpDown size={SORTER_ICON_SIZE} strokeWidth={1.75} />
    </span>
  );
}

const cellContentStyle: React.CSSProperties = {
  display: "block",
  margin: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontFamily: TABLE_FONT_FAMILY,
  fontSize: FONT_SIZE_DEFAULT,
  lineHeight: 1.2,
  fontWeight: 400,
  color: designSystemColors.neutral[800],
};

function renderCellContent(value: unknown): React.ReactNode {
  if (typeof value === "string" || typeof value === "number") {
    return (
      <Tooltip title={value}>
        <span style={cellContentStyle}>{value}</span>
      </Tooltip>
    );
  }
  return value as React.ReactNode;
}

const columnTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: FONT_SIZE_DEFAULT,
  lineHeight: 1.2,
  fontWeight: 700,
};

/**
 * Extrai uma string descritiva do `title` da coluna, usada como
 * `data-label` na td (necessária no modo `blocks`/`auto` que troca o
 * cabeçalho horizontal por rótulos repetidos em cada célula).
 */
function extractColumnLabel<T>(col: ColumnType<T>): string {
  if (typeof col.title === "string") return col.title;
  if (typeof col.title === "number") return String(col.title);
  return "";
}

function buildColumns<T>(columns: ColumnsType<T> | undefined): ColumnsType<T> | undefined {
  return columns?.map((col) => {
    const label = extractColumnLabel(col as ColumnType<T>);
    const existingOnCell = (col as ColumnType<T>).onCell;
    return {
      ...col,
      ...(!col.showSorterTooltip && {
        showSorterTooltip: { target: "sorter-icon" },
      }),
      ...(col.sorter && !col.sortIcon && { sortIcon: renderSortIcon }),
      title:
        typeof col.title === "string" ? (
          <Tooltip title={col.title}>
            <span style={columnTitleStyle}>{col.title}</span>
          </Tooltip>
        ) : (
          col.title
        ),
      onCell: (record: T, index?: number) => {
        const base = existingOnCell ? existingOnCell(record, index) : {};
        return { ...base, "data-label": label };
      },
      render: (value: unknown, record: T, index: number) => {
        if (col.render) {
          return col.render(value, record, index);
        }
        return renderCellContent(value);
      },
    };
  });
}

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
  cellPaddingInline: spacing[2],
  headerBg: designSystemColors.neutral[50],
  headerColor: designSystemColors.neutral[800],
  colorBgContainer: designSystemColors.neutral[50],
  colorBorderSecondary: designSystemColors.neutral[300],
  borderRadius: radius.xl,
  rowSelectedBg: designSystemColors.neutral[200],
  rowSelectedHoverBg: designSystemColors.neutral[200],
  headerSortActiveBg: designSystemColors.neutral[100],
  headerSortHoverBg: designSystemColors.neutral[100],
  bodySortBg: designSystemColors.neutral[50],
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

/**
 * Compõe a lista de classes do `ds-table` a partir da prop `responsive`.
 */
function buildResponsiveClassName(responsive: TableResponsiveMode): string | undefined {
  return RESPONSIVE_CLASS_MAP[responsive];
}

/**
 * Table do design system. Aplica tokens próprios via `ConfigProvider` local,
 * adiciona pagination customizada (i18n "Anterior"/"Próximo", contagem total
 * em pt-BR "{N} itens", page-size options) e envolve células de
 * string/number em `Tooltip` para truncamento legível.
 *
 * Suporta duas estratégias de responsividade via prop `responsive`:
 *   - `scroll` (default): tabela horizontal com `scroll.x` quando estreita.
 *   - `blocks`: cada linha vira um cartão com label da coluna acima do valor.
 *   - `auto`: comportamento de `scroll` em ≥ 768 px e `blocks` em < 768 px.
 */
export function Table<T>(props: TableProps<T>): React.ReactElement {
  const {
    columns,
    bordered = false,
    className,
    tableLayout = "fixed",
    scroll = undefined,
    pagination,
    locale,
    responsive = DEFAULT_RESPONSIVE_MODE,
    ...rest
  } = props;

  const mergedPagination = useMemo(
    () => buildPagination({ pagination: pagination as TablePaginationConfig | false | undefined }),
    [pagination],
  );

  const customColumns = useMemo(() => buildColumns<T>(columns), [columns]);
  const mergedClassName = ["ds-table", buildResponsiveClassName(responsive), className].filter(Boolean).join(" ");
  const mergedLocale = { ...DEFAULT_LOCALE, ...locale };

  return (
    <ConfigProvider theme={getTableThemeTokens()}>
      <AntdTable
        {...(rest as AntdTableProps<T>)}
        pagination={mergedPagination}
        tableLayout={tableLayout}
        scroll={scroll}
        bordered={bordered}
        columns={customColumns}
        className={mergedClassName}
        locale={mergedLocale}
      />
    </ConfigProvider>
  );
}

Table.displayName = "Table";

export type { TableProps, TableResponsiveMode } from "../../types/components/Table";
