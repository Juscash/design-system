import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Typography,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Body1,
  Body2,
  Caption,
} from ".";

// Mapa hex -> rgb que o jsdom usa ao serializar `style.color`. Mantemos as duas
// formas para deixar explícito o link com o `colorMap` do componente.
const COLOR_RGB = {
  primary: "rgb(0, 134, 51)",       // #008633
  secondary: "rgb(16, 90, 188)",    // #105ABC
  neutral: "rgb(109, 109, 110)",    // #6d6d6e
  dark: "rgb(38, 38, 38)",          // #262626
  error: "rgb(210, 25, 11)",        // #D2190B
  warning: "rgb(134, 116, 0)",      // #867400
  success: "rgb(30, 126, 52)",      // #1E7E34
  disabled: "rgb(163, 163, 163)",   // #a3a3a3
  info: "rgb(32, 122, 195)",        // #207AC3
} as const;

// Observação importante: o Antd 6.2.2 implementa `Typography.Paragraph` com
// `component: "div"` (ver `node_modules/antd/lib/typography/Paragraph.js`).
// Portanto, `variant="body1"`, `variant="body2"`, `Body1` e `Body2` renderizam
// como `<div class="ant-typography">` e não como `<p>` (divergência conhecida
// com AC-100/101/109/110 — reportar ao implementer/parecerista). Os testes
// abaixo verificam o comportamento real do Antd e checam a classe nativa.

