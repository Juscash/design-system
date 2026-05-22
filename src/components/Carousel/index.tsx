import React, { useRef } from "react";
import { Carousel as AntdCarousel, ConfigProvider } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { designSystemColors, radius } from "../../theme";
import type { CarouselProps } from "../../types/components/Carousel";
import "./index.module.css";

const DOT_SIZE = 6;
const DOT_ACTIVE_WIDTH = 24;
const ARROW_BUTTON_OFFSET = -32;
const ARROW_BUTTON_SIZE = 24;
const ARROW_ICON_SIZE = 14;

interface ArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

function ArrowButton({ direction, onClick }: ArrowButtonProps): React.ReactElement {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(calc(-50% - 15px))",
        [direction]: ARROW_BUTTON_OFFSET,
        zIndex: 10,
        backgroundColor: "transparent",
        border: `1px solid ${designSystemColors.neutral[300]}`,
        borderRadius: radius.md,
        width: ARROW_BUTTON_SIZE,
        height: ARROW_BUTTON_SIZE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: "4px 8px",
        color: designSystemColors.neutral[800],
      }}
    >
      {direction === "left" ? <ChevronLeft size={ARROW_ICON_SIZE} /> : <ChevronRight size={ARROW_ICON_SIZE} />}
    </button>
  );
}

ArrowButton.displayName = "ArrowButton";

/**
 * Carousel do design system. Adiciona setas customizadas com paleta DS por
 * padrão (controle via `showArrows`). Estilos próprios em `index.module.css`.
 */
export const Carousel: React.FC<CarouselProps> = ({ children, showArrows = true, dots = true, ...rest }) => {
  const carouselRef = useRef<CarouselRef>(null);

  const handlePrev = (): void => {
    carouselRef.current?.prev();
  };

  const handleNext = (): void => {
    carouselRef.current?.next();
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            dotWidth: DOT_SIZE,
            dotHeight: DOT_SIZE,
            dotActiveWidth: DOT_ACTIVE_WIDTH,
          },
        },
      }}
    >
      <div className="ds-carousel-root">
        {showArrows && <ArrowButton direction="left" onClick={handlePrev} />}
        <AntdCarousel ref={carouselRef} dots={dots} {...rest}>
          {children}
        </AntdCarousel>
        {showArrows && <ArrowButton direction="right" onClick={handleNext} />}
      </div>
    </ConfigProvider>
  );
};

Carousel.displayName = "Carousel";

export type { CarouselProps } from "../../types/components/Carousel";
