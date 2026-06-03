import type { BreadcrumbProps as AntdBreadcrumbProps } from "antd";

type CleanAntdProps = {
  [K in keyof AntdBreadcrumbProps as K extends "separator" ? never : K]: AntdBreadcrumbProps[K];
};

/**
 * Limite de itens visíveis antes de colapsar.
 *
 * - `number` (default `5`): quando `items.length > max`, mostra o primeiro
 *   item + ellipsis (dropdown com itens do meio) + os 2 últimos.
 * - `false` ou `null`: desativa o limite — todos os itens sempre visíveis.
 */
export type BreadcrumbMax = number | null | false;

export type BreadcrumbProps = CleanAntdProps & {
  /** Limite de itens visíveis. Default `5`. */
  max?: BreadcrumbMax;
};
