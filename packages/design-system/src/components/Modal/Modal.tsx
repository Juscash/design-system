import React from "react";
import { Modal as AntdModal, ConfigProvider } from "antd";
import type { ModalProps as AntdModalProps } from "antd";
import { designSystemColors, radius, shadow } from "../../theme";

type ModalSize = "s" | "m" | "l";

type CleanAntdProps = {
  [K in keyof AntdModalProps as K extends "width" ? never : K]: AntdModalProps[K];
};

export type ModalProps = CleanAntdProps & {
  /**
   * Tamanho do modal seguindo o Design System JusCash
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
  m: 520,
  l: 720,
};

function getModalTokens(): Record<string, unknown> {
  return {
    contentBg: designSystemColors.neutral[50],
    headerBg: designSystemColors.neutral[50],
    footerBg: designSystemColors.neutral[50],

    borderRadiusLG: radius.xl,

    paddingLG: 24,
    paddingMD: 16,
    paddingContentHorizontalLG: 24,

    titleFontSize: 16,
    titleLineHeight: 1.5,
    titleColor: designSystemColors.neutral[900],

    closeBtnHoverBg: designSystemColors.neutral[100],
    closeBtnActiveBg: designSystemColors.neutral[200],

    colorBgMask: "rgba(0, 0, 0, 0.45)",
  };
}

export function Modal(props: ModalProps): React.ReactElement {
  const { dsSize = "m", width, styles, ...rest } = props;

  const resolvedWidth = width ?? SIZE_MAP[dsSize];

  const safeStyles = styles as any;

  const customStyles: any = {
    ...safeStyles,
    content: {
      boxShadow: shadow.xl,
      borderRadius: radius.xl,
      ...safeStyles?.content,
    },
    header: {
      borderBottom: `1px solid ${designSystemColors.neutral[200]}`,
      paddingBottom: 16,
      marginBottom: 0,
      ...safeStyles?.header,
    },
    body: {
      padding: 24,
      ...safeStyles?.body,
    },
    footer: {
      borderTop: `1px solid ${designSystemColors.neutral[200]}`,
      paddingTop: 16,
      marginTop: 0,
      ...safeStyles?.footer,
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
      <AntdModal {...rest} width={resolvedWidth} styles={customStyles} />
    </ConfigProvider>
  );
}

Modal.displayName = "Modal";
