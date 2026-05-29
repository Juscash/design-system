import type { ReactNode } from "react";
import type { ButtonProps as AntdButtonProps } from "antd";

export type ButtonType = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "neutral";

export type ButtonSize = "xs" | "s" | "m";

type CleanAntdProps = Omit<AntdButtonProps, "type" | "size" | "danger" | "variant" | "icon">;

/**
 * `icon` aceita um `ReactNode` (ex.: `<Search size={16} />`) ou o **nome** de
 * um ícone do `lucide-react` como string (ex.: `"Search"`). Quando string,
 * o tamanho é derivado automaticamente do `size` do botão (12px xs · 14px s ·
 * 16px m). O consumidor não precisa mais importar ícones manualmente.
 */
export type ButtonProps = CleanAntdProps & {
  type?: ButtonType;
  variant?: ButtonType;
  size?: ButtonSize;
  icon?: ReactNode | string;
};
