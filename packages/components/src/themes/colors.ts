/**
 * Design System Colors
 * 
 * Cores do design system Juscash extraídas do Figma.
 * Use estas cores em seus projetos para manter consistência visual.
 * 
 * @example
 * ```tsx
 * import { designSystemColors } from '@design-system/components';
 * 
 * const MyComponent = () => (
 *   <div style={{ backgroundColor: designSystemColors.primary[500] }}>
 *     Conteúdo
 *   </div>
 * );
 * ```
 */

/**
 * Cores do Design System Juscash
 * 
 * Todas as cores organizadas por categoria para fácil acesso.
 */
export const designSystemColors = {
  /**
   * Cores Neutras
   */
  neutral: {
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
  },

  /**
   * Cores Primárias (Brand Primary)
   */
  primary: {
    50: '#aaffbe',
    100: '#8af3a3',
    200: '#6add89',
    300: '#4ac771',
    400: '#2cbd62',
    500: '#009c46', // Cor primária principal
    600: '#008633',
    700: '#007122',
    800: '#005c12',
    900: '#004706',
  },

  /**
   * Cores Secundárias (Brand Secondary)
   */
  secondary: {
    50: '#c7ddfa',
    100: '#a1c6f7',
    200: '#7baff4',
    300: '#5698f1',
    400: '#3081ee',
    500: '#136ce2', // Cor secundária principal
    600: '#105abc',
    700: '#0d4897',
    800: '#093671',
    900: '#072854',
  },

  /**
   * Cores de Feedback
   */
  feedback: {
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
  },
} as const;

// Cores auxiliares (usadas internamente, não exportadas)
const textColors = {
  dark: '#262626',
  soft: '#6d6d6e',
  light: '#fafafa',
  disabled: '#a3a3a3',
  links: {
    default: '#207ac3',
    hover: '#1d4f79',
  },
} as const;

const backgroundColors = {
  white: '#fafafa',
  grey: '#f5f5f5',
  opacities: '#17171740', // 25% opacity
} as const;

const borderColors = {
  regular: '#d4d4d4',
  disabled: '#e5e5e5',
} as const;

// colorSecondaryButton usado apenas internamente no tema
const colorSecondaryButton = {
  defaultBg: designSystemColors.secondary[700],
  defaultColor: designSystemColors.neutral[50],
  defaultHoverColor: designSystemColors.neutral[50],
  defaultHoverBg: designSystemColors.secondary[800],
  defaultActiveBg: designSystemColors.secondary[800],
  colorTextDisabled: designSystemColors.neutral[400],
  colorBgContainerDisabled: designSystemColors.neutral[200],
} as const;

/**
 * Type para Design System Colors
 */
export type DesignSystemColors = typeof designSystemColors;


