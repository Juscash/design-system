import React from "react";
import {
  Line as AntdLine,
  Column as AntdColumn,
  Bar as AntdBar,
  Pie as AntdPie,
  Area as AntdArea,
  Radar as AntdRadar,
} from "@ant-design/charts";
import { designSystemColors } from "../../theme";
import type {
  ChartsLineProps,
  ChartsColumnProps,
  ChartsBarProps,
  ChartsPieProps,
  ChartsDonutProps,
  ChartsAreaProps,
  ChartsRadarProps,
  ChartsTooltipProps,
  ChartsTooltipItem,
} from "../../types/components/Charts";
import "./index.module.css";

const INNER_RADIUS = 0.6;

const CLASS_TOOLTIP = "juscash-charts-tooltip";
const CLASS_VARIANT_1 = "juscash-charts-tooltip--v1";
const CLASS_VARIANT_2 = "juscash-charts-tooltip--v2";
const CLASS_VARIANT_3 = "juscash-charts-tooltip--v3";
const CLASS_TITLE = "juscash-charts-tooltip__title";
const CLASS_ROWS = "juscash-charts-tooltip__rows";
const CLASS_ROW = "juscash-charts-tooltip__row";
const CLASS_BAR = "juscash-charts-tooltip__bar";
const CLASS_SQUARE = "juscash-charts-tooltip__square";
const CLASS_DIVIDER = "juscash-charts-tooltip__divider";
const CLASS_STACK = "juscash-charts-tooltip__stack";
const CLASS_LABEL = "juscash-charts-tooltip__label";
const CLASS_VALUE = "juscash-charts-tooltip__value";

const PALETTE: readonly string[] = [
  designSystemColors.chart[1],
  designSystemColors.chart[2],
  designSystemColors.chart[3],
  designSystemColors.chart[4],
  designSystemColors.chart[5],
];

/** Resolve o hex do indicador a partir do slot `colorIndex` (default 1). */
function resolveIndicatorColor(item: ChartsTooltipItem): string {
  const index = item.colorIndex ?? 1;
  return designSystemColors.chart[index];
}

/**
 * `Charts.Line` — gráfico de linha. Wrapper do `<Line>` do
 * `@ant-design/plots` (Figma `4098:12045`). Injeta a paleta
 * `designSystemColors.chart[1..5]` como `scale.color.range`.
 */
function Line({ scale, ...rest }: ChartsLineProps): React.ReactElement {
  return <AntdLine scale={{ ...scale, color: { range: PALETTE, ...scale?.color } }} {...rest} />;
}
Line.displayName = "Charts.Line";

/**
 * `Charts.Column` — barras verticais. Wrapper do `<Column>` do
 * `@ant-design/plots` (Figma `4098:12061`).
 */
function Column({ scale, ...rest }: ChartsColumnProps): React.ReactElement {
  return <AntdColumn scale={{ ...scale, color: { range: PALETTE, ...scale?.color } }} {...rest} />;
}
Column.displayName = "Charts.Column";

/**
 * `Charts.Bar` — barras horizontais. Wrapper do `<Bar>` do
 * `@ant-design/plots` (Figma `4098:12099`).
 */
function Bar({ scale, ...rest }: ChartsBarProps): React.ReactElement {
  return <AntdBar scale={{ ...scale, color: { range: PALETTE, ...scale?.color } }} {...rest} />;
}
Bar.displayName = "Charts.Bar";

/**
 * `Charts.Pie` — gráfico de pizza. Wrapper do `<Pie>` do
 * `@ant-design/plots` (Figma `4098:12112`).
 */
function Pie({ scale, ...rest }: ChartsPieProps): React.ReactElement {
  return <AntdPie scale={{ ...scale, color: { range: PALETTE, ...scale?.color } }} {...rest} />;
}
Pie.displayName = "Charts.Pie";

/**
 * `Charts.Donut` — pizza com furo central (Figma `4098:12120`).
 * Wrapper do `<Pie>` com `innerRadius` fixo equivalente ao "furo central"
 * descrito no dump.
 */
function Donut({ scale, ...rest }: ChartsDonutProps): React.ReactElement {
  return (
    <AntdPie
      innerRadius={INNER_RADIUS}
      scale={{ ...scale, color: { range: PALETTE, ...scale?.color } }}
      {...rest}
    />
  );
}
Donut.displayName = "Charts.Donut";

/**
 * `Charts.Area` — gráfico de área. Wrapper do `<Area>` do
 * `@ant-design/plots` (Figma `4098:12271`).
 */
function Area({ scale, ...rest }: ChartsAreaProps): React.ReactElement {
  return <AntdArea scale={{ ...scale, color: { range: PALETTE, ...scale?.color } }} {...rest} />;
}
Area.displayName = "Charts.Area";

