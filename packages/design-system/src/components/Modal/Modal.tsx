import React from "react";
import { Modal as AntdModal, ConfigProvider } from "antd";
import type { ModalProps as AntdModalProps } from "antd";
import { designSystemColors, radius, shadow } from "../../theme";
import { Button } from "../Button";

type ModalSize = "s" | "m" | "l";

type CleanAntdProps = {
  [K in keyof AntdModalProps as K extends "width" ? never : K]: AntdModalProps[K];
};

export type ModalProps = CleanAntdProps & {
  /**
   * Tamanho do modal seguindo o Design System JusCash
   * - s: 400px
   * - m: 640px (padrão desktop scrollable)
   * - l: 900px (desktop large)
   * @default "m"
   */
  dsSize?: ModalSize;
  /**
   * Largura customizada do modal (sobrescreve dsSize)
   */
  width?: AntdModalProps["width"];
};

const SIZE_MAP: Record<ModalSize, number> = {
  s: 400,
  m: 640,
  l: 900,
};

function getModalTokens(): Record<string, unknown> {
  return {
    contentBg: designSystemColors.neutral[50],
    headerBg: designSystemColors.neutral[50],
    footerBg: designSystemColors.neutral[50],

    borderRadiusLG: radius["3xl"],

    paddingLG: 24,
    paddingMD: 24,
    paddingContentHorizontalLG: 24,

    titleFontSize: 20,
    titleLineHeight: 1.2,
    titleColor: designSystemColors.neutral[800],

    closeBtnHoverBg: designSystemColors.neutral[100],
    closeBtnActiveBg: designSystemColors.neutral[200],

    colorBgMask: "rgba(0, 0, 0, 0.45)",
  };
}

/**
 * Builds a default footer with our <Button> component instead of Ant Design's buttons.
 * Only used when footer is not explicitly provided.
 */
function buildDefaultFooter(props: {
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onOk?: AntdModalProps["onOk"];
  onCancel?: AntdModalProps["onCancel"];
  confirmLoading?: boolean;
}): React.ReactNode {
  const { okText = "OK", cancelText = "Cancelar", onOk, onCancel, confirmLoading } = props;

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
      {cancelText && (
        <Button type="outline" onClick={onCancel as any}>
          {cancelText}
        </Button>
      )}
      <Button type="primary" onClick={onOk as any} loading={confirmLoading}>
        {okText}
      </Button>
    </div>
  );
}

export function Modal(props: ModalProps): React.ReactElement {
  const {
    dsSize = "m",
    width,
    styles,
    footer,
    okText,
    cancelText,
    onOk,
    confirmLoading,
    ...rest
  } = props;

  const resolvedWidth = width ?? SIZE_MAP[dsSize];

  const safeStyles = styles as any;

  // If footer is explicitly set (even to null), respect it.
  // Otherwise, build our own footer with <Button> components.
  const hasExplicitFooter = "footer" in props;
  const resolvedFooter = hasExplicitFooter
    ? footer
    : buildDefaultFooter({
        okText,
        cancelText,
        onOk,
        onCancel: rest.onCancel,
        confirmLoading,
      });

  const customStyles: any = {
    ...safeStyles,
    content: {
      boxShadow: shadow.l,
      border: `1px solid ${designSystemColors.neutral[300]}`,
      borderRadius: radius["3xl"],
      ...safeStyles?.content,
    },
    header: {
      paddingBottom: 0,
      marginBottom: 0,
      ...safeStyles?.header,
    },
    body: {
      padding: 0,
      ...safeStyles?.body,
    },
    footer: {
      paddingTop: 0,
      marginTop: 0,
      ...safeStyles?.footer,
    },
    mask: {
      backgroundColor: "rgba(0, 0, 0, 0.45)",
      ...safeStyles?.mask,
    },
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: getModalTokens(),
        },
      }}
    >
      <AntdModal
        {...rest}
        width={resolvedWidth}
        styles={customStyles}
        footer={resolvedFooter}
        className={`ds-modal ${rest.className || ""}`}
      />
    </ConfigProvider>
  );
}

Modal.displayName = "Modal";
