import React, { useRef } from "react";
import { Carousel as AntdCarousel, ConfigProvider } from "antd";
import type { CarouselProps as AntdCarouselProps, CarouselRef } from "antd/es/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { designSystemColors, radius } from "../../theme";

export interface CarouselProps extends AntdCarouselProps {
  showArrows?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({ children, showArrows = true, dots = true, ...rest }) => {
  const carouselRef = useRef<CarouselRef>(null);

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const ArrowButton = ({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) => (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(calc(-50% - 15px))",
        [direction]: -32,
        zIndex: 10,
        backgroundColor: "transparent",
        border: `1px solid ${designSystemColors.neutral[300]}`,
        borderRadius: radius.md,
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: "4px 8px",
        color: designSystemColors.neutral[800],
      }}
    >
      {direction === "left" ?
        <ChevronLeft size={14} />
      : <ChevronRight size={14} />}
    </button>
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            dotWidth: 6,
            dotHeight: 6,
            dotActiveWidth: 24,
          },
        },
      }}
    >
      <div
        style={{
          position: "relative",
          margin: "0 40px",
          paddingBottom: "30px",
        }}
      >
        {showArrows && <ArrowButton direction="left" onClick={handlePrev} />}
        <AntdCarousel ref={carouselRef} dots={dots} {...rest}>
          {children}
        </AntdCarousel>
        {showArrows && <ArrowButton direction="right" onClick={handleNext} />}
      </div>

      <style>{`
        .ant-carousel .slick-slide {
          text-align: center;
          height: auto;
          background: transparent;
          overflow: hidden;
        }

        .ant-carousel .slick-slide > div {
          padding: 0 8px;
        }

        .ant-carousel .slick-dots {
          position: absolute;
          bottom: -25px !important;
          left: 0;
          right: 0;
          display: flex !important;
          justify-content: center;
          align-items: center;
          padding: 4px;
          margin: 0 auto;
          list-style: none;
          background: rgba(255, 255, 255, 0.5);
          border-radius: ${radius.xl}px;
          width: fit-content;
          gap: 4px;
        }

        .ant-carousel .slick-dots li {
          width: 6px;
          height: 6px;
          margin: 0;
          display: inline-block;
        }

        .ant-carousel .slick-dots li button {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${designSystemColors.neutral[400]} !important;
          opacity: 1 !important;
          transition: all 0.3s;
          border: none;
        }

        .ant-carousel .slick-dots li.slick-active {
          width: 24px;
        }

        .ant-carousel .slick-dots li.slick-active button {
          width: 24px;
          border-radius: 4px;
          background: ${designSystemColors.neutral[800]} !important;
        }
      `}</style>
    </ConfigProvider>
  );
};

Carousel.displayName = "Carousel";
