import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Card } from ".";
import { Button } from "../Button";
import { Input } from "../Input";

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

### Tokens (Figma 4069:6522)
- **Background:** \`neutral/50\` (#fafafa)
- **Border:** 1px \`neutral/300\` (#d4d4d4)
- **Radius:** \`radius.xl\` (8)
- **Padding interno:** \`spacing[6]\` (24)
- **Shadow default:** \`shadow.xs\`

### Props proprietárias (Juscash)
- **\`clickable\`** — quando \`true\`, habilita hover (\`shadow.m\`), focus ring (\`shadow.focus\` = 3px \`neutral/300\`),
  \`cursor: pointer\` e \`tabIndex={0}\`. Regra do design: **hover/focus só em cards clicáveis** que redirecionam ou disparam ação.

### Estados interativos (somente \`clickable\`)
- **Default:** \`shadow.xs\` (sutil)
- **Hover:** \`shadow.m\` (elevação média)
- **Focus visible:** ring 3px \`neutral/300\` via \`:focus-visible\` real (sem hack de classe simulada).
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
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>Figma Spec</h3>
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
      description: "Habilita estados hover/focus, cursor pointer e tabIndex=0.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: "Card content",
  },
};

export const Clickable: Story = {
  name: "Clicável (hover + focus reais)",
  args: {
    children: "Passe o mouse para ver hover. Use Tab para focar e ver o ring.",
    clickable: true,
    onClick: () => alert("Card clicked!"),
  },
};

export const NonClickable: Story = {
  name: "Não clicável (container)",
  args: {
    children: "Card estático, sem hover/focus.",
    clickable: false,
  },
};

export const SlotsGrid: Story = {
  name: "Matriz de slots (1 / 2 / 3)",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card style={{ width: 280 }}>
        <p>Slot único</p>
      </Card>
      <Card style={{ width: 280 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p>Slot 1</p>
          <p>Slot 2</p>
        </div>
      </Card>
      <Card style={{ width: 280 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p>Slot 1</p>
          <p>Slot 2</p>
          <p>Slot 3</p>
        </div>
      </Card>
    </div>
  ),
};

export const ExampleLogin: Story = {
  name: "Exemplo — Login",
  parameters: { layout: "centered" },
  render: () => (
    <Card style={{ width: 368 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h2 style={{ fontSize: 31, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Boas-vindas!</h2>
          <p style={{ fontSize: 16, margin: "8px 0 0", lineHeight: 1.2 }}>
            Insira seus dados abaixo para realizar o login.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 16 }}>E-mail</span>
            <Input placeholder="seu@email.com" />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 16 }}>Senha</span>
            <Input type="password" placeholder="Digite sua senha" />
          </label>
          <Button variant="primary" block>
            Entrar
          </Button>
        </div>
      </div>
    </Card>
  ),
};

export const ExampleFeedback: Story = {
  name: "Exemplo — Feedback",
  parameters: { layout: "centered" },
  render: () => (
    <Card style={{ width: 368 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Queremos ouvir você!</h3>
          <p style={{ fontSize: 16, margin: "8px 0 0", lineHeight: 1.2 }}>
            Seu feedback pode fazer toda a diferença para construirmos um programa ainda mais completo.
          </p>
        </div>
        <Button variant="primary" block>
          Enviar feedback
        </Button>
      </div>
    </Card>
  ),
};
