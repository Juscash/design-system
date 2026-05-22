import type { ReactElement } from "react";
import type { SkeletonProps as AntdSkeletonProps, Skeleton as AntdSkeleton } from "antd";

export interface SkeletonProps extends AntdSkeletonProps {}

export type SkeletonComponent = ((props: SkeletonProps) => ReactElement) & {
  displayName?: string;
  Button: typeof AntdSkeleton.Button;
  Avatar: typeof AntdSkeleton.Avatar;
  Input: typeof AntdSkeleton.Input;
  Image: typeof AntdSkeleton.Image;
  Node: typeof AntdSkeleton.Node;
};
