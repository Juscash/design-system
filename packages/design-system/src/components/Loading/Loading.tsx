"use client";

import React from "react";
import { Spin, ConfigProvider } from "antd";
import type { SpinProps } from "antd";
import { designSystemColors } from "../../theme";
import { LoadingOutlined } from "@ant-design/icons";

export interface LoadingProps extends SpinProps {}

export const Loading: React.FC<LoadingProps> = (props) => {
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
            colorPrimary: designSystemColors.brand.primary[500],
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
