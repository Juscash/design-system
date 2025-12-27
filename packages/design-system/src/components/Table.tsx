"use client";

import React, { useMemo } from "react";
import { ConfigProvider, Table as AntdTable, Tooltip } from "antd";
import type { TableProps as AntdTableProps } from "antd";
import { Body2 } from "./Typography";
import { designSystemColors } from "../theme";
import { radius } from "../theme";
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
          Table: {
            cellPaddingBlock: 8,
            headerBg: designSystemColors.neutral[50],
            colorBgContainer: designSystemColors.neutral[50],
            colorBorderSecondary: designSystemColors.neutral[300],
            borderRadius: radius.xl,
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
