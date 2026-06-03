import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Description, Controls, Primary as DocsPrimary, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";
import { InputChips } from ".";
import type { InputChipsSize } from "../../types/components/InputChips";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=8292-10349&m=dev";

type InputChipsStoryProps = React.ComponentProps<typeof InputChips>;

const SIZES: InputChipsSize[] = ["m", "l", "s", "xs"];

const meta: Meta<InputChipsStoryProps> = {
  title: "Components/InputChips",
  component: InputChips,
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      codePanel: true,
      description: {
        component: `
Campo de entrada que cria **chips** ao pressionar **Enter**. Cada chip pode ser removido pelo botão **X** interno
ou via **Backspace** quando o input está vazio.

## Props proprietárias
- **\`value\`** / **\`defaultValue\`** — controlado/uncontrolled. Array de strings.
- **\`onChange\`** — \`(chips: string[]) => void\`. Disparado a cada add/remove.
- **\`size\`** — \`xs\` (24px) · \`s\` (32px) · \`m\` (36px — default) · \`l\` (40px).
- **\`placeholder\`** — texto do input. Default \`"Digite e aperte enter"\`.
- **\`label\`** — \`ReactNode\` exibido acima do input. Inter Regular 16 \`text/dark\`.
- **\`disabled\`** — desabilita input e chips.

## Comportamento
- **Enter** → adiciona o conteúdo (após \`trim()\`); ignora duplicatas.
- **Backspace** com input vazio → remove o último chip.
- **X** em cada chip → remove o chip correspondente.

## Como usar
\`\`\`tsx
import { InputChips } from "@juscash/design-system";

<InputChips label="Tags" placeholder="Digite e aperte enter" defaultValue={["React", "TypeScript"]} />
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
    placeholder: { control: "text" },
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: { size: "m", label: "Label", placeholder: "Digite e aperte enter" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <InputChips {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<InputChipsStoryProps>;

const SAMPLE_CHIPS = ["Label", "Label"];

/** Playground com controls. Adicione chips digitando e pressionando Enter. */
export const Playground: Story = {
  args: { defaultValue: [] },
};

/**
 * Estado inicial sem chips (Figma `Without chips`). O input mostra apenas
 * o placeholder.
 */
export const WithoutChips: Story = {
  args: { defaultValue: [] },
};

/**
 * Estado com chips pré-preenchidos (Figma `With chips`). Cada chip exibe
 * o `X` para remoção.
 */
export const WithChips: Story = {
  args: { defaultValue: SAMPLE_CHIPS },
};

/** Tamanho `m` (Regular — 36px). Default. */
export const SizeM: Story = {
  args: { size: "m", defaultValue: SAMPLE_CHIPS },
};

/** Tamanho `l` (Large — 40px). */
export const SizeL: Story = {
  args: { size: "l", defaultValue: SAMPLE_CHIPS },
};

/** Tamanho `s` (Small — 32px). */
export const SizeS: Story = {
  args: { size: "s", defaultValue: SAMPLE_CHIPS },
};

/** Tamanho `xs` (Mini — 24px). Chips ajustam altura para acompanhar o input. */
export const SizeXS: Story = {
  args: { size: "xs", defaultValue: SAMPLE_CHIPS },
};

/** Estado desabilitado — input e botões de remoção não respondem. */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: SAMPLE_CHIPS },
};

/**
 * Modo controlado — o consumidor mantém o estado e passa via `value`.
 * Útil quando a lista de chips precisa ser persistida ou validada.
 */
export const Controlado: Story = {
  render: () => {
    const [chips, setChips] = useState<string[]>(["React", "TypeScript"]);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
        <InputChips label="Tags controladas" value={chips} onChange={setChips} />
        <p style={{ fontSize: 13, color: "#525252" }}>Total: {chips.length}</p>
      </div>
    );
  },
};

/** Matriz tamanho × estado — espelha a página `Component` do Figma. */
export const Matriz: Story = {
  name: "Matriz: tamanho x estado",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "80px repeat(4, 1fr)", gap: 16, alignItems: "start" }}>
      <span />
      {SIZES.map((s) => (
        <span key={s} style={{ fontSize: 12, color: "#525252", fontWeight: 600 }}>{`size=${s}`}</span>
      ))}
      <span style={{ fontSize: 12, color: "#525252" }}>Without</span>
      {SIZES.map((s) => (
        <InputChips key={`without-${s}`} size={s} label="Label" defaultValue={[]} />
      ))}
      <span style={{ fontSize: 12, color: "#525252" }}>With</span>
      {SIZES.map((s) => (
        <InputChips key={`with-${s}`} size={s} label="Label" defaultValue={SAMPLE_CHIPS} />
      ))}
    </div>
  ),
};
