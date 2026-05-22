import React from "react";
import { Avatar as AntdAvatar, ConfigProvider } from "antd";
import { designSystemColors, radius } from "../../theme";
import type { AvatarProps, AvatarSize } from "../../types/components/Avatar";

const SIZE_MAP: Record<AvatarSize, number> = {
  small: 32,
  regular: 40,
};

const FONT_SIZE_MAP: Record<AvatarSize, number> = {
  small: 12,
  regular: 14,
};

/**
 * Avatar do design system: ou redondo ou retângulo arredondado, dois tamanhos
 * (`small` 32px, `regular` 40px). Quando `src` é string renderiza um `img`
 * interno com proteções de userSelect/dragabilidade.
 */
export const Avatar: React.FC<AvatarProps> = ({
  dsSize = "regular",
  roundness = "round",
  style,
  src,
  alt,
  size: _sizeIgnored,
  ...rest
}) => {
  const currentSize = SIZE_MAP[dsSize];

  const customStyle: React.CSSProperties = {
    ...style,
    borderRadius: roundness === "round" ? "50%" : radius.xl,
    fontFamily: '"Inter", sans-serif',
    fontSize: FONT_SIZE_MAP[dsSize],
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
    typeof src === "string" ? (
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
    ) : (
      src
    );

  return (
    <ConfigProvider
      theme={{
        components: {
          Avatar: {
            containerSize: currentSize,
            containerSizeSM: SIZE_MAP.small,
            containerSizeLG: SIZE_MAP.regular,
            textFontSize: FONT_SIZE_MAP[dsSize],
            textFontSizeSM: FONT_SIZE_MAP.small,
            textFontSizeLG: FONT_SIZE_MAP.regular,
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

export type { AvatarProps, AvatarSize, AvatarRoundness } from "../../types/components/Avatar";
