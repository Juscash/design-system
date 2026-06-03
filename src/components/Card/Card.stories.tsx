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
