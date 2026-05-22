import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Typography, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Body1, Body2, Caption } from ".";

import { Title, Subtitle, Description, Primary as DocsPrimary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "";

type TypographyStoryProps = React.ComponentProps<typeof Typography> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const getPseudoClassName = (args: { hover?: boolean; active?: boolean; focus?: boolean; className?: string }) => {
  const pseudoClasses = [args.hover && "pseudo-hover", args.active && "pseudo-active", args.focus && "pseudo-focus-visible"]
    .filter(Boolean)
    .join(" ");

  return [args.className, pseudoClasses].filter(Boolean).join(" ");
};

const meta: Meta<TypographyStoryProps> = {
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
- **Cores**: \`primary\`, \`secondary\`, \`neutral\`, \`dark\`, \`error\`, \`warning\`, \`success\`, \`disabled\`.
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
              🎨 Figma Spec
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
      options: ["primary", "secondary", "neutral", "dark", "error", "warning", "success", "disabled"],
    },
    hover: {
      control: "boolean",
      description: "Força o estado hover",
      table: { category: "Pseudo States" },
    },
    active: {
      control: "boolean",
      description: "Força o estado active",
      table: { category: "Pseudo States" },
    },
    focus: {
      control: "boolean",
      description: "Força o estado focus",
      table: { category: "Pseudo States" },
    },
  },
  args: {
    hover: false,
    active: false,
    focus: false,
  },
  render: (args) => {
    const { hover, active, focus, className, ...props } = args;
    const mergedClassName = getPseudoClassName({
      hover,
      active,
      focus,
      className,
    });

    return <Typography {...props} className={mergedClassName} />;
  },
};

export default meta;
type Story = StoryObj<TypographyStoryProps>;

export const Default: Story = {
  args: {
    variant: "body1",
    children: "Typography default text",
  },
};

export const HeadingVariants: Story = {
  render: (args) => {
    const mergedClassName = getPseudoClassName(args);

    return (
      <div className={mergedClassName} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Heading1>Heading 1</Heading1>
        <Heading2>Heading 2</Heading2>
        <Heading3>Heading 3</Heading3>
        <Heading4>Heading 4</Heading4>
        <Heading5>Heading 5</Heading5>
        <Heading6>Heading 6</Heading6>
      </div>
    );
  },
};

export const BodyVariants: Story = {
  render: (args) => {
    const mergedClassName = getPseudoClassName(args);

    return (
      <div className={mergedClassName} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Body1>Body 1 - Texto principal</Body1>
        <Body2>Body 2 - Texto secundário</Body2>
        <Caption>Caption - Legenda</Caption>
      </div>
    );
  },
};

export const ColorVariants: Story = {
  render: (args) => {
    const mergedClassName = getPseudoClassName(args);

    return (
      <div className={mergedClassName} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography color="primary">Primary Color</Typography>
        <Typography color="secondary">Secondary Color</Typography>
        <Typography color="neutral">Neutral Color</Typography>
        <Typography color="dark">Dark Color</Typography>
        <Typography color="error">Error Color</Typography>
        <Typography color="success">Success Color</Typography>
        <Typography color="warning">Warning Color</Typography>
        <Typography color="disabled">Disabled Color</Typography>
      </div>
    );
  },
};

export const InlineStyles: Story = {
  render: (args) => {
    const mergedClassName = getPseudoClassName(args);

    return (
      <div className={mergedClassName} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography strong>Texto com bold</Typography>
        <Typography italic>Texto com italic</Typography>
        <Typography underline>Texto com underline</Typography>
        <Typography delete>Texto com delete</Typography>
        <Typography code>Texto com code</Typography>
      </div>
    );
  },
};

export const ParagraphExample: Story = {
  render: (args) => {
    const mergedClassName = getPseudoClassName(args);

    return (
      <div className={mergedClassName} style={{ maxWidth: 520 }}>
        <Typography variant="body1">
          Este e um exemplo de paragrafo com comprimento maior para avaliar leitura, espacamento e contraste. Use Body1 para
          textos principais e Body2 para textos secundarios.
        </Typography>
        <Typography variant="body2" color="neutral">
          Texto secundario com cor neutral para reduzir enfase visual.
        </Typography>
      </div>
    );
  },
};
