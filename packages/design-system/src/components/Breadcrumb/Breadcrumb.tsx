"use client";

import React from "react";
import { Breadcrumb as AntdBreadcrumb, ConfigProvider } from "antd";
import type { BreadcrumbProps as AntdBreadcrumbProps } from "antd";
import { designSystemColors } from "../../theme/foundations";
import { ChevronRight } from "lucide-react";

// Mapped types explicitly
type CleanAntdProps = {
  [K in keyof AntdBreadcrumbProps as K extends "separator"
    ? never
    : K]: AntdBreadcrumbProps[K];
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
            itemColor: designSystemColors.neutral[500], // var(--color/text/soft)
            linkColor: designSystemColors.neutral[500],
            separatorColor: designSystemColors.neutral[500],
            lastItemColor: designSystemColors.neutral[900], // Main text color
            // Checking Figma screenshot:
            // "Home" (inactive) seems soft.
            // The last item (current page) usually has a different style.
            // Figma screenshot text says: "Home > ... > Components > Breadcrumb"
            // "Breadcrumb" is bold/darker in screenshot?
            // Let's look at the generated code from Figma again or just stick to standard Antd behavior with our colors.
            // Text color from Figma code involved: text-[color:var(--color\/text\/soft,#6d6d6e)]

            // Ant Design tokens:
            // itemColor: Default text color of item
            // lastItemColor: Text color of last item
            // separatorColor: Color of separator
            // linkColor: Color of link
          },
        },
        token: {
          // Overrides if needed
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <AntdBreadcrumb
        separator={<ChevronRight size={16} />}
        {...rest}
        items={rest.items?.map((item) => ({
          ...item,
          className: "font-inter", // Ensure Inter font if not set globally
        }))}
      />
    </ConfigProvider>
  );
}

Breadcrumb.displayName = "Breadcrumb";
