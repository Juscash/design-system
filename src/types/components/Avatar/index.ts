import type { AvatarProps as AntdAvatarProps } from "antd";

export type AvatarSize = "small" | "regular";
export type AvatarRoundness = "round" | "roundrect";

export interface AvatarProps extends AntdAvatarProps {
  dsSize?: AvatarSize;
  roundness?: AvatarRoundness;
}
