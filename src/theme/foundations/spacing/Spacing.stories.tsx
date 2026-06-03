import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { spacing } from ".";
import { designSystemColors } from "../colors";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4026-3185&m=dev";

const meta: Meta = {
  title: "Fundamentos/Espaçamento",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      description: {
        component:
          "Escala de espaçamento 4pt. O nome do token corresponde ao multiplicador de 4px — ex.: `spacing.6` = 4×6 = 24px. A escala pula 9, 11, 13, 15, 17–19, 21–23.",
      },
    },
  },
};

export default meta;

const ROW_HEIGHT = 56;

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
          Espaçamento
        </h1>

        <div
          style={{
            background: designSystemColors.background.white,
            border: `1px solid ${designSystemColors.border.regular}`,
            borderRadius: 12,
            padding: spacing[6],
            display: "flex",
            flexDirection: "column",
            gap: spacing[2],
          }}
        >
          {Object.entries(spacing).map(([key, px]) => (
            <div
              key={key}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 80px 1fr",
                alignItems: "center",
                gap: spacing[3],
                height: ROW_HEIGHT,
              }}
            >
              <code style={{ fontSize: 13, color: designSystemColors.text.dark }}>{`spacing.${key}`}</code>
              <code style={{ fontSize: 13, color: designSystemColors.text.soft }}>{`${px}px`}</code>
              <div
                style={{
                  height: 24,
                  width: px,
                  background: designSystemColors.brand.secondary[100],
                  border: `1px solid ${designSystemColors.brand.secondary[300]}`,
                  borderRadius: 4,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
