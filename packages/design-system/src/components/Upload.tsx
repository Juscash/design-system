"use client";

import React from "react";
import { Upload as AntdUpload, ConfigProvider } from "antd";
import type { UploadProps as AntdUploadProps, UploadFile } from "antd";
import { designSystemColors } from "../theme";
import { Button } from "./Button";
import { Body2 } from "./Typography";
import * as LucideIcons from "lucide-react";
import { radius } from "../theme";
import { Trash2, Link } from "lucide-react";

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
    disabled = false,
    dsSize = "m",
    layout = "vertical",
    listType = "text",
    className,
    children,

    ...rest
  } = props;

  // Mapear tamanhos do Upload para tamanhos do Button
  const mapToButtonSize = (size: UploadSize): "xs" | "s" | "m" => {
    if (size === "xs") return "xs";
    if (size === "s") return "s";
    return "m"; // m e l do Upload mapeiam para m do Button
  };

  // Calcular estilo do Button baseado no layout e se há arquivos
  const getButtonStyle = (): React.CSSProperties => {
    if (layout === "horizontal") {
      return {
        width: "100%",
        borderRadius: radius.xl,
        justifyContent: "flex-start",
        padding: "8px 12px",
      };
    }

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
      className="juscash-upload-button"
      dsSize={mapToButtonSize(dsSize)}
      icon={<LucideIcons.Upload size={16} />}
      disabled={disabled}
      style={getButtonStyle()}
      block
    >
      <Body2 ellipsis color={disabled ? "disabled" : "dark"} strong>
        Solte aqui ou clique para escolher
      </Body2>
    </Button>
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
          fontSize: 13,
        },
      }}
    >
      <AntdUpload
        disabled={disabled}
        listType={listType}
        className={uploadClassName}
        {...rest}
        iconRender={() => <Link size={14} />}
        showUploadList={{
          removeIcon: (
            <Trash2 size={14} color={designSystemColors.neutral[800]} />
          ),
        }}
      >
        {uploadChildren}
      </AntdUpload>
    </ConfigProvider>
  );
}
