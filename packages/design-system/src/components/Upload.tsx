"use client";

import React from "react";
import { Upload as AntdUpload, ConfigProvider } from "antd";
import type { UploadProps as AntdUploadProps } from "antd";
import { designSystemColors } from "../theme";
import { Input } from "./Input";
import * as LucideIcons from "lucide-react";

type UploadSize = "xs" | "s" | "m" | "l";
type UploadLayout = "horizontal" | "vertical";

type BaseUploadProps = Partial<Omit<AntdUploadProps, "children">>;

export type UploadProps = BaseUploadProps & {
  dsSize?: UploadSize;
  layout?: UploadLayout;
  children?: React.ReactNode;
};

const baseTokens: Record<string, any> = {
  actionsColor: designSystemColors.neutral[500],
  colorError: designSystemColors.feedback.red[500],
  colorText: designSystemColors.neutral[800],
  colorTextDescription: designSystemColors.neutral[500],
};

export function Upload(props: UploadProps): React.ReactElement {
  const {
    dsSize = "m",
    layout = "vertical",
    style,
    listType = "text",
    className,
    children,
    ...rest
  } = props;

  // Sempre usar listType="text" para ambos os layouts
  // A diferença será apenas no CSS para posicionar os arquivos

  // Criar children padrão com Input se não fornecido
  const defaultChildren = (
    <Input
      dsSize={dsSize}
      value="Solte aqui ou clique para escolher"
      prefix={<LucideIcons.Upload size={16} />}
      readOnly
      style={{
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "13px",
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 8,
      }}
      styles={{
        input: {
          fontWeight: "bold",
          padding: 0,
        },
      }}
    />
  );

  const uploadChildren = children || defaultChildren;

  const uploadClassName =
    layout === "horizontal"
      ? `juscash-upload-horizontal ${className || ""}`.trim()
      : className;

  return (
    <ConfigProvider
      theme={{
        components: {
          Upload: {
            ...baseTokens,
          },
        },
        token: {
          colorBorder: designSystemColors.neutral[300],
          colorError: designSystemColors.feedback.red[500],
          colorTextDisabled: designSystemColors.neutral[400],
          colorTextPlaceholder: designSystemColors.neutral[500],
        },
      }}
    >
      <AntdUpload
        listType={listType}
        style={style}
        className={uploadClassName}
        {...rest}
      >
        {uploadChildren}
      </AntdUpload>
    </ConfigProvider>
  );
}
