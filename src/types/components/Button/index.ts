import type { ButtonProps as AntdButtonProps } from "antd";

export type ButtonType = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "neutral";

export type ButtonSize = "xs" | "s" | "m";

type CleanAntdProps = Omit<AntdButtonProps, "type" | "size" | "danger" | "variant">;

export type ButtonProps = CleanAntdProps & {
  type?: ButtonType;
  variant?: ButtonType;
  size?: ButtonSize;
};
