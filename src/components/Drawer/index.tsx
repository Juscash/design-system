import React from "react";
import { Drawer as AntdDrawer, ConfigProvider } from "antd";
import { designSystemColors, spacing } from "../../theme";
import type { DrawerProps } from "../../types/components/Drawer";

const BOTTOM_HANDLE_WIDTH = 50;
const BOTTOM_HANDLE_HEIGHT = 3;
const BOTTOM_HANDLE_RADIUS = 2;
const BOTTOM_RADIUS = 10;
const COLOR_MASK_DRAWER = "rgba(23, 23, 23, 0.25)";

/**
 * Drawer com tokens próprios do design system. Em `placement="bottom"`,
 * adiciona uma alça arredondada no topo (handle visual de sheet).
 */
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
            paddingLG: spacing[6],
          },
        },
        token: {
          colorBgMask: COLOR_MASK_DRAWER,
        },
      }}
    >
      <AntdDrawer
        placement={placement}
        {...rest}
        styles={{
          header: {
            padding: `${spacing[6]}px ${spacing[6]}px`,
            borderBottom: `1px solid ${designSystemColors.neutral[200]}`,
          },
          body: {
            padding: `${spacing[6]}px`,
          },
          footer: {
            padding: `${spacing[4]}px ${spacing[6]}px`,
            borderTop: `1px solid ${designSystemColors.neutral[200]}`,
            textAlign: "right",
          },
          wrapper: isBottom
            ? {
                borderTopLeftRadius: BOTTOM_RADIUS,
                borderTopRightRadius: BOTTOM_RADIUS,
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
              top: spacing[2],
              left: "50%",
              transform: "translateX(-50%)",
              width: BOTTOM_HANDLE_WIDTH,
              height: BOTTOM_HANDLE_HEIGHT,
              backgroundColor: designSystemColors.neutral[200],
              borderRadius: BOTTOM_HANDLE_RADIUS,
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

export type { DrawerProps } from "../../types/components/Drawer";
