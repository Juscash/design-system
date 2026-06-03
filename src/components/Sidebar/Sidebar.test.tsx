import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Sidebar, SidebarGroupLabel, SidebarItem, SidebarSubItem } from "./index";

describe("Sidebar", () => {
  describe("render default", () => {
    it("renderiza um <aside role='navigation'>", () => {
      render(<Sidebar />);
      const nav = screen.getByRole("navigation", { name: "Menu lateral" });
      expect(nav.tagName).toBe("ASIDE");
    });

    it("aplica a classe ds-sidebar", () => {
      const { container } = render(<Sidebar />);
      expect(container.querySelector("aside")).toHaveClass("ds-sidebar");
    });

    it("preserva className externo", () => {
      const { container } = render(<Sidebar className="custom" />);
      expect(container.querySelector("aside")).toHaveClass("custom");
    });
  });

  describe("estado expandido/colapsado", () => {
    it("default expanded=true não adiciona classe collapsed", () => {
      const { container } = render(<Sidebar />);
      expect(container.querySelector("aside")).not.toHaveClass("ds-sidebar--collapsed");
    });

    it("expanded=false adiciona a classe ds-sidebar--collapsed", () => {
      const { container } = render(<Sidebar expanded={false} />);
      expect(container.querySelector("aside")).toHaveClass("ds-sidebar--collapsed");
    });
  });

  describe("displayName", () => {
    it.each([
      [Sidebar, "Sidebar"],
      [SidebarItem, "SidebarItem"],
      [SidebarSubItem, "SidebarSubItem"],
      [SidebarGroupLabel, "SidebarGroupLabel"],
    ])("%o.displayName está definido", (component, name) => {
      expect(component.displayName).toBe(name);
    });
  });
});

describe("SidebarItem", () => {
  it("renderiza label como button por default", () => {
    render(
      <Sidebar>
        <SidebarItem label="Dashboard" />
      </Sidebar>,
    );
    const button = screen.getByRole("button", { name: /Dashboard/ });
    expect(button).toHaveAttribute("type", "button");
  });

  it("renderiza como <a> quando href fornecido", () => {
    const { container } = render(
      <Sidebar>
        <SidebarItem label="Dashboard" href="/dashboard" />
      </Sidebar>,
    );
    const anchor = container.querySelector("a.ds-sidebar-item");
    expect(anchor).toHaveAttribute("href", "/dashboard");
  });

  it("active=true aplica classe e aria-current='page'", () => {
    render(
      <Sidebar>
        <SidebarItem label="Dashboard" active />
      </Sidebar>,
    );
    const button = screen.getByRole("button", { name: /Dashboard/ });
    expect(button).toHaveClass("ds-sidebar-item--active");
    expect(button).toHaveAttribute("aria-current", "page");
  });

  it("exibe badge quando expandida", () => {
    render(
      <Sidebar>
        <SidebarItem label="Notificações" badge={5} />
      </Sidebar>,
    );
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("não exibe label nem badge quando a sidebar está colapsada", () => {
    render(
      <Sidebar expanded={false}>
        <SidebarItem icon="Bell" label="Notificações" badge={5} />
      </Sidebar>,
    );
    expect(screen.queryByText("5")).not.toBeInTheDocument();
    expect(screen.queryByText("Notificações")).not.toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toHaveClass("ds-sidebar-item--collapsed");
    expect(button).toHaveAttribute("title", "Notificações");
  });

  it("com children + expanded aplica aria-expanded e renderiza o submenu", () => {
    render(
      <Sidebar>
        <SidebarItem label="Gestão" expanded>
          <SidebarSubItem label="Usuários" />
        </SidebarItem>
      </Sidebar>,
    );
    expect(screen.getByRole("button", { name: /Gestão/ })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Usuários")).toBeInTheDocument();
  });

  it("não renderiza o submenu quando expanded=false", () => {
    render(
      <Sidebar>
        <SidebarItem label="Gestão" expanded={false}>
          <SidebarSubItem label="Usuários" />
        </SidebarItem>
      </Sidebar>,
    );
    expect(screen.queryByText("Usuários")).not.toBeInTheDocument();
  });

  it("dispara onClick ao clicar no item", () => {
    const handler = vi.fn();
    render(
      <Sidebar>
        <SidebarItem label="Dashboard" onClick={handler} />
      </Sidebar>,
    );
    fireEvent.click(screen.getByRole("button", { name: /Dashboard/ }));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

describe("SidebarSubItem", () => {
  it("renderiza label e o estado active com aria-current", () => {
    render(
      <Sidebar>
        <SidebarItem label="Gestão" expanded>
          <SidebarSubItem label="Usuários" active />
        </SidebarItem>
      </Sidebar>,
    );
    const button = screen.getByRole("button", { name: "Usuários" });
    expect(button).toHaveClass("ds-sidebar-subitem--active");
    expect(button).toHaveAttribute("aria-current", "page");
  });

  it("renderiza como <a> quando href fornecido", () => {
    const { container } = render(
      <Sidebar>
        <SidebarItem label="Gestão" expanded>
          <SidebarSubItem label="Usuários" href="/usuarios" />
        </SidebarItem>
      </Sidebar>,
    );
    expect(container.querySelector("a.ds-sidebar-subitem")).toHaveAttribute("href", "/usuarios");
  });
});

describe("SidebarGroupLabel", () => {
  it("renderiza o texto quando a sidebar está expandida", () => {
    render(
      <Sidebar>
        <SidebarGroupLabel label="Operacional" />
      </Sidebar>,
    );
    expect(screen.getByText("Operacional")).toBeInTheDocument();
  });

  it("tipo action renderiza um botão e dispara onActionClick", () => {
    const handler = vi.fn();
    render(
      <Sidebar>
        <SidebarGroupLabel label="Operacional" type="action" onActionClick={handler} />
      </Sidebar>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Operacional" }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("é omitido quando a sidebar está colapsada", () => {
    const { container } = render(
      <Sidebar expanded={false}>
        <SidebarGroupLabel label="Operacional" />
      </Sidebar>,
    );
    expect(container.querySelector(".ds-sidebar-group-label")).toBeNull();
    expect(screen.queryByText("Operacional")).not.toBeInTheDocument();
  });
});
