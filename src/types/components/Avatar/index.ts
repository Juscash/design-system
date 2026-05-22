import type { ReactNode, CSSProperties } from "react";
import type { AvatarProps as AntdAvatarProps } from "antd";

export type AvatarSize = "small" | "regular";
export type AvatarRoundness = "round" | "roundrect";
export type AvatarMenuState = "default" | "focus" | "active";

export interface AvatarProps extends AntdAvatarProps {
  dsSize?: AvatarSize;
  roundness?: AvatarRoundness;
}

export interface AvatarMenuProps {
  state?: AvatarMenuState;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}
