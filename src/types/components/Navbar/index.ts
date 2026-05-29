import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

/**
 * Remove props do `<header>` que o componente controla internamente
 * (papel ARIA, que é fixo em `"banner"`).
 */
type CleanHeaderProps = Omit<HTMLAttributes<HTMLElement>, "role">;

/**
 * Props do componente `Navbar`. API slot-based, conforme dump
 * `figma/components/navbar/`:
 *
 * - O dump descreve a barra superior horizontal com `logo/button` à
 *   esquerda (hamburger + logo) e `actions` à direita (botões de
 *   notificação, menu de avatar). Cada lado tem `gap 8` e o container
 *   raiz tem `justify-between`.
 * - Como o conteúdo varia por aplicação (web/mobile e juscash/sij no
 *   dump), expomos slots livres em vez de variantes proprietárias —
 *   o consumidor monta o lado esquerdo (`brand`/`leftSlot`) e o lado
 *   direito (`rightSlot`) com os componentes do design system.
 */
export type NavbarProps = CleanHeaderProps & {
  /**
   * Slot do logotipo/marca (canto esquerdo). Tipicamente uma imagem do
   * logo Juscash — corresponde ao `Logo` do dump.
   */
  brand?: ReactNode;
  /**
   * Slot livre adicional renderizado à esquerda, entre o `brand` e o
   * espaço central. Pode receber o botão de toggle do menu (hamburger)
   * ou breadcrumbs.
   */
  leftSlot?: ReactNode;
  /**
   * Slot livre renderizado à direita. Tipicamente recebe o botão de
   * notificações e o menu de avatar (`actions` do dump).
   */
  rightSlot?: ReactNode;
  /**
   * Conteúdo livre — alternativa aos slots quando o consumidor prefere
   * montar manualmente o layout interno do `<header>`.
   */
  children?: ReactNode;
  /** Classe extra aplicada ao `<header>` raiz. */
  className?: string;
  /** Estilo inline extra aplicado ao `<header>` raiz. */
  style?: CSSProperties;
  /**
   * Rótulo acessível do `<header role="banner">`. Default
   * `"Barra de navegação"`.
   */
  "aria-label"?: string;
};
