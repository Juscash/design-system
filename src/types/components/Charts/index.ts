import type {
  LineConfig,
  ColumnConfig,
  BarConfig,
  PieConfig,
  AreaConfig,
  RadarConfig,
} from "@ant-design/charts";

/**
 * Slot da paleta de gráfico (Figma 4098:12198). Os 5 valores são definidos em
 * `designSystemColors.chart[1..5]` (`#f54a00`, `#009689`, `#104e64`,
 * `#ffb900`, `#fe9a00`).
 */
export type ChartsColorIndex = 1 | 2 | 3 | 4 | 5;

/** Props do `Charts.Line` — wrapper do `<Line>` do `@ant-design/plots`. */
export type ChartsLineProps = LineConfig;

/** Props do `Charts.Column` — wrapper do `<Column>` (barras verticais). */
export type ChartsColumnProps = ColumnConfig;

/** Props do `Charts.Bar` — wrapper do `<Bar>` (barras horizontais). */
export type ChartsBarProps = BarConfig;

/** Props do `Charts.Pie` — wrapper do `<Pie>` (sem furo central). */
export type ChartsPieProps = PieConfig;

/**
 * Props do `Charts.Donut` — wrapper do `<Pie>` configurado com furo central
 * fixo, conforme variante Figma `4098:12120`.
 */
export type ChartsDonutProps = PieConfig;

/** Props do `Charts.Area` — wrapper do `<Area>` do `@ant-design/plots`. */
export type ChartsAreaProps = AreaConfig;

/** Props do `Charts.Radar` — wrapper do `<Radar>` do `@ant-design/plots`. */
export type ChartsRadarProps = RadarConfig;

/**
 * Variantes do tooltip visual independente, conforme as 3 versões descritas
 * em `figma/components/charts/design-context-4098-12198.md` (nós `4098:12164`,
 * `4098:12180`, `4098:12184`).
 */
export type ChartsTooltipVariant = "1" | "2" | "3";

/** Forma do indicador exibido à esquerda de cada item da variant 1 / 2. */
export type ChartsTooltipIndicator = "bar" | "square";

/** Item exibido dentro do tooltip — label + value + indicador colorido. */
export interface ChartsTooltipItem {
  /** Texto descritivo do item (ex.: `"Visitors"`). */
  label: string;
  /** Valor numérico ou textual associado (ex.: `275`). */
  value: string | number;
  /** Slot da paleta usado pelo indicador (default `1`). */
  colorIndex?: ChartsColorIndex;
  /** Forma do indicador. Default `"bar"`. */
  indicator?: ChartsTooltipIndicator;
}

/**
 * Props do `Charts.Tooltip` — card visual independente, exposto para
 * consumidores que queiram replicar o look-and-feel sem o engine do
 * `@ant-design/plots`.
 */
export interface ChartsTooltipProps {
  /** Qual das 3 variantes Figma renderizar. */
  variant: ChartsTooltipVariant;
  /** Título exibido no topo (variant 1) ou ao lado (variant 3). */
  title?: string;
  /** Lista de linhas (label + value + indicador) exibida no card. */
  items: ChartsTooltipItem[];
  /** ClassName aplicado ao container raiz. */
  className?: string;
  /** Style inline aplicado ao container raiz. */
  style?: React.CSSProperties;
}
