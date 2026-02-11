import React from "react";
import { Avatar as AntdAvatar, ConfigProvider } from "antd";
import type { AvatarProps as AntdAvatarProps } from "antd";
import { designSystemColors, radius } from "../../theme";

export type AvatarSize = "small" | "regular";
export type AvatarRoundness = "round" | "roundrect";

export interface AvatarProps extends AntdAvatarProps {
  dsSize?: AvatarSize;
  roundness?: AvatarRoundness;
}

export const Avatar: React.FC<AvatarProps> = ({ dsSize = "regular", roundness = "round", style, src, alt, ...rest }) => {
  const sizeMap: Record<AvatarSize, number> = {
    small: 32,
    regular: 40,
  };

  const currentSize = sizeMap[dsSize];

  const customStyle: React.CSSProperties = {
    ...style,
    borderRadius: roundness === "round" ? "50%" : radius.xl,
    fontFamily: '"Inter", sans-serif',
    fontWeight: 700,
    backgroundColor: designSystemColors.neutral[200],
    color: designSystemColors.neutral[800],
    border: `1px solid ${designSystemColors.neutral[100]}`,
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    overflow: "hidden",
  };

  const resolvedSrc =
    typeof src === "string"
      ? (
        <img
          src={src}
          alt={alt}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            userSelect: "none",
            WebkitUserSelect: "none",
            pointerEvents: "none",
          }}
        />
      )
      : src;

  return (
    <ConfigProvider
      theme={{
        components: {
          Avatar: {
            containerSize: currentSize,
            containerSizeSM: 32,
            containerSizeLG: 40,
            textFontSize: dsSize === "small" ? 12 : 14,
            textFontSizeSM: 12,
            textFontSizeLG: 14,
          },
        },
        token: {
          fontFamily: '"Inter", sans-serif',
        },
      }}
    >
      <AntdAvatar size={currentSize} style={customStyle} src={resolvedSrc} alt={alt} {...rest} />
    </ConfigProvider>
  );
};

Avatar.displayName = "Avatar";

export const AvatarGroup = AntdAvatar.Group;
