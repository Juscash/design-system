import type { Meta, StoryObj } from "@storybook/react-vite";
import { Palette, Type, Ruler, Square, Layers, Monitor, LayoutGrid, RectangleHorizontal } from "lucide-react";
import { designSystemColors, spacing } from ".";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=3-3&m=dev";

const toStoryPath = (title: string): string => {
  const slug = title.toLowerCase().replace(/[/\s]+/g, "-");
  return `/?path=/docs/${encodeURIComponent(slug)}--docs`;
};

const sections = [
  {
    icon: Palette,
    title: "Cores",
    path: "Fundamentos/Cores",
    description:
      "Paleta neutral, brand (primary/secondary), feedback (green/red/yellow/blue/orange), opacidades e aliases semânticos (text, border, background, button).",
  },
  {
    icon: Type,
    title: "Tipografia",
    path: "Fundamentos/Tipografia",
    description: "Família Inter, peso Regular (400), line-height 1.2. Escala de heading 1–6, body 1–2 e caption 1.",
  },
  {
    icon: Ruler,
    title: "Espaçamento",
    path: "Fundamentos/Espaçamento",
    description: "Escala 4pt: spacing.1 (4px) até spacing.24 (96px).",
  },
  {
    icon: Square,
    title: "Bordas",
    path: "Fundamentos/Bordas",
    description: "Radius md (4px), xl (8px), 2xl (12px), 3xl (16px), full (9999px).",
  },
  {
    icon: Layers,
    title: "Sombras",
    path: "Fundamentos/Sombras",
    description: "Elevação xs→xl + estados de foco (focus / focus-error).",
  },
  {
    icon: Monitor,
    title: "Breakpoints",
    path: "Fundamentos/Breakpoints",
    description: "xxs, xs, s, m, l, xl — alinhados a smartphones, tablets, laptops e desktops.",
  },
  {
    icon: LayoutGrid,
    title: "Container",
    path: "Fundamentos/Container",
    description: "Variantes SystemContainer (1800px) e SiteContainer (1086px), padding 24px.",
  },
  {
    icon: RectangleHorizontal,
    title: "Aspect Ratio",
    path: "Fundamentos/Aspect Ratio",
    description: "Proporções padronizadas: square, portrait, landscape, widescreen, mobile.",
  },
];

const meta: Meta = {
  title: "Fundamentos/Visão Geral",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      description: {
        component: `
Documentação interativa dos **fundamentos** do **@juscash/design-system** — biblioteca React baseada em Ant Design 6.

Cada seção abaixo corresponde a uma página em "Fundamentos" deste Storybook.
Os valores aqui são extraídos do [Figma — Design System Juscash](${FIGMA_URL}) e mantidos sincronizados com os tokens TypeScript exportados em \`src/theme/foundations/\`.
        `,
      },
    },
  },
};

export default meta;

export const VisaoGeral: StoryObj = {
  name: "Visão geral",
  render: () => (
    <div
      className="ds-overview-foundations"
      style={{
        fontFamily: "Inter, sans-serif",
        padding: spacing[8],
        background: designSystemColors.background.grey,
        minHeight: "100vh",
      }}
    >
      <style>{`.ds-overview-foundations a, .ds-overview-foundations a:hover, .ds-overview-foundations a:visited { text-decoration: none !important; color: inherit !important; }`}</style>
      <header style={{ maxWidth: 1024, margin: "0 auto", marginBottom: spacing[10] }}>
        <h1
          style={{
            fontSize: 49,
            lineHeight: 1.2,
            fontWeight: 400,
            margin: 0,
            color: designSystemColors.text.dark,
          }}
        >
          Design System JusCash
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.2,
            color: designSystemColors.text.soft,
            marginTop: spacing[4],
            maxWidth: 720,
          }}
        >
          Fundamentos do <strong>@juscash/design-system</strong>: tokens visuais que dão identidade aos componentes (Ant Design 6
          + camada Juscash). Navegue pelas seções da barra lateral para explorar cada tópico.
        </p>
      </header>

      <section
        style={{
          maxWidth: 1024,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: spacing[4],
        }}
      >
        {sections.map(({ icon: Icon, title, path, description }) => (
          <a
            key={title}
            href={toStoryPath(path)}
            target="_top"
            style={{
              background: designSystemColors.background.white,
              border: `1px solid ${designSystemColors.border.regular}`,
              borderRadius: 12,
              padding: spacing[6],
              display: "flex",
              flexDirection: "column",
              gap: spacing[3],
              cursor: "pointer",
              transition: "border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
              height: "100%",
              color: "inherit",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = designSystemColors.brand.primary[400];
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = designSystemColors.border.regular;
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: designSystemColors.brand.primary[50],
                color: designSystemColors.brand.primary[600],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={20} />
            </div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 1.2,
                margin: 0,
                color: designSystemColors.text.dark,
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.2,
                color: designSystemColors.text.soft,
                margin: 0,
              }}
            >
              {description}
            </p>
          </a>
        ))}
      </section>

      <footer
        style={{
          maxWidth: 1024,
          margin: `${spacing[10]}px auto 0`,
          padding: spacing[6],
          background: designSystemColors.background.white,
          border: `1px solid ${designSystemColors.border.regular}`,
          borderRadius: 12,
        }}
      >
        <h3
          style={{
            fontSize: 20,
            fontWeight: 400,
            lineHeight: 1.2,
            margin: 0,
            color: designSystemColors.text.dark,
          }}
        >
          Como usar
        </h3>
        <pre
          style={{
            background: designSystemColors.neutral[900],
            color: designSystemColors.text.light,
            padding: spacing[4],
            borderRadius: 8,
            fontSize: 13,
            lineHeight: 1.2,
            overflowX: "auto",
            marginTop: spacing[3],
          }}
        >
          <code>{`import { JuscashProvider, designSystemColors, spacing, typography } from "@juscash/design-system";
import "@juscash/design-system/dist/index.css";

<JuscashProvider>{children}</JuscashProvider>`}</code>
        </pre>
      </footer>
    </div>
  ),
};
