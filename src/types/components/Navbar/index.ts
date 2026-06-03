import type { HTMLAttributes, ReactNode } from "react";

/**
 * Remove props do `<header>` controladas internamente: `role` (fixo em
 * `"banner"`) e `children` (o conteúdo é definido pelos slots `left`/`right`).
 */
type CleanHeaderProps = Omit<HTMLAttributes<HTMLElement>, "role" | "children">;

/**
 * Props do `Navbar`. Barra superior (Figma `4146:12875`) modelada como um
 * shell de layout TOTALMENTE composável: a barra (fundo, borda inferior,
 * padding responsivo e `flex / justify-between`) é a única coisa que o
 * componente fixa; todo o conteúdo é livre, via os slots `left` e `right`.
 *
 * Os itens do Figma (logo, pill "SIJ", "Enviar processo", notificação, avatar)
 * são apenas EXEMPLOS de composição — nenhum é fixo no componente. Componha
 * com os primitivos do DS (`Button`, `AvatarMenu`, etc.).
 *
 * O layout é um grid de 3 colunas (`1fr auto 1fr`): `left` à esquerda, `center`
 * no centro exato da barra e `right` à direita. Sem `center`, comporta-se como
 * uma barra `justify-between` (left/right nas extremidades).
 */
export type NavbarProps = CleanHeaderProps & {
  /** Grupo da esquerda (ex.: botão de menu + logo). Renderizado em `flex gap-8 items-center`. */
  left?: ReactNode;
  /** Grupo central, centralizado no eixo da barra (ex.: logo ou busca). `flex gap-8 items-center`. */
  center?: ReactNode;
  /** Grupo da direita (ex.: ações + notificação + avatar). Renderizado em `flex gap-8 items-center`. */
  right?: ReactNode;
};
