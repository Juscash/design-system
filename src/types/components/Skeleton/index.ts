import type { FC, HTMLAttributes } from "react";

/**
 * Props do composto `Skeleton`. Renderiza um `<div role="status">` contendo
 * um avatar circular, uma linha e um bloco — replica o exemplo do dump
 * `figma/components/skeleton/design-context-4080-20627.md` (node 4080:20658:
 * avatar 48 + stack { line + object }, gap 12).
 */
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Rótulo acessível anunciado por leitores de tela enquanto o conteúdo
   * carrega. Default `"Carregando..."`.
   */
  "aria-label"?: string;
  /**
   * Liga ou desliga a animação de pulse. Quando `false`, o pulse é omitido
   * e a opacidade fica fixa em 1. Default `true`.
   */
  animated?: boolean;
}

/**
 * Props do subcomponente `Skeleton.Avatar`. Disco 48x48 com `radius.full`,
 * cor `neutral/100` — dump `figma/components/skeleton/...` node 4080:20600.
 */
export interface SkeletonAvatarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Liga ou desliga a animação de pulse. Default `true`.
   */
  animated?: boolean;
}

/**
 * Props do subcomponente `Skeleton.Line`. Barra horizontal 16px de altura,
 * `radius.xl`, cor `neutral/100` — dump node 4080:20604/4080:20605. Largura
 * acompanha o container pai.
 */
export interface SkeletonLineProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Liga ou desliga a animação de pulse. Default `true`.
   */
  animated?: boolean;
}

/**
 * Props do subcomponente `Skeleton.Object`. Bloco 132px de altura,
 * `radius.xl`, cor `neutral/100` — dump node 4080:20608/4080:20609. Largura
 * acompanha o container pai.
 */
export interface SkeletonObjectProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Liga ou desliga a animação de pulse. Default `true`.
   */
  animated?: boolean;
}

/**
 * Contrato do componente composto. `Skeleton` é em si um `FC` e expõe os
 * subcomponentes `Avatar`, `Line` e `Object` como atributos estáticos.
 */
export interface SkeletonComponent extends FC<SkeletonProps> {
  Avatar: FC<SkeletonAvatarProps>;
  Line: FC<SkeletonLineProps>;
  Object: FC<SkeletonObjectProps>;
}
