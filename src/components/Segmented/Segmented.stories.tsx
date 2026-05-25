import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Description, Controls, Primary as DocsPrimary, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";
import { Segmented } from ".";
import type { SegmentedSize } from "../../types/components/Segmented";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4886-14656&m=dev";

type SegmentedStoryProps = React.ComponentProps<typeof Segmented>;

const SIZES: SegmentedSize[] = ["m", "s", "xs"];

const meta: Meta<SegmentedStoryProps> = {
  title: "Components/Segmented",
  component: Segmented,
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      codePanel: true,
      description: {
        component: `
Controle segmentado do design system Juscash. Embrulha o [Ant Design Segmented](https://ant.design/components/segmented)
aplicando tokens proprietários via \`ConfigProvider\` local e enriquecendo cada opção com **ícone**, **texto** e **contador**.

## Props proprietárias
- **\`size\`** — \`m\` (36px) · \`s\` (32px) · \`xs\` (24px). Default \`m\`.
- **\`options\`** — aceita primitivo (\`string|number\`), opção nativa Antd (\`{ value, label }\`) ou opção enriquecida (\`{ value, text, icon, counter, disabled }\`).

## Props das opções enriquecidas
- **\`value\`** — chave única (obrigatório).
- **\`text\`** — string exibida.
- **\`icon\`** — nome do Lucide (\`"Search"\`) ou \`ReactNode\`. Tamanho derivado do \`size\`.
- **\`counter\`** — número ou string exibida como badge vermelho.
- **\`disabled\`** — desabilita o item individualmente.

## Props herdadas do Antd Segmented
\`block\`, \`disabled\`, \`value\`, \`defaultValue\`, \`onChange\`, \`name\`, \`className\`, \`style\`.

## Como usar
\`\`\`tsx
import { Segmented } from "@juscash/design-system";

<Segmented
  size="m"
  defaultValue="grid"
  options={[
    { value: "list", text: "Lista", icon: "List" },
    { value: "grid", text: "Grade", icon: "Grid" },
  ]}
/>
\`\`\`
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <DocsPrimary />
          <Controls />
          <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem" }}>Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    size: { control: "select", options: SIZES },
    options: { control: "object" },
    block: { control: "boolean", description: "Distribui itens ocupando 100% da largura do pai." },
    disabled: { control: "boolean", description: "Desabilita todo o componente." },
  },
  args: { size: "m" },
  render: (args) => <Segmented {...args} />,
};

export default meta;
type Story = StoryObj<SegmentedStoryProps>;

const textOptions = ["Diário", "Semanal", "Mensal"];

const enhancedOptions = [
  { value: "list", text: "Lista", icon: "List" as const },
  { value: "grid", text: "Grade", icon: "Grid" as const },
  { value: "kanban", text: "Kanban", icon: "Columns3" as const },
];

/** Playground com controls. Use os controls para experimentar combinações. */
export const Playground: Story = {
  args: { options: textOptions, defaultValue: "Diário" },
};

/** Apenas texto — caso mais simples. Cada opção é uma string. */
export const ApenasTexto: Story = {
  args: { options: textOptions, defaultValue: "Diário" },
};

/** Texto + ícone — `icon` recebe o nome do Lucide como string. */
export const ComIcone: Story = {
  args: { options: enhancedOptions, defaultValue: "list" },
};

/** Icon-only — sem `text`, o item fica apenas com o ícone (alinhado ao centro). Use `ariaLabel` para acessibilidade. */
export const SomenteIcone: Story = {
  args: {
    options: [
      { value: "grid", icon: "Grid", ariaLabel: "Visão em grade" },
      { value: "list", icon: "List", ariaLabel: "Visão em lista" },
      { value: "kanban", icon: "Columns3", ariaLabel: "Visão em kanban" },
    ],
    defaultValue: "grid",
  },
};

/** Counter badge — número ao lado do texto, em destaque vermelho. */
export const ComCounter: Story = {
  args: {
    options: [
      { value: "all", text: "Tudo" },
      { value: "alerts", text: "Alertas", counter: 7 },
      { value: "archived", text: "Arquivados", counter: 128 },
    ],
    defaultValue: "alerts",
  },
};

/** Todos os tamanhos lado a lado em `m`, `s` e `xs`. */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {SIZES.map((s) => (
        <Segmented key={s} size={s} options={textOptions} defaultValue="Diário" />
      ))}
    </div>
  ),
};

/** Estado disabled — componente inteiro ou opção individual. */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Segmented options={textOptions} defaultValue="Diário" disabled />
      <Segmented
        options={[
          { value: "a", text: "Disponível" },
          { value: "b", text: "Em breve", disabled: true },
          { value: "c", text: "Disponível 2" },
        ]}
        defaultValue="a"
      />
    </div>
  ),
};

/** `block` ocupa 100% da largura do pai distribuindo os itens igualmente. */
export const Block: Story = {
  args: { block: true, options: textOptions, defaultValue: "Semanal" },
  render: (args) => (
    <div style={{ width: 480 }}>
      <Segmented {...args} />
    </div>
  ),
};

/** Combinações reais — filtros de tela. */
export const ExemplosReais: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Segmented
        size="m"
        defaultValue="todos"
        options={[
          { value: "todos", text: "Todos", counter: 42 },
          { value: "ativos", text: "Ativos", counter: 18 },
          { value: "arquivados", text: "Arquivados", counter: 24 },
        ]}
      />
      <Segmented size="s" defaultValue="list" options={enhancedOptions} />
      <Segmented
        size="xs"
        defaultValue="grid"
        options={[
          { value: "list", icon: "List", ariaLabel: "Lista" },
          { value: "grid", icon: "Grid", ariaLabel: "Grade" },
        ]}
      />
    </div>
  ),
};

/** Matriz tamanho × tipo de opção — espelha a página Componentes do Figma. */
export const MatrizCompleta: Story = {
  name: "Matriz: tamanho × tipo",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "60px repeat(3, auto)",
        gap: 16,
        alignItems: "center",
        justifyItems: "start",
      }}
    >
      <span />
      <span style={{ fontSize: 12, color: "#737373" }}>Texto</span>
      <span style={{ fontSize: 12, color: "#737373" }}>Ícone + texto</span>
      <span style={{ fontSize: 12, color: "#737373" }}>Counter</span>
      {SIZES.map((s) => (
        <React.Fragment key={s}>
          <span style={{ fontSize: 12, color: "#525252", fontWeight: 600 }}>{`size=${s}`}</span>
          <Segmented size={s} defaultValue="Diário" options={textOptions} />
          <Segmented size={s} defaultValue="list" options={enhancedOptions.slice(0, 2)} />
          <Segmented
            size={s}
            defaultValue="alerts"
            options={[
              { value: "all", text: "Tudo" },
              { value: "alerts", text: "Alertas", counter: 7 },
            ]}
          />
        </React.Fragment>
      ))}
    </div>
  ),
};
