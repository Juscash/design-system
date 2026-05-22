import type { SwitchProps as AntdSwitchProps } from "antd";

export type SwitchProps = AntdSwitchProps & {
  error?: boolean;
};
