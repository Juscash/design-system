"use client";

import React, { useState } from "react";
import { Upload as AntdUpload, ConfigProvider } from "antd";
import type { UploadProps as AntdUploadProps, UploadFile } from "antd";
import { designSystemColors } from "../theme";
import { Button } from "./Button";
import { Body2 } from "./Typography";
import * as LucideIcons from "lucide-react";
import { radius } from "../theme";

type UploadSize = "xs" | "s" | "m" | "l";
type UploadLayout = "horizontal" | "vertical";

type BaseUploadProps = Partial<Omit<AntdUploadProps, "children" | "onChange">>;

export type UploadProps = BaseUploadProps & {
  dsSize?: UploadSize;
  layout?: UploadLayout;
  children?: React.ReactNode;
  onChange?: (info: { fileList: UploadFile[] }) => void;
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
    fileList: controlledFileList,
    onChange,
    ...rest
  } = props;

  // Estado interno para rastrear arquivos se não for controlado
  const [internalFileList, setInternalFileList] = useState<UploadFile[]>([]);

  // Usar fileList controlado ou interno
  const fileList = controlledFileList ?? internalFileList;
  const hasFiles = fileList.length > 0;

  // Handler para mudanças no upload
  const handleChange = (info: { fileList: UploadFile[] }) => {
    if (onChange) {
      onChange(info);
    } else {
      setInternalFileList(info.fileList);
    }
  };

  // Mapear tamanhos do Upload para tamanhos do Button
  const mapToButtonSize = (size: UploadSize): "xs" | "s" | "m" => {
    if (size === "xs") return "xs";
    if (size === "s") return "s";
    return "m"; // m e l do Upload mapeiam para m do Button
  };

  // Calcular estilo do Button baseado no layout e se há arquivos
  const getButtonStyle = (): React.CSSProperties => {
    // Se for horizontal e tiver arquivos, o CSS já cuida do 50%
    if (layout === "horizontal" && hasFiles) {
      return {
        width: "100%",
        borderRadius: radius.xl,
        justifyContent: "flex-start",
        padding: "8px 12px",
      };
    }

    // Para vertical ou horizontal sem arquivos, usar fit-content
    return {
      width: "100%",
      borderRadius: radius.xl,
      justifyContent: "flex-start",
      padding: "8px 12px",
    };
  };

  // Criar children padrão com Button se não fornecido
  const defaultChildren = (
    <Button
      type="outlined"
      dsSize={mapToButtonSize(dsSize)}
      icon={<LucideIcons.Upload size={16} />}
      disabled={hasFiles}
      style={getButtonStyle()}
      block
    >
      <Body2 color="dark" strong>
        Solte aqui ou clique para escolher
      </Body2>
    </Button>
  );

  const uploadChildren = children || defaultChildren;

  const uploadClassName =
    layout === "horizontal"
      ? `juscash-upload-horizontal ${
          hasFiles ? "juscash-upload-has-files" : ""
        } ${className || ""}`.trim()
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
        fileList={fileList}
        onChange={handleChange}
        {...rest}
      >
        {uploadChildren}
      </AntdUpload>
    </ConfigProvider>
  );
}
