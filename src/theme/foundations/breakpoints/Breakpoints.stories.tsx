import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { breakpoints } from ".";
import { designSystemColors } from "../colors";
import { spacing } from "../spacing";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4001-690&m=dev";

const meta: Meta = {
  title: "Fundamentos/Breakpoints",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      description: {
        component:
          "Faixas de viewport do design system. Cada token define a **largura mínima** (em px) a partir da qual a faixa se aplica.",
      },
    },
  },
};

export default meta;

const rows: Array<{ token: keyof typeof breakpoints; range: string; reference: string }> = [
  { token: "xxs", range: "320px até 429px", reference: "360×640px (smartphone vertical)" },
  { token: "xs", range: "430px até 767px", reference: "430×932px (smartphone grande)" },
  { token: "s", range: "768px até 1023px", reference: "768×1024px (tablet vertical)" },
  { token: "m", range: "1024px até 1365px", reference: "1024×768px (tablet horizontal)" },
  { token: "l", range: "1366px até 1919px", reference: "1366×768px (laptop)" },
  { token: "xl", range: "1920px +", reference: "1920×1080px (desktop)" },
];

export const Faixas: StoryObj = {
  name: "Faixas",
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
        <h1
          style={{
            fontSize: 49,
            lineHeight: 1.2,
            fontWeight: 400,
            margin: 0,
            marginBottom: spacing[8],
            color: designSystemColors.text.dark,
          }}
        >
          Breakpoints
        </h1>

        <div
          style={{
            background: designSystemColors.background.white,
            border: `1px solid ${designSystemColors.border.regular}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: designSystemColors.background.grey }}>
                <th style={{ padding: spacing[3], textAlign: "left", fontWeight: 400, color: designSystemColors.text.soft }}>
                  token
                </th>
                <th style={{ padding: spacing[3], textAlign: "left", fontWeight: 400, color: designSystemColors.text.soft }}>
                  min-width
                </th>
                <th style={{ padding: spacing[3], textAlign: "left", fontWeight: 400, color: designSystemColors.text.soft }}>
                  faixa
                </th>
                <th style={{ padding: spacing[3], textAlign: "left", fontWeight: 400, color: designSystemColors.text.soft }}>
                  tela de referência
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.token} style={{ borderTop: `1px solid ${designSystemColors.border.regular}` }}>
                  <td style={{ padding: spacing[3] }}>
                    <code style={{ color: designSystemColors.text.dark }}>{`breakpoints.${row.token}`}</code>
                  </td>
                  <td style={{ padding: spacing[3] }}>
                    <code style={{ color: designSystemColors.text.dark }}>{`${breakpoints[row.token]}px`}</code>
                  </td>
                  <td style={{ padding: spacing[3], color: designSystemColors.text.soft }}>{row.range}</td>
                  <td style={{ padding: spacing[3], color: designSystemColors.text.soft }}>{row.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),
};
