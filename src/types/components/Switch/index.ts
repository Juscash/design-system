import type { SwitchProps as AntdSwitchProps } from "antd";

export type SwitchProps = AntdSwitchProps & {
  error?: boolean;
};

export type RichSwitchProps = SwitchProps & {
  label: string;
  secondaryText?: string;
};
