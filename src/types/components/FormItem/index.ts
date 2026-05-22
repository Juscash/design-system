import type { ReactNode } from "react";
import type { FormItemProps } from "antd";

export type FormItemSize = "xs" | "s" | "m" | "l";

export interface CustomFormItemProps extends FormItemProps {
  label?: ReactNode;
  required?: boolean;
  size?: FormItemSize;
}
