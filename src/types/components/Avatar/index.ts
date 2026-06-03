import type { ReactNode } from "react";
import type { AvatarProps as AntdAvatarProps } from "antd";

/** Tamanho do Avatar (igual ao Figma). `small` 32px · `regular` 40px. */
export type AvatarSize = "small" | "regular";

/** Forma do Avatar. `round` (círculo) ou `roundrect` (retângulo arredondado, radius `xl` = 8px) — conforme Figma. */
export type AvatarRoundness = "round" | "roundrect";

type CleanAntdAvatarProps = Omit<AntdAvatarProps, "icon">;

export interface AvatarProps extends CleanAntdAvatarProps {
  /**
   * Ícone exibido quando não há `children` nem `src`. Aceita `ReactNode` ou
   * string com nome de ícone Lucide (ex.: `"User"`). Quando string, o
   * tamanho é derivado do `dsSize` (16 small · 20 regular).
   */
  icon?: ReactNode | string;
  /** Tamanho discreto do design system. Default `regular`. */
  dsSize?: AvatarSize;
  /** Forma — círculo (`round`, default) ou retângulo arredondado (`roundrect`, radius xl = 8px). */
  roundness?: AvatarRoundness;
  /**
   * Quando `true`, renderiza o avatar como botão com `ChevronDown` ao lado,
   * conforme variante "avatar menu" do Figma. Tamanho do avatar fixado em
   * `small` quando essa flag está ativa. Default `false`.
   */
  avatarMenu?: boolean;
  /**
   * Estado controlado do menu (somente leitura para o consumer — útil junto
   * com `onMenuOpenChange`). Quando informado, o componente é controlled.
   */
  menuOpen?: boolean;
  /**
   * Hook callback executado quando o usuário clica/teclado no avatar-menu
   * — recebe o próximo estado (`true` para abrir, `false` para fechar).
   * Aplicável apenas quando `avatarMenu === true`.
   */
  onMenuOpenChange?: (open: boolean) => void;
}