describe("Typography", () => {
  // -------------------------------------------------------------------------
  // 1. Renderização via prop `variant` (AC-094 a AC-102)
  // -------------------------------------------------------------------------
  describe("renderização de variantes via prop `variant`", () => {
    it("renderiza variant=heading1 como <h1>", () => {
      render(<Typography variant="heading1">Title 1</Typography>);
      const node = screen.getByRole("heading", { level: 1 });
      expect(node.tagName).toBe("H1");
      expect(node).toHaveTextContent("Title 1");
      expect(node).toHaveClass("ant-typography");
    });

    it("renderiza variant=heading2 como <h2>", () => {
      render(<Typography variant="heading2">Title 2</Typography>);
      const node = screen.getByRole("heading", { level: 2 });
      expect(node.tagName).toBe("H2");
      expect(node).toHaveTextContent("Title 2");
      expect(node).toHaveClass("ant-typography");
    });

    it("renderiza variant=heading3 como <h3>", () => {
      render(<Typography variant="heading3">Title 3</Typography>);
      const node = screen.getByRole("heading", { level: 3 });
      expect(node.tagName).toBe("H3");
      expect(node).toHaveTextContent("Title 3");
      expect(node).toHaveClass("ant-typography");
    });

    it("renderiza variant=heading4 como <h4>", () => {
      render(<Typography variant="heading4">Title 4</Typography>);
      const node = screen.getByRole("heading", { level: 4 });
      expect(node.tagName).toBe("H4");
      expect(node).toHaveTextContent("Title 4");
      expect(node).toHaveClass("ant-typography");
    });

    it("renderiza variant=heading5 como <h5>", () => {
      render(<Typography variant="heading5">Title 5</Typography>);
      const node = screen.getByRole("heading", { level: 5 });
      expect(node.tagName).toBe("H5");
      expect(node).toHaveTextContent("Title 5");
      expect(node).toHaveClass("ant-typography");
    });

    it("renderiza variant=heading6 como <h5> (limitação do Antd Title que aceita até level 5)", () => {
      render(<Typography variant="heading6">Title 6</Typography>);
      const node = screen.getByRole("heading", { level: 5 });
      expect(node.tagName).toBe("H5");
      expect(node).toHaveTextContent("Title 6");
      expect(node).toHaveClass("ant-typography");
    });

    it("renderiza variant=body1 como bloco de parágrafo com classe ant-typography", () => {
      // Antd Paragraph renderiza como <div>, não <p>.
      render(<Typography variant="body1">Body 1 text</Typography>);
      const node = screen.getByText("Body 1 text");
      expect(node).toHaveClass("ant-typography");
    });

    it("renderiza variant=body2 como bloco de parágrafo com classe ant-typography", () => {
      // Antd Paragraph renderiza como <div>, não <p>.
      render(<Typography variant="body2">Body 2 text</Typography>);
      const node = screen.getByText("Body 2 text");
      expect(node).toHaveClass("ant-typography");
    });

    it("renderiza variant=caption como <span> com classe ant-typography", () => {
      render(<Typography variant="caption">Caption text</Typography>);
      const node = screen.getByText("Caption text");
      expect(node.tagName).toBe("SPAN");
      expect(node).toHaveClass("ant-typography");
    });
  });

  // -------------------------------------------------------------------------
  // 2. Subcomponentes / atalhos (AC-103 a AC-111)
  // -------------------------------------------------------------------------
  describe("subcomponentes / atalhos", () => {
    it("Heading1 renderiza <h1>", () => {
      render(<Heading1>H1 atalho</Heading1>);
      const node = screen.getByRole("heading", { level: 1 });
      expect(node.tagName).toBe("H1");
      expect(node).toHaveTextContent("H1 atalho");
    });

    it("Heading2 renderiza <h2>", () => {
      render(<Heading2>H2 atalho</Heading2>);
      const node = screen.getByRole("heading", { level: 2 });
      expect(node.tagName).toBe("H2");
      expect(node).toHaveTextContent("H2 atalho");
    });

    it("Heading3 renderiza <h3>", () => {
      render(<Heading3>H3 atalho</Heading3>);
      const node = screen.getByRole("heading", { level: 3 });
      expect(node.tagName).toBe("H3");
      expect(node).toHaveTextContent("H3 atalho");
    });

    it("Heading4 renderiza <h4>", () => {
      render(<Heading4>H4 atalho</Heading4>);
      const node = screen.getByRole("heading", { level: 4 });
      expect(node.tagName).toBe("H4");
      expect(node).toHaveTextContent("H4 atalho");
    });

    it("Heading5 renderiza <h5>", () => {
      render(<Heading5>H5 atalho</Heading5>);
      const node = screen.getByRole("heading", { level: 5 });
      expect(node.tagName).toBe("H5");
      expect(node).toHaveTextContent("H5 atalho");
    });

    it("Heading6 renderiza <h5> (limitação do Antd Title)", () => {
      render(<Heading6>H6 atalho</Heading6>);
      const node = screen.getByRole("heading", { level: 5 });
      expect(node.tagName).toBe("H5");
      expect(node).toHaveTextContent("H6 atalho");
    });

    it("Body1 renderiza bloco com classe ant-typography (Antd Paragraph = <div>)", () => {
      render(<Body1>Body1 atalho</Body1>);
      const node = screen.getByText("Body1 atalho");
      expect(node).toHaveClass("ant-typography");
    });

    it("Body2 renderiza bloco com classe ant-typography (Antd Paragraph = <div>)", () => {
      render(<Body2>Body2 atalho</Body2>);
      const node = screen.getByText("Body2 atalho");
      expect(node).toHaveClass("ant-typography");
    });

    it("Caption renderiza <span>", () => {
      render(<Caption>Caption atalho</Caption>);
      const node = screen.getByText("Caption atalho");
      expect(node.tagName).toBe("SPAN");
      expect(node).toHaveClass("ant-typography");
    });
  });

  // -------------------------------------------------------------------------
  // 3. Cobertura de cores (AC-112 a AC-121)
  // -------------------------------------------------------------------------
  describe("resolução de cores via prop `color`", () => {
    it("color=primary aplica style.color #008633", () => {
      render(
        <Typography variant="body1" color="primary">primary</Typography>,
      );
      const node = screen.getByText("primary");
      expect(node).toHaveStyle({ color: COLOR_RGB.primary });
    });

    it("color=secondary aplica style.color #105ABC", () => {
      render(
        <Typography variant="body1" color="secondary">secondary</Typography>,
      );
      const node = screen.getByText("secondary");
      expect(node).toHaveStyle({ color: COLOR_RGB.secondary });
    });

    it("color=neutral aplica style.color #6d6d6e", () => {
      render(
        <Typography variant="body1" color="neutral">neutral</Typography>,
      );
      const node = screen.getByText("neutral");
      expect(node).toHaveStyle({ color: COLOR_RGB.neutral });
    });

    it("color=dark aplica style.color #262626", () => {
      render(
        <Typography variant="body1" color="dark">dark</Typography>,
      );
      const node = screen.getByText("dark");
      expect(node).toHaveStyle({ color: COLOR_RGB.dark });
    });

    it("color=error aplica style.color #D2190B", () => {
      render(
        <Typography variant="body1" color="error">error</Typography>,
      );
      const node = screen.getByText("error");
      expect(node).toHaveStyle({ color: COLOR_RGB.error });
    });

    it("color=warning aplica style.color #867400", () => {
      render(
        <Typography variant="body1" color="warning">warning</Typography>,
      );
      const node = screen.getByText("warning");
      expect(node).toHaveStyle({ color: COLOR_RGB.warning });
    });

    it("color=success aplica style.color #1E7E34", () => {
      render(
        <Typography variant="body1" color="success">success</Typography>,
      );
      const node = screen.getByText("success");
      expect(node).toHaveStyle({ color: COLOR_RGB.success });
    });

    it("color=disabled aplica style.color #a3a3a3", () => {
      render(
        <Typography variant="body1" color="disabled">disabled</Typography>,
      );
      const node = screen.getByText("disabled");
      expect(node).toHaveStyle({ color: COLOR_RGB.disabled });
    });

    it("color=info aplica style.color #207AC3", () => {
      render(
        <Typography variant="body1" color="info">info</Typography>,
      );
      const node = screen.getByText("info");
      expect(node).toHaveStyle({ color: COLOR_RGB.info });
    });

    it("sem prop `color` aplica o default `dark` (#262626)", () => {
      render(
        <Typography variant="body1">default color</Typography>,
      );
      const node = screen.getByText("default color");
      expect(node).toHaveStyle({ color: COLOR_RGB.dark });
    });
  });

  // -------------------------------------------------------------------------
  // 4. Pass-through e composição (AC-122 a AC-124)
  // -------------------------------------------------------------------------
  describe("pass-through das props do Antd", () => {
    it("repassa `className` para o elemento renderizado", () => {
      render(
        <Typography variant="body1" className="meu-css">
          custom class
        </Typography>,
      );
      const node = screen.getByText("custom class");
      expect(node).toHaveClass("meu-css");
      // continua tendo a classe nativa do Antd:
      expect(node).toHaveClass("ant-typography");
    });

    it("permite que `style` do consumidor sobrescreva o `color` do colorMap", () => {
      render(
        <Typography
          variant="body1"
          color="primary"
          style={{ color: "rebeccapurple" }}
        >
          override color
        </Typography>,
      );
      const node = screen.getByText("override color");
      // rebeccapurple = rgb(102, 51, 153)
      expect(node).toHaveStyle({ color: "rgb(102, 51, 153)" });
    });

    it("repassa props booleanas de ênfase do Antd (ex.: `strong`) para o DOM", () => {
      const { container } = render(
        <Typography variant="body1" strong>
          texto forte
        </Typography>,
      );
      // O Antd renderiza Paragraph com `strong` envolvendo o conteúdo em
      // <strong>. Verificamos a presença desse nó no DOM.
      const strongNode = container.querySelector("strong");
      expect(strongNode).not.toBeNull();
      expect(strongNode).toHaveTextContent("texto forte");
    });
  });
});
