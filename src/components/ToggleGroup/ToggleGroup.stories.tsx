import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Description, Controls, Primary as DocsPrimary, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";
import { ToggleGroup } from ".";
import type {
  ToggleGroupOption,
  ToggleGroupSize,
  ToggleGroupVariant,
} from "../../types/components/ToggleGroup";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4042-11470&m=dev";

type ToggleGroupStoryProps = React.ComponentProps<typeof ToggleGroup>;

const SIZES: ToggleGroupSize[] = ["m", "s", "xs"];
const VARIANTS: ToggleGroupVariant[] = ["ghost", "outlined"];

const meta: Meta<ToggleGroupStoryProps> = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      codePanel: true,
      description: {
        component: `
Grupo de botões toggle com comportamento single (radio): apenas uma opção pode ficar ativa por vez.
Embrulha o [Ant Design Radio.Group](https://ant.design/components/radio) em modo \`optionType="button"\` aplicando os tokens do design system Juscash.

## Props proprietárias
- **\`variant\`** — \`ghost\` (track cinza) ou \`outlined\` (borda no grupo). Default \`ghost\`.
- **\`size\`** — \`m\` (36px) · \`s\` (32px) · \`xs\` (24px). Default \`m\`.
- **\`options\`** — array de \`{ value, label?, icon?, disabled?, ariaLabel? }\`.
- **\`value\` / \`defaultValue\`** — valor selecionado (modo controlado/não controlado).
- **\`onChange\`** — callback disparado com o novo valor.
- **\`disabled\`** — desabilita todo o grupo.

## Como usar
\`\`\`tsx
import { ToggleGroup } from "@juscash/design-system";

<ToggleGroup
  variant="ghost"
  size="m"
  defaultValue="bold"
  aria-label="Formatação de texto"
  options={[
    { value: "bold", icon: "Bold", ariaLabel: "Negrito" },
    { value: "italic", icon: "Italic", ariaLabel: "Itálico" },
    { value: "underline", icon: "Underline", ariaLabel: "Sublinhado" },
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
    variant: { control: "select", options: VARIANTS },
    size: { control: "select", options: SIZES },
    disabled: { control: "boolean", description: "Desabilita todo o grupo." },
    options: { control: "object" },
  },
  args: { variant: "ghost", size: "m" },
  render: (args) => <ToggleGroup {...args} />,
};

export default meta;
type Story = StoryObj<ToggleGroupStoryProps>;

const textOptions: ToggleGroupOption[] = [
  { value: "diario", label: "Diário" },
  { value: "semanal", label: "Semanal" },
  { value: "mensal", label: "Mensal" },
];

const iconOptions: ToggleGroupOption[] = [
  { value: "bold", icon: "Bold", ariaLabel: "Negrito" },
  { value: "italic", icon: "Italic", ariaLabel: "Itálico" },
  { value: "underline", icon: "Underline", ariaLabel: "Sublinhado" },
];

/** Variante default: ghost no tamanho médio com options de texto. */
export const Default: Story = {
  args: { options: textOptions, defaultValue: "diario", "aria-label": "Período" },
};

/** Playground controlado pelos controls do Storybook. */
export const Playground: Story = {
  args: { options: textOptions, defaultValue: "diario", "aria-label": "Período" },
};

/** Variante `ghost` — track cinza com item ativo destacado. */
export const Ghost: Story = {
  args: {
    variant: "ghost",
    options: textOptions,
    defaultValue: "semanal",
    "aria-label": "Período",
  },
};

/** Variante `outlined` — borda no grupo com divisores entre itens. */
export const Outlined: Story = {
  args: {
    variant: "outlined",
    options: textOptions,
    defaultValue: "semanal",
    "aria-label": "Período",
  },
};

/** Botões icon-only — `icon` recebe o nome do Lucide; passe `ariaLabel`. */
export const ApenasIcone: Story = {
  args: {
    options: iconOptions,
    defaultValue: "bold",
    "aria-label": "Formatação de texto",
  },
};

/** Texto + ícone combinados em cada opção. */
export const TextoComIcone: Story = {
  args: {
    options: [
      { value: "list", label: "Lista", icon: "List" },
      { value: "grid", label: "Grade", icon: "Grid" },
      { value: "kanban", label: "Kanban", icon: "Columns3" },
    ],
    defaultValue: "list",
    "aria-label": "Visualização",
  },
};

/** Tamanhos `m`, `s` e `xs` lado a lado (variante ghost). */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {SIZES.map((s) => (
        <ToggleGroup
          key={s}
          size={s}
          options={textOptions}
          defaultValue="diario"
          aria-label={`Período ${s}`}
        />
      ))}
    </div>
  ),
};

/** Grupo inteiro desabilitado. */
export const Disabled: Story = {
  args: { options: textOptions, defaultValue: "diario", disabled: true, "aria-label": "Período" },
};

/** Item individual desabilitado dentro do grupo. */
export const DisabledItem: Story = {
  args: {
    options: [
      { value: "a", label: "Disponível" },
      { value: "b", label: "Em breve", disabled: true },
      { value: "c", label: "Ativo" },
    ],
    defaultValue: "a",
    "aria-label": "Status",
  },
};

/** Matriz tamanho × variante (espelha a página do Figma). */
export const MatrizCompleta: Story = {
  name: "Matriz: tamanho × variante",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "60px repeat(2, auto)",
        gap: 16,
        alignItems: "center",
        justifyItems: "start",
      }}
    >
      <span />
      <span style={{ fontSize: 12, color: "#737373" }}>Ghost</span>
      <span style={{ fontSize: 12, color: "#737373" }}>Outlined</span>
      {SIZES.map((s) => (
        <React.Fragment key={s}>
          <span style={{ fontSize: 12, color: "#525252", fontWeight: 600 }}>{`size=${s}`}</span>
          <ToggleGroup
            variant="ghost"
            size={s}
            options={textOptions}
            defaultValue="diario"
            aria-label={`Ghost ${s}`}
          />
          <ToggleGroup
            variant="outlined"
            size={s}
            options={textOptions}
            defaultValue="diario"
            aria-label={`Outlined ${s}`}
          />
        </React.Fragment>
      ))}
    </div>
  ),
};
