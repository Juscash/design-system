import type { ReactNode } from "react";
import type { PopoverProps as AntdPopoverProps } from "antd";

export type PopoverProps = AntdPopoverProps & {
  /** Conteúdo do cabeçalho (slot superior) */
  header?: ReactNode;
  /** Conteúdo do rodapé (slot inferior) */
  footer?: ReactNode;
  /** Ícone customizado no header */
  icon?: ReactNode;
};
