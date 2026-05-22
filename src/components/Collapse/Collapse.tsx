import React from "react";
import { Collapse as AntdCollapse, ConfigProvider } from "antd";
import type { CollapseProps as AntdCollapseProps } from "antd";
import { designSystemColors, radius } from "../../theme";

type CleanAntdProps = {
  [K in keyof AntdCollapseProps as K extends "size" | "bordered" | "ghost" ? never : K]: AntdCollapseProps[K];
};

export type CollapseProps = CleanAntdProps & {
  isActive?: boolean; // mapped from "Open" state if needed, but driven by activeKey
  bordered?: boolean;
  ghost?: boolean;
  size?: AntdCollapseProps["size"];
};

export function Collapse(props: CollapseProps): React.ReactElement {
  const { bordered = true, ghost = false, size = "middle", ...rest } = props;

  // Token mapping from Figma Analysis
  const collapseTokens = {
    borderRadiusLG: radius.xl,
    colorBorder: designSystemColors.neutral[300],
    headerBg: designSystemColors.neutral[50],
    contentBg: designSystemColors.neutral[50],
    colorTextHeading: designSystemColors.neutral[900],
    colorText: designSystemColors.neutral[600], // Content text color
    headerPadding: "12px 16px", // Approximate standard padding
    contentPadding: "16px",
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            ...collapseTokens,
          },
        },
      }}
    >
      <AntdCollapse bordered={bordered} ghost={ghost} size={size} expandIconPosition="end" {...rest} />
    </ConfigProvider>
  );
}

Collapse.displayName = "Collapse";
// Use Ant Design's Panel if needed, though 'items' prop is preferred in v5
Collapse.Panel = AntdCollapse.Panel;
