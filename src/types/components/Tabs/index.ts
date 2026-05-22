import type { TabsProps as AntdTabsProps } from "antd";

export type TabsSize = "s" | "m" | "l";
export type TabsVariant = "primary" | "secondary";

type CleanAntdProps = {
  [K in keyof AntdTabsProps as K extends "size" | "type" ? never : K]: AntdTabsProps[K];
};

export type TabsProps = CleanAntdProps & {
  dsSize?: TabsSize;
  size?: AntdTabsProps["size"];
  variant?: TabsVariant;
};
