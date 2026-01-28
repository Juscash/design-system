"use client";

import React from "react";
import { Modal as AntdModal, ConfigProvider } from "antd";
import type { ModalProps as AntdModalProps } from "antd";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import { Button } from "../Button";

type ConfirmType = "info" | "warning" | "danger";

export type ConfirmModalProps = Omit<
  AntdModalProps,
  "footer" | "closable" | "title"
> & {
  /**
   * Título do modal de confirmação
   */
  title: React.ReactNode;
  /**
   * Descrição/mensagem do modal
   */
  description?: React.ReactNode;
  /**
   * Tipo de confirmação (afeta cor do botão principal)
   * @default "info"
   */
  type?: ConfirmType;
  /**
   * Texto do botão de confirmação
   * @default "Confirmar"
   */
  confirmText?: string;
  /**
   * Texto do botão de cancelar (se omitido, não exibe botão cancelar)
   */
  cancelText?: string;
  /**
   * Callback ao confirmar
   */
  onConfirm?: () => void;
  /**
   * Callback ao cancelar
   */
  onCancel?: () => void;
  /**
   * Loading state do botão de confirmação
   */
  confirmLoading?: boolean;
};

function getConfirmModalTokens(): Record<string, unknown> {
  return {
    contentBg: designSystemColors.neutral[50],

    borderRadiusLG: radius.xl,

    paddingLG: spacing[6],
    paddingMD: spacing[4],
  };
}

export function ConfirmModal(props: ConfirmModalProps): React.ReactElement {
  const {
    title,
    description,
    type = "info",
    confirmText = "Confirmar",
    cancelText,
    onConfirm,
    onCancel,
    confirmLoading,
    children,
    ...rest
  } = props;

  const getConfirmButtonType = (): "primary" | "destructive" => {
    if (type === "danger") return "destructive";
    return "primary";
  };

  const renderFooter = () => (
    <div
      style={{
        display: "flex",
        gap: spacing[2],
        justifyContent: cancelText ? "flex-end" : "stretch",
      }}
    >
      {cancelText && (
        <Button type="outlined" onClick={onCancel}>
          {cancelText}
        </Button>
      )}
      <Button
        type={getConfirmButtonType()}
        onClick={onConfirm}
        loading={confirmLoading}
        style={!cancelText ? { width: "100%" } : undefined}
      >
        {confirmText}
      </Button>
    </div>
  );

  const customStyles: any = {
    content: {
      boxShadow: shadow.l,
      borderRadius: radius.xl,
      padding: spacing[6],
    },
    header: {
      marginBottom: spacing[2],
      padding: 0,
    },
    body: {
      padding: 0,
      marginBottom: spacing[4],
    },
    footer: {
      padding: 0,
      marginTop: spacing[4],
    },
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: getConfirmModalTokens(),
        },
      }}
    >
      <AntdModal
        {...rest}
        title={
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: designSystemColors.neutral[900],
            }}
          >
            {title}
          </span>
        }
        closable={false}
        footer={renderFooter()}
        styles={customStyles}
        width={360}
        centered
        onCancel={onCancel}
      >
        {description && (
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: designSystemColors.neutral[600],
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        )}
        {children}
      </AntdModal>
    </ConfigProvider>
  );
}

ConfirmModal.displayName = "ConfirmModal";
