import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { typography } from ".";
import { designSystemColors } from "../colors";
import { spacing } from "../spacing";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4002-5004&m=dev";

const meta: Meta = {
  title: "Fundamentos/Tipografia",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      description: {
        component:
          "Família única **Inter**, peso `400` (Regular), line-height `1.2` unitless, letter-spacing `0`. Escala de **heading 1–6**, **body 1–2** e **caption 1**.",
      },
    },
  },
};

export default meta;

const descriptions: Record<string, string> = {
  heading1: "Títulos em destaques como heros",
  heading2: "",
  heading3: "",
  heading4: "",
  heading5: "",
  heading6: "Títulos em cards, telas",
  body1: "Textos longos em telas com mais espaço",
  body2: "Textos longos em telas com menos espaço, tabelas",
  caption1: "Descrições complementares",
};

const sampleText = "Aa Bb Cc 123";

export const Escala: StoryObj = {
  name: "Escala",
  render: () => (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        padding: spacing[8],
        background: designSystemColors.background.grey,
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1024, margin: "0 auto" }}>
        <header style={{ marginBottom: spacing[8] }}>
          <h1 style={{ fontSize: 49, lineHeight: 1.2, fontWeight: 400, margin: 0, color: designSystemColors.text.dark }}>
            Tipografia
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.2, color: designSystemColors.text.soft, marginTop: spacing[3] }}>
            Família <strong>{typography.fontFamily}</strong>, peso <strong>{typography.fontWeight}</strong>, line-height
            <strong> {typography.lineHeight}</strong>, letter-spacing <strong>{typography.letterSpacing}</strong>.
          </p>
        </header>

        <div
          style={{
            background: designSystemColors.background.white,
            border: `1px solid ${designSystemColors.border.regular}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
              color: designSystemColors.text.dark,
            }}
          >
            <thead>
              <tr style={{ background: designSystemColors.background.grey }}>
                <th style={{ padding: spacing[3], textAlign: "left", fontWeight: 400, color: designSystemColors.text.soft }}>
                  variant/token
                </th>
                <th style={{ padding: spacing[3], textAlign: "left", fontWeight: 400, color: designSystemColors.text.soft }}>
                  px
                </th>
                <th style={{ padding: spacing[3], textAlign: "left", fontWeight: 400, color: designSystemColors.text.soft }}>
                  rem
                </th>
                <th style={{ padding: spacing[3], textAlign: "left", fontWeight: 400, color: designSystemColors.text.soft }}>
                  line-height
                </th>
                <th style={{ padding: spacing[3], textAlign: "left", fontWeight: 400, color: designSystemColors.text.soft }}>
                  descrição
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(typography.scale).map(([key, value]) => (
                <tr key={key} style={{ borderTop: `1px solid ${designSystemColors.border.regular}` }}>
                  <td style={{ padding: spacing[3], verticalAlign: "middle" }}>
                    <div
                      style={{
                        fontSize: value.px,
                        lineHeight: typography.lineHeight,
                        fontWeight: typography.fontWeight,
                        color: designSystemColors.text.dark,
                      }}
                    >
                      {sampleText}
                    </div>
                    <code style={{ display: "block", marginTop: 4, fontSize: 12, color: designSystemColors.text.soft }}>
                      {key}
                    </code>
                  </td>
                  <td style={{ padding: spacing[3], verticalAlign: "middle" }}>
                    <code>{value.px}</code>
                  </td>
                  <td style={{ padding: spacing[3], verticalAlign: "middle" }}>
                    <code>{value.rem}</code>
                  </td>
                  <td style={{ padding: spacing[3], verticalAlign: "middle" }}>
                    <code>{typography.lineHeight}</code>
                  </td>
                  <td style={{ padding: spacing[3], verticalAlign: "middle", color: designSystemColors.text.soft }}>
                    {descriptions[key] ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),
};
