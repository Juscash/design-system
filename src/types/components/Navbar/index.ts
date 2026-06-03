import type { HTMLAttributes, ReactNode } from "react";

/**
 * Remove props do `<header>` que o componente controla: `role` (fixo em
 * `"banner"`) e `children` (a API é via slots `left`/`right`).
 */
type CleanHeaderProps = Omit<HTMLAttributes<HTMLElement>, "role" | "children">;

/**
 * Props do `Navbar`. Barra superior do Figma (`4146:12875`): duas regiões —
 * esquerda (logo/botão de menu) e direita (ações). O conteúdo de cada região
 * é composição do consumidor (Button, Badge, AvatarMenu, logo). As variantes
 * do Figma (web/mobile, juscash/sij) são apenas conteúdo + padding.
 */
export type NavbarProps = CleanHeaderProps & {
  /**
   * Grupo esquerdo (logo/botão). Renderizado em `flex gap-8 items-center`.
   * Tipicamente: botão de menu (`panel-right`) + logo.
   */
  left?: ReactNode;
  /**
   * Grupo direito (ações). Renderizado em `flex gap-8 items-center`.
   * Tipicamente: botão primário + notificação + avatar menu.
   */
  right?: ReactNode;
};
