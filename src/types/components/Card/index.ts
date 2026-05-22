import type { CardProps as AntdCardProps } from "antd";

export type CardProps = AntdCardProps & {
  clickable?: boolean;
};
