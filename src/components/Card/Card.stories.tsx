import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Card } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4069-6522&m=dev";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente Card baseado no [Ant Design Card](https://ant.design/components/card).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Card.
- **Custom (Juscash)**:
  - \`clickable\`: Quando verdadeiro, habilita efeito de hover (shadow.m), cursor pointer e estado de focus (focus ring).

### Estados (apenas para cards clicáveis):
- **Default**: shadow.xs (sutil)
- **Hover**: shadow.m (elevação média)
- **Focus**: focus ring (3px neutral[300])
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />

          <Primary />

          <Controls />

          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <h3
              style={{
                marginBottom: "1rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Figma Spec
            </h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>

          <Stories />
        </>
      ),
    },
  },
  tags: ["autodocs"],
  argTypes: {
    clickable: {
      control: "boolean",
      description: "Habilita estados hover/focus e cursor pointer",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ─── Default (apenas conteúdo) ───────────────────────────────────────────────

export const Default: Story = {
  args: {
    children: "Card content",
  },
};

// ─── Com título ──────────────────────────────────────────────────────────────

export const WithTitle: Story = {
  name: "Com título",
  args: {
    title: "Card Title",
    children: "Card content with a title",
  },
};

// ─── Clicável ────────────────────────────────────────────────────────────────

export const Clickable: Story = {
  name: "Clicável",
  args: {
    children: "Passe o mouse para ver hover e use Tab para focus.",
    clickable: true,
    onClick: () => alert("Card clicked!"),
  },
};

// ─── Não clicável ────────────────────────────────────────────────────────────

export const NonClickable: Story = {
  name: "Não clicável (container)",
  args: {
    title: "Non-Clickable Card",
    children: "This card behaves like a static container.",
    clickable: false,
  },
};

// ─── Figma: grid de variantes (default / hover / focus × 1–3 slots) ─────────

const SlotBox = ({ height = 40 }: { height?: number }) => (
  <div
    style={{
      border: "1px dashed #9747ff",
      borderRadius: 8,
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#c89dff",
      fontSize: 14,
      fontWeight: 500,
    }}
  >
    Slot
  </div>
);

export const VariantsGrid: Story = {
  name: "Variantes — Figma (default / hover / focus)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Labels */}
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ width: 60 }} />
        {["default", "hover", "focus"].map((label) => (
          <div
            key={label}
            style={{
              width: 280,
              textAlign: "center",
              fontSize: 11,
              fontFamily: "monospace",
              color: "#9747ff",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* 1 slot */}
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{ width: 60, fontSize: 11, fontFamily: "monospace", color: "#9747ff", paddingTop: 12 }}>1 slot</div>
        <Card style={{ width: 280 }}><SlotBox /></Card>
        <Card clickable style={{ width: 280 }} className="pseudo-hover"><SlotBox /></Card>
        <Card clickable style={{ width: 280 }} className="pseudo-focus-visible"><SlotBox /></Card>
      </div>

      {/* 2 slots */}
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{ width: 60, fontSize: 11, fontFamily: "monospace", color: "#9747ff", paddingTop: 12 }}>2 slots</div>
        <Card style={{ width: 280 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SlotBox />
            <SlotBox />
          </div>
        </Card>
        <Card clickable style={{ width: 280 }} className="pseudo-hover">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SlotBox />
            <SlotBox />
          </div>
        </Card>
        <Card clickable style={{ width: 280 }} className="pseudo-focus-visible">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SlotBox />
            <SlotBox />
          </div>
        </Card>
      </div>

      {/* 3 slots */}
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{ width: 60, fontSize: 11, fontFamily: "monospace", color: "#9747ff", paddingTop: 12 }}>3 slots</div>
        <Card style={{ width: 280 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SlotBox />
            <SlotBox />
            <SlotBox />
          </div>
        </Card>
        <Card clickable style={{ width: 280 }} className="pseudo-hover">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SlotBox />
            <SlotBox />
            <SlotBox />
          </div>
        </Card>
        <Card clickable style={{ width: 280 }} className="pseudo-focus-visible">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SlotBox />
            <SlotBox />
            <SlotBox />
          </div>
        </Card>
      </div>
    </div>
  ),
};

// ─── Figma: Exemplo Login ────────────────────────────────────────────────────

export const ExampleLogin: Story = {
  name: "Exemplo — Login (Figma)",
  render: () => (
    <Card style={{ width: 368 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h2 style={{ fontSize: 31, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Boas-vindas!</h2>
          <p style={{ fontSize: 16, color: "#6d6d6e", margin: "8px 0 0", lineHeight: 1.2 }}>
            Bem-vindo ao Programa de Benefícios JusCash! Por favor, insira seus dados abaixo para realizar o login.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 16, display: "block", marginBottom: 8 }}>E-mail</label>
            <input
              placeholder="seu@email.com"
              style={{
                width: "100%",
                height: 36,
                border: "1px solid #d4d4d4",
                borderRadius: 8,
                padding: "0 12px",
                fontSize: 13,
                background: "#fafafa",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 16, display: "block", marginBottom: 8 }}>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              style={{
                width: "100%",
                height: 40,
                border: "1px solid #d4d4d4",
                borderRadius: 8,
                padding: "0 12px",
                fontSize: 13,
                background: "#fafafa",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            style={{
              width: "100%",
              height: 36,
              backgroundColor: "#008633",
              color: "#fafafa",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Entrar
          </button>
          <p style={{ fontSize: 13, textAlign: "center", textDecoration: "underline", cursor: "pointer" }}>
            Esqueci minha senha
          </p>
        </div>
      </div>
    </Card>
  ),
};

// ─── Figma: Exemplo Feedback ─────────────────────────────────────────────────

export const ExampleFeedback: Story = {
  name: "Exemplo — Feedback (Figma)",
  render: () => (
    <Card style={{ width: 368 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Queremos ouvir você!</h3>
          <p style={{ fontSize: 16, color: "#6d6d6e", margin: "8px 0 0", lineHeight: 1.2 }}>
            Sua experiência no nosso Programa de Benefícios é muito importante para a gente. O seu feedback pode fazer toda a diferença para construirmos um programa ainda mais completo e vantajoso para você.
          </p>
        </div>
        <button
          style={{
            width: "100%",
            height: 36,
            backgroundColor: "#008633",
            color: "#fafafa",
            border: "none",
            borderRadius: 8,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Enviar feedback
        </button>
      </div>
    </Card>
  ),
};
