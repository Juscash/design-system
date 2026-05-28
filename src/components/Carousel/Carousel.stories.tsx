import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Carousel } from ".";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-20929&m=dev";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Carrossel exibe uma sequência de conteúdos que podem ser navegados horizontalmente.
Baseado no [Ant Design Carousel](https://ant.design/components/carousel).

### Props:
- **Extended (Ant Design)**: Props padrão do AntD Carousel.
- **showArrows**: Exibe setas de navegação (24×24px, borda neutral[300]).

### Dots (indicadores de página):
- Todos os dots têm 6×6px (ativo e inativo têm mesmo tamanho).
- Inativo: cor neutral[400]; Ativo: cor neutral[800].
- Container: bg rgba(255,255,255,0.5), padding 4px, gap 4px, radius 8px.

### Setas:
- 24×24px, border 1px neutral[300], bg transparente, padding 4px 8px, radius 4px (radius.md), ícone 14px.
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
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>
              Figma Spec
            </h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showArrows: {
      control: "boolean",
      description: "Exibe setas de navegação",
    },
    dots: {
      control: "boolean",
      description: "Exibe indicadores de página",
    },
    autoplay: {
      control: "boolean",
      description: "Reprodução automática",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

/** Slot placeholder representando um card do Figma (bg white, border, shadow, p-6, radius xl). */
const SlotBox = ({ height = 200 }: { height?: number }) => (
  <div
    style={{
      height,
      background: "#ffffff",
      borderRadius: 8,
      border: "1px solid #d4d4d4",
      boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px dashed #9747ff",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#c89dff",
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      Slot
    </div>
  </div>
);

// ─── Figma: 1 slide ─────────────────────────────────────────────────────────

export const OneSlide: Story = {
  name: "1 Slide (Figma)",
  render: () => (
    <div style={{ width: 342 }}>
      <Carousel showArrows dots>
        <div><SlotBox /></div>
        <div><SlotBox /></div>
        <div><SlotBox /></div>
        <div><SlotBox /></div>
      </Carousel>
    </div>
  ),
};

// ─── Figma: 2 slides ────────────────────────────────────────────────────────

export const TwoSlides: Story = {
  name: "2 Slides (Figma)",
  render: () => (
    <div style={{ width: 460 }}>
      <Carousel showArrows dots slidesToShow={2} slidesToScroll={1}>
        <div><SlotBox height={160} /></div>
        <div><SlotBox height={160} /></div>
        <div><SlotBox height={160} /></div>
        <div><SlotBox height={160} /></div>
        <div><SlotBox height={160} /></div>
        <div><SlotBox height={160} /></div>
      </Carousel>
    </div>
  ),
};

// ─── Figma: 3 slides ────────────────────────────────────────────────────────

export const ThreeSlides: Story = {
  name: "3 Slides (Figma)",
  render: () => (
    <div style={{ width: 684 }}>
      <Carousel showArrows dots slidesToShow={3} slidesToScroll={1}>
        <div><SlotBox height={200} /></div>
        <div><SlotBox height={200} /></div>
        <div><SlotBox height={200} /></div>
        <div><SlotBox height={200} /></div>
        <div><SlotBox height={200} /></div>
        <div><SlotBox height={200} /></div>
        <div><SlotBox height={200} /></div>
        <div><SlotBox height={200} /></div>
        <div><SlotBox height={200} /></div>
      </Carousel>
    </div>
  ),
};

// ─── Figma: com imagem (1 slide) ────────────────────────────────────────────

export const WithImage1Slide: Story = {
  name: "Com imagem — 1 Slide (Figma)",
  render: () => (
    <div style={{ width: 342 }}>
      <Carousel showArrows dots>
        <div>
          <img
            src="https://picsum.photos/400/250?random=1"
            alt="Slide 1"
            style={{ width: "100%", borderRadius: 10, boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)", objectFit: "cover", display: "block" }}
          />
        </div>
        <div>
          <img
            src="https://picsum.photos/400/250?random=2"
            alt="Slide 2"
            style={{ width: "100%", borderRadius: 10, boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)", objectFit: "cover", display: "block" }}
          />
        </div>
        <div>
          <img
            src="https://picsum.photos/400/250?random=3"
            alt="Slide 3"
            style={{ width: "100%", borderRadius: 10, boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)", objectFit: "cover", display: "block" }}
          />
        </div>
        <div>
          <img
            src="https://picsum.photos/400/250?random=4"
            alt="Slide 4"
            style={{ width: "100%", borderRadius: 10, boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)", objectFit: "cover", display: "block" }}
          />
        </div>
      </Carousel>
    </div>
  ),
};

// ─── Figma: com imagem (3 slides) ───────────────────────────────────────────

export const WithImage3Slides: Story = {
  name: "Com imagem — 3 Slides (Figma)",
  render: () => (
    <div style={{ width: 684 }}>
      <Carousel showArrows dots slidesToShow={3} slidesToScroll={1}>
        <div>
          <img src="https://picsum.photos/250/350?random=11" alt="Slide 1" style={{ width: "100%", height: 277, borderRadius: 10, boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)", objectFit: "cover", display: "block" }} />
        </div>
        <div>
          <img src="https://picsum.photos/250/350?random=12" alt="Slide 2" style={{ width: "100%", height: 277, borderRadius: 10, boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)", objectFit: "cover", display: "block" }} />
        </div>
        <div>
          <img src="https://picsum.photos/250/350?random=13" alt="Slide 3" style={{ width: "100%", height: 277, borderRadius: 10, boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)", objectFit: "cover", display: "block" }} />
        </div>
        <div>
          <img src="https://picsum.photos/250/350?random=14" alt="Slide 4" style={{ width: "100%", height: 277, borderRadius: 10, boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)", objectFit: "cover", display: "block" }} />
        </div>
        <div>
          <img src="https://picsum.photos/250/350?random=15" alt="Slide 5" style={{ width: "100%", height: 277, borderRadius: 10, boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)", objectFit: "cover", display: "block" }} />
        </div>
        <div>
          <img src="https://picsum.photos/250/350?random=16" alt="Slide 6" style={{ width: "100%", height: 277, borderRadius: 10, boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)", objectFit: "cover", display: "block" }} />
        </div>
      </Carousel>
    </div>
  ),
};

// ─── Default (playground) ───────────────────────────────────────────────────

export const Default: Story = {
  args: {
    showArrows: true,
    dots: true,
    autoplay: false,
    children: (
      <>
        <div><SlotBox /></div>
        <div><SlotBox /></div>
        <div><SlotBox /></div>
        <div><SlotBox /></div>
      </>
    ),
  },
  render: (args) => (
    <div style={{ width: 600 }}>
      <Carousel {...args} />
    </div>
  ),
};
