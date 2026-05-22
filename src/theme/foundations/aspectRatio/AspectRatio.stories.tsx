import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { aspectRatio } from ".";
import { designSystemColors } from "../colors";
import { spacing } from "../spacing";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-20662&m=dev";

const meta: Meta = {
  title: "Fundamentos/Aspect Ratio",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      description: {
        component: "Proporções padronizadas para imagens, vídeos e contêineres com `aspect-ratio` fixo.",
      },
    },
  },
};

export default meta;

const tokenLabel: Record<keyof typeof aspectRatio, string> = {
  square: "1 : 1",
  portrait: "3 : 4",
  landscape: "4 : 3",
  widescreen: "16 : 9",
  mobile: "9 : 16",
};

export const Proporcoes: StoryObj = {
  name: "Proporções",
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
          Aspect Ratio
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: spacing[5],
            alignItems: "end",
          }}
        >
          {Object.entries(aspectRatio).map(([key, value]) => (
            <div
              key={key}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: spacing[2],
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: 200,
                  aspectRatio: value,
                  background: designSystemColors.brand.secondary[100],
                  border: `1px solid ${designSystemColors.brand.secondary[300]}`,
                  borderRadius: 8,
                }}
              />
              <code style={{ fontSize: 13, color: designSystemColors.text.dark }}>{`aspectRatio.${key}`}</code>
              <code style={{ fontSize: 12, color: designSystemColors.text.soft }}>
                {tokenLabel[key as keyof typeof aspectRatio]}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
