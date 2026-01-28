import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Carousel } from "./Carousel";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Carrossel exibe uma sequência de conteúdos que podem ser navegados horizontalmente.",
      },
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
    children: (
      <>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
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
      {/* Example simulating Figma slots with text content */}
      <Carousel
        showArrows
        dots
        slidesToShow={3}
        slidesToScroll={1}
        style={{ textAlign: "center" }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} style={{ padding: "0 8px" }}>
            <div
              style={{
                height: 200,
                background: "#f5f5f5",
                borderRadius: 8,
                border: "1px dashed #d9d9d9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 5px", // gap simulation
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
