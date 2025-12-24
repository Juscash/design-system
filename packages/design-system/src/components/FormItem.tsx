"use client";

import React from "react";
import { Form as AntdForm } from "antd";
import type { FormItemProps } from "antd";
import { Body1 } from "./Typography";

export interface CustomFormItemProps extends FormItemProps {
  label?: React.ReactNode;
  required?: boolean;
}

export const FormItem: React.FC<CustomFormItemProps> = ({
  label,
  required,
  ...props
}) => {
  const customLabel = React.useMemo(() => {
    if (!label) return undefined;

    if (typeof label === "string") {
      return <Body1>{label}</Body1>;
    }

    return label;
  }, [label]);

  return <AntdForm.Item {...props} label={customLabel} required={required} />;
};
