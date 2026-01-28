import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Carousel } from "./Carousel";

// Mock matchMedia for Slick Carousel
beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
});

describe("Carousel", () => {
  it("renders children correctly", () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>,
    );
    // Slick carousel duplicates slides for infinite scroll, so we use getAllByText
    expect(screen.getAllByText("Slide 1")[0]).toBeInTheDocument();
  });

  it("renders arrows when showArrows is true", () => {
    // We can't easily test the click interaction with standard testing-library on React Slick without more complex setup,
    // but we can check if our custom buttons are rendered.
    // Our buttons are standard <button> elements with Chevron icons.
    // Usually buttons effectively have role="button".
    const { container } = render(
      <Carousel showArrows={true}>
        <div>Slide 1</div>
      </Carousel>,
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
