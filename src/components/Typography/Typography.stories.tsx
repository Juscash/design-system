import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Body1, Body2, Caption } from ".";

import { Title, Subtitle, Description, Primary as DocsPrimary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4002-5004&m=dev";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
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
Componente baseado no [Ant Design Typography](https://ant.design/components/typography).

### Tokens do Figma:

Frame canônico: **Tipografia** (\`4002:5004\`). Todas as variantes usam **Inter Regular 400**, **line-height 120%** e **letter-spacing 0** — não há outros eixos (sem prop \`color\`, sem prop \`weight\`).

### Variantes:

| Token | Tamanho |
| ----- | ------- |
| \`heading1\` | 61px |
| \`heading2\` | 49px |
| \`heading3\` | 39px |
| \`heading4\` | 31px |
| \`heading5\` | 25px |
| \`heading6\` | 20px |
| \`body1\` | 16px |
| \`body2\` | 13px |
| \`caption\` | 10px |

### Componentes prontos: \`Heading1..6\`, \`Body1\`, \`Body2\`, \`Caption\`.

### \`variant\` vs \`component\` — qual é a diferença?

São duas decisões **independentes**:

- **\`variant\`** controla a **aparência visual** (tamanho da fonte, line-height, peso). É o "look". Valores: \`heading1..6\`, \`body1\`, \`body2\`, \`caption\`.
- **\`component\`** controla a **tag HTML** que vai parar no DOM. É a "semântica". Valores: \`p\`, \`span\`, \`h1..h6\`.

**Por que separar?** Porque às vezes você precisa que algo *pareça* um título grande, mas que *seja* só um parágrafo no HTML (pra não confundir leitores de tela e SEO). E vice-versa.

**Exemplo do mundo real:** em uma landing page, a chamada principal "Compre agora" pode ser **visualmente gigante** (\`variant="heading1"\`) mas **semanticamente um parágrafo** (\`component="p"\`), porque o \`<h1>\` real da página já é o título da seção acima. Você tem só *um* \`<h1>\` por página por causa de acessibilidade — mas vários textos "tamanho h1" no design.

### Como usar:

\`\`\`tsx
import { Typography, Heading1, Body1 } from "@juscash/design-system";

function Example() {
  return (
    <>
      {/* Atalho — variant fixo, tag HTML default */}
      <Heading1>Título da página</Heading1>

      {/* Atalho + component — variant fixo, troca só a tag HTML */}
      <Heading1 component="p">Parece h1, mas é um <p> no DOM</Heading1>

      {/* Forma longa equivalente */}
      <Typography variant="heading1" component="p">
        Mesma coisa, escrito do jeito explícito
      </Typography>

      {/* Sem component, a tag default é aplicada (h1 pra Heading1, etc.) */}
      <Body1>Texto de apoio</Body1>
    </>
  );
}
\`\`\`

> Regra prática: escolha \`variant\` pelo que o **olho** precisa ver. Escolha \`component\` pelo que o **leitor de tela / Google / DOM** precisa entender. Se as duas coincidirem (o normal), você só usa o atalho.
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />

          <DocsPrimary />

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
    variant: {
      control: "select",
      options: ["heading1", "heading2", "heading3", "heading4", "heading5", "heading6", "body1", "body2", "caption"],
      description:
        "Define a **aparência visual** (tamanho da fonte e line-height). Não afeta a tag HTML — para isso, use `component`.",
    },
    component: {
      control: "select",
      options: [
        undefined,
        "p",
        "span",
        "strong",
        "b",
        "em",
        "i",
        "small",
        "mark",
        "del",
        "ins",
        "sub",
        "sup",
        "code",
        "pre",
        "kbd",
        "samp",
        "abbr",
        "cite",
        "q",
        "time",
        "label",
        "blockquote",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ],
      description:
        "Define a **tag HTML** renderizada (sem mudar o estilo). Quando omitida, usa o entrypoint default do Antd Typography (`Title`/`Paragraph`/`Text`).",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    variant: "body1",
    children: "Typography default text",
  },
};

export const HeadingVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Heading1>Heading 1</Heading1>
      <Heading2>Heading 2</Heading2>
      <Heading3>Heading 3</Heading3>
      <Heading4>Heading 4</Heading4>
      <Heading5>Heading 5</Heading5>
      <Heading6>Heading 6</Heading6>
    </div>
  ),
};

export const BodyVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Body1>Body 1 - Texto principal</Body1>
      <Body2>Body 2 - Texto secundário</Body2>
      <Caption>Caption - Legenda</Caption>
    </div>
  ),
};

/**
 * Demonstra que `variant` (aparência visual) e `component` (tag HTML) são
 * independentes. Use `variant` para o que o olho vê e `component` para o que
 * o navegador / leitor de tela / SEO entende.
 *
 * Pode-se ter um texto que **parece** um título mas é um parágrafo no DOM,
 * ou um pequeno bloco que parece um caption mas precisa ser um `<h6>` por
 * questão de hierarquia.
 */
export const VariantVsComponent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`variant` define a aparência (tamanho da fonte e altura de linha). `component` define a tag HTML renderizada. Compare a tag (visível no DevTools) com o tamanho do texto em cada exemplo abaixo.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "Inter" }}>
      <div>
        <p style={{ margin: 0, fontSize: 13, color: "#737373" }}>
          Tamanho de <code>heading1</code> (61px), mas semanticamente um <code>&lt;p&gt;</code>:
        </p>
        <Typography variant="heading1" component="p">
          Texto grande em parágrafo
        </Typography>
      </div>

      <div>
        <p style={{ margin: 0, fontSize: 13, color: "#737373" }}>
          Tamanho de <code>body1</code> (16px), mas semanticamente um <code>&lt;h2&gt;</code>:
        </p>
        <Typography variant="body1" component="h2">
          Texto pequeno em h2 (vira título pra leitor de tela)
        </Typography>
      </div>

      <div>
        <p style={{ margin: 0, fontSize: 13, color: "#737373" }}>
          Tamanho de <code>caption</code> (10px), mas semanticamente um <code>&lt;span&gt;</code> inline:
        </p>
        <Typography variant="caption" component="span">
          legenda inline (texto continua na mesma linha do contexto)
        </Typography>
      </div>

      <div>
        <p style={{ margin: 0, fontSize: 13, color: "#737373" }}>
          Mesmo conceito usando o atalho <code>Body1</code> (já fixa <code>variant="body1"</code> internamente):
        </p>
        <Body1 component="span">Body1 renderizado como span (inline, fica colado no texto vizinho)</Body1>
      </div>
    </div>
  ),
};

/**
 * Tabela de referência: tags HTML aceitas pela prop `component`.
 *
 * Todos os atalhos (`Heading1..6`, `Body1`, `Body2`, `Caption`) aceitam essa
 * prop também — ela troca **só a tag**, mantendo o estilo fixado pelo atalho.
 */
export const ComponentTagReference: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Valores aceitos pela prop `component`: `p`, `span`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`. Quando omitida, o componente usa a tag default do Antd (Title vira `<hN>`, Paragraph vira `<div>` no Antd 6, Text vira `<span>`).",
      },
    },
  },
  render: () => {
    const tags = [
      "p",
      "span",
      "strong",
      "b",
      "em",
      "i",
      "small",
      "mark",
      "del",
      "ins",
      "sub",
      "sup",
      "code",
      "pre",
      "kbd",
      "samp",
      "abbr",
      "cite",
      "q",
      "time",
      "label",
      "blockquote",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ] as const;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {tags.map((tag) => (
          <div key={tag} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <code style={{ fontSize: 12, color: "#737373", width: 120 }}>component="{tag}"</code>
            <Typography variant="body1" component={tag}>
              tag renderizada: &lt;{tag}&gt;
            </Typography>
          </div>
        ))}
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    variant: "body1",
    children: "Texto de exemplo controlado por args",
  },
};
