import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Sidebar, SidebarGroupLabel, SidebarItem, SidebarSubItem, SidebarToggleButton } from "./index";

describe("Sidebar", () => {
  describe("AC-1: render default", () => {
    it("renderiza um <aside role='navigation'>", () => {
      render(<Sidebar />);
      const nav = screen.getByRole("navigation", { name: "Menu lateral" });
      expect(nav.tagName).toBe("ASIDE");
    });

    it("aplica a classe ds-sidebar e variant default juscash", () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector("aside");
      expect(aside).toHaveClass("ds-sidebar");
      expect(aside).toHaveClass("ds-sidebar--juscash");
    });

    it("preserva className externo", () => {
      const { container } = render(<Sidebar className="custom" />);
      const aside = container.querySelector("aside");
      expect(aside).toHaveClass("custom");
    });
  });

  describe("AC-2: estado expandido/colapsado", () => {
    it("default expanded=true não adiciona classe collapsed", () => {
      const { container } = render(<Sidebar />);
      const aside = container.querySelector("aside");
      expect(aside).not.toHaveClass("ds-sidebar--collapsed");
    });

    it("expanded=false adiciona a classe ds-sidebar--collapsed", () => {
      const { container } = render(<Sidebar expanded={false} />);
      const aside = container.querySelector("aside");
      expect(aside).toHaveClass("ds-sidebar--collapsed");
    });
  });

  describe("AC-3: variantes visuais", () => {
    it.each(["juscash", "sij", "prompt-tester"] as const)(
      "aplica modificador para variant='%s'",
      (variant) => {
        const { container } = render(<Sidebar variant={variant} />);
        const aside = container.querySelector("aside");
        expect(aside).toHaveClass(`ds-sidebar--${variant}`);
      },
    );
  });

  describe("AC-4: displayName", () => {
    it("Sidebar.displayName é 'Sidebar'", () => {
      expect(Sidebar.displayName).toBe("Sidebar");
    });
    it("SidebarItem.displayName é 'SidebarItem'", () => {
      expect(SidebarItem.displayName).toBe("SidebarItem");
    });
    it("SidebarSubItem.displayName é 'SidebarSubItem'", () => {
      expect(SidebarSubItem.displayName).toBe("SidebarSubItem");
    });
    it("SidebarGroupLabel.displayName é 'SidebarGroupLabel'", () => {
      expect(SidebarGroupLabel.displayName).toBe("SidebarGroupLabel");
    });
    it("SidebarToggleButton.displayName é 'SidebarToggleButton'", () => {
      expect(SidebarToggleButton.displayName).toBe("SidebarToggleButton");
    });
  });
});

