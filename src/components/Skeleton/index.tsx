import React from "react";
import { Skeleton as AntdSkeleton, ConfigProvider } from "antd";
import { designSystemColors } from "../../theme";
import type { SkeletonComponent, SkeletonProps } from "../../types/components/Skeleton";

/**
 * Skeleton do design system. Aplica `colorFill` neutral[100] via `ConfigProvider`
 * local; expõe os subcomponentes do Antd (`Button`, `Avatar`, `Input`, `Image`,
 * `Node`) como propriedades estáticas para uso direto.
 */
const SkeletonInner: React.FC<SkeletonProps> = (props) => {
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

SkeletonInner.displayName = "Skeleton";

const SkeletonWithSubcomponents = SkeletonInner as SkeletonComponent;
SkeletonWithSubcomponents.Button = AntdSkeleton.Button;
SkeletonWithSubcomponents.Avatar = AntdSkeleton.Avatar;
SkeletonWithSubcomponents.Input = AntdSkeleton.Input;
SkeletonWithSubcomponents.Image = AntdSkeleton.Image;
SkeletonWithSubcomponents.Node = AntdSkeleton.Node;

export const Skeleton = SkeletonWithSubcomponents;

export type { SkeletonProps } from "../../types/components/Skeleton";
