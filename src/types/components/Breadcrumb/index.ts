import type { BreadcrumbProps as AntdBreadcrumbProps } from "antd";

type CleanAntdProps = {
  [K in keyof AntdBreadcrumbProps as K extends "separator" ? never : K]: AntdBreadcrumbProps[K];
};

export type BreadcrumbProps = CleanAntdProps;
