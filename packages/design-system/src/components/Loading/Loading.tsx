"use client";

import React from "react";
import { Spin, ConfigProvider } from "antd";
import type { SpinProps } from "antd";
import { designSystemColors } from "../../theme";
import { LoadingOutlined } from "@ant-design/icons";

// ============================================
// TYPES
// ============================================

export interface LoadingProps extends SpinProps {
  // We can stick to standard props or add 'variant' if we were to implement the dots specifically
  // For now, we wrap Spin which provides the Spinner look.
}

// ============================================
// COMPONENT
// ============================================

export const Loading: React.FC<LoadingProps> = (props) => {
  // Custom indicator to ensure the icon style matches roughly,
  // though ConfigProvider handles color.
  // We use LoadingOutlined as it is the standard AntD spinner which is very similar to the Figma one.
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize:
          props.size === "large" ? 40 : props.size === "small" ? 16 : 24,
      }}
      spin
    />
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Spin: {
            colorPrimary: designSystemColors.brand.primary[500], // Match brand green
          },
        },
        token: {
          colorPrimary: designSystemColors.brand.primary[500],
        },
      }}
    >
      <Spin indicator={antIcon} {...props} />
    </ConfigProvider>
  );
};

Loading.displayName = "Loading";
