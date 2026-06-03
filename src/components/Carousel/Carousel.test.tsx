import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Carousel } from ".";

/**
 * Mock do antd/Carousel para isolar o componente do react-slick no jsdom.
 *
 * O slick original depende de medições de layout do navegador para atualizar
 * classes DOM após chamadas de next()/prev(), o que não ocorre no jsdom.
 * O mock expõe espiões rastreáveis via useImperativeHandle para verificar
 * que os botões de seta acionam corretamente a navegação do carrossel.
 *
 * ConfigProvider e demais exports de antd são preservados via importOriginal.
 */
const mockSlickPrev = vi.fn();
const mockSlickNext = vi.fn();

vi.mock("antd", async (importOriginal) => {
  const actual = await importOriginal<typeof import("antd")>();

  const MockAntdCarousel = React.forwardRef<
    { prev: () => void; next: () => void; goTo: () => void; autoPlay: () => void; innerSlider: object },
    { children?: React.ReactNode; dots?: boolean; className?: string }
  >(({ children, dots = true, className }, ref) => {
    React.useImperativeHandle(ref, () => ({
      prev: mockSlickPrev,
      next: mockSlickNext,
      goTo: vi.fn(),
      autoPlay: vi.fn(),
      innerSlider: {},
    }));

    return (
      <div className="ant-carousel">
        <div className={`slick-slider${className ? ` ${className}` : ""}`}>
          {children}
          {dots && (
            <ul className="slick-dots slick-dots-bottom">
              <li className="slick-active">
                <button>1</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  });

  MockAntdCarousel.displayName = "Carousel";

  return { ...actual, Carousel: MockAntdCarousel };
});

describe("Carousel", () => {
  beforeEach(() => {
    mockSlickPrev.mockClear();
    mockSlickNext.mockClear();
  });

  /**
   * 1. Render básico com 3 slides (children divs).
   */
  it("renderiza 3 slides passados como children", () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>,
    );

    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
    expect(screen.getByText("Slide 3")).toBeInTheDocument();
  });

  /**
   * 2. Setas presentes com aria-label correto.
   */
  it("exibe botão de seta esquerda com aria-label Slide anterior", () => {
    render(
      <Carousel>
        <div>Slide 1</div>
      </Carousel>,
    );

    expect(screen.getByRole("button", { name: "Slide anterior" })).toBeInTheDocument();
  });

  it("exibe botão de seta direita com aria-label Próximo slide", () => {
    render(
      <Carousel>
        <div>Slide 1</div>
      </Carousel>,
    );

    expect(screen.getByRole("button", { name: "Próximo slide" })).toBeInTheDocument();
  });

  /**
   * 3. Container raiz com role="region" e aria-roledescription="carrossel".
   */
  it("container raiz possui role=region", () => {
    const { container } = render(
      <Carousel>
        <div>Slide 1</div>
      </Carousel>,
    );

    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute("role", "region");
  });

  it("container raiz possui aria-roledescription=carrossel", () => {
    const { container } = render(
      <Carousel>
        <div>Slide 1</div>
      </Carousel>,
    );

    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute("aria-roledescription", "carrossel");
  });

  /**
   * 4. Clicar em "Próximo slide" aciona next() no carousel interno.
   */
  it("clicar em Próximo slide chama next no carousel interno", () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Próximo slide" }));

    expect(mockSlickNext).toHaveBeenCalledTimes(1);
  });

  /**
   * 5. Clicar em "Slide anterior" aciona prev() no carousel interno.
   */
  it("clicar em Slide anterior chama prev no carousel interno", () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Slide anterior" }));

    expect(mockSlickPrev).toHaveBeenCalledTimes(1);
  });

  /**
   * 6. showArrows={false} esconde os botões de seta.
   */
  it("showArrows=false não renderiza o botão Slide anterior", () => {
    render(
      <Carousel showArrows={false}>
        <div>Slide 1</div>
      </Carousel>,
    );

    expect(screen.queryByRole("button", { name: "Slide anterior" })).not.toBeInTheDocument();
  });

  it("showArrows=false não renderiza o botão Próximo slide", () => {
    render(
      <Carousel showArrows={false}>
        <div>Slide 1</div>
      </Carousel>,
    );

    expect(screen.queryByRole("button", { name: "Próximo slide" })).not.toBeInTheDocument();
  });

  /**
   * 7. dots={false} esconde os dots de paginação.
   */
  it("dots=false não renderiza a lista de paginação slick-dots", () => {
    const { container } = render(
      <Carousel dots={false}>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>,
    );

    expect(container.querySelector(".slick-dots")).not.toBeInTheDocument();
  });

  /**
   * 8. className do consumer é aplicado ao wrapper interno do slick.
   */
  it("className do consumer é preservado no wrapper slick-slider interno", () => {
    const { container } = render(
      <Carousel className="consumer-custom-class">
        <div>Slide 1</div>
      </Carousel>,
    );

    const slickSlider = container.querySelector(".slick-slider");
    expect(slickSlider).toHaveClass("consumer-custom-class");
  });

  /**
   * 9. displayName === "Carousel".
   */
  it('Carousel.displayName é "Carousel"', () => {
    expect(Carousel.displayName).toBe("Carousel");
  });
});
