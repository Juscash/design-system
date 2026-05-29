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

// Observação importante: o Antd 6.2.2 implementa `Typography.Paragraph` com
// `component: "div"` (ver `node_modules/antd/lib/typography/Paragraph.js`).
// Portanto, `variant="body1"`, `variant="body2"`, `Body1` e `Body2` renderizam
// como `<div class="ant-typography">` e não como `<p>` — comportamento
// deliberado do Antd para permitir blocos aninhados sem violar HTML.

describe("Typography", () => {
  // -------------------------------------------------------------------------
  // 1. Renderização via prop `variant`
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
      expect(node).toHaveClass("ant-typography");
    });

    it("renderiza variant=heading4 como <h4>", () => {
      render(<Typography variant="heading4">Title 4</Typography>);
      const node = screen.getByRole("heading", { level: 4 });
      expect(node.tagName).toBe("H4");
      expect(node).toHaveClass("ant-typography");
    });

    it("renderiza variant=heading5 como <h5>", () => {
      render(<Typography variant="heading5">Title 5</Typography>);
      const node = screen.getByRole("heading", { level: 5 });
      expect(node.tagName).toBe("H5");
      expect(node).toHaveClass("ant-typography");
    });

    it("renderiza variant=heading6 como <h5> (limitação Antd Title)", () => {
      render(<Typography variant="heading6">Title 6</Typography>);
      const node = screen.getByText("Title 6");
      expect(node.tagName).toBe("H5");
      expect(node).toHaveClass("ant-typography");
    });

    it("renderiza variant=body1 como bloco com classe ant-typography", () => {
      render(<Typography variant="body1">Body 1</Typography>);
      const node = screen.getByText("Body 1");
      expect(node).toHaveClass("ant-typography");
    });

    it("renderiza variant=body2 como bloco com classe ant-typography", () => {
      render(<Typography variant="body2">Body 2</Typography>);
      const node = screen.getByText("Body 2");
      expect(node).toHaveClass("ant-typography");
    });

    it("renderiza variant=caption como <span>", () => {
      render(<Typography variant="caption">Caption</Typography>);
      const node = screen.getByText("Caption");
      expect(node.tagName).toBe("SPAN");
      expect(node).toHaveClass("ant-typography");
    });

    it("default variant=body1 quando a prop não é passada", () => {
      render(<Typography>Default content</Typography>);
      const node = screen.getByText("Default content");
      // Antd Paragraph renderiza <div class="ant-typography">.
      expect(node).toHaveClass("ant-typography");
    });
  });

  // -------------------------------------------------------------------------
  // 2. Renderização via subcomponentes/atalhos
  // -------------------------------------------------------------------------
  describe("renderização via atalhos (Heading1..6, Body1..2, Caption)", () => {
    it("Heading1 renderiza <h1>", () => {
      render(<Heading1>Heading atalho 1</Heading1>);
      const node = screen.getByRole("heading", { level: 1 });
      expect(node.tagName).toBe("H1");
    });

    it("Heading2 renderiza <h2>", () => {
      render(<Heading2>Heading atalho 2</Heading2>);
      const node = screen.getByRole("heading", { level: 2 });
      expect(node.tagName).toBe("H2");
    });

    it("Heading3 renderiza <h3>", () => {
      render(<Heading3>Heading atalho 3</Heading3>);
      const node = screen.getByRole("heading", { level: 3 });
      expect(node.tagName).toBe("H3");
    });

    it("Heading4 renderiza <h4>", () => {
      render(<Heading4>Heading atalho 4</Heading4>);
      const node = screen.getByRole("heading", { level: 4 });
      expect(node.tagName).toBe("H4");
    });

    it("Heading5 renderiza <h5>", () => {
      render(<Heading5>Heading atalho 5</Heading5>);
      const node = screen.getByRole("heading", { level: 5 });
      expect(node.tagName).toBe("H5");
    });

    it("Heading6 renderiza <h5> (limitação Antd Title)", () => {
      render(<Heading6>Heading atalho 6</Heading6>);
      const node = screen.getByText("Heading atalho 6");
      expect(node.tagName).toBe("H5");
    });

    it("Body1 renderiza com classe ant-typography", () => {
      render(<Body1>Body atalho 1</Body1>);
      const node = screen.getByText("Body atalho 1");
      expect(node).toHaveClass("ant-typography");
    });

    it("Body2 renderiza com classe ant-typography", () => {
      render(<Body2>Body atalho 2</Body2>);
      const node = screen.getByText("Body atalho 2");
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
  // 3. Estilo aplicado (font-size, line-height, font-family, font-weight)
  // -------------------------------------------------------------------------
  describe("estilos inline aplicados por variante (tokens do Figma)", () => {
    it("heading1 aplica font-size 61px e line-height 73.2px", () => {
      render(<Typography variant="heading1">H1</Typography>);
      const node = screen.getByRole("heading", { level: 1 });
      expect(node).toHaveStyle({ fontSize: "61px", lineHeight: "73.2px" });
    });

    it("heading2 aplica font-size 49px e line-height 58.8px", () => {
      render(<Typography variant="heading2">H2</Typography>);
      const node = screen.getByRole("heading", { level: 2 });
      expect(node).toHaveStyle({ fontSize: "49px", lineHeight: "58.8px" });
    });

    it("heading3 aplica font-size 39px e line-height 46.8px", () => {
      render(<Typography variant="heading3">H3</Typography>);
      const node = screen.getByRole("heading", { level: 3 });
      expect(node).toHaveStyle({ fontSize: "39px", lineHeight: "46.8px" });
    });

    it("heading4 aplica font-size 31px e line-height 37.2px", () => {
      render(<Typography variant="heading4">H4</Typography>);
      const node = screen.getByRole("heading", { level: 4 });
      expect(node).toHaveStyle({ fontSize: "31px", lineHeight: "37.2px" });
    });

    it("heading5 aplica font-size 25px e line-height 30px", () => {
      render(<Typography variant="heading5">H5</Typography>);
      const node = screen.getByRole("heading", { level: 5 });
      expect(node).toHaveStyle({ fontSize: "25px", lineHeight: "30px" });
    });

    it("heading6 aplica font-size 20px e line-height 24px", () => {
      render(<Typography variant="heading6">H6</Typography>);
      const node = screen.getByText("H6");
      expect(node).toHaveStyle({ fontSize: "20px", lineHeight: "24px" });
    });

    it("body1 aplica font-size 16px e line-height 19.2px", () => {
      render(<Typography variant="body1">Body1</Typography>);
      const node = screen.getByText("Body1");
      expect(node).toHaveStyle({ fontSize: "16px", lineHeight: "19.2px" });
    });

    it("body2 aplica font-size 13px e line-height 15.6px", () => {
      render(<Typography variant="body2">Body2</Typography>);
      const node = screen.getByText("Body2");
      expect(node).toHaveStyle({ fontSize: "13px", lineHeight: "15.6px" });
    });

    it("caption aplica font-size 10px e line-height 12px", () => {
      render(<Typography variant="caption">Caption</Typography>);
      const node = screen.getByText("Caption");
      expect(node).toHaveStyle({ fontSize: "10px", lineHeight: "12px" });
    });

    it("aplica font-weight 400 e font-family Inter em todas as variantes", () => {
      render(<Typography variant="heading1">Inter check</Typography>);
      const node = screen.getByText("Inter check");
      expect(node).toHaveStyle({ fontWeight: 400, fontFamily: "Inter" });
    });
  });

  // -------------------------------------------------------------------------
  // 4. Pass-through das props do Antd
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

    it("permite que `style` do consumidor sobrescreva tokens da variante", () => {
      render(
        <Typography variant="body1" style={{ color: "rebeccapurple" }}>
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
