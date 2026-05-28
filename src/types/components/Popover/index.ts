import type { ReactNode } from "react";
import type { PopoverProps as AntdPopoverProps } from "antd";

/**
 * Eixo principal do Popover. Define qual conjunto de slots é renderizado
 * dentro do painel — conforme dump `figma/components/popover/design-context-4125-10702.md`.
 */
export type PopoverSlotNo = "1 slot" | "2 slots" | "3 slots";

/**
 * Props proprietárias do Popover do design system, sobrescrevendo `content`
 * e `title` do Ant Design (a composição interna vem de `headerSlot`,
 * `mainSlot` e `footerSlot`).
 */
type CleanAntdPopoverProps = Omit<AntdPopoverProps, "content" | "title">;

export type PopoverProps = CleanAntdPopoverProps & {
  /** Quantidade de slots renderizados dentro do painel. Padrão: `"1 slot"`. */
  slotNo?: PopoverSlotNo;
  /** Conteúdo principal (sempre exibido). */
  mainSlot?: ReactNode | null;
  /** Conteúdo do cabeçalho. Renderizado em `"2 slots"` e `"3 slots"`. */
  headerSlot?: ReactNode | null;
  /** Conteúdo do rodapé. Renderizado apenas em `"3 slots"`. */
  footerSlot?: ReactNode | null;
  /** Exibe a seta apontando para o trigger. Padrão: `false`. */
  showArrow?: boolean;
  /**
   * Rótulo acessível aplicado ao `role="dialog"` do painel. Atributo HTML
   * padrão repassado direto ao DOM. Quando omitido, usa o fallback
   * `"Popover"` para satisfazer a regra `aria-dialog-name` do axe.
   */
  "aria-label"?: string;
};
