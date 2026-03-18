import React from "react";
import { Avatar as AntdAvatar, ConfigProvider } from "antd";
import type { AvatarProps as AntdAvatarProps } from "antd";
import { ChevronDown, ChevronUp } from "lucide-react";
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

  const fontSizeMap: Record<AvatarSize, number> = {
    small: 12,
    regular: 14,
  };

  const customStyle: React.CSSProperties = {
    ...style,
    borderRadius: roundness === "round" ? "50%" : radius.xl,
    fontFamily: '"Inter", sans-serif',
    fontSize: fontSizeMap[dsSize],
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

export type AvatarMenuState = "default" | "focus" | "active";

export interface AvatarMenuProps {
  state?: AvatarMenuState;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const AvatarMenu: React.FC<AvatarMenuProps> = ({ state = "default", children, style, className }) => {
  const isFocus = state === "focus";
  const isActive = state === "active";

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        cursor: "pointer",
        boxShadow: isFocus ? `0 0 0 3px ${designSystemColors.neutral[300]}` : undefined,
        borderRadius: 999,
        ...style,
      }}
    >
      <Avatar dsSize="small" roundness="round">
        {children ?? "CN"}
      </Avatar>
      {isActive ? (
        <ChevronUp size={16} color={designSystemColors.neutral[800]} />
      ) : (
        <ChevronDown size={16} color={designSystemColors.neutral[800]} />
      )}
    </div>
  );
};

AvatarMenu.displayName = "AvatarMenu";
