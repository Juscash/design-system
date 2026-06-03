import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Progress } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4069-4392&m=dev";

const PROGRESS_WIDTH = 342;

type ProgressStoryProps = React.ComponentProps<typeof Progress>;

const meta: Meta<ProgressStoryProps> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente Progress baseado no [Ant Design Progress](https://ant.design/components/progress).

Indica o andamento de uma tarefa ou carregamento. Conforme o dump \`figma/components/progress/\` (\`4069:4392\`), o design system expõe apenas a variante **linear horizontal**: barra 342×8 com track \`neutral.300\` (#d4d4d4), fill \`brand.primary.500\` (verde JusCash) e raio \`radius.2xl\` (12px) nas pontas.

### Props:
- **Extended (Ant Design)**: Aceita \`percent\`, \`className\`, \`style\`, \`id\` e atributos ARIA (\`aria-label\`, \`aria-labelledby\`).
- **Custom (Juscash)**: Sem props proprietárias — a camada JusCash apenas aplica tokens visuais. Variantes \`circle\` / \`dashboard\`, props de cor, \`steps\`, \`status\` e o texto de porcentagem (\`showInfo\`) ficam fora do escopo por não constarem no dump.

### Como usar:

\`\`\`tsx
import { Progress } from "@juscash/design-system";

function Example() {
  return <Progress percent={40} />;
}
\`\`\`
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
  argTypes: {
    percent: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Valor de preenchimento entre 0 e 100.",
    },
  },
  render: (args) => (
    <div style={{ width: PROGRESS_WIDTH }}>
      <Progress {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<ProgressStoryProps>;

export const Default: Story = {
  args: { percent: 40 },
  parameters: {
    docs: {
      description: {
        story: "Estado padrão do dump (`4069:5159`) — fill ocupa 40% da largura (`inset[0_60%_0_0]`).",
      },
    },
  },
};

export const Empty: Story = {
  args: { percent: 0 },
  parameters: {
    docs: { description: { story: "Sem preenchimento — track exibido por completo em `neutral.300`." } },
  },
};

export const Quarter: Story = {
  args: { percent: 25 },
  parameters: {
    docs: { description: { story: "Progresso em 25% — fill verde JusCash ocupando um quarto da barra." } },
  },
};

export const Half: Story = {
  args: { percent: 50 },
  parameters: {
    docs: { description: { story: "Progresso em 50% — fill verde JusCash na metade da barra." } },
  },
};

export const ThreeQuarters: Story = {
  args: { percent: 75 },
  parameters: {
    docs: { description: { story: "Progresso em 75% — fill verde JusCash ocupando três quartos da barra." } },
  },
};

export const Complete: Story = {
  args: { percent: 100 },
  parameters: {
    docs: { description: { story: "Progresso concluído — fill verde JusCash cobrindo toda a barra." } },
  },
};

export const Playground: Story = {
  args: { percent: 40 },
  parameters: {
    docs: {
      description: {
        story: "Playground livre — use o controle `percent` para variar o preenchimento entre 0 e 100.",
      },
    },
  },
};
