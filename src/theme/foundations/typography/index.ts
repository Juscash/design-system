/**
 * Escala tipográfica do design system. Fonte: página `Fundamentos` do Figma.
 *
 * Família única `Inter`, peso `400` (Regular), line-height `1.2` unitless e
 * letter-spacing `0` para toda a escala. Cada token tem `px` (valor absoluto)
 * e `rem` (relativo à raiz 16px) — consumidores podem escolher conforme o
 * contexto.
 */
export const typography = {
  fontFamily: "Inter",
  fontWeight: 400,
  lineHeight: 1.2,
  letterSpacing: 0,
  scale: {
    heading1: { px: 61, rem: "3.813rem" },
    heading2: { px: 49, rem: "3.063rem" },
    heading3: { px: 39, rem: "2.438rem" },
    heading4: { px: 31, rem: "1.938rem" },
    heading5: { px: 25, rem: "1.563rem" },
    heading6: { px: 20, rem: "1.25rem" },
    body1: { px: 16, rem: "1rem" },
    body2: { px: 13, rem: "0.813rem" },
    caption1: { px: 10, rem: "0.625rem" },
  },
} as const;

export type TypographyTokens = typeof typography;
export type TypographyScale = keyof typeof typography.scale;
