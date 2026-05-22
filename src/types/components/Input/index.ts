import type { ReactElement } from "react";
import type { InputProps as AntdInputProps } from "antd";
import type { TextAreaProps } from "../TextArea";

export type InputSize = "xs" | "s" | "m" | "l";

type CleanAntdProps = {
  [K in keyof AntdInputProps as K extends "size" ? never : K]: AntdInputProps[K];
};

export type InputProps = CleanAntdProps & {
  size?: InputSize;
};

export type InputComponent = ((props: InputProps) => ReactElement) & {
  displayName?: string;
  TextArea: (props: TextAreaProps) => ReactElement;
};
