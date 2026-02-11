import React from "react";
import { Breadcrumb as AntdBreadcrumb, ConfigProvider } from "antd";
import type { BreadcrumbProps as AntdBreadcrumbProps } from "antd";
import { designSystemColors } from "../../theme/foundations";
import { ChevronRight } from "lucide-react";

// Mapped types explicitly
type CleanAntdProps = {
  [K in keyof AntdBreadcrumbProps as K extends "separator" ? never : K]: AntdBreadcrumbProps[K];
};

export type BreadcrumbProps = CleanAntdProps & {
  // Add any custom props here if needed in the future
};

export function Breadcrumb(props: BreadcrumbProps): React.ReactElement {
  const { ...rest } = props;

  return (
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            itemColor: designSystemColors.neutral[500],
            linkColor: designSystemColors.neutral[500],
            linkHoverColor: designSystemColors.neutral[800],
            separatorColor: designSystemColors.neutral[500],
            lastItemColor: designSystemColors.neutral[800],
            fontSize: 13,
            colorBgTextHover: "transparent",
            lineHeight: 1.2,
          },
        },
        token: {
          fontFamily: '"Inter", sans-serif',
        },
      }}
    >
      <AntdBreadcrumb
        separator={<ChevronRight size={16} color={designSystemColors.neutral[500]} />}
        {...rest}
        className={`juscash-breadcrumb ${rest.className || ""}`.trim()}
        items={rest.items?.map((item, index) => {
          const isLast = index === (rest.items?.length ?? 0) - 1;
          return {
            ...item,
            title: isLast ? <span style={{ fontWeight: 700 }}>{item.title}</span> : item.title,
          };
        })}
      />
    </ConfigProvider>
  );
}

Breadcrumb.displayName = "Breadcrumb";
