import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Carousel } from "./Carousel";

import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL =
  "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4080-20929&m=dev";

type CarouselStoryProps = React.ComponentProps<typeof Carousel> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const meta: Meta<CarouselStoryProps> = {
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

### Como usar:

\`\`\`tsx
import { Carousel } from "@Juscash/design-system";

function Example() {
  return <Carousel autoplay showArrows />;
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
  tags: ["autodocs"],
  args: {
    hover: false,
    active: false,
    focus: false,
  },
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
  render: (args) => {
    const { hover, active, focus, className, ...props } = args;
    const pseudoClasses = [
      hover && "pseudo-hover",
      active && "pseudo-active",
      focus && "pseudo-focus-visible",
    ]
      .filter(Boolean)
      .join(" ");
    const mergedClassName = [className, pseudoClasses]
      .filter(Boolean)
      .join(" ");

    return (
      <div style={{ width: 600 }}>
        <Carousel {...props} className={mergedClassName} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<CarouselStoryProps>;

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  borderRadius: "8px",
};

export const Default: Story = {
  args: {
    showArrows: true,
    dots: true,
    autoplay: true,

    children: (
      <>
        <div>
          <h3 style={{ ...contentStyle, width: "100%" }}>1</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, width: "100%" }}>2</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, width: "100%" }}>3</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, width: "100%" }}>4</h3>
        </div>
      </>
    ),
  },
};

export const WithImages: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Carousel showArrows dots autoplay>
        <div>
          <img
            src="https://picsum.photos/400/200?random=1"
            style={{ borderRadius: 8, width: "100%" }}
            alt="1"
          />
        </div>
        <div>
          <img
            src="https://picsum.photos/400/200?random=2"
            style={{ borderRadius: 8, width: "100%" }}
            alt="2"
          />
        </div>
        <div>
          <img
            src="https://picsum.photos/400/200?random=3"
            style={{ borderRadius: 8, width: "100%" }}
            alt="3"
          />
        </div>
      </Carousel>
    </div>
  ),
};

export const FigmaExample: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <Carousel
        showArrows
        dots
        slidesToShow={3}
        slidesToScroll={1}
        style={{ textAlign: "center" }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} style={{ padding: "0 8px", width: "100%" }}>
            <div
              style={{
                height: 200,
                background: "#f5f5f5",
                borderRadius: 8,
                border: "1px dashed #d9d9d9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 5px",
              }}
            >
              Slot {i + 1}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  ),
};
