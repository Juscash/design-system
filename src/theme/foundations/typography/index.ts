/**
 * Escala tipográfica do design system. Fonte: página `Fundamentos > Tipografia
 * (4002:5004)` do Figma.
 *
 * Família única `Inter`, peso `400` (Regular) e letter-spacing `0` para toda
 * a escala. Line-height é exposto em pixels absolutos (`= size × 1.2`)
 * exatamente como o Figma exibe (ex.: heading/01 → `73.2px`).
 */
export const typography = {
  fontFamily: "Inter",
  fontWeight: 400,
  letterSpacing: 0,
  scale: {
    heading1: { px: 61, rem: "3.813rem", lineHeightPx: 73.2 },
    heading2: { px: 49, rem: "3.063rem", lineHeightPx: 58.8 },
    heading3: { px: 39, rem: "2.438rem", lineHeightPx: 46.8 },
    heading4: { px: 31, rem: "1.938rem", lineHeightPx: 37.2 },
    heading5: { px: 25, rem: "1.563rem", lineHeightPx: 30 },
    heading6: { px: 20, rem: "1.25rem", lineHeightPx: 24 },
    body1: { px: 16, rem: "1rem", lineHeightPx: 19.2 },
    body2: { px: 13, rem: "0.813rem", lineHeightPx: 15.6 },
    caption1: { px: 10, rem: "0.625rem", lineHeightPx: 12 },
  },
} as const;

export type TypographyTokens = typeof typography;
export type TypographyScale = keyof typeof typography.scale;
