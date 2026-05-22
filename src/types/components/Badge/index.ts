import type { ReactNode } from "react";
import type { BadgeProps as AntdBadgeProps } from "antd";

export type BadgeVariant = "primary" | "secondary" | "tertiary" | "outline" | "ghost" | "destructive" | "counter";

export type BadgeStatusColor = "success" | "error" | "warning" | "info" | "caution";

type CleanAntdProps = {
  [K in keyof AntdBadgeProps as K extends "count" | "color" | "status" | "text" | "size" ? never : K]: AntdBadgeProps[K];
};

export type BadgeProps = CleanAntdProps & {
  variant?: BadgeVariant;
  statusColor?: BadgeStatusColor;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  count?: number;
};
