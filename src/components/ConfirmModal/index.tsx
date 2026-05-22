import React from "react";
import { Modal as AntdModal, ConfigProvider } from "antd";
import type { ModalProps as AntdModalProps } from "antd";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import { Button } from "../Button";
import type { ConfirmModalProps, ConfirmType } from "../../types/components/ConfirmModal";
import "./index.module.css";

const CONFIRM_MODAL_WIDTH = 480;
const TITLE_FONT_SIZE = 20;
const DESCRIPTION_FONT_SIZE = 16;
const CONTENT_GAP = 16;
const COLOR_MASK = "rgba(0, 0, 0, 0.45)";

// O Antd 6 expõe `Modal.styles` como union complexa (objeto ou função). Para
// o uso interno do componente bastam os slots semânticos abaixo + `content`
// (suportado em runtime mas ausente do typing público).
type ModalCustomStyles = {
  content?: React.CSSProperties;
  header?: React.CSSProperties;
  body?: React.CSSProperties;
  footer?: React.CSSProperties;
  mask?: React.CSSProperties;
  wrapper?: React.CSSProperties;
};

function getConfirmModalTokens(): Record<string, unknown> {
  return {
    contentBg: designSystemColors.neutral[50],
    borderRadiusLG: radius["3xl"],
    paddingLG: spacing[6],
    paddingMD: spacing[4],
  };
}

function getConfirmButtonType(type: ConfirmType): "primary" | "destructive" {
  if (type === "danger") return "destructive";
  return "primary";
}

const customStyles: ModalCustomStyles = {
  content: {
    boxShadow: shadow.l,
    border: `1px solid ${designSystemColors.neutral[300]}`,
    borderRadius: radius["3xl"],
    padding: spacing[6],
  },
  mask: { backgroundColor: COLOR_MASK },
  header: { marginBottom: 0, padding: 0 },
  body: { padding: 0 },
  footer: { padding: 0, marginTop: 0 },
};

const titleStyle: React.CSSProperties = {
  fontSize: TITLE_FONT_SIZE,
  fontWeight: 400,
  color: designSystemColors.neutral[800],
  lineHeight: 1.2,
};

const descriptionStyle: React.CSSProperties = {
  margin: 0,
  fontSize: DESCRIPTION_FONT_SIZE,
  fontWeight: 400,
  color: designSystemColors.neutral[500],
  lineHeight: 1.2,
};

interface FooterProps {
  type: ConfirmType;
  confirmText: string;
  cancelText?: string;
  confirmLoading?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

function ConfirmModalFooter({
  type,
  confirmText,
  cancelText,
  confirmLoading,
  onConfirm,
  onCancel,
}: FooterProps): React.ReactElement {
  return (
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
        type={getConfirmButtonType(type)}
        onClick={onConfirm}
        loading={confirmLoading}
        style={!cancelText ? { width: "100%" } : undefined}
        variant={type === "secondary" ? "secondary" : undefined}
      >
        {confirmText}
      </Button>
    </div>
  );
}

ConfirmModalFooter.displayName = "ConfirmModalFooter";

/**
 * Modal de confirmação do design system. Renderiza título, descrição opcional
 * e dois botões (cancelar opcional + confirmar). Cor do botão de confirmação
 * segue o `type` (verde para `info`, vermelho para `danger`, azul para
 * `secondary`).
 */
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
        styles={customStyles as AntdModalProps["styles"]}
        width={CONFIRM_MODAL_WIDTH}
        centered
        onCancel={onCancel}
        className="ds-confirm-modal"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: CONTENT_GAP }}>
          <span style={titleStyle}>{title}</span>
          {description && <p style={descriptionStyle}>{description}</p>}
          {children}
          <ConfirmModalFooter
            type={type}
            confirmText={confirmText}
            cancelText={cancelText}
            confirmLoading={confirmLoading}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        </div>
      </AntdModal>
    </ConfigProvider>
  );
}

ConfirmModal.displayName = "ConfirmModal";

export type { ConfirmModalProps, ConfirmType } from "../../types/components/ConfirmModal";
