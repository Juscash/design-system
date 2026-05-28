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

### Como usar:

\`\`\`tsx
import { Typography, Heading1, Body1 } from "@juscash/design-system";

function Example() {
  return (
    <>
      <Heading1>Title</Heading1>
      <Body1>Texto de apoio</Body1>
      <Typography variant="caption">Caption</Typography>
    </>
  );
}
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

export const Playground: Story = {
  args: {
    variant: "body1",
    children: "Texto de exemplo controlado por args",
  },
};
