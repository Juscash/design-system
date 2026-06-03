import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ScrollArea } from ".";
import { Separator } from "../Separator";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-20706&m=dev";

const VERTICAL_WIDTH = 189;
const VERTICAL_HEIGHT = 185;
const HORIZONTAL_WIDTH = 381;
const HORIZONTAL_HEIGHT = 240;
const BOTH_WIDTH = 320;
const BOTH_HEIGHT = 240;
const PHOTO_WIDTH = 150;
const PHOTO_HEIGHT = 200;
const ITEM_FONT_SIZE = 12;
const ITEM_LINE_HEIGHT = 1.3;
const ITEM_LETTER_SPACING = "0.18px";
const VERTICAL_PADDING_LEFT = 12;
const VERTICAL_PADDING_RIGHT = 4;
const CONTAINER_PADDING = 12;
const HORIZONTAL_GAP = 12;
const BOTH_GAP = 8;
const VERTICAL_ITEM_COUNT = 20;
const BOTH_GRID_SIZE = 20;
const BOTH_CELL_SIZE = 80;

const verticalItems: ReadonlyArray<string> = Array.from({ length: VERTICAL_ITEM_COUNT }, (): string => "Lorem ipsum");

const photos: ReadonlyArray<{ alt: string; src: string }> = [
  {
    alt: "Photo by Ornella Binni",
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=300&q=60",
  },
  {
    alt: "Photo by Tom Byrom",
    src: "https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?auto=format&fit=crop&w=300&q=60",
  },
  {
    alt: "Photo by Vladimir Malyav",
    src: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=300&q=60",
  },
];

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
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
Container que estiliza a scrollbar nativa para visual consistente entre
navegadores, mantendo o comportamento padrão de rolagem e a navegação por
teclado (setas, PageUp/PageDown). Não envolve componente do Antd — o Antd
não expõe equivalente direto de scroll container estilizado.

### Eixo principal

A prop \`orientation\` define a direção habilitada para rolagem:

- \`"vertical"\` (default): rolagem apenas no eixo Y.
- \`"horizontal"\`: rolagem apenas no eixo X.
- \`"both"\`: rolagem nos dois eixos.

### Tokens

- Container: \`bg\` neutral/50 (\`#fafafa\`), \`border\` border/regular (\`#d4d4d4\`),
  \`border-radius\` 5px.
- Scrollbar thumb: \`bg\` neutral/300 (\`#d4d4d4\`), \`border-radius\` 5px, espessura 8px.
- Track: transparente.

### Acessibilidade

- O container recebe \`tabIndex={0}\` por padrão, permitindo focar via Tab
  e usar Setas/PageUp/PageDown para rolar.
- Se um \`aria-label\` for fornecido, o papel \`region\` é aplicado
  automaticamente para tecnologias assistivas.

### Como usar

\`\`\`tsx
import { ScrollArea } from "@juscash/design-system";

<ScrollArea orientation="vertical" style={{ width: 189, height: 185 }}>
  {items.map((item) => <p key={item.id}>{item.label}</p>)}
</ScrollArea>
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
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal", "both"],
      description: "Eixo de rolagem. Vertical (default), horizontal ou ambos.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

const itemStyle: React.CSSProperties = {
  fontSize: ITEM_FONT_SIZE,
  lineHeight: ITEM_LINE_HEIGHT,
  letterSpacing: ITEM_LETTER_SPACING,
  color: "var(--color-text-dark)",
  padding: `${BOTH_GAP}px 0`,
  margin: 0,
};

/** Variante padrão (vertical). Lista de 20 itens "Lorem ipsum" separados por linhas horizontais. */
export const Default: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <ScrollArea
      {...args}
      style={{
        width: VERTICAL_WIDTH,
        height: VERTICAL_HEIGHT,
        paddingLeft: VERTICAL_PADDING_LEFT,
        paddingRight: VERTICAL_PADDING_RIGHT,
      }}
    >
      {verticalItems.map((label, index) => (
        <React.Fragment key={`${label}-${index}`}>
          <p style={itemStyle}>{label}</p>
          {index < verticalItems.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </ScrollArea>
  ),
};

/** Variante horizontal. Três fotos lado a lado em um container estreito que força a rolagem horizontal. */
export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <ScrollArea
      {...args}
      style={{
        width: HORIZONTAL_WIDTH,
        height: HORIZONTAL_HEIGHT,
        padding: CONTAINER_PADDING,
      }}
    >
      <div style={{ display: "flex", gap: HORIZONTAL_GAP }}>
        {photos.map((photo) => (
          <figure key={photo.alt} style={{ margin: 0, flexShrink: 0 }}>
            <img
              src={photo.src}
              alt={photo.alt}
              width={PHOTO_WIDTH}
              height={PHOTO_HEIGHT}
              style={{ display: "block", borderRadius: 4, objectFit: "cover" }}
            />
            <figcaption style={{ ...itemStyle, paddingTop: BOTH_GAP }}>{photo.alt}</figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  ),
};

/** Variante com rolagem em ambos os eixos. Grade larga e alta força a rolagem nas duas direções. */
export const Both: Story = {
  args: {
    orientation: "both",
  },
  render: (args) => (
    <ScrollArea
      {...args}
      style={{
        width: BOTH_WIDTH,
        height: BOTH_HEIGHT,
        padding: CONTAINER_PADDING,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${BOTH_GRID_SIZE}, ${BOTH_CELL_SIZE}px)`,
          gap: BOTH_GAP,
        }}
      >
        {Array.from({ length: BOTH_GRID_SIZE * BOTH_GRID_SIZE }).map((_, index) => (
          <div
            key={index}
            style={{
              width: BOTH_CELL_SIZE,
              height: BOTH_CELL_SIZE,
              background: "var(--color-neutral-100)",
              border: "1px solid var(--color-border-regular)",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: ITEM_FONT_SIZE,
              color: "var(--color-text-soft)",
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

/** Playground controlado por args. Use os controles para alternar a orientação. */
export const Playground: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <ScrollArea {...args} style={{ width: VERTICAL_WIDTH, height: VERTICAL_HEIGHT, padding: CONTAINER_PADDING }}>
      <p style={itemStyle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis odio nec libero iaculis iaculis id a
        velit. Nulla facilisi. Etiam non eros sit amet ipsum aliquam ultricies. Donec ac arcu vitae nibh suscipit
        bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean vitae
        nisl in dolor cursus dapibus.
      </p>
    </ScrollArea>
  ),
};
