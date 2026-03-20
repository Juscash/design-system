import React, { useMemo } from "react";
import { ConfigProvider, Table as AntdTable } from "antd";
import type { TableProps as AntdTableProps, ColumnsType } from "antd/es/table";
import { Tooltip } from "../Tooltip";
import { designSystemColors, spacing } from "../../theme";
import { radius } from "../../theme";
import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";

export type TableProps<T> = AntdTableProps<T>;

export function Table<T>(props: TableProps<T>): React.ReactElement {
  const { columns, bordered = false, className, tableLayout = "fixed", scroll = undefined, pagination, ...rest } = props;

  const mergedPagination = useMemo(() => {
    if (pagination === false) return false;

    return {
      ...pagination,
      locale: {
        ...pagination?.locale,

        items_per_page: "",
      },
      ...(!pagination?.defaultPageSize && {
        defaultPageSize: 5,
      }),
      ...(!pagination?.pageSizeOptions && {
        pageSizeOptions: ["5", "10", "25", "50", "100"],
      }),

      ...(!pagination?.showTotal && {
        showTotal: (total: number) => (
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              lineHeight: "1.2",
              fontWeight: 400,
              color: designSystemColors.neutral[800],
            }}
          >
            {total} registros
          </span>
        ),
      }),

      ...(!pagination?.itemRender && {
        itemRender: (_current: number, type: string, originalElement: React.ReactNode) => {
          if (type === "prev") {
            return (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  lineHeight: "1.2",
                  fontWeight: 400,
                  color: designSystemColors.neutral[800],
                }}
              >
                <ChevronLeft size={12} /> Anterior
              </span>
            );
          }
          if (type === "next") {
            return (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  lineHeight: "1.2",
                  fontWeight: 400,
                  color: designSystemColors.neutral[800],
                }}
              >
                Próximo <ChevronRight size={12} />
              </span>
            );
          }
          return originalElement;
        },
      }),
    };
  }, [pagination]);

  const customColumns: ColumnsType<T> | undefined = useMemo(() => {
    return columns?.map((col) => ({
      ...col,
      ...(!col.showSorterTooltip && {
        showSorterTooltip: {
          target: "sorter-icon",
        },
      }),
      ...(col.sorter
        && !col.sortIcon && {
          sortIcon: () => {
            return (
              <span
                className="ds-table-sort-icon"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              >
                <ChevronsUpDown size={16} strokeWidth={1.75} />
              </span>
            );
          },
        }),
      title:
        typeof col.title === "string" ?
          <Tooltip title={col.title}>
            <span
              style={{ margin: 0, fontSize: 13, lineHeight: "1.2", fontWeight: 700 }}
            >
              {col.title}
            </span>
          </Tooltip>
        : col.title,

      render: (value: any, record: T, index: number) => {
        if (col.render) {
          return col.render(value, record, index);
        }

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
                  fontSize: 13,
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
      },
    }));
  }, [columns]);

  const mergedClassName = ["ds-table", className].filter(Boolean).join(" ");

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 13,
          colorText: designSystemColors.neutral[800],
          fontWeightStrong: 700,
          colorPrimary: designSystemColors.neutral[300],
          borderRadius: radius.xl,
          borderRadiusLG: radius.xl,
        },
        components: {
          Select: {
            activeBorderColor: designSystemColors.neutral[300],
            hoverBorderColor: designSystemColors.neutral[300],
            activeOutlineColor: designSystemColors.neutral[300],
            optionFontSize: 13,

            multipleItemBorderColor: "#D4D4D4",
            optionHeight: 28,
            optionPadding: "4px 8px",
            colorText: "rgba(38, 38, 38, 1)",
            colorBgElevated: "rgba(250, 250, 250, 1)",
            optionSelectedFontWeight: 400,
            optionSelectedBg: designSystemColors.neutral[200],
            multipleItemBg: "rgba(255, 255, 255, 0.01)",

            borderRadiusSM: 8,
          },
          Pagination: {
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
          },
          Checkbox: {
            colorPrimary: designSystemColors.brand.primary[600],
            colorPrimaryHover: designSystemColors.brand.primary[700],
            colorPrimaryBorder: designSystemColors.brand.primary[600],
            colorPrimaryBorderHover: designSystemColors.brand.primary[700],
            colorBgContainer: designSystemColors.neutral[50] ?? "#ffffff",
            colorText: designSystemColors.neutral[800],
            colorTextDisabled: designSystemColors.neutral[400],
            colorBorder: designSystemColors.neutral[300],
            colorBorderDisabled: designSystemColors.neutral[300],
            controlInteractiveSize: 16,
            borderRadiusSM: radius.md,
            paddingXS: spacing[2],
          },
          Table: {
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
          },
        },
      }}
    >
      <AntdTable
        {...rest}
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
