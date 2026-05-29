import type { CSSProperties, FC, ReactNode } from "react";

/**
 * Eixo `size` dos itens, group labels e search. Mapeia para `32px` (m) e
 * `36px` (l) de altura, conforme dump
 * `figma/components/menu-combobox/design-context-4115-13286.md` (linhas 13-14).
 */
export type MenuComboboxSize = "m" | "l";

/**
 * Eixo `type` dos itens. `destructive` aplica a cor `feedback.red` no
 * texto/ícone (dump linhas 22-28).
 */
export type MenuComboboxItemType = "default" | "destructive";

/**
 * Estado declarativo do item. Hover/active/focus ficam por conta do CSS
 * (interação real) — aqui declaramos apenas os estados que não emanam da
 * interação direta com mouse/teclado.
 */
export type MenuComboboxItemState = "default" | "selected" | "disabled" | "loading";

/**
 * Padding interno do container. O dump lista 4 variantes (`none`, `8`, `16`,
 * `24`) que correspondem a `0`, `spacing-2`, `spacing-4` e `spacing-6`.
 */
export type MenuComboboxSpacing = "none" | "8" | "16" | "24";

/**
 * Direção do indicador de overflow (chevron). `up` aponta para cima
 * (rolagem para o topo); `down` aponta para baixo (rolagem para o fim).
 */
export type MenuComboboxOverflowDirection = "up" | "down";

/**
 * Props do container `MenuCombobox`. Renderiza um wrapper com `role="menu"`
 * e padding controlado por `spacing`. Largura default 240px (dump linhas 8-11).
 */
export interface MenuComboboxProps {
  /** Padding interno. Padrão: `"8"`. */
  spacing?: MenuComboboxSpacing;
  /** Conteúdo do menu (itens, labels, search, etc.). */
  children: ReactNode;
  /** Classe externa concatenada ao wrapper. */
  className?: string;
  /** Estilos inline aplicados ao wrapper. */
  style?: CSSProperties;
  /** Rótulo acessível do menu (`aria-label` no elemento `role="menu"`). */
  "aria-label"?: string;
}

/**
 * Props do item de menu. Cobre os eixos `size`/`type`/`state` do dump
 * (linhas 13-28). Aceita `icon` e `rightIcon` como `ReactNode` ou nome de
 * ícone Lucide (string).
 */
export interface MenuComboboxItemProps {
  /** Tamanho. Padrão: `"m"`. */
  size?: MenuComboboxSize;
  /** Tipo visual. Padrão: `"default"`. */
  type?: MenuComboboxItemType;
  /** Estado declarativo. Padrão: `"default"`. */
  state?: MenuComboboxItemState;
  /** Ícone à esquerda. `ReactNode` ou nome de ícone Lucide. */
  icon?: ReactNode | string;
  /** Ícone à direita. `ReactNode` ou nome de ícone Lucide. */
  rightIcon?: ReactNode | string;
  /** Texto do item. Quando ausente, usa `children`. */
  label?: string;
  /** Conteúdo alternativo ao `label`. */
  children?: ReactNode;
  /** Handler de clique. */
  onClick?: () => void;
}

/**
 * Props do group label. Rótulo de seção dentro do menu (dump linhas 30-32).
 */
export interface MenuComboboxGroupLabelProps {
  /** Tamanho. Padrão: `"m"`. */
  size?: MenuComboboxSize;
  /** Quando `true`, aplica recuo horizontal (eixo `indented`). */
  indented?: boolean;
  /** Conteúdo do rótulo. */
  children: ReactNode;
}

/**
 * Props do input de busca embutido (dump linhas 34-36).
 */
export interface MenuComboboxSearchProps {
  /** Tamanho. Padrão: `"m"`. */
  size?: MenuComboboxSize;
  /** Valor controlado. */
  value?: string;
  /** Valor inicial não controlado. */
  defaultValue?: string;
  /** Handler de mudança (recebe o novo valor já como string). */
  onChange?: (value: string) => void;
  /** Texto exibido quando o input está vazio. */
  placeholder?: string;
}

/**
 * Props do indicador de overflow (dump linhas 38-40).
 */
export interface MenuComboboxOverflowProps {
  /** Direção do chevron. */
  direction: MenuComboboxOverflowDirection;
}

/**
 * Tipo composto: componente principal `MenuCombobox` mais sub-componentes
 * (`Item`, `GroupLabel`, `Search`, `Overflow`) anexados como propriedades
 * estáticas para composição estilo `<MenuCombobox.Item />`.
 */
export interface MenuComboboxComponent extends FC<MenuComboboxProps> {
  Item: FC<MenuComboboxItemProps>;
  GroupLabel: FC<MenuComboboxGroupLabelProps>;
  Search: FC<MenuComboboxSearchProps>;
  Overflow: FC<MenuComboboxOverflowProps>;
}
