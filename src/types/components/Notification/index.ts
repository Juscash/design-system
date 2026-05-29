import type { ReactElement } from "react";
import type { NotificationArgsProps } from "antd";

export type NotificationVariant = "success" | "info" | "warning" | "error";

export interface NotificationApi {
  success: (args: NotificationArgsProps) => void;
  info: (args: NotificationArgsProps) => void;
  warning: (args: NotificationArgsProps) => void;
  error: (args: NotificationArgsProps) => void;
  open: (args: NotificationArgsProps) => void;
  destroy: (key?: React.Key) => void;
}

export type UseNotificationReturn = readonly [NotificationApi, ReactElement];
