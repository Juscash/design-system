import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { designSystemColors } from ".";
import { spacing } from "../spacing";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4001-2405&m=dev";

const meta: Meta = {
  title: "Fundamentos/Cores",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      description: {
        component:
          "Paleta completa do design system: 10 shades de **neutral**, 10 shades de **brand.primary**, 10 shades de **brand.secondary**, 3 shades por matiz de **feedback** (green, red, yellow, blue, orange), **opacidades** e **aliases semânticos** (text, border, background, button).",
      },
    },
  },
};

export default meta;

const Swatch = ({ name, value }: { name: string; value: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: spacing[3],
      padding: spacing[2],
      border: `1px solid ${designSystemColors.border.regular}`,
      borderRadius: 8,
      background: designSystemColors.background.white,
    }}
  >
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 6,
        background: value,
        border: `1px solid ${designSystemColors.border.regular}`,
        flexShrink: 0,
      }}
    />
    <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
      <code style={{ fontSize: 13, color: designSystemColors.text.dark, whiteSpace: "nowrap" }}>{name}</code>
      <code style={{ fontSize: 12, color: designSystemColors.text.soft, textTransform: "uppercase" }}>{value}</code>
    </div>
  </div>
);

const Group = ({ title, swatches }: { title: string; swatches: Array<{ name: string; value: string }> }) => (
  <section style={{ marginBottom: spacing[10] }}>
    <h2
      style={{
        fontSize: 25,
        fontWeight: 400,
        lineHeight: 1.2,
        margin: 0,
        marginBottom: spacing[4],
        color: designSystemColors.text.dark,
      }}
    >
      {title}
    </h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: spacing[3],
      }}
    >
      {swatches.map((s) => (
        <Swatch key={s.name} name={s.name} value={s.value} />
      ))}
    </div>
  </section>
);

const toSwatches = <T extends Record<string, string>>(prefix: string, obj: T) =>
  Object.entries(obj).map(([k, v]) => ({ name: `${prefix}.${k}`, value: v as string }));

const flatten = (prefix: string, obj: Record<string, Record<string, string>>) =>
  Object.entries(obj).flatMap(([groupKey, group]) =>
    Object.entries(group).map(([k, v]) => ({ name: `${prefix}.${groupKey}.${k}`, value: v as string })),
  );

export const Paleta: StoryObj = {
  name: "Paleta",
  render: () => (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        padding: spacing[8],
        background: designSystemColors.background.grey,
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Group title="Neutral" swatches={toSwatches("neutral", designSystemColors.neutral)} />
        <Group title="Brand · Primary" swatches={toSwatches("brand.primary", designSystemColors.brand.primary)} />
        <Group title="Brand · Secondary" swatches={toSwatches("brand.secondary", designSystemColors.brand.secondary)} />
        <Group title="Feedback" swatches={flatten("feedback", designSystemColors.feedback)} />
        <Group title="Opacidades" swatches={toSwatches("opacities", designSystemColors.opacities)} />
      </div>
    </div>
  ),
};

const semanticGroups: Array<{ title: string; entries: Array<{ name: string; value: string }> }> = [
  {
    title: "Text",
    entries: toSwatches("text", designSystemColors.text),
  },
  {
    title: "Border",
    entries: toSwatches("border", designSystemColors.border),
  },
  {
    title: "Background",
    entries: toSwatches("background", designSystemColors.background),
  },
  {
    title: "Button · Brand",
    entries: toSwatches("button.brand", designSystemColors.button.brand),
  },
  {
    title: "Button · Secondary",
    entries: toSwatches("button.secondary", designSystemColors.button.secondary),
  },
  {
    title: "Button · Neutral",
    entries: toSwatches("button.neutral", designSystemColors.button.neutral),
  },
  {
    title: "Button · Destructive",
    entries: toSwatches("button.destructive", designSystemColors.button.destructive),
  },
];

export const TokensSemanticos: StoryObj = {
  name: "Tokens semânticos",
  render: () => (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        padding: spacing[8],
        background: designSystemColors.background.grey,
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {semanticGroups.map((g) => (
          <Group key={g.title} title={g.title} swatches={g.entries} />
        ))}
      </div>
    </div>
  ),
};
