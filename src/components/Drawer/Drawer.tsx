import React from "react";
import { Drawer as AntdDrawer, ConfigProvider } from "antd";
import type { DrawerProps as AntdDrawerProps } from "antd";
import { designSystemColors } from "../../theme";

export interface DrawerProps extends AntdDrawerProps {}

export const Drawer: React.FC<DrawerProps> = ({ children, placement = "bottom", styles: userStyles, ...rest }) => {
  const isBottom = placement === "bottom";

  return (
    <ConfigProvider
      theme={{
        components: {
          Drawer: {
            colorBgElevated: designSystemColors.neutral[50],
            colorText: designSystemColors.neutral[600],
            colorTextHeading: designSystemColors.neutral[800],
            colorIcon: designSystemColors.neutral[500],
            paddingLG: 24,
          },
        },
        token: {
          colorBgMask: "rgba(23, 23, 23, 0.25)",
        },
      }}
    >
      <AntdDrawer
        placement={placement}
        {...rest}
        styles={{
          header: {
            padding: "24px 24px",
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
          wrapper: isBottom
            ? {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                overflow: "hidden",
              }
            : undefined,
          ...userStyles,
        }}
      >
        {isBottom && (
          <div
            style={{
              position: "absolute",
              top: 8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 50,
              height: 3,
              backgroundColor: designSystemColors.neutral[200],
              borderRadius: 2,
              zIndex: 10,
            }}
          />
        )}
        {children}
      </AntdDrawer>
    </ConfigProvider>
  );
};

Drawer.displayName = "Drawer";
