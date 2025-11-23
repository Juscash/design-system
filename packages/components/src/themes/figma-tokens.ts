/**
 * Tokens Extraídos do Figma
 * 
 * Este arquivo contém todos os valores extraídos diretamente do Figma.
 * Use como referência para mapear os tokens do design system.
 * 
 * Fonte: https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash
 */

/**
 * Cores do Brand (Primary)
 */
export const brandPrimary = {
  50: '#aaffbe',
  100: '#8af3a3',
  200: '#6add89',
  300: '#4ac771',
  400: '#2cbd62',
  500: '#009c46', // ← Cor primária principal
  600: '#008633',
  700: '#007122',
  800: '#005c12',
  900: '#004706',
} as const;

/**
 * Cores do Brand (Secondary)
 */
export const brandSecondary = {
  50: '#c7ddfa',
  100: '#a1c6f7',
  200: '#7baff4',
  300: '#5698f1',
  400: '#3081ee',
  500: '#136ce2', // ← Cor secundária principal
  600: '#105abc',
  700: '#0d4897',
  800: '#093671',
  900: '#072854',
} as const;

/**
 * Cores Neutras
 */
export const neutral = {
  0: '#fafafa',
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#6d6d6e',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
} as const;

/**
 * Cores de Feedback
 */
export const feedback = {
  green: {
    50: '#c9ffd6',
    500: '#1e7e34',
    900: '#065f1b',
  },
  red: {
    50: '#fef2ec',
    500: '#d2190b',
    900: '#9d231c',
  },
  yellow: {
    50: '#fffbe0',
    500: '#867400',
    900: '#675413',
  },
  blue: {
    50: '#ecf5fe',
    500: '#207ac3',
    900: '#1d4f79',
  },
  orange: {
    50: '#ffe9d2',
    500: '#b15600',
    900: '#8b4400',
  },
} as const;

/**
 * Cores de Texto
 */
export const textColors = {
  dark: '#262626',
  soft: '#6d6d6e',
  light: '#fafafa',
  disabled: '#a3a3a3',
  links: {
    default: '#207ac3',
    hover: '#1d4f79',
  },
} as const;

/**
 * Cores de Background
 */
export const backgroundColors = {
  white: '#fafafa',
  grey: '#f5f5f5',
  opacities: '#17171740', // 25% opacity
} as const;

/**
 * Cores de Border
 */
export const borderColors = {
  regular: '#d4d4d4',
  disabled: '#e5e5e5',
} as const;

/**
 * Cores de Botões
 */
export const buttonColors = {
  brand: {
    default: '#008633',
    hoverActive: '#005c12',
    disabled: '#d4d4d4',
  },
  secondary: {
    default: '#0d4897',
    hoverActive: '#093671',
    disabled: '#d4d4d4',
  },
  neutral: {
    default: '#e5e5e5',
    hoverActive: '#a3a3a3',
    disabled: '#d4d4d4',
  },
  destructive: {
    default: '#d2190b',
    hoverActive: '#9d231c',
    disabled: '#d4d4d4',
  },
} as const;

/**
 * Tipografia
 */
export const typography = {
  fontFamily: 'Inter',
  headings: {
    h1: {
      fontSize: 61,
      lineHeight: 1.2,
      fontWeight: 400,
    },
    h2: {
      fontSize: 49,
      lineHeight: 1.2,
      fontWeight: 400,
    },
    h3: {
      fontSize: 39,
      lineHeight: 1.2,
      fontWeight: 400,
    },
    h4: {
      fontSize: 31,
      lineHeight: 1.2,
      fontWeight: 400,
    },
    h5: {
      fontSize: 25,
      lineHeight: 1.2,
      fontWeight: 400,
    },
    h6: {
      fontSize: 20,
      lineHeight: 1.2,
      fontWeight: 400,
    },
  },
  body: {
    body01: {
      fontSize: 16,
      lineHeight: 1.2,
      fontWeight: 400,
    },
    body02: {
      fontSize: 13,
      lineHeight: 1.2,
      fontWeight: 400,
    },
  },
  caption: {
    caption01: {
      fontSize: 10,
      lineHeight: 1.2,
      fontWeight: 400,
    },
  },
} as const;

/**
 * Border Radius
 */
export const borderRadius = {
  md: 4,
  xl: 8,
  '2xl': 12,
  '3xl': 16,
  full: 9999,
} as const;

/**
 * Espaçamentos
 * Baseado na escala do Figma: 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 40px, 48px, 56px, 64px, 80px, 96px
 */
export const spacing = {
  0: 0,
  1: 4,   // xs
  2: 8,   // sm
  3: 12,  // md
  4: 16,  // lg
  5: 20,  // xl
  6: 24,  // xxl
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
} as const;

/**
 * Opacidades
 */
export const opacities = {
  dark: {
    '25%': '#17171740',
  },
  light: {
    '0.01%': '#ffffff00',
    '50%': '#ffffff80',
  },
} as const;

/**
 * Export de todos os tokens do Figma (uso interno)
 * 
 * Nota: Para uso em projetos externos, use designSystemColors de './colors'
 */
export const figmaTokens = {
  colors: {
    brand: {
      primary: brandPrimary,
      secondary: brandSecondary,
    },
    neutral,
    feedback,
    text: textColors,
    background: backgroundColors,
    border: borderColors,
    button: buttonColors,
  },
  typography,
  borderRadius,
  spacing,
  opacities,
} as const;

export type FigmaTokens = typeof figmaTokens;

