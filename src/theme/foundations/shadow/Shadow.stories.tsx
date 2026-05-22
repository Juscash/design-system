import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { shadow } from ".";
import { designSystemColors } from "../colors";
import { spacing } from "../spacing";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4001-441&m=dev";

const meta: Meta = {
  title: "Fundamentos/Sombras",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      description: {
        component: "Sombras de **elevação** (xs → xl, opacidades crescentes) e anéis de **foco** (focus / focusError).",
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
          Sombras
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: spacing[6],
          }}
        >
          {Object.entries(shadow).map(([key, value]) => (
            <div
              key={key}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: spacing[3],
                padding: spacing[5],
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  background: designSystemColors.background.white,
                  border: `1px solid ${designSystemColors.border.regular}`,
                  borderRadius: 8,
                  boxShadow: value,
                }}
              />
              <code style={{ fontSize: 13, color: designSystemColors.text.dark }}>{`shadow.${key}`}</code>
              <code
                style={{
                  fontSize: 11,
                  color: designSystemColors.text.soft,
                  textAlign: "center",
                  lineHeight: 1.2,
                  maxWidth: 200,
                  wordBreak: "break-word",
                }}
              >
                {value}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
