import type { ReactNode } from "react";
import type { ButtonProps as AntdButtonProps } from "antd";
import type { TooltipProps } from "../Tooltip";

export type ButtonType = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "neutral";

export type ButtonSize = "xs" | "s" | "m";

type CleanAntdProps = Omit<AntdButtonProps, "type" | "size" | "danger" | "variant" | "icon">;

/**
 * `icon` aceita um `ReactNode` (ex.: `<Search size={16} />`) ou o **nome** de
 * um ícone do `lucide-react` como string (ex.: `"Search"`). Quando string,
 * o tamanho é derivado automaticamente do `size` do botão (12px xs · 14px s ·
 * 16px m). O consumidor não precisa mais importar ícones manualmente.
 *
 * `tooltip` envolve o botão em `<Tooltip>` com o título passado (ou o objeto
 * completo de `TooltipProps`). Opcional para botões com label; **obrigatório**
 * para botões icon-only (regra do Figma — quando não passado, cai em
 * `aria-label`; sem nenhum dos dois, emite warning em dev).
 */
export type ButtonProps = CleanAntdProps & {
  type?: ButtonType;
  variant?: ButtonType;
  size?: ButtonSize;
  icon?: ReactNode | string;
  tooltip?: string | TooltipProps;
};
