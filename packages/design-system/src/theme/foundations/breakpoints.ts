export const breakpoints = {
  xxs: 320,
  xs: 430,
  s: 768,
  m: 1024,
  l: 1366,
  xl: 1920
} as const;

export type Breakpoints = typeof breakpoints;


