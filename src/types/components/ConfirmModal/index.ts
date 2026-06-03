import type { ReactNode } from "react";
import type { ModalProps as AntdModalProps } from "antd";

export type ConfirmType = "info" | "warning" | "danger" | "secondary";

export type ConfirmModalProps = Omit<AntdModalProps, "footer" | "closable" | "title"> & {
  /** Título do modal de confirmação */
  title: ReactNode;
  /** Descrição/mensagem do modal */
  description?: ReactNode;
  /**
   * Tipo de confirmação (afeta cor do botão principal):
   * - `info`: botão verde (primary)
   * - `warning`: botão amarelo/laranja (primary)
   * - `danger`: botão vermelho (destructive)
   * - `secondary`: botão azul secundário (primary)
   * @default "info"
   */
  type?: ConfirmType;
  /**
   * Texto do botão de confirmação
   * @default "Confirmar"
   */
  confirmText?: string;
  /** Texto do botão de cancelar (se omitido, não exibe botão cancelar) */
  cancelText?: string;
  /** Callback ao confirmar */
  onConfirm?: () => void;
  /** Callback ao cancelar */
  onCancel?: () => void;
  /** Loading state do botão de confirmação */
  confirmLoading?: boolean;
};
