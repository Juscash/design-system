import type { CSSProperties, ReactNode } from "react";

/**
 * Props do componente `Sidebar`. Renderiza um `<aside role="navigation">`
 * colapsável (240px expandido ⇄ 72px colapsado) conforme o Figma
 * `sidebar` (4080:14598). O estado é controlado pelo consumidor via
 * `expanded` — não há botão de recolher embutido (o controle vive fora,
 * tipicamente na navbar).
 */
export interface SidebarProps {
  /** Estado expandido (240px) ou colapsado (72px). Default `true`. */
  expanded?: boolean;
  /** Conteúdo do menu: `SidebarItem` e `SidebarGroupLabel`. */
  children?: ReactNode;
  /** Classe externa concatenada ao container `<aside>`. */
  className?: string;
  /** Estilos inline aplicados ao container `<aside>`. */
  style?: CSSProperties;
  /** Rótulo acessível para o `<aside role="navigation">`. Default `"Menu lateral"`. */
  "aria-label"?: string;
}

/**
 * Props do componente `SidebarItem` (entrada de 1º nível). Equivale ao Figma
 * `sidebar item / expanded / 1st level` (4080:10122) e, quando dentro de uma
 * `Sidebar` colapsada, a `sidebar item / collapsed` (4080:10111) — exibindo
 * apenas o ícone (40x36).
 *
 * O indicador de submenu (chevron) aparece automaticamente quando `children`
 * é fornecido: `chevron-down` se `expanded`, `chevron-right` caso contrário.
 */
export interface SidebarItemProps {
  /** Ícone — string Lucide (ex.: `"House"`) ou `ReactNode` direto. */
  icon?: string | ReactNode;
  /** Texto do item exibido quando a sidebar está expandida. */
  label: string;
  /** Marca o item como ativo (variante `active` do Figma — fundo `neutral/100`). */
  active?: boolean;
  /** Distintivo numérico ou textual (variante `badge` do Figma). */
  badge?: number | string;
  /** Estado aberto/fechado do submenu (controla o chevron e a renderização dos filhos). */
  expanded?: boolean;
  /** Handler de clique no item. */
  onClick?: () => void;
  /** Submenu: lista de `SidebarSubItem` (2º nível). */
  children?: ReactNode;
  /** URL destino. Quando presente o item é renderizado como `<a>`. */
  href?: string;
}

/**
 * Props do componente `SidebarSubItem` (entrada de 2º nível). Equivale ao
 * Figma `sidebar Item / expanded / 2nd level` (4080:10277) — com a guia
 * vertical (`leaf`) à esquerda e os estados `default`/`active`.
 */
export interface SidebarSubItemProps {
  /** Ícone opcional — string Lucide ou `ReactNode`. Default sem ícone. */
  icon?: string | ReactNode;
  /** Texto do subitem. */
  label: string;
  /** Marca o subitem como ativo (fundo `neutral/100` no conteúdo). */
  active?: boolean;
  /** Handler de clique. */
  onClick?: () => void;
  /** URL destino. Quando presente o subitem é renderizado como `<a>`. */
  href?: string;
}

/**
 * Tipo do `SidebarGroupLabel`, espelhando a propriedade `type` do Figma
 * `sidebar group label` (4080:10290):
 *
 * - `base` — apenas o texto do rótulo.
 * - `action` — texto + botão `plus` à direita.
 * - `expanded` — texto + botão `chevron-down` (seção aberta).
 * - `collapsed` — texto + botão `chevron-right` (seção fechada).
 */
export type SidebarGroupLabelType = "base" | "action" | "expanded" | "collapsed";

/**
 * Props do componente `SidebarGroupLabel`. Rótulo de seção (texto `10px`
 * bold, cor `text/soft`). Em uma `Sidebar` colapsada o rótulo é omitido.
 */
export interface SidebarGroupLabelProps {
  /** Texto do rótulo de grupo. */
  label: string;
  /** Tipo conforme Figma. Default `"base"`. */
  type?: SidebarGroupLabelType;
  /** Handler do botão à direita (tipos `action`/`expanded`/`collapsed`). */
  onActionClick?: () => void;
}
