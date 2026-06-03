import type { CSSProperties, ReactNode } from "react";

export type AvatarMenuState = "default" | "focus" | "active";

export interface AvatarMenuProps {
  state?: AvatarMenuState;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}
