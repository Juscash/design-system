import type { CSSProperties, ReactNode } from "react";

/**
 * Variantes visuais da `Sidebar` mapeadas a partir do dump
 * `figma/components/sidebar/sparse-metadata-4080-13321.md`:
 *
 * - `juscash` — variante padrão da plataforma JusCash (nodes 4080:14597 / 4080:14599).
 * - `sij` — variante adotada pelo produto SIJ (nodes 4806:11920 / 4806:12158).
 * - `prompt-tester` — variante específica do prompt tester interno
 *   (nodes 5303:9044 / 5303:9033).
 */
export type SidebarVariant = "juscash" | "sij" | "prompt-tester";

/**
 * Props do componente `Sidebar`. Renderiza um `<aside>` colapsável (240px ⇄ 72px)
 * conforme matriz de 6 variantes (3 visuais × 2 estados de expansão) descrita no
 * Figma `4080:14598`.
 */
export interface SidebarProps {
  /** Estado expandido (240px) ou colapsado (72px). Default `true`. */
  expanded?: boolean;
  /** Callback acionado pelo `SidebarToggleButton`. */
  onToggle?: () => void;
  /** Variante visual. Default `"juscash"`. */
  variant?: SidebarVariant;
  /** Conteúdo do menu: `SidebarItem`, `SidebarGroupLabel`, `SidebarToggleButton`. */
  children?: ReactNode;
  /** Classe externa concatenada ao container `<aside>`. */
  className?: string;
  /** Estilos inline aplicados ao container `<aside>`. */
  style?: CSSProperties;
  /** Rótulo acessível para o `<aside role="navigation">`. Default `"Menu lateral"`. */
  "aria-label"?: string;
}

/**
 * Props do componente `SidebarItem`. Equivale aos componentes do Figma
 * `Sidebar item expanded 1st level` (4080:10122) e `Sidebar item collapsed`
 * (4080:10111). Quando renderizado dentro de uma `Sidebar` colapsada, exibe
 * apenas o ícone (88x144 segundo dump). Submenu de 2º nível corresponde a
 * `Sidebar item expanded 2nd level` (4080:10277).
 */
export interface SidebarItemProps {
  /** Ícone — string Lucide (ex.: `"Home"`) ou `ReactNode` direto. */
  icon?: string | ReactNode;
  /** Texto do item exibido quando a sidebar está expandida. */
  label: string;
  /** Marca o item como ativo (variante `active`/`active focus` do dump). */
  active?: boolean;
  /** Quando há submenu, controla o estado aberto/fechado. */
  expanded?: boolean;
  /** Distintivo numérico ou textual (variante `badge` do dump). */
  badge?: number | string;
  /** Indica que o item possui submenu (variante `dropdown` do dump). */
  hasSubmenu?: boolean;
  /** Handler de clique no item. */
  onClick?: () => void;
  /** Submenu (lista de `SidebarItem` de 2º nível). */
  children?: ReactNode;
  /** URL destino. Quando presente o item é renderizado como `<a>`. */
  href?: string;
}

/**
 * Props do componente `SidebarGroupLabel`. Equivale ao Figma
 * `Sidebar group label` (4080:10290) com seus 4 tipos: `base`, `action`,
 * `expanded`, `collapsed`. Aqui exposto pelo par `expanded`/`collapsed`.
 */
export interface SidebarGroupLabelProps {
  /** Texto do rótulo de grupo. */
  label: string;
  /** Variante visual expandida (com seta `down`). */
  expanded?: boolean;
  /** Variante visual colapsada (com separador). */
  collapsed?: boolean;
}

/**
 * Props do componente `SidebarToggleButton`. Equivale ao Figma
 * `Sidebar mini button` (4080:10304) com 2 estados (default / hover&active).
 */
export interface SidebarToggleButtonProps {
  /** Estado atual da sidebar (`true` = expandida). Controla o `aria-expanded`. */
  expanded?: boolean;
  /** Handler de clique. Geralmente alterna o estado `expanded` na `Sidebar`. */
  onClick?: () => void;
  /** Rótulo acessível. Default depende de `expanded`. */
  "aria-label"?: string;
}
