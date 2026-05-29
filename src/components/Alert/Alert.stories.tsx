import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Check, CircleAlert, X } from "lucide-react";
import { Alert } from ".";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4077-7402&m=dev";

const STORY_WIDTH = 400;
const ICON_SIZE = 16;

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente de alerta que exibe uma mensagem destacada para chamar a atenção
do usuário sobre informações importantes — como confirmações, avisos ou
erros. Conforme o dump \`figma/components/alert/design-context-4077-7402.md\`.

### Variantes de cor

- \`type="neutral"\` (default): texto e ícones em \`var(--color-text-dark)\`.
- \`type="error"\`: texto e ícones em \`var(--color-feedback-red-500)\`.

### Eixos de exibição

O dump separa o **flag de exibição** (\`showLeftIcon\`, \`showRightIcon\`,
\`showLine2\`, \`showButton\`) do **conteúdo** (\`leftIcon\`, \`rightIcon\`,
\`line2\`, \`buttonLabel\`). Isso permite reservar o slot do ícone sem
necessariamente passar o ícone, mantendo o layout estável entre estados.

### Tokens

- Fundo: \`var(--color-neutral-50)\`.
- Borda: 1px \`var(--color-border-regular)\`.
- Raio: \`var(--radius-xl)\` (8px).
- Padding: \`var(--spacing-4)\` (16px).
- Gap interno: \`var(--spacing-4)\` (root) e \`var(--spacing-3)\` (conteúdo).

### Ícones

O dump usa ícones do \`lucide-react\` (\`Check\`, \`CircleAlert\`, \`X\`).
Não há ícone default — o consumer é responsável por passar o ícone via
\`leftIcon\` ou \`rightIcon\` quando o slot estiver habilitado.

### Como usar

\`\`\`tsx
import { Alert } from "@juscash/design-system";
import { Check, CircleAlert, X } from "lucide-react";

<Alert
  leftIcon={<Check size={16} />}
  showRightIcon
  rightIcon={<X size={16} />}
  showLine2
  line2="Line 2"
>
  Configurações salvas com sucesso.
</Alert>
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
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: 700 }}>Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="450px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["neutral", "error"],
      description: "Variante de cor do alerta.",
    },
    showLeftIcon: { control: "boolean", description: "Mostra o aligner do ícone esquerdo." },
    showRightIcon: { control: "boolean", description: "Mostra o aligner do ícone direito." },
    showLine2: { control: "boolean", description: "Mostra a linha 2 de texto." },
    showButton: { control: "boolean", description: "Mostra o botão à direita." },
    buttonLabel: { control: "text", description: "Texto exibido no botão." },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

/**
 * Variante padrão (neutral). Apenas linha 1 e o aligner do ícone esquerdo.
 * O consumer é responsável por passar o ícone via `leftIcon`.
 */
export const Default: Story = {
  args: {
    type: "neutral",
    leftIcon: <Check size={ICON_SIZE} />,
    children: "Line 1",
  },
  render: (args) => (
    <div style={{ width: STORY_WIDTH }}>
      <Alert {...args} />
    </div>
  ),
};

/**
 * Variante `neutral` com a linha 2 ativada — bloco com dois `<p>`
 * empilhados, linha 1 em `body/01` (16px) e linha 2 em `body/02` (13px,
 * cor `--color-text-soft`).
 */
export const NeutralLine2: Story = {
  name: "Neutral — Line 2",
  args: {
    type: "neutral",
    leftIcon: <Check size={ICON_SIZE} />,
    showLine2: true,
    children: "Line 1",
    line2: "Line 2",
  },
  render: (args) => (
    <div style={{ width: STORY_WIDTH }}>
      <Alert {...args} />
    </div>
  ),
};

/**
 * Variante `neutral` com o aligner do ícone direito habilitado.
 * O consumer passa o ícone via `rightIcon` (no exemplo, `X` do lucide).
 */
export const NeutralWithRightIcon: Story = {
  name: "Neutral — Right icon",
  args: {
    type: "neutral",
    leftIcon: <Check size={ICON_SIZE} />,
    showRightIcon: true,
    rightIcon: <X size={ICON_SIZE} />,
    children: "Line 1",
  },
  render: (args) => (
    <div style={{ width: STORY_WIDTH }}>
      <Alert {...args} />
    </div>
  ),
};

/**
 * Exemplo 1 do dump (4077:9424): neutral + icon/check + duas linhas de
 * texto + ícone X à direita.
 */
export const Example1: Story = {
  name: "Exemplo 1 — Confirmação com fechar",
  args: {
    type: "neutral",
    leftIcon: <Check size={ICON_SIZE} />,
    showLine2: true,
    showRightIcon: true,
    rightIcon: <X size={ICON_SIZE} />,
    children: "Configurações salvas com sucesso.",
    line2: "Line 2",
  },
  render: (args) => (
    <div style={{ width: STORY_WIDTH }}>
      <Alert {...args} />
    </div>
  ),
};

/**
 * Exemplo 2 do dump (4077:9425): neutral + icon/circle-alert + texto
 * informativo de uma linha só.
 */
export const Example2: Story = {
  name: "Exemplo 2 — Aviso informativo",
  args: {
    type: "neutral",
    leftIcon: <CircleAlert size={ICON_SIZE} />,
    children: "Seu plano expirará em 3 dias. Considere renová-lo para evitar interrupções.",
  },
  render: (args) => (
    <div style={{ width: STORY_WIDTH }}>
      <Alert {...args} />
    </div>
  ),
};

/**
 * Exemplo 3 do dump (4077:9426): variante `error` + icon/circle-alert +
 * duas linhas de texto em `--color-feedback-red-500`.
 */
export const Example3: Story = {
  name: "Exemplo 3 — Erro com duas linhas",
  args: {
    type: "error",
    leftIcon: <CircleAlert size={ICON_SIZE} />,
    showLine2: true,
    children: "Falha ao salvar os dados.",
    line2: "Tente novamente mais tarde.",
  },
  render: (args) => (
    <div style={{ width: STORY_WIDTH }}>
      <Alert {...args} />
    </div>
  ),
};

/**
 * Exemplo 4 do dump (4146:11659): neutral + icon/check + botão outline
 * com label "Desfazer" à direita do conteúdo.
 */
export const Example4: Story = {
  name: "Exemplo 4 — Ação 'Desfazer'",
  args: {
    type: "neutral",
    leftIcon: <Check size={ICON_SIZE} />,
    showButton: true,
    buttonLabel: "Desfazer",
    children: "Arquivo excluído com sucesso.",
  },
  render: (args) => (
    <div style={{ width: STORY_WIDTH }}>
      <Alert {...args} />
    </div>
  ),
};

/** Playground controlado por args. Use os controles para testar combinações. */
export const Playground: Story = {
  args: {
    type: "neutral",
    leftIcon: <Check size={ICON_SIZE} />,
    showLeftIcon: true,
    showRightIcon: false,
    rightIcon: <X size={ICON_SIZE} />,
    showLine2: false,
    showButton: false,
    buttonLabel: "Label",
    children: "Line 1",
    line2: "Line 2",
  },
  render: (args) => (
    <div style={{ width: STORY_WIDTH }}>
      <Alert {...args} />
    </div>
  ),
};
