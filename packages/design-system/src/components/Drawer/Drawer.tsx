"use client";

import React from "react";
import { Drawer as AntdDrawer, ConfigProvider } from "antd";
import type { DrawerProps as AntdDrawerProps } from "antd";
import { designSystemColors } from "../../theme";

// ============================================
// TYPES
// ============================================

export interface DrawerProps extends AntdDrawerProps {
  // Add custom props here if needed in the future
}

// ============================================
// COMPONENT
// ============================================

export const Drawer: React.FC<DrawerProps> = ({ children, ...rest }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Drawer: {
            colorBgElevated: designSystemColors.neutral[50], // Background color
            colorText: designSystemColors.neutral[900], // content text
            colorTextHeading: designSystemColors.neutral[900], // Title color
            colorIcon: designSystemColors.neutral[500], // Close icon color
            paddingLG: 24, // Padding
          },
        },
      }}
    >
      <AntdDrawer
        {...rest}
        styles={{
          header: {
            padding: "20px 24px",
            borderBottom: `1px solid ${designSystemColors.neutral[200]}`,
          },
          body: {
            padding: "24px",
          },
          footer: {
            padding: "16px 24px",
            borderTop: `1px solid ${designSystemColors.neutral[200]}`,
            textAlign: "right",
          },
        }}
      >
        {children}
      </AntdDrawer>
    </ConfigProvider>
  );
};

Drawer.displayName = "Drawer";
