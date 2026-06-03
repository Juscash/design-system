import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { container } from ".";
import { designSystemColors } from "../colors";
import { spacing } from "../spacing";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=8347-11528&m=dev";

const meta: Meta = {
  title: "Fundamentos/Container",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      description: {
        component:
          "Área útil de conteúdo, com 4 modos: **SystemContainer** (xxs–l) e **SystemContainerFixed** (xl+, max 1800px) para os demais produtos; **SiteContainer** (xxs–m) e **SiteContainerFixed** (l+, max 1086px) para o site institucional.",
      },
    },
  },
};

export default meta;

const variants: Array<{ name: string; breakpoint: string; range: string; paddingX: string; maxWidth: string; produto: string }> =
  [
    {
      name: "SystemContainer",
      breakpoint: "xxs–l",
      range: "até 1919px",
      paddingX: `${container.system.paddingX}px`,
      maxWidth: "—",
      produto: "Demais produtos",
    },
    {
      name: "SystemContainerFixed",
      breakpoint: "xl+",
      range: `${container.system.fixedFrom}px +`,
      paddingX: "dinâmico",
      maxWidth: `${container.system.maxWidth}px`,
      produto: "Demais produtos",
    },
    {
      name: "SiteContainer",
      breakpoint: "xxs–m",
      range: "até 1365px",
      paddingX: `${container.site.paddingX}px`,
      maxWidth: "—",
      produto: "Site",
    },
    {
      name: "SiteContainerFixed",
      breakpoint: "l+",
      range: `${container.site.fixedFrom}px +`,
      paddingX: "dinâmico",
      maxWidth: `${container.site.maxWidth}px`,
      produto: "Site",
    },
  ];

export const Variantes: StoryObj = {
  name: "Variantes",
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
          Container
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
                  nome
                </th>
                <th style={{ padding: spacing[3], textAlign: "left", fontWeight: 400, color: designSystemColors.text.soft }}>
                  breakpoint
                </th>
                <th style={{ padding: spacing[3], textAlign: "left", fontWeight: 400, color: designSystemColors.text.soft }}>
                  faixa
                </th>
                <th style={{ padding: spacing[3], textAlign: "left", fontWeight: 400, color: designSystemColors.text.soft }}>
                  padding lateral
                </th>
                <th style={{ padding: spacing[3], textAlign: "left", fontWeight: 400, color: designSystemColors.text.soft }}>
                  max-width
                </th>
                <th style={{ padding: spacing[3], textAlign: "left", fontWeight: 400, color: designSystemColors.text.soft }}>
                  produto
                </th>
              </tr>
            </thead>
            <tbody>
              {variants.map((v) => (
                <tr key={v.name} style={{ borderTop: `1px solid ${designSystemColors.border.regular}` }}>
                  <td style={{ padding: spacing[3] }}>
                    <code style={{ color: designSystemColors.text.dark }}>{v.name}</code>
                  </td>
                  <td style={{ padding: spacing[3], color: designSystemColors.text.soft }}>{v.breakpoint}</td>
                  <td style={{ padding: spacing[3], color: designSystemColors.text.soft }}>{v.range}</td>
                  <td style={{ padding: spacing[3], color: designSystemColors.text.soft }}>{v.paddingX}</td>
                  <td style={{ padding: spacing[3], color: designSystemColors.text.soft }}>{v.maxWidth}</td>
                  <td style={{ padding: spacing[3], color: designSystemColors.text.soft }}>{v.produto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          style={{
            fontSize: 13,
            color: designSystemColors.text.soft,
            marginTop: spacing[6],
            lineHeight: 1.2,
          }}
        >
          Padding superior é sempre <strong>{container.system.paddingTop}px</strong>. Em sistemas com sidebar, o container
          referencia a área de conteúdo à direita da navegação, não a largura total da janela.
        </p>
      </div>
    </div>
  ),
};
