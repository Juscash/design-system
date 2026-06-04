import type { CSSProperties, FC, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

/**
 * Eixo `size` de itens, group labels e search. Mapeia para `32px` (m) e
 * `36px` (l) de altura mínima, conforme Figma "Menu/combobox" (node 4115:13286).
 */
export type MenuComboboxSize = "m" | "l";

/**
 * Eixo `type` dos itens. `destructive` aplica a cor `feedback/red/900` no texto
 * (e fundo `feedback/red/50` em hover/active/selected), conforme Figma.
 */
export type MenuComboboxItemType = "default" | "destructive";

/**
 * Estado declarativo do item. `hover`, `active` e `focus` NÃO são props — emanam
 * da interação real (CSS `:hover`/`:active`/`:focus-visible`). Aqui ficam apenas
 * os estados que não derivam da interação direta.
 */
export type MenuComboboxItemState = "default" | "selected" | "disabled" | "loading";

/**
 * Padding interno do container. As 4 variantes do Figma (`none`, `8`, `16`,
 * `24`) correspondem a `0`, `8px`, `16px` e `24px`.
 */
export type MenuComboboxSpacing = "none" | "8" | "16" | "24";

/**
 * Direção do indicador de overflow (chevron). `up` aponta para o topo; `down`
 * para o fim da lista.
 */
export type MenuComboboxOverflowDirection = "up" | "down";

/**
 * Props do container `MenuCombobox`. Largura fixa de 240px, fundo `neutral/50`,
 * borda `border/regular`, raio `xl` (8px) e sombra `m`, conforme Figma.
 */
export interface MenuComboboxProps {
  /** Padding interno. Padrão: `"8"`. */
  spacing?: MenuComboboxSpacing;
  /** Conteúdo do menu (itens, labels, search, overflow, empty state, etc.). */
  children: ReactNode;
  /** Classe externa concatenada ao wrapper. */
  className?: string;
  /** Estilos inline aplicados ao wrapper. */
  style?: CSSProperties;
  /** Rótulo acessível do menu (`aria-label` no elemento `role="menu"`). */
  "aria-label"?: string;
  /** `tabIndex` do wrapper — torne a região focável por teclado quando rolável. */
  tabIndex?: number;
}

/**
 * Props do item de menu. Cobre os eixos `size`/`type`/`state` do Figma. Aceita
 * `icon` e `rightIcon` (`ReactNode` ou nome de ícone Lucide) e uma 2ª linha
 * opcional (`description`, caption 10px).
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
  /** Texto principal do item. */
  label?: string;
  /** Texto secundário opcional (2ª linha, caption 10px `text/soft`). */
  description?: string;
  /** Handler de clique. */
  onClick?: () => void;
}

/**
 * Props do group label. Rótulo de seção (equivalente a um `<optgroup>`). A fonte
 * e a cor dependem do `size`: m = caption 10px `text/soft`; l = body 13px
 * `text/dark`. `indented` aplica recuo de 40px à esquerda.
 */
export interface MenuComboboxGroupLabelProps {
  /** Tamanho. Padrão: `"m"`. */
  size?: MenuComboboxSize;
  /** Quando `true`, aplica recuo horizontal à esquerda (40px). */
  indented?: boolean;
  /** Conteúdo do rótulo. */
  children: ReactNode;
}

/**
 * Props do input de busca embutido. Borda inferior `border/regular`, sem mudança
 * de fundo no foco — apenas a cor do texto (placeholder `soft` → valor `dark`).
 */
export interface MenuComboboxSearchProps {
  /** Tamanho. Padrão: `"m"` (32px; input 13px). `"l"` = 36px, input 16px. */
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
 * Props do indicador de overflow (chevron). Altura 16px, fundo `neutral/50`.
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
  Item: ForwardRefExoticComponent<MenuComboboxItemProps & RefAttributes<HTMLDivElement>>;
  GroupLabel: FC<MenuComboboxGroupLabelProps>;
  Search: FC<MenuComboboxSearchProps>;
  Overflow: FC<MenuComboboxOverflowProps>;
}
