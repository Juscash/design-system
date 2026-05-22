import type { ReactElement } from "react";
import type { CheckboxProps as AntdCheckboxProps, Checkbox as AntdCheckbox } from "antd";

export type CheckboxProps = AntdCheckboxProps & {
  error?: boolean;
};

export type CheckboxComponent = ((props: CheckboxProps) => ReactElement) & {
  displayName?: string;
  Group: typeof AntdCheckbox.Group;
};
