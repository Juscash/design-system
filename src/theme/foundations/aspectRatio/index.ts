/**
 * Proporções padronizadas para mídias e contêineres com aspect-ratio fixo.
 * Fonte: página `Fundamentos` do Figma.
 *
 * Valores no formato CSS `<width> / <height>` para uso direto na propriedade
 * `aspect-ratio` ou em estilos inline.
 */
export const aspectRatio = {
  square: "1 / 1",
  portrait: "3 / 4",
  landscape: "4 / 3",
  widescreen: "16 / 9",
  mobile: "9 / 16",
} as const;

export type AspectRatio = typeof aspectRatio;
export type AspectRatioToken = keyof typeof aspectRatio;
