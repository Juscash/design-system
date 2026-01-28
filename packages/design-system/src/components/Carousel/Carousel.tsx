"use client";

import React, { useRef } from "react";
import { Carousel as AntdCarousel, ConfigProvider } from "antd";
import type {
  CarouselProps as AntdCarouselProps,
  CarouselRef,
} from "antd/es/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { designSystemColors, radius } from "../../theme";

// ============================================
// TYPES
// ============================================

export interface CarouselProps extends AntdCarouselProps {
  showArrows?: boolean;
}

// ============================================
// COMPONENT
// ============================================

// ============================================
// COMPONENT
// ============================================

export const Carousel: React.FC<CarouselProps> = ({
  children,
  showArrows = true,
  dots = true,
  ...rest
}) => {
  const carouselRef = useRef<CarouselRef>(null);

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const ArrowButton = ({
    direction,
    onClick,
  }: {
    direction: "left" | "right";
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        [direction]: -40, // Move further out
        zIndex: 10,
        backgroundColor: designSystemColors.neutral[50],
        border: `1px solid ${designSystemColors.neutral[200]}`,
        borderRadius: radius.md, // 4px squircle
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        color: designSystemColors.neutral[800],
      }}
    >
      {direction === "left" ? (
        <ChevronLeft size={16} />
      ) : (
        <ChevronRight size={16} />
      )}
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
      {/* Increased margin to accommodate arrows outside */}
      <div
        style={{
          position: "relative",
          margin: "0 50px",
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
        /* Fix for potential stacking issue if slick css is missing */
        .ant-carousel .slick-slide {
          text-align: center;
          height: auto; // Ensure it doesn't collapse
          background: transparent;
          overflow: hidden;
        }
        
        /* Positioning dots below the content */
        .ant-carousel .slick-dots {
          position: absolute;
          bottom: -25px !important; /* Move below the content */
          left: 0;
          right: 0;
          display: flex !important;
          justify-content: center;
          align-items: center;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .ant-carousel .slick-dots li {
          width: 6px;
          height: 6px;
          margin: 0 4px;
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
