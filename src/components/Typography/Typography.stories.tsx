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

### Features Juscash:
- **Variantes**: \`heading1\` a \`heading6\`, \`body1\`, \`body2\`, \`caption\`.
- **Cores**: \`primary\`, \`secondary\`, \`neutral\`, \`dark\`, \`error\`, \`warning\`, \`success\`, \`disabled\`, \`info\`.
- **Componentes prontos**: \`Heading1..6\`, \`Body1\`, \`Body2\`, \`Caption\`.

### Como usar:

\`\`\`tsx
import { Typography, Heading1, Body1 } from "@juscash/design-system";

function Example() {
  return (
    <>
      <Heading1>Title</Heading1>
      <Body1 color="neutral">Texto de apoio</Body1>
      <Typography variant="caption" color="disabled">Caption</Typography>
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
    color: {
      control: "select",
      options: ["primary", "secondary", "neutral", "dark", "error", "warning", "success", "disabled", "info"],
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

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography color="primary">Primary Color</Typography>
      <Typography color="secondary">Secondary Color</Typography>
      <Typography color="neutral">Neutral Color</Typography>
      <Typography color="dark">Dark Color</Typography>
      <Typography color="error">Error Color</Typography>
      <Typography color="success">Success Color</Typography>
      <Typography color="warning">Warning Color</Typography>
      <Typography color="disabled">Disabled Color</Typography>
      <Typography color="info">Info Color</Typography>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: "body1",
    color: "dark",
    children: "Texto de exemplo controlado por args",
  },
};
