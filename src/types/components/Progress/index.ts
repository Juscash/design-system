import type { ProgressProps as AntdProgressProps } from "antd";

/**
 * Props proibidas por divergirem do dump `figma/components/progress/` (`4069:4392`).
 *
 * O dump descreve apenas a variante linear horizontal (`342×8`, `radius.2xl`,
 * fill `brand.primary.500`, track `neutral.300`). Variantes `circle` /
 * `dashboard`, props de cor (`strokeColor` / `trailColor`), `steps`,
 * `status`, `success`, `showInfo`, `format`, `strokeLinecap`, `gapDegree` /
 * `gapPosition` e `size` ficam fora do escopo — qualquer um desses
 * descaracterizaria o componente em relação à fonte de verdade.
 */
type ForbiddenProgressProps =
  | "type"
  | "showInfo"
  | "format"
  | "steps"
  | "strokeColor"
  | "trailColor"
  | "railColor"
  | "strokeLinecap"
  | "status"
  | "success"
  | "gapDegree"
  | "gapPlacement"
  | "gapPosition"
  | "size"
  | "width"
  | "strokeWidth"
  | "percentPosition"
  | "children"
  | "rounding";

/**
 * Props do Progress do design system. Wrapper do `Progress` do Ant Design 6
 * aplicando a identidade visual JusCash. Mantém apenas o subset de props do
 * Antd que tem respaldo no dump `figma/components/progress/` (`4069:4392`):
 * a barra linear horizontal recebe um `percent` numérico e expõe
 * `className`, `style`, `id` e atributos ARIA para integração acessível.
 */
export type ProgressProps = Omit<AntdProgressProps, ForbiddenProgressProps>;
