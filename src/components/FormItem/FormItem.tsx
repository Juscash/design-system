import React from "react";
import { Form as AntdForm } from "antd";
import type { FormItemProps } from "antd";
import { Body1 } from "../Typography";

export type FormItemSize = "xs" | "s" | "m" | "l";

export interface CustomFormItemProps extends FormItemProps {
  label?: React.ReactNode;
  required?: boolean;
  size?: FormItemSize;
}

export const FormItem: React.FC<CustomFormItemProps> = ({ label, required, size = "m", children, ...props }) => {
  const customLabel = React.useMemo(() => {
    if (!label) return undefined;

    if (typeof label === "string") {
      return <Body1 color="dark">{label}</Body1>;
    }

    return label;
  }, [label]);

  const sizedChildren = React.useMemo(() => {
    if (!children || !React.isValidElement(children)) {
      return children;
    }

    const childProps = children.props as { size?: FormItemSize };
    if (typeof childProps.size !== "undefined") {
      return children;
    }

    return React.cloneElement(children, { size } as { size: FormItemSize });
  }, [children, size]);

  return (
    <AntdForm.Item {...props} label={customLabel} required={required}>
      {sizedChildren}
    </AntdForm.Item>
  );
};
