import React from "react";
import { Modal as AntdModal, ConfigProvider } from "antd";
import type { ModalProps as AntdModalProps } from "antd";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import { Button } from "../Button";

type ConfirmType = "info" | "warning" | "danger" | "secondary";

export type ConfirmModalProps = Omit<AntdModalProps, "footer" | "closable" | "title"> & {
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
   * - info: botão verde (primary)
   * - warning: botão amarelo/laranja (primary) — mesmo visual que info
   * - danger: botão vermelho (destructive)
   * - secondary: botão azul secundário (primary)
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
    borderRadiusLG: radius["3xl"],
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
        <Button type="outline" onClick={onCancel}>
          {cancelText}
        </Button>
      )}
      <Button
        type={getConfirmButtonType()}
        onClick={onConfirm}
        loading={confirmLoading}
        style={!cancelText ? { width: "100%" } : undefined}
        variant={type === "secondary" ? "secondary" : undefined}
      >
        {confirmText}
      </Button>
    </div>
  );

  const customStyles: any = {
    content: {
      boxShadow: shadow.l,
      border: `1px solid ${designSystemColors.neutral[300]}`,
      borderRadius: radius["3xl"],
      padding: spacing[6],
    },
    mask: {
      backgroundColor: "rgba(0, 0, 0, 0.45)",
    },
    header: {
      marginBottom: 0,
      padding: 0,
    },
    body: {
      padding: 0,
    },
    footer: {
      padding: 0,
      marginTop: 0,
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
        title={null}
        closable={false}
        footer={null}
        styles={customStyles}
        width={480}
        centered
        onCancel={onCancel}
        className="ds-confirm-modal"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: designSystemColors.neutral[800],
              lineHeight: 1.2,
            }}
          >
            {title}
          </span>
          {description && (
            <p
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 400,
                color: designSystemColors.neutral[500],
                lineHeight: 1.2,
              }}
            >
              {description}
            </p>
          )}
          {children}
          {renderFooter()}
        </div>
      </AntdModal>
    </ConfigProvider>
  );
}

ConfirmModal.displayName = "ConfirmModal";
