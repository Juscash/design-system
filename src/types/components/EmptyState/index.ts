import type { ReactNode, CSSProperties } from "react";
import type { ButtonProps } from "../Button";

export type EmptyStateProps = {
  title: ReactNode;
  description?: ReactNode;
  /**
   * Slot livre de ação — aceita qualquer `ReactNode` (botão, link, texto…),
   * renderizado como veio, sem tamanho/tipo forçado. Use para controle total
   * do CTA (ex.: um `Button` com o `size` desejado). Precede `actionLabel`.
   */
  action?: ReactNode;
  /**
   * Atalho de CTA: renderiza um `Button` `type="primary"` `size="s"`. Mantido
   * por compatibilidade — para controle total (inclusive `size`) use `action`.
   */
  actionLabel?: ReactNode;
  actionButtonProps?: Omit<ButtonProps, "children" | "size" | "type">;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
};
