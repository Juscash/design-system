import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Title, Subtitle, Description, Primary, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";
import { Charts } from ".";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4098-12198&m=dev";

const meta: Meta = {
  title: "Components/Charts",
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Namespace de gráficos baseado em [Ant Design Charts](https://charts.ant.design/) (\`@ant-design/plots\`).

Sete wrappers de gráfico (\`Line\`, \`Column\`, \`Bar\`, \`Pie\`, \`Donut\`, \`Area\`, \`Radar\`) que apenas injetam a paleta Juscash via \`scale.color.range\` e repassam todas as demais props para o componente original.

Inclui também \`Charts.Tooltip\`, card visual independente do engine de gráfico, com 3 variantes definidas no Figma \`4098:12198\` (nós \`4098:12164\`, \`4098:12180\` e \`4098:12184\`).

### Paleta default
- \`chart.1\` — \`#f54a00\` (orange)
- \`chart.2\` — \`#009689\` (teal)
- \`chart.3\` — \`#104e64\` (dark teal)
- \`chart.4\` — \`#ffb900\` (yellow)
- \`chart.5\` — \`#fe9a00\` (orange darker)

Use a prop \`colors\` para sobrescrever a paleta de qualquer chart.

### Como usar

\`\`\`tsx
import { Charts } from "@juscash/design-system";

<Charts.Line
  data={[
    { month: "Jan", value: 30, series: "A" },
    { month: "Feb", value: 45, series: "A" },
  ]}
  xField="month"
  yField="value"
  colorField="series"
/>
\`\`\`
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

// Datasets compartilhados entre as stories — definidos em escopo de módulo
// para evitar recriação a cada render do Storybook.
const lineData = [
  { month: "Jan", value: 30, series: "A" },
  { month: "Feb", value: 45, series: "A" },
  { month: "Mar", value: 38, series: "A" },
  { month: "Apr", value: 52, series: "A" },
  { month: "May", value: 48, series: "A" },
  { month: "Jun", value: 65, series: "A" },
  { month: "Jan", value: 20, series: "B" },
  { month: "Feb", value: 32, series: "B" },
  { month: "Mar", value: 28, series: "B" },
  { month: "Apr", value: 41, series: "B" },
  { month: "May", value: 35, series: "B" },
  { month: "Jun", value: 50, series: "B" },
];

const columnData = [
  { month: "Jan", value: 147, series: "A" },
  { month: "Feb", value: 98, series: "A" },
  { month: "Mar", value: 136, series: "A" },
  { month: "Apr", value: 43, series: "A" },
  { month: "May", value: 48, series: "A" },
  { month: "Jun", value: 115, series: "A" },
  { month: "Jan", value: 68, series: "B" },
  { month: "Feb", value: 71, series: "B" },
  { month: "Mar", value: 84, series: "B" },
  { month: "Apr", value: 105, series: "B" },
  { month: "May", value: 122, series: "B" },
  { month: "Jun", value: 160, series: "B" },
];

const barData = [
  { browser: "Chrome", value: 60 },
  { browser: "Safari", value: 42 },
  { browser: "Firefox", value: 30 },
  { browser: "Edge", value: 22 },
  { browser: "Other", value: 16 },
];

const pieData = [
  { type: "Chrome", value: 60 },
  { type: "Safari", value: 42 },
  { type: "Firefox", value: 30 },
  { type: "Edge", value: 22 },
  { type: "Other", value: 16 },
];

const areaData = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 20 },
  { month: "Mar", value: 15 },
  { month: "Apr", value: 28 },
  { month: "May", value: 55 },
  { month: "Jun", value: 60 },
];

const radarData = [
  { category: "January", value: 40 },
  { category: "February", value: 60 },
  { category: "March", value: 50 },
  { category: "April", value: 70 },
  { category: "May", value: 45 },
  { category: "June", value: 55 },
];

const CHART_WIDTH = 480;
const CHART_HEIGHT = 280;

/** `Charts.Line` — gráfico de linha com 2 séries (Figma `4098:12045`). */
export const Line: Story = {
  render: () => (
    <Charts.Line
      data={lineData}
      xField="month"
      yField="value"
      colorField="series"
      width={CHART_WIDTH}
      height={CHART_HEIGHT}
    />
  ),
};

/** `Charts.Column` — barras verticais agrupadas (Figma `4098:12061`). */
export const Column: Story = {
  render: () => (
    <Charts.Column
      data={columnData}
      xField="month"
      yField="value"
      colorField="series"
      group
      width={CHART_WIDTH}
      height={CHART_HEIGHT}
    />
  ),
};

/** `Charts.Bar` — barras horizontais com 5 cores (Figma `4098:12099`). */
export const Bar: Story = {
  render: () => (
    <Charts.Bar
      data={barData}
      xField="browser"
      yField="value"
      colorField="browser"
      width={CHART_WIDTH}
      height={CHART_HEIGHT}
    />
  ),
};

/** `Charts.Pie` — gráfico de pizza com 5 fatias (Figma `4098:12112`). */
export const Pie: Story = {
  render: () => (
    <Charts.Pie
      data={pieData}
      angleField="value"
      colorField="type"
      width={CHART_WIDTH}
      height={CHART_HEIGHT}
    />
  ),
};

/** `Charts.Donut` — pizza com furo central, `innerRadius` default `0.6` (Figma `4098:12120`). */
export const Donut: Story = {
  render: () => (
    <Charts.Donut
      data={pieData}
      angleField="value"
      colorField="type"
      width={CHART_WIDTH}
      height={CHART_HEIGHT}
    />
  ),
};

/** `Charts.Area` — gráfico de área (Figma `4098:12271`). */
export const Area: Story = {
  render: () => (
    <Charts.Area
      data={areaData}
      xField="month"
      yField="value"
      width={CHART_WIDTH}
      height={CHART_HEIGHT}
    />
  ),
};

/** `Charts.Radar` — gráfico radar hexagonal (Figma `4098:12286`). */
export const Radar: Story = {
  render: () => (
    <Charts.Radar
      data={radarData}
      xField="category"
      yField="value"
      width={CHART_WIDTH}
      height={CHART_HEIGHT}
    />
  ),
};

/** `Charts.Tooltip` variant 1 — coluna com título + linhas indicadas por barra vertical. */
export const TooltipVariant1: Story = {
  name: "Tooltip Variant 1",
  render: () => (
    <Charts.Tooltip
      variant="1"
      title="February"
      items={[
        { label: "Visitors", value: 275, colorIndex: 1 },
        { label: "Returning", value: 132, colorIndex: 2 },
      ]}
    />
  ),
};

/** `Charts.Tooltip` variant 2 — linha com square colorido + label + value. */
export const TooltipVariant2: Story = {
  name: "Tooltip Variant 2",
  render: () => (
    <Charts.Tooltip
      variant="2"
      items={[{ label: "Visitors", value: 275, colorIndex: 1, indicator: "square" }]}
    />
  ),
};

/** `Charts.Tooltip` variant 3 — divider vertical à esquerda + stack title/label/value. */
export const TooltipVariant3: Story = {
  name: "Tooltip Variant 3",
  render: () => (
    <Charts.Tooltip
      variant="3"
      title="March"
      items={[{ label: "Desktop", value: 200, colorIndex: 1 }]}
    />
  ),
};
