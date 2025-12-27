"use client";

import React, { useMemo } from "react";
import { ConfigProvider, Table as AntdTable, Tooltip } from "antd";
import type { TableProps as AntdTableProps } from "antd";
import { Select, SelectProps } from "./Select";
import { Body2 } from "./Typography";
import { designSystemColors, spacing } from "../theme";
import { radius } from "../theme";
import { ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

export type TableProps<T> = AntdTableProps<T>;

export function Table<T>(props: TableProps<T>): React.ReactElement {
  const {
    columns,
    bordered = true,
    tableLayout = "fixed",
    scroll = undefined,
    pagination,
    ...rest
  } = props;

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
          <Body2 color="dark">{total} registros</Body2>
        ),
      }),

      ...(!pagination?.itemRender && {
        itemRender: (
          _current: number,
          type: string,
          originalElement: React.ReactNode
        ) => {
          if (type === "prev") {
            return (
              <Body2
                style={{ display: "flex", alignItems: "center", gap: 0 }}
                color="dark"
              >
                <ChevronLeft size={12} style={{ marginRight: 4 }} /> Anterior
              </Body2>
            );
          }
          if (type === "next") {
            return (
              <Body2
                style={{ display: "flex", alignItems: "center", gap: 0 }}
                color="dark"
              >
                Próximo <ChevronRight size={12} style={{ marginLeft: 4 }} />
              </Body2>
            );
          }
          return originalElement;
        },
      }),
    };
  }, [pagination]);

  const customColumns = useMemo(() => {
    return columns?.map((col) => ({
      ...col,
      ...(!col.showSorterTooltip && {
        showSorterTooltip: {
          target: "sorter-icon",
        },
      }),
      ...(col.sorter &&
        !col.sortIcon && {
          sortIcon: ({
            sortOrder,
          }: {
            sortOrder?: "ascend" | "descend" | null;
          }) => {
            return (
              <span style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <ArrowUp
                  size={16}
                  color={
                    sortOrder === "ascend"
                      ? designSystemColors.brand.secondary[600]
                      : designSystemColors.neutral[400]
                  }
                  style={{ margin: 0, padding: 0 }}
                />
                <ArrowDown
                  style={{ margin: 0, padding: 0 }}
                  size={16}
                  color={
                    sortOrder === "descend"
                      ? designSystemColors.brand.secondary[600]
                      : designSystemColors.neutral[400]
                  }
                />
              </span>
            );
          },
        }),
      title:
        typeof col.title === "string" ? (
          <Body2 color="dark" strong ellipsis>
            {col.title}
          </Body2>
        ) : (
          col.title
        ),

      render: (value: unknown, record: T, index: number) => {
        if (col.render) {
          return col.render(value, record, index);
        }

        if (typeof value === "string" || typeof value === "number") {
          return (
            <Tooltip title={value}>
              <Body2 color="dark" ellipsis>
                {value}
              </Body2>
            </Tooltip>
          );
        }

        return value;
      },
    }));
  }, [columns]);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 13,
          colorText: designSystemColors.neutral[800],
          fontWeightStrong: 400,
          colorPrimary: designSystemColors.neutral[300],
        },
        components: {
          Select: {
            activeBorderColor: designSystemColors.neutral[300],
            hoverBorderColor: designSystemColors.neutral[300],
            activeOutlineColor: designSystemColors.neutral[300],
            optionFontSize: 13,
            baseControlHeight: 32,
            itemHeights: 28,
            multipleItemBorderColor: "#D4D4D4",
            optionHeight: 28,
            optionPadding: "4px 8px",
            colorText: "rgba(38, 38, 38, 1)",
            colorBgElevated: "rgba(250, 250, 250, 1)",
            optionSelectedFontWeight: 400,
            optionSelectedBg: designSystemColors.neutral[200],
            multipleItemBg: "rgba(255, 255, 255, 0.01)",
            multipleItemColor: "#262626",
            tagFontSize: 13,
            borderRadiusSM: 8,
          },
          Pagination: {
            itemActiveBg: "rgba(255, 255, 255, 0)",
            itemActiveColor: designSystemColors.neutral[800],
            itemActiveColorHover: designSystemColors.neutral[800],
            itemBg: "rgba(255, 255, 255, 0)",
            itemInputBg: "red",
            itemLinkBg: "red",
            itemSize: 32,
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
            headerBg: designSystemColors.neutral[50],
            colorBgContainer: designSystemColors.neutral[50],
            colorBorderSecondary: designSystemColors.neutral[300],
            borderRadius: radius.xl,
            rowSelectedBg: designSystemColors.neutral[200],
            rowSelectedHoverBg: designSystemColors.neutral[200],
            headerSortActiveBg: designSystemColors.neutral[50],
            headerSortHoverBg: designSystemColors.neutral[50],
            bodySortBg: designSystemColors.neutral[50],
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
      />
    </ConfigProvider>
  );
}
