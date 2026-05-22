import type { AlertProps as AntdAlertProps } from "antd";

export type AlertVariant = "neutral" | "error" | "success" | "info" | "warning";

type CleanAntdProps = {
  [K in keyof AntdAlertProps as K extends "type" ? never : K]: AntdAlertProps[K];
};

export type AlertProps = CleanAntdProps & {
  type?: AlertVariant;
  showLine2?: boolean;
  showButton?: boolean;
  showLeftIcon?: boolean;
};
