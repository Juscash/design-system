import React from "react";
import { Breadcrumb as AntdBreadcrumb, ConfigProvider } from "antd";
import { ChevronRight } from "lucide-react";
import { designSystemColors } from "../../theme/foundations";
import type { BreadcrumbProps } from "../../types/components/Breadcrumb";
import "./index.module.css";

const SEPARATOR_ICON_SIZE = 16;
const ITEM_FONT_SIZE = 13;

/**
 * Breadcrumb com separador `ChevronRight` do Lucide e tipografia do design
 * system. O Ãºltimo item aparece em negrito conforme spec.
 */
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
            fontSize: ITEM_FONT_SIZE,
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
        separator={<ChevronRight size={SEPARATOR_ICON_SIZE} color={designSystemColors.neutral[500]} />}
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

export type { BreadcrumbProps } from "../../types/components/Breadcrumb";
