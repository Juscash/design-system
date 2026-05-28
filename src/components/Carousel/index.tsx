import React, { useRef } from "react";
import { Carousel as AntdCarousel, ConfigProvider } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CarouselProps } from "../../types/components/Carousel";
import "./index.module.css";

const DOT_SIZE = 6;
const ARROW_BUTTON_OFFSET = -32;
const ARROW_ICON_SIZE = 14;

interface ArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

/** Botão de seta de navegação do carousel. */
function ArrowButton({ direction, onClick }: ArrowButtonProps): React.ReactElement {
  const positionStyle: React.CSSProperties = {
    [direction]: ARROW_BUTTON_OFFSET,
  };
  const ariaLabel = direction === "left" ? "Slide anterior" : "Próximo slide";

  return (
    <button
      type="button"
      onClick={onClick}
      className="ds-carousel-arrow"
      style={positionStyle}
      aria-label={ariaLabel}
    >
      {direction === "left" ? <ArrowLeft size={ARROW_ICON_SIZE} /> : <ArrowRight size={ARROW_ICON_SIZE} />}
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
          },
        },
      }}
    >
      <div
        className="ds-carousel-root"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Carrossel"
      >
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
