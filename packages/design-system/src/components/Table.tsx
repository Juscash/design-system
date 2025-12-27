"use client";

import React, { useMemo } from "react";
import { ConfigProvider, Table as AntdTable, Tooltip } from "antd";
import type { TableProps as AntdTableProps } from "antd";
import { Body2 } from "./Typography";
import { designSystemColors, spacing } from "../theme";
import { radius } from "../theme";
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";
export type TableProps<T> = AntdTableProps<T>;

export function Table<T>(props: TableProps<T>): React.ReactElement {
  const {
    columns,
    bordered = true,
    tableLayout = "fixed",
    scroll = undefined,
    ...rest
  } = props;

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
        components: {
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
        tableLayout={tableLayout}
        scroll={scroll}
        bordered={bordered}
        columns={customColumns}
      />
    </ConfigProvider>
  );
}
