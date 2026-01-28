"use client";

import React from "react";
import { Avatar as AntdAvatar, ConfigProvider } from "antd";
import type { AvatarProps as AntdAvatarProps } from "antd";
import { designSystemColors, radius } from "../../theme";

// ============================================
// TYPES
// ============================================

export type AvatarSize = "small" | "regular";
export type AvatarRoundness = "round" | "roundrect";

export interface AvatarProps extends AntdAvatarProps {
  dsSize?: AvatarSize;
  roundness?: AvatarRoundness;
}

// ============================================
// COMPONENT
// ============================================

export const Avatar: React.FC<AvatarProps> = ({
  dsSize = "regular",
  roundness = "round",
  style,
  ...rest
}) => {
  // Map dsSize to AntD size or specific pixels
  const sizeMap: Record<AvatarSize, number> = {
    small: 32,
    regular: 40,
  };

  const currentSize = sizeMap[dsSize];

  // Map roundness to border radius
  const borderRadius = roundness === "round" ? "50%" : radius.md; // radius.md used for smaller roundness
  // Checking previous components, radius.xl is 8px. Let's assume roundrect is slightly rounded. Figma usually uses 8px (radius.xl) or 4px (radius.m).
  // Visual inspection of "roundrect" usually implies a squircle or standard rounded corners.
  // Let's use radius.xl (8px) for roundrect as a safe bet for "JusCash" style which seems rounded.

  const customStyle: React.CSSProperties = {
    ...style,
    borderRadius: roundness === "round" ? "50%" : radius.xl, // radius.xl for roundrect (8px)
    fontFamily: '"Inter", sans-serif',
    fontWeight: 700, // Bold for initials
    backgroundColor: designSystemColors.neutral[200], // Default background
    color: designSystemColors.neutral[800], // text color
    border: `1px solid ${designSystemColors.neutral[100]}`, // subtle border if needed/implied by "stroke-0" in design context
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Avatar: {
            containerSize: currentSize,
            containerSizeSM: 32,
            containerSizeLG: 40,
            textFontSize: dsSize === "small" ? 12 : 14, // Adjust font size based on avatar size
            textFontSizeSM: 12,
            textFontSizeLG: 14,
          },
        },
        token: {
          fontFamily: '"Inter", sans-serif',
        },
      }}
    >
      <AntdAvatar size={currentSize} style={customStyle} {...rest} />
    </ConfigProvider>
  );
};

Avatar.displayName = "Avatar";

// Re-export AntD Group if needed, or wrap it
export const AvatarGroup = AntdAvatar.Group;
