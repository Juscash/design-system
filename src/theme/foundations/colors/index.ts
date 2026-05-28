const neutral = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#e5e5e5",
  300: "#d4d4d4",
  400: "#a3a3a3",
  500: "#6d6d6e",
  600: "#525252",
  700: "#404040",
  800: "#262626",
  900: "#171717",
} as const;

const brand = {
  primary: {
    50: "#AAFFBE",
    100: "#8AF3A3",
    200: "#6ADD89",
    300: "#4AC771",
    400: "#2CBD62",
    500: "#009C46",
    600: "#008633",
    700: "#007122",
    800: "#005C12",
    900: "#004706",
  },
  secondary: {
    50: "#C7DDFA",
    100: "#A1C6F7",
    200: "#7BAFF4",
    300: "#5698F1",
    400: "#3081EE",
    500: "#136CE2",
    600: "#105ABC",
    700: "#0D4897",
    800: "#093671",
    900: "#072854",
  },
} as const;

const feedback = {
  green: {
    50: "#C9FFD6",
    500: "#1E7E34",
    900: "#065F1B",
  },
  red: {
    50: "#FEF2EC",
    500: "#D2190B",
    900: "#9D231C",
  },
  yellow: {
    50: "#FFFBE0",
    500: "#867400",
    900: "#675413",
  },
  blue: {
    50: "#ECF5FE",
    500: "#207AC3",
    900: "#1D4F79",
  },
  orange: {
    50: "#FFE9D2",
    500: "#B15600",
    900: "#8B4400",
  },
} as const;

const opacities = {
  dark25: "#17171740",
  light0_01: "#ffffff00",
  light50: "#ffffff80",
} as const;

const text = {
  dark: neutral[800],
  disabled: neutral[400],
  light: neutral[50],
  soft: neutral[500],
  linksDefault: feedback.blue[500],
  linksHover: feedback.blue[900],
} as const;

const border = {
  regular: neutral[300],
  disabled: neutral[200],
} as const;

const background = {
  white: neutral[50],
  grey: neutral[100],
  opacities: opacities.dark25,
} as const;

const button = {
  brand: {
    default: brand.primary[600],
    hoverActive: brand.primary[800],
    disabled: neutral[300],
  },
  secondary: {
    default: brand.secondary[700],
    hoverActive: brand.secondary[800],
    disabled: neutral[300],
  },
  neutral: {
    default: neutral[200],
    hoverActive: neutral[400],
    disabled: neutral[300],
  },
  destructive: {
    default: feedback.red[500],
    hoverActive: feedback.red[900],
    disabled: neutral[300],
  },
} as const;

// Paleta de gráficos (Figma 4098:12198 — `figma/components/charts/`).
// O dump variables-4098-12198.md descreve as 5 cores como literais hex
// (não tokenizadas no Figma). Elevadas a tokens aqui conforme instrução
// do orquestrador para o módulo Charts.
const chart = {
  1: "#f54a00",
  2: "#009689",
  3: "#104e64",
  4: "#ffb900",
  5: "#fe9a00",
} as const;

export const designSystemColors = {
  neutral,
  brand,
  feedback,
  opacities,
  text,
  border,
  background,
  button,
  chart,
} as const;

export type DesignSystemColors = typeof designSystemColors;
