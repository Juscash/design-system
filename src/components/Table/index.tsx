import React, { useMemo } from "react";
import { ConfigProvider, Table as AntdTable } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table/interface";
import type { TableProps as AntdTableProps } from "antd/es/table";
import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";
import { Tooltip } from "../Tooltip";
import { designSystemColors, radius, spacing } from "../../theme";
import type { TableProps } from "../../types/components/Table";
import "./index.module.css";

const PAGINATION_DEFAULT_SIZE = 5;
const ICON_SIZE = 12;
const SORTER_ICON_SIZE = 16;
const FONT_SIZE_DEFAULT = 13;

interface DefaultPaginationArgs {
  pagination: TablePaginationConfig | false | undefined;
}

function renderTotalText(total: number): React.ReactNode {
  return (
    <span
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: FONT_SIZE_DEFAULT,
        lineHeight: "1.2",
        fontWeight: 400,
        color: designSystemColors.neutral[800],
      }}
    >
      {total} registros
    </span>
  );
}

function renderPaginationItem(type: "prev" | "next"): React.ReactNode {
  const isPrev = type === "prev";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontFamily: "Inter, sans-serif",
        fontSize: FONT_SIZE_DEFAULT,
        lineHeight: "1.2",
        fontWeight: 400,
        color: designSystemColors.neutral[800],
      }}
    >
      {isPrev && <ChevronLeft size={ICON_SIZE} />}
      {isPrev ? "Anterior" : "PrÃ³ximo"}
      {!isPrev && <ChevronRight size={ICON_SIZE} />}
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

function renderCellContent(value: unknown): React.ReactNode {
  if (typeof value === "string" || typeof value === "number") {
    return (
      <Tooltip title={value}>
        <span
          style={{
            display: "block",
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontFamily: "Inter, sans-serif",
            fontSize: FONT_SIZE_DEFAULT,
            lineHeight: "15.6px",
            fontWeight: 400,
            color: designSystemColors.neutral[800],
          }}
        >
          {value}
        </span>
      </Tooltip>
    );
  }
  return value as React.ReactNode;
}

function buildColumns<T>(columns: ColumnsType<T> | undefined): ColumnsType<T> | undefined {
  return columns?.map((col) => ({
    ...col,
    ...(!col.showSorterTooltip && {
      showSorterTooltip: { target: "sorter-icon" },
    }),
    ...(col.sorter && !col.sortIcon && { sortIcon: renderSortIcon }),
    title:
      typeof col.title === "string" ? (
        <Tooltip title={col.title}>
          <span style={{ margin: 0, fontSize: FONT_SIZE_DEFAULT, lineHeight: "1.2", fontWeight: 700 }}>{col.title}</span>
        </Tooltip>
      ) : (
        col.title
      ),
    render: (value: unknown, record: T, index: number) => {
      if (col.render) {
        return col.render(value, record, index);
      }
      return renderCellContent(value);
    },
  }));
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
  multipleItemBorderColor: "#D4D4D4",
  optionHeight: 28,
  optionPadding: "4px 8px",
  colorText: designSystemColors.neutral[800],
  colorBgElevated: designSystemColors.neutral[50],
  optionSelectedFontWeight: 400,
  optionSelectedBg: designSystemColors.neutral[200],
  multipleItemBg: "rgba(255, 255, 255, 0.01)",
  borderRadiusSM: 8,
};

const tablePaginationTokens = {
  itemActiveBg: "rgba(255, 255, 255, 0)",
  itemActiveColor: designSystemColors.neutral[800],
  itemActiveColorHover: designSystemColors.neutral[800],
  itemBg: "rgba(255, 255, 255, 0)",
  itemSize: 32,
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
  colorBorder: designSystemColors.neutral[300],
  colorBorderDisabled: designSystemColors.neutral[300],
  controlInteractiveSize: 16,
  borderRadiusSM: radius.md,
  paddingXS: spacing[2],
};

const tableTableTokens = {
  cellPaddingBlock: 8,
  cellPaddingInline: 8,
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
 * Table do design system. Aplica tokens prÃ³prios via `ConfigProvider` local,
 * adiciona pagination customizada (i18n "Anterior"/"PrÃ³ximo", contagem total,
 * page-size options) e envolve cÃ©lulas de string/number em `Tooltip` para
 * truncamento legÃ­vel.
 */
export function Table<T>(props: TableProps<T>): React.ReactElement {
  const { columns, bordered = false, className, tableLayout = "fixed", scroll = undefined, pagination, ...rest } = props;

  const mergedPagination = useMemo(
    () => buildPagination({ pagination: pagination as TablePaginationConfig | false | undefined }),
    [pagination],
  );

  const customColumns = useMemo(() => buildColumns<T>(columns), [columns]);
  const mergedClassName = ["ds-table", className].filter(Boolean).join(" ");

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
      />
    </ConfigProvider>
  );
}

Table.displayName = "Table";

export type { TableProps } from "../../types/components/Table";
