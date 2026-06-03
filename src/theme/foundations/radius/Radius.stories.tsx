import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { radius } from ".";
import { designSystemColors } from "../colors";
import { spacing } from "../spacing";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4031-1960&m=dev";

const meta: Meta = {
  title: "Fundamentos/Bordas",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      description: {
        component:
          "Tokens de **border-radius**. A escala salta de `md` (4px) para `xl` (8px) — não existe `lg`. `full` (9999px) é usado para chips, avatares e elementos circulares.",
      },
    },
  },
};

export default meta;

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
          Bordas
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: spacing[4],
          }}
        >
          {Object.entries(radius).map(([key, value]) => (
            <div
              key={key}
              style={{
                background: designSystemColors.background.white,
                border: `1px solid ${designSystemColors.border.regular}`,
                borderRadius: 12,
                padding: spacing[5],
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: spacing[3],
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  background: designSystemColors.brand.secondary[100],
                  border: `1px solid ${designSystemColors.brand.secondary[300]}`,
                  borderRadius: value,
                }}
              />
              <div style={{ textAlign: "center" }}>
                <code style={{ display: "block", fontSize: 13, color: designSystemColors.text.dark }}>{`radius.${key}`}</code>
                <code style={{ display: "block", fontSize: 12, color: designSystemColors.text.soft, marginTop: 2 }}>
                  {`${value}${value === 9999 ? "px" : "px"}`}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
