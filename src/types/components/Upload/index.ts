import type { ReactNode } from "react";
import type { UploadProps as AntdUploadProps } from "antd";

export type UploadSize = "xs" | "s" | "m" | "l";
export type UploadLayout = "horizontal" | "vertical";
export type UploadValidationStatus = "error";

type BaseUploadProps = Partial<Omit<AntdUploadProps, "children">>;

export type UploadProps = BaseUploadProps & {
  dsSize?: UploadSize;
  layout?: UploadLayout;
  children?: ReactNode;
  showTrigger?: boolean;
  validationStatus?: UploadValidationStatus;
};