describe("SidebarItem", () => {
  describe("AC-1: render básico", () => {
    it("renderiza label dentro do item expandido", () => {
      render(
        <Sidebar>
          <SidebarItem label="Início" />
        </Sidebar>,
      );
      expect(screen.getByText("Início")).toBeInTheDocument();
    });

    it("renderiza como button por default", () => {
      render(
        <Sidebar>
          <SidebarItem label="Início" />
        </Sidebar>,
      );
      const button = screen.getByRole("button", { name: /Início/ });
      expect(button).toHaveAttribute("type", "button");
    });

    it("renderiza como <a> quando href fornecido", () => {
      const { container } = render(
        <Sidebar>
          <SidebarItem label="Início" href="/inicio" />
        </Sidebar>,
      );
      const anchor = container.querySelector("a.ds-sidebar-item");
      expect(anchor).not.toBeNull();
      expect(anchor).toHaveAttribute("href", "/inicio");
    });
  });

  describe("AC-2: estado active", () => {
    it("active=true aplica classe e aria-current='page'", () => {
      render(
        <Sidebar>
          <SidebarItem label="Início" active />
        </Sidebar>,
      );
      const button = screen.getByRole("button", { name: /Início/ });
      expect(button).toHaveClass("ds-sidebar-item--active");
      expect(button).toHaveAttribute("aria-current", "page");
    });
  });

  describe("AC-3: badge", () => {
    it("exibe badge quando expandida", () => {
      render(
        <Sidebar>
          <SidebarItem label="Notificações" badge={5} />
        </Sidebar>,
      );
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("não exibe badge quando sidebar está colapsada", () => {
      render(
        <Sidebar expanded={false}>
          <SidebarItem label="Notificações" badge={5} />
        </Sidebar>,
      );
      expect(screen.queryByText("5")).not.toBeInTheDocument();
    });
  });

  describe("AC-4: submenu", () => {
    it("hasSubmenu aplica aria-expanded", () => {
      render(
        <Sidebar>
          <SidebarItem label="Projetos" hasSubmenu expanded />
        </Sidebar>,
      );
      const button = screen.getByRole("button", { name: /Projetos/ });
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("renderiza children como submenu quando expanded e hasSubmenu", () => {
      render(
        <Sidebar>
          <SidebarItem label="Projetos" hasSubmenu expanded>
            <SidebarSubItem label="Em andamento" />
          </SidebarItem>
        </Sidebar>,
      );
      expect(screen.getByText("Em andamento")).toBeInTheDocument();
    });

    it("não renderiza submenu quando colapsado", () => {
      render(
        <Sidebar>
          <SidebarItem label="Projetos" hasSubmenu expanded={false}>
            <SidebarSubItem label="Em andamento" />
          </SidebarItem>
        </Sidebar>,
      );
      expect(screen.queryByText("Em andamento")).not.toBeInTheDocument();
    });
  });

  describe("AC-5: collapsed dentro de Sidebar colapsada", () => {
    it("aplica classe ds-sidebar-item--collapsed", () => {
      render(
        <Sidebar expanded={false}>
          <SidebarItem label="Início" />
        </Sidebar>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("ds-sidebar-item--collapsed");
    });

    it("oculta label e expõe via title", () => {
      render(
        <Sidebar expanded={false}>
          <SidebarItem label="Início" />
        </Sidebar>,
      );
      expect(screen.queryByText("Início")).not.toBeInTheDocument();
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("title", "Início");
    });
  });

  describe("AC-6: callback onClick", () => {
    it("dispara onClick ao clicar no item", () => {
      const handler = vi.fn();
      render(
        <Sidebar>
          <SidebarItem label="Início" onClick={handler} />
        </Sidebar>,
      );
      fireEvent.click(screen.getByRole("button", { name: /Início/ }));
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});

describe("SidebarGroupLabel", () => {
  it("renderiza texto quando expandido", () => {
    render(
      <Sidebar>
        <SidebarGroupLabel label="Operacional" />
      </Sidebar>,
    );
    expect(screen.getByText("Operacional")).toBeInTheDocument();
  });

  it("renderiza separador quando sidebar colapsada", () => {
    const { container } = render(
      <Sidebar expanded={false}>
        <SidebarGroupLabel label="Operacional" />
      </Sidebar>,
    );
    expect(container.querySelector(".ds-sidebar-group-label--collapsed")).not.toBeNull();
    expect(screen.queryByText("Operacional")).not.toBeInTheDocument();
  });
});

describe("SidebarToggleButton", () => {
  it("dispara onClick", () => {
    const handler = vi.fn();
    render(<SidebarToggleButton onClick={handler} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("expanded=true usa aria-label 'Recolher menu'", () => {
    render(<SidebarToggleButton expanded onClick={() => undefined} />);
    expect(screen.getByRole("button", { name: "Recolher menu" })).toBeInTheDocument();
  });

  it("expanded=false usa aria-label 'Expandir menu'", () => {
    render(<SidebarToggleButton expanded={false} onClick={() => undefined} />);
    expect(screen.getByRole("button", { name: "Expandir menu" })).toBeInTheDocument();
  });

  it("aceita aria-label customizado", () => {
    render(<SidebarToggleButton aria-label="Alternar menu" onClick={() => undefined} />);
    expect(screen.getByRole("button", { name: "Alternar menu" })).toBeInTheDocument();
  });
});