/**
 * `Charts.Radar` — gráfico radar. Wrapper do `<Radar>` do
 * `@ant-design/plots` (Figma `4098:12286`).
 */
function Radar({ scale, ...rest }: ChartsRadarProps): React.ReactElement {
  return <AntdRadar scale={{ ...scale, color: { range: PALETTE, ...scale?.color } }} {...rest} />;
}
Radar.displayName = "Charts.Radar";

/** Renderiza a variant 1 — coluna com título + linhas indicadas por barra vertical. */
function TooltipVariant1({ title, items }: ChartsTooltipProps): React.ReactElement {
  return (
    <>
      {title ? <p className={CLASS_TITLE}>{title}</p> : null}
      <div className={CLASS_ROWS}>
        {items.map((item, index) => (
          <div key={`${item.label}-${index}`} className={CLASS_ROW}>
            <span className={CLASS_BAR} style={{ backgroundColor: resolveIndicatorColor(item) }} />
            <span className={CLASS_LABEL}>{item.label}</span>
            <span className={CLASS_VALUE}>{item.value}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/** Renderiza a variant 2 — linha com square colorido + label + value. */
function TooltipVariant2({ items }: ChartsTooltipProps): React.ReactElement {
  const first = items[0];
  if (!first) return <></>;
  return (
    <>
      <span className={CLASS_SQUARE} style={{ backgroundColor: resolveIndicatorColor(first) }} />
      <span className={CLASS_LABEL}>{first.label}</span>
      <span className={CLASS_VALUE}>{first.value}</span>
    </>
  );
}

/** Renderiza a variant 3 — divider vertical à esquerda + stack title/label/value. */
function TooltipVariant3({ title, items }: ChartsTooltipProps): React.ReactElement {
  const first = items[0];
  if (!first) return <></>;
  return (
    <>
      <span className={CLASS_DIVIDER} style={{ backgroundColor: resolveIndicatorColor(first) }} />
      <div className={CLASS_STACK}>
        {title ? <p className={CLASS_TITLE}>{title}</p> : null}
        <span className={CLASS_LABEL}>{first.label}</span>
        <span className={CLASS_VALUE}>{first.value}</span>
      </div>
    </>
  );
}

const VARIANT_CLASS: Record<ChartsTooltipProps["variant"], string> = {
  "1": CLASS_VARIANT_1,
  "2": CLASS_VARIANT_2,
  "3": CLASS_VARIANT_3,
};

/** Seleciona o sub-renderer correto sem aninhar ternários. */
function renderTooltipBody(props: ChartsTooltipProps): React.ReactElement {
  if (props.variant === "1") return <TooltipVariant1 {...props} />;
  if (props.variant === "2") return <TooltipVariant2 {...props} />;
  return <TooltipVariant3 {...props} />;
}

/**
 * `Charts.Tooltip` — card visual independente das 3 variantes descritas em
 * `figma/components/charts/design-context-4098-12198.md` (`4098:12164`,
 * `4098:12180`, `4098:12184`). Não é integrado automaticamente nos charts;
 * é exposto para consumers que queiram replicar o look-and-feel manualmente.
 */
function Tooltip({ variant, title, items, className, style }: ChartsTooltipProps): React.ReactElement {
  const wrapperClass = [CLASS_TOOLTIP, VARIANT_CLASS[variant], className].filter(Boolean).join(" ");
  return (
    <div className={wrapperClass} style={style} role="tooltip">
      {renderTooltipBody({ variant, title, items, className, style })}
    </div>
  );
}
Tooltip.displayName = "Charts.Tooltip";

/**
 * Namespace `Charts` — agrupa os 7 wrappers de gráficos e o `Tooltip` visual,
 * todos baseados em `@ant-design/plots` (parte do `@ant-design/charts`).
 *
 * Cada wrapper apenas injeta a paleta `designSystemColors.chart[1..5]` como
 * `scale.color.range` e repassa o restante das props para o componente do
 * Antd Plots.
 */
export const Charts = {
  Line,
  Column,
  Bar,
  Pie,
  Donut,
  Area,
  Radar,
  Tooltip,
} as const;

export type {
  ChartsLineProps,
  ChartsColumnProps,
  ChartsBarProps,
  ChartsPieProps,
  ChartsDonutProps,
  ChartsAreaProps,
  ChartsRadarProps,
  ChartsTooltipProps,
  ChartsTooltipItem,
  ChartsTooltipVariant,
  ChartsTooltipIndicator,
  ChartsColorIndex,
} from "../../types/components/Charts";
