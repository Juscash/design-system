import React from "react";
import { Upload as AntdUpload, ConfigProvider, Form } from "antd";
import type { UploadFile } from "antd";
import { LoaderCircle, Link as LinkIcon, Trash2, Upload as UploadIcon } from "lucide-react";
import { designSystemColors } from "../../theme";
import type { UploadProps } from "../../types/components/Upload";
import "./index.module.css";

const ICON_SIZE = 16;
const REMOVE_ICON_SIZE = 14;
const INPUT_FONT_SIZE = 13;

const baseTokens: Record<string, string> = {
  actionsColor: designSystemColors.neutral[500],
  colorError: designSystemColors.feedback.red[500],
  colorText: designSystemColors.neutral[800],
  colorTextDescription: designSystemColors.neutral[500],
};

interface FileItemArgs {
  file: UploadFile;
  onRemove?: () => void;
  disabled: boolean;
  showRemoveButton: boolean;
  iconRender?: UploadProps["iconRender"];
  listType: NonNullable<UploadProps["listType"]>;
}

function TrashIcon(): React.ReactElement {
  return <Trash2 size={REMOVE_ICON_SIZE} />;
}

function renderFileItem(args: FileItemArgs): React.ReactElement {
  const { file, onRemove, disabled, showRemoveButton, iconRender, listType } = args;
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
    isLoading ? (
      <LoaderCircle size={ICON_SIZE} className="juscash-upload-file-spinner" />
    ) : (
      iconRender?.(file, listType) ?? <LinkIcon size={ICON_SIZE} />
    );

  return (
    <div className={fileClassName}>
      <span className="juscash-upload-file-icon" aria-hidden="true">
        {fileIcon}
      </span>
      <span className="juscash-upload-file-name">{file.name}</span>
      {shouldShowRemoveButton ? (
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
      ) : null}
    </div>
  );
}

function renderDefaultTrigger(disabled: boolean): React.ReactElement {
  return (
    <button type="button" className="juscash-upload-trigger" disabled={disabled}>
      <span className="juscash-upload-trigger-icon" aria-hidden="true">
        <UploadIcon size={ICON_SIZE} />
      </span>
      <span className="juscash-upload-trigger-text">Solte aqui ou clique para escolher</span>
    </button>
  );
}

function shouldShowRemoveIcon(showUploadList: UploadProps["showUploadList"]): boolean {
  if (showUploadList === false) return false;
  if (typeof showUploadList === "object" && typeof showUploadList.showRemoveIcon !== "undefined") {
    return !!showUploadList.showRemoveIcon;
  }
  return true;
}

interface RootClassNameArgs {
  dsSize: NonNullable<UploadProps["dsSize"]>;
  layout: NonNullable<UploadProps["layout"]>;
  disabled: boolean;
  hasFiles: boolean;
  showTrigger: boolean;
  validationStatus?: UploadProps["validationStatus"];
  className?: string;
}

function buildRootClassName(args: RootClassNameArgs): string {
  return [
    "juscash-upload-root",
    `juscash-upload-size-${args.dsSize}`,
    `juscash-upload-layout-${args.layout}`,
    args.validationStatus === "error" ? "juscash-upload-error" : "",
    args.disabled ? "juscash-upload-disabled" : "",
    args.hasFiles ? "juscash-upload-has-files" : "",
    !args.showTrigger ? "juscash-upload-files-only" : "",
    args.className,
  ]
    .filter(Boolean)
    .join(" ");
}

const uploadTokenOverrides = {
  colorBorder: designSystemColors.neutral[300],
  colorError: designSystemColors.feedback.red[500],
  colorTextDisabled: designSystemColors.neutral[400],
  colorTextPlaceholder: designSystemColors.neutral[500],
  fontSize: INPUT_FONT_SIZE,
} as const;

interface BuildItemRenderArgs {
  disabled: boolean;
  showRemoveButton: boolean;
  iconRender?: UploadProps["iconRender"];
  listType: NonNullable<UploadProps["listType"]>;
}

function buildItemRender(args: BuildItemRenderArgs): NonNullable<UploadProps["itemRender"]> {
  return (_node, file, currentFileList, actions) =>
    renderFileItem({
      file,
      onRemove: currentFileList.length > 0 ? actions.remove : undefined,
      disabled: args.disabled,
      showRemoveButton: args.showRemoveButton,
      iconRender: args.iconRender,
      listType: args.listType,
    });
}

function buildIconRender(iconRender?: UploadProps["iconRender"]): NonNullable<UploadProps["iconRender"]> {
  return (file, currentListType) =>
    iconRender?.(file, currentListType) ??
    (file.status === "uploading" ? (
      <LoaderCircle size={ICON_SIZE} className="juscash-upload-file-spinner" />
    ) : (
      <LinkIcon size={ICON_SIZE} />
    ));
}

const SHOW_UPLOAD_LIST_NO_ICONS = { showPreviewIcon: false, showDownloadIcon: false, showRemoveIcon: false } as const;
const UPLOAD_THEME = { components: { Upload: { ...baseTokens } }, token: uploadTokenOverrides } as const;

interface ResolveValidationStatusArgs {
  validationStatus?: UploadProps["validationStatus"];
  formStatus: string | undefined;
}

function resolveValidationStatus(args: ResolveValidationStatusArgs): UploadProps["validationStatus"] {
  return args.validationStatus ?? (args.formStatus === "error" ? "error" : undefined);
}

/**
 * Upload do design system. Suporta layout vertical/horizontal, ícones do
 * Lucide, e renderização de lista de arquivos com loading, erro e remoção
 * controlada via `showUploadList`.
 */
export function Upload(props: UploadProps): React.ReactElement {
  const { status: formStatus } = Form.Item.useStatus();
  const {
    disabled = false, dsSize = "m", layout = "vertical", listType = "text",
    className, children, fileList, defaultFileList, showUploadList = true,
    iconRender, itemRender, validationStatus, showTrigger = true, ...rest
  } = props;

  const hasFiles = (fileList ?? defaultFileList ?? []).length > 0;
  const resolvedValidationStatus = resolveValidationStatus({ validationStatus, formStatus });
  const showRemoveButton = shouldShowRemoveIcon(showUploadList);
  const rootClassName = buildRootClassName({
    dsSize, layout, disabled, hasFiles, showTrigger,
    validationStatus: resolvedValidationStatus, className,
  });
  const resolvedItemRender = itemRender ?? buildItemRender({ disabled, showRemoveButton, iconRender, listType });

  return (
    <ConfigProvider theme={UPLOAD_THEME}>
      <AntdUpload
        fileList={fileList}
        defaultFileList={defaultFileList}
        listType={listType}
        className={rootClassName}
        showUploadList={showUploadList !== false ? SHOW_UPLOAD_LIST_NO_ICONS : false}
        itemRender={resolvedItemRender}
        iconRender={buildIconRender(iconRender)}
        {...rest}
      >
        {showTrigger ? children || renderDefaultTrigger(disabled) : null}
      </AntdUpload>
    </ConfigProvider>
  );
}

Upload.displayName = "Upload";

export type { UploadProps, UploadSize, UploadLayout, UploadValidationStatus } from "../../types/components/Upload";
