import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { SearchBar } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4125-10367&m=dev";

const meta: Meta<typeof SearchBar> = {
  title: "Components/SearchBar",
  component: SearchBar,
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
Componente \`SearchBar\` — campo de pesquisa 320×36 com ícone de busca
(\`Search\` 16px da Lucide) à esquerda e placeholder default \`"Pesquise..."\`.

É um wrapper simples sobre o \`Input\` do design system (size \`m\`), que já
fornece bg \`neutral/50\`, border \`border/regular\`, radius \`xl\` (8), padding
interno e tipografia Inter 13 \`text/soft\` no placeholder.

### Como usar

\`\`\`tsx
import { SearchBar } from "@juscash/design-system";
import { useState } from "react";

function Example() {
  const [query, setQuery] = useState("");
  return <SearchBar value={query} onChange={setQuery} />;
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
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    placeholder: { control: "text" },
    value: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

/** Estado placeholder — campo vazio com texto "Pesquise...". */
export const Placeholder: Story = {
  args: {},
};

/** Estado value — campo com texto digitado. */
export const WithValue: Story = {
  args: {
    defaultValue: "Lorem ipsum",
  },
};

/**
 * Estado focus — o pseudo-estado real `:focus-visible` aplica a sombra de foco
 * do Input do DS. Use o addon de pseudo-estados ou clique no campo para ver.
 */
export const Focused: Story = {
  parameters: {
    pseudo: { focusVisible: true },
  },
  args: {},
};

/** Estado disabled — campo desabilitado, sem interação. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/** Modo controlado — `value` + `onChange` gerenciados pelo consumer. */
export const Controlled: Story = {
  render: () => {
    const ControlledExample = (): React.ReactElement => {
      const [query, setQuery] = React.useState<string>("");
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <SearchBar value={query} onChange={setQuery} />
          <span style={{ fontSize: 13 }}>Valor atual: {query || "(vazio)"}</span>
        </div>
      );
    };
    return <ControlledExample />;
  },
};

/** Playground — controlado por args. */
export const Playground: Story = {
  args: {
    placeholder: "Pesquise...",
    disabled: false,
  },
};
