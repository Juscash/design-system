/**
 * Tokens de container do design system. Fonte: página `Fundamentos` do Figma.
 *
 * Define a área útil de conteúdo conforme o produto (system ou site) e o
 * breakpoint corrente. `paddingTop` e `paddingX` são fixos em todos os modos
 * não-fixed; quando o viewport ultrapassa `fixedFrom`, o container assume
 * `maxWidth` e o espaçamento lateral passa a ser calculado dinamicamente
 * pela centralização (margin auto).
 */
export const container = {
  system: {
    paddingTop: 24,
    paddingX: 24,
    maxWidth: 1800,
    fixedFrom: 1920,
  },
  site: {
    paddingTop: 24,
    paddingX: 24,
    maxWidth: 1086,
    fixedFrom: 1366,
  },
} as const;

export type ContainerTokens = typeof container;
export type ContainerProduct = keyof typeof container;
