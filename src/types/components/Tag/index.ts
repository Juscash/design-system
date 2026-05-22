import type { TagProps as AntdTagProps } from "antd";

export type TagProps = AntdTagProps & {
  error?: boolean;
  success?: boolean;
  warning?: boolean;
};
