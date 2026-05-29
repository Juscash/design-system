import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NavigationMenu } from "./index";
import type { NavigationMenuItem } from "../../types/components/NavigationMenu";

const BASE_ITEMS: NavigationMenuItem[] = [
  {
    key: "docs",
    label: "Documentação",
    content: [
      { key: "intro", title: "Introdução", description: "Lorem ipsum." },
      { key: "api", title: "API", description: "Lorem ipsum." },
    ],
  },
  {
    key: "produtos",
    label: "Produtos",
    content: [{ key: "produto-a", title: "Produto A" }],
  },
  { key: "sobre", label: "Sobre" },
];

describe("NavigationMenu", () => {
  describe("Renderização default", () => {
    it("renderiza um <nav> com aria-label", () => {
      render(<NavigationMenu items={BASE_ITEMS} aria-label="Principal" />);
      const nav = screen.getByRole("navigation", { name: "Principal" });
      expect(nav).toBeInTheDocument();
    });

    it("renderiza um trigger para cada item", () => {
      render(<NavigationMenu items={BASE_ITEMS} />);
      expect(screen.getByRole("button", { name: /Documentação/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Produtos/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Sobre/ })).toBeInTheDocument();
    });

    it("aplica aria-label default quando não informado", () => {
      render(<NavigationMenu items={BASE_ITEMS} />);
      expect(screen.getByRole("navigation", { name: "Navegação principal" })).toBeInTheDocument();
    });
  });

  describe("Triggers sem conteúdo", () => {
    it("não exibe aria-haspopup/aria-expanded para triggers sem content", () => {
      render(<NavigationMenu items={BASE_ITEMS} />);
      const sobre = screen.getByRole("button", { name: /Sobre/ });
      expect(sobre).not.toHaveAttribute("aria-haspopup");
      expect(sobre).not.toHaveAttribute("aria-expanded");
    });

    it("não abre painel ao clicar em trigger sem content", () => {
      render(<NavigationMenu items={BASE_ITEMS} />);
      const sobre = screen.getByRole("button", { name: /Sobre/ });
      fireEvent.click(sobre);
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  describe("Abertura e fechamento do painel", () => {
    it("abre o painel ao clicar no trigger com content", () => {
      render(<NavigationMenu items={BASE_ITEMS} />);
      const trigger = screen.getByRole("button", { name: /Documentação/ });
      fireEvent.click(trigger);
      expect(screen.getByRole("menu")).toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("fecha o painel ao clicar novamente no mesmo trigger", () => {
      render(<NavigationMenu items={BASE_ITEMS} />);
      const trigger = screen.getByRole("button", { name: /Documentação/ });
      fireEvent.click(trigger);
      fireEvent.click(trigger);
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("troca de painel ao clicar em outro trigger com content", () => {
      render(<NavigationMenu items={BASE_ITEMS} />);
      fireEvent.click(screen.getByRole("button", { name: /Documentação/ }));
      fireEvent.click(screen.getByRole("button", { name: /Produtos/ }));
      const menus = screen.getAllByRole("menu");
      expect(menus).toHaveLength(1);
      expect(screen.getByRole("button", { name: /Documentação/ })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
      expect(screen.getByRole("button", { name: /Produtos/ })).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });
  });

  describe("Fechamento via Escape e clique fora", () => {
    it("fecha ao pressionar Escape", () => {
      render(<NavigationMenu items={BASE_ITEMS} />);
      fireEvent.click(screen.getByRole("button", { name: /Documentação/ }));
      expect(screen.getByRole("menu")).toBeInTheDocument();
      act(() => {
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      });
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("fecha ao clicar fora do menu", () => {
      render(
        <div>
          <NavigationMenu items={BASE_ITEMS} />
          <button type="button" data-testid="outside">
            Outside
          </button>
        </div>,
      );
      fireEvent.click(screen.getByRole("button", { name: /Documentação/ }));
      expect(screen.getByRole("menu")).toBeInTheDocument();
      act(() => {
        const outside = screen.getByTestId("outside");
        outside.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      });
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  describe("Itens do painel", () => {
    it("renderiza items como <button> quando href ausente", () => {
      render(<NavigationMenu items={BASE_ITEMS} />);
      fireEvent.click(screen.getByRole("button", { name: /Documentação/ }));
      const item = screen.getByRole("menuitem", { name: /Introdução/ });
      expect(item.tagName).toBe("BUTTON");
    });

    it("renderiza items como <a> quando href presente", () => {
      const items: NavigationMenuItem[] = [
        {
          key: "k",
          label: "Trigger",
          content: [{ key: "i", title: "Link", href: "https://example.com" }],
        },
      ];
      render(<NavigationMenu items={items} />);
      fireEvent.click(screen.getByRole("button", { name: /Trigger/ }));
      const item = screen.getByRole("menuitem", { name: /Link/ });
      expect(item.tagName).toBe("A");
      expect(item).toHaveAttribute("href", "https://example.com");
    });

    it("dispara onClick do item e fecha o painel", () => {
      const handler = vi.fn();
      const items: NavigationMenuItem[] = [
        {
          key: "k",
          label: "Trigger",
          content: [{ key: "i", title: "Ação", onClick: handler }],
        },
      ];
      render(<NavigationMenu items={items} />);
      fireEvent.click(screen.getByRole("button", { name: /Trigger/ }));
      fireEvent.click(screen.getByRole("menuitem", { name: /Ação/ }));
      expect(handler).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("exibe description quando presente", () => {
      render(<NavigationMenu items={BASE_ITEMS} />);
      fireEvent.click(screen.getByRole("button", { name: /Documentação/ }));
      expect(screen.getAllByText("Lorem ipsum.")).toHaveLength(2);
    });
  });

  describe("Props externos", () => {
    it("preserva className externo no <nav>", () => {
      render(<NavigationMenu items={BASE_ITEMS} className="custom" />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("custom");
      expect(nav).toHaveClass("ds-navigation-menu");
    });

    it("aplica style externo ao <nav>", () => {
      render(<NavigationMenu items={BASE_ITEMS} style={{ opacity: 0.5 }} />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveStyle({ opacity: "0.5" });
    });
  });

  describe("displayName", () => {
    it("NavigationMenu.displayName é 'NavigationMenu'", () => {
      expect(NavigationMenu.displayName).toBe("NavigationMenu");
    });
  });
});
