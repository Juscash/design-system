import React from "react";
import { Modal as AntdModal, ConfigProvider } from "antd";
import type { ModalProps as AntdModalProps } from "antd";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import { Button } from "../Button";
import type { ModalProps, ModalSize } from "../../types/components/Modal";
import "./index.module.css";

const MODAL_SIZE_S = 400;
const MODAL_SIZE_M = 640;
const MODAL_SIZE_L = 900;
const TITLE_FONT_SIZE = 20;

// O Antd 6 expÃµe `Modal.styles` como union complexa (objeto ou funÃ§Ã£o). Para
// o uso interno do componente bastam os slots semÃ¢nticos abaixo + `content`
// (suportado em runtime mas ausente do typing pÃºblico).
type ModalCustomStyles = {
  content?: React.CSSProperties;
  header?: React.CSSProperties;
  body?: React.CSSProperties;
  footer?: React.CSSProperties;
  mask?: React.CSSProperties;
  wrapper?: React.CSSProperties;
};

const SIZE_MAP: Record<ModalSize, number> = {
  s: MODAL_SIZE_S,
  m: MODAL_SIZE_M,
  l: MODAL_SIZE_L,
};

function getModalTokens(): Record<string, unknown> {
  return {
    contentBg: designSystemColors.neutral[50],
    headerBg: designSystemColors.neutral[50],
    footerBg: designSystemColors.neutral[50],
    borderRadiusLG: radius["3xl"],
    paddingLG: spacing[6],
    paddingMD: spacing[6],
    paddingContentHorizontalLG: spacing[6],
    titleFontSize: TITLE_FONT_SIZE,
    titleLineHeight: 1.2,
    titleColor: designSystemColors.neutral[800],
    closeBtnHoverBg: designSystemColors.neutral[100],
    closeBtnActiveBg: designSystemColors.neutral[200],
    colorBgMask: "rgba(0, 0, 0, 0.45)",
  };
}

interface DefaultFooterProps {
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onOk?: AntdModalProps["onOk"];
  onCancel?: AntdModalProps["onCancel"];
  confirmLoading?: boolean;
}

/**
 * ConstrÃ³i um rodapÃ© padrÃ£o usando o `<Button>` do design system em vez dos
 * botÃµes nativos do Antd. SÃ³ Ã© usado quando `footer` nÃ£o Ã© passado.
 */
function buildDefaultFooter(footerProps: DefaultFooterProps): React.ReactNode {
  const { okText = "OK", cancelText = "Cancelar", onOk, onCancel, confirmLoading } = footerProps;

  const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onCancel?.(event);
  };

  const handleOk: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onOk?.(event);
  };

  return (
    <div style={{ display: "flex", gap: spacing[2], justifyContent: "flex-end" }}>
      {cancelText && (
        <Button type="outline" onClick={handleCancel}>
          {cancelText}
        </Button>
      )}
      <Button type="primary" onClick={handleOk} loading={confirmLoading}>
        {okText}
      </Button>
    </div>
  );
}

function buildCustomStyles(safeStyles: ModalCustomStyles | undefined): ModalCustomStyles {
  return {
    ...safeStyles,
    content: {
      boxShadow: shadow.l,
      border: `1px solid ${designSystemColors.neutral[300]}`,
      borderRadius: radius["3xl"],
      ...(safeStyles?.content ?? {}),
    },
    header: {
      paddingBottom: 0,
      marginBottom: 0,
      ...(safeStyles?.header ?? {}),
    },
    body: {
      padding: 0,
      ...(safeStyles?.body ?? {}),
    },
    footer: {
      paddingTop: 0,
      marginTop: 0,
      ...(safeStyles?.footer ?? {}),
    },
    mask: {
      backgroundColor: "rgba(0, 0, 0, 0.45)",
      ...(safeStyles?.mask ?? {}),
    },
  };
}

/**
 * Modal do design system. Aceita `dsSize` (`s|m|l`) que define larguras
 * padrÃ£o; quando `width` Ã© informado, sobrescreve o `dsSize`. Quando `footer`
 * nÃ£o Ã© passado, gera um rodapÃ© com `<Button>` prÃ³prios da lib.
 */
export function Modal(props: ModalProps): React.ReactElement {
  const { dsSize = "m", width, styles, footer, okText, cancelText, onOk, confirmLoading, ...rest } = props;

  const resolvedWidth = width ?? SIZE_MAP[dsSize];
  const customStyles = buildCustomStyles(styles as ModalCustomStyles | undefined);

  // Se `footer` foi passado explicitamente (mesmo `null`), respeita o consumidor.
  const hasExplicitFooter = "footer" in props;
  const resolvedFooter = hasExplicitFooter
    ? footer
    : buildDefaultFooter({ okText, cancelText, onOk, onCancel: rest.onCancel, confirmLoading });

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
        styles={customStyles as AntdModalProps["styles"]}
        footer={resolvedFooter}
        className={`ds-modal ${rest.className || ""}`}
      />
    </ConfigProvider>
  );
}

Modal.displayName = "Modal";

export type { ModalProps, ModalSize } from "../../types/components/Modal";
