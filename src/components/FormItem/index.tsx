import React from "react";
import { Form as AntdForm } from "antd";
import { Body1 } from "../Typography";
import type { CustomFormItemProps, FormItemSize } from "../../types/components/FormItem";

/**
 * Wrapper de `Form.Item` do Antd que renderiza o label com `Body1` quando ele
 * vem como string, e propaga a prop `size` (`xs|s|m|l`) para o filho controlado
 * caso este aceite (Input, Select, etc.).
 */
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

FormItem.displayName = "FormItem";

export type { CustomFormItemProps, FormItemSize } from "../../types/components/FormItem";
