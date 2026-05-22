import type { ReactNode } from "react";
import type { SegmentedProps as AntdSegmentedProps } from "antd";

export type SegmentedSize = "m" | "s" | "xs";
export type SegmentedOptionState = "active" | "inactive";

export type SegmentedOption<T extends string | number = string> = {
  value: T;
  text?: ReactNode;
  label?: ReactNode;
  icon?: ReactNode;
  counter?: ReactNode;
  bold?: boolean;
  state?: SegmentedOptionState;
  disabled?: boolean;
};

export type NativeLabeledOption<T extends string | number = string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

export type SegmentedInputOption<T extends string | number = string> =
  | T
  | NativeLabeledOption<T>
  | SegmentedOption<T>;

export type SegmentedProps<T extends string | number = string> = Omit<AntdSegmentedProps<T>, "size" | "options"> & {
  size?: SegmentedSize;
  options?: SegmentedInputOption<T>[];
};
