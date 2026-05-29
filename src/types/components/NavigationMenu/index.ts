import type { CSSProperties } from "react";

/**
 * Item de conteúdo exibido dentro de um painel (`NavigationMenuContent`).
 * Cada item representa uma entrada navegável renderizada lado a lado dentro
 * do painel, conforme dump `figma/components/navigation-menu/design-context-4080-15062.md`.
 */
export interface NavigationMenuContentItem {
  /** Identificador único do item dentro do painel. Usado como `key` no React. */
  key: string;
  /** Título principal do item (linha superior, peso 500). */
  title: string;
  /** Texto secundário opcional (linha inferior, peso 400, `text/soft`). */
  description?: string;
  /** URL destino. Quando presente o item é renderizado como `<a>`. */
  href?: string;
  /** Handler de clique. Acionado mesmo quando `href` está presente. */
  onClick?: () => void;
}

/**
 * Item do menu de navegação (trigger horizontal). Quando `content` está
 * presente o trigger abre um painel posicionado abaixo dele com os itens
 * informados.
 */
export interface NavigationMenuItem {
  /** Identificador único do trigger. Usado como `key` no React. */
  key: string;
  /** Texto exibido no botão. */
  label: string;
  /** Itens do painel. Sem `content` o trigger não abre painel ao clicar. */
  content?: NavigationMenuContentItem[];
}

/**
 * Props do componente `NavigationMenu`. Renderiza uma linha horizontal de
 * triggers; cada trigger pode opcionalmente abrir um painel rico abaixo.
 */
export interface NavigationMenuProps {
  /** Lista de triggers. Ordem visual da esquerda para a direita. */
  items: NavigationMenuItem[];
  /** Classe externa concatenada ao container `<nav>`. */
  className?: string;
  /** Estilos inline aplicados ao container `<nav>`. */
  style?: CSSProperties;
  /** Rótulo acessível para o `<nav role="navigation">`. */
  "aria-label"?: string;
}
