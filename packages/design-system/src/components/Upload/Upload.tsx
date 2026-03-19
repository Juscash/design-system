import React from "react";
import { Upload as AntdUpload, ConfigProvider, Form } from "antd";
import type { UploadFile, UploadProps as AntdUploadProps } from "antd";
import { designSystemColors } from "../../theme";
import * as LucideIcons from "lucide-react";

type UploadSize = "xs" | "s" | "m" | "l";
type UploadLayout = "horizontal" | "vertical";
type UploadValidationStatus = "error";

type BaseUploadProps = Partial<Omit<AntdUploadProps, "children">>;

export type UploadProps = BaseUploadProps & {
  dsSize?: UploadSize;
  layout?: UploadLayout;
  children?: React.ReactNode;
  showTrigger?: boolean;
  validationStatus?: UploadValidationStatus;
};

const baseTokens: Record<string, string> = {
  actionsColor: designSystemColors.neutral[500],
  colorError: designSystemColors.feedback.red[500],
  colorText: designSystemColors.neutral[800],
  colorTextDescription: designSystemColors.neutral[500],
};

export function Upload(props: UploadProps): React.ReactElement {
  const { status: formStatus } = Form.Item.useStatus();
  const {
    disabled = false,
    dsSize = "m",
    layout = "vertical",
    listType = "text",
    className,
    children,
    fileList,
    defaultFileList,
    showUploadList = true,
    iconRender,
    itemRender,
    validationStatus,
    showTrigger = true,
    ...rest
  } = props;

  const files = fileList ?? defaultFileList ?? [];
  const hasFiles = files.length > 0;
  const resolvedValidationStatus = validationStatus ?? (formStatus === "error" ? "error" : undefined);
  const shouldRenderList = showUploadList !== false;
  const showRemoveButton =
    showUploadList === false ? false
    : typeof showUploadList === "object" && typeof showUploadList.showRemoveIcon !== "undefined" ?
      !!showUploadList.showRemoveIcon
    : true;

  const rootClassName = [
    "juscash-upload-root",
    `juscash-upload-size-${dsSize}`,
    `juscash-upload-layout-${layout}`,
    resolvedValidationStatus === "error" ? "juscash-upload-error" : "",
    disabled ? "juscash-upload-disabled" : "",
    hasFiles ? "juscash-upload-has-files" : "",
    !showTrigger ? "juscash-upload-files-only" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const defaultChildren = (
    <button type="button" className="juscash-upload-trigger" disabled={disabled}>
      <span className="juscash-upload-trigger-icon" aria-hidden="true">
        <LucideIcons.Upload size={16} />
      </span>
      <span className="juscash-upload-trigger-text">Solte aqui ou clique para escolher</span>
    </button>
  );

  const renderDefaultFileItem = (file: UploadFile, onRemove?: () => void) => {
    const isLoading = file.status === "uploading";
    const isFileError = file.status === "error";
    const fileClassName = [
      "juscash-upload-file-row",
      isLoading ? "juscash-upload-file-loading" : "",
      isFileError ? "juscash-upload-file-error" : "",
      disabled ? "juscash-upload-file-disabled" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const shouldShowRemoveButton = showRemoveButton && !isLoading;
    const fileIcon =
      isLoading ?
        <LucideIcons.LoaderCircle size={16} className="juscash-upload-file-spinner" />
      : (iconRender?.(file, listType) ?? <LucideIcons.Link size={16} />);

    return (
      <div className={fileClassName}>
        <span className="juscash-upload-file-icon" aria-hidden="true">
          {fileIcon}
        </span>
        <span className="juscash-upload-file-name">{file.name}</span>
        {shouldShowRemoveButton ?
          <button
            type="button"
            className="juscash-upload-remove-button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onRemove?.();
            }}
            disabled={disabled}
            aria-label={`Remover ${file.name}`}
          >
            <TrashIcon />
          </button>
        : null}
      </div>
    );
  };

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
        fileList={fileList}
        defaultFileList={defaultFileList}
        listType={listType}
        className={rootClassName}
        showUploadList={shouldRenderList ? { showPreviewIcon: false, showDownloadIcon: false, showRemoveIcon: false } : false}
        itemRender={
          itemRender ||
          ((_, file, currentFileList, actions) => renderDefaultFileItem(file, currentFileList.length > 0 ? actions.remove : undefined))
        }
        iconRender={(file, currentListType) =>
          iconRender?.(file, currentListType) ??
          (file.status === "uploading" ? <LucideIcons.LoaderCircle size={16} className="juscash-upload-file-spinner" /> : <LucideIcons.Link size={16} />)
        }
        {...rest}
      >
        {showTrigger ? children || defaultChildren : null}
      </AntdUpload>
    </ConfigProvider>
  );
}

function TrashIcon(): React.ReactElement {
  return <LucideIcons.Trash2 size={14} />;
}
