import type { CollapseProps as AntdCollapseProps } from "antd";

type CleanAntdProps = {
  [K in keyof AntdCollapseProps as K extends "size" | "bordered" | "ghost" ? never : K]: AntdCollapseProps[K];
};

export type CollapseProps = CleanAntdProps & {
  isActive?: boolean;
  bordered?: boolean;
  ghost?: boolean;
  size?: AntdCollapseProps["size"];
};
