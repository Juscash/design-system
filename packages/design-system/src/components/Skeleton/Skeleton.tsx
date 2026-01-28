"use client";

import React from "react";
import { Skeleton as AntdSkeleton, ConfigProvider } from "antd";
import type { SkeletonProps as AntdSkeletonProps } from "antd";
import { designSystemColors } from "../../theme";

export interface SkeletonProps extends AntdSkeletonProps {}

type SkeletonComponent = React.FC<SkeletonProps> & {
  Button: typeof AntdSkeleton.Button;
  Avatar: typeof AntdSkeleton.Avatar;
  Input: typeof AntdSkeleton.Input;
  Image: typeof AntdSkeleton.Image;
  Node: typeof AntdSkeleton.Node;
};

export const Skeleton: SkeletonComponent = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Skeleton: {
            colorFill: designSystemColors.neutral[100],
            colorFillContent: designSystemColors.neutral[100],
          },
        },
      }}
    >
      <AntdSkeleton {...props} />
    </ConfigProvider>
  );
};

Skeleton.displayName = "Skeleton";

Skeleton.Button = AntdSkeleton.Button;
Skeleton.Avatar = AntdSkeleton.Avatar;
Skeleton.Input = AntdSkeleton.Input;
Skeleton.Image = AntdSkeleton.Image;
Skeleton.Node = AntdSkeleton.Node;
