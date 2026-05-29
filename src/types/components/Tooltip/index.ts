import type { CSSProperties } from "react";
import type { TooltipProps as AntdTooltipProps } from "antd";

export type TooltipProps = AntdTooltipProps;

export type TooltipSemanticClassNames = {
  root?: string;
  container?: string;
  arrow?: string;
};

export type TooltipSemanticStyles = {
  root?: CSSProperties;
  container?: CSSProperties;
  arrow?: CSSProperties;
};
