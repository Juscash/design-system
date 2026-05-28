import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MenuCombobox } from ".";

describe("MenuCombobox", () => {
  it("renderiza container com role menu e aria-label", () => {
    render(
      <MenuCombobox aria-label="Acoes do usuario">
        <MenuCombobox.Item label="Lorem" />
      </MenuCombobox>,
    );
    expect(screen.getByRole("menu", { name: /acoes do usuario/i })).toBeInTheDocument();
  });

  it("usa aria-label default Menu quando nao informado", () => {
    render(
      <MenuCombobox>
        <MenuCombobox.Item label="Lorem" />
      </MenuCombobox>,
    );
    expect(screen.getByRole("menu", { name: "Menu" })).toBeInTheDocument();
  });

  it("aplica classe de spacing default 8", () => {
    const { container } = render(
      <MenuCombobox>
        <MenuCombobox.Item label="Lorem" />
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox--spacing-8")).toBeInTheDocument();
  });

  it("aplica spacing none/16/24 conforme prop", () => {
    const { container, rerender } = render(
      <MenuCombobox spacing="none">
        <MenuCombobox.Item label="Lorem" />
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox--spacing-none")).toBeInTheDocument();
    rerender(
      <MenuCombobox spacing="16">
        <MenuCombobox.Item label="Lorem" />
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox--spacing-16")).toBeInTheDocument();
    rerender(
      <MenuCombobox spacing="24">
        <MenuCombobox.Item label="Lorem" />
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox--spacing-24")).toBeInTheDocument();
  });

  it("Item renderiza role menuitem com label", () => {
    render(
      <MenuCombobox>
        <MenuCombobox.Item label="Perfil" />
      </MenuCombobox>,
    );
    expect(screen.getByRole("menuitem", { name: /perfil/i })).toBeInTheDocument();
  });

  it("Item size m vs l aplicam classes diferentes", () => {
    const { container, rerender } = render(
      <MenuCombobox>
        <MenuCombobox.Item size="m" label="Item m" />
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox-item--size-m")).toBeInTheDocument();
    rerender(
      <MenuCombobox>
        <MenuCombobox.Item size="l" label="Item l" />
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox-item--size-l")).toBeInTheDocument();
  });

  it("Item type destructive aplica classe destructive", () => {
    const { container } = render(
      <MenuCombobox>
        <MenuCombobox.Item type="destructive" label="Excluir" />
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox-item--type-destructive")).toBeInTheDocument();
  });

  it("Item state selected aplica aria-current e classe", () => {
    const { container } = render(
      <MenuCombobox>
        <MenuCombobox.Item state="selected" label="Lorem" />
      </MenuCombobox>,
    );
    const item = screen.getByRole("menuitem");
    expect(item).toHaveAttribute("aria-current", "true");
    expect(container.querySelector(".ds-menu-combobox-item--selected")).toBeInTheDocument();
  });

  it("Item state disabled aplica aria-disabled e bloqueia clique", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <MenuCombobox>
        <MenuCombobox.Item state="disabled" label="Lorem" onClick={onClick} />
      </MenuCombobox>,
    );
    const item = screen.getByRole("menuitem");
    expect(item).toHaveAttribute("aria-disabled", "true");
    await user.click(item);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("Item state loading exibe spinner e bloqueia clique", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <MenuCombobox>
        <MenuCombobox.Item state="loading" label="Lorem" onClick={onClick} />
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox-item__spinner")).toBeInTheDocument();
    await user.click(screen.getByRole("menuitem"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("Item onClick dispara em clique", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <MenuCombobox>
        <MenuCombobox.Item label="Lorem" onClick={onClick} />
      </MenuCombobox>,
    );
    await user.click(screen.getByRole("menuitem"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("Item onClick dispara via tecla Enter", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <MenuCombobox>
        <MenuCombobox.Item label="Lorem" onClick={onClick} />
      </MenuCombobox>,
    );
    const item = screen.getByRole("menuitem");
    item.focus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("Item icon string resolve para componente Lucide", () => {
    const { container } = render(
      <MenuCombobox>
        <MenuCombobox.Item icon="User" label="Perfil" />
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox-item__icon svg")).toBeInTheDocument();
  });

  it("Item rightIcon string resolve para componente Lucide", () => {
    const { container } = render(
      <MenuCombobox>
        <MenuCombobox.Item rightIcon="ChevronRight" label="Perfil" />
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox-item__right-icon svg")).toBeInTheDocument();
  });

  it("GroupLabel size m vs l", () => {
    const { container, rerender } = render(
      <MenuCombobox>
        <MenuCombobox.GroupLabel size="m">Lorem</MenuCombobox.GroupLabel>
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox-group-label--size-m")).toBeInTheDocument();
    rerender(
      <MenuCombobox>
        <MenuCombobox.GroupLabel size="l">Lorem</MenuCombobox.GroupLabel>
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox-group-label--size-l")).toBeInTheDocument();
  });

  it("GroupLabel indented aplica classe", () => {
    const { container } = render(
      <MenuCombobox>
        <MenuCombobox.GroupLabel indented>Lorem</MenuCombobox.GroupLabel>
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox-group-label--indented")).toBeInTheDocument();
  });

  it("Search dispara onChange controlado", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <MenuCombobox>
        <MenuCombobox.Search placeholder="Buscar" onChange={onChange} />
      </MenuCombobox>,
    );
    const input = screen.getByPlaceholderText("Buscar");
    await user.type(input, "a");
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("Search aceita defaultValue", () => {
    render(
      <MenuCombobox>
        <MenuCombobox.Search defaultValue="Lorem" placeholder="Buscar" />
      </MenuCombobox>,
    );
    expect(screen.getByPlaceholderText("Buscar")).toHaveValue("Lorem");
  });

  it("Overflow direction up renderiza ChevronUp", () => {
    const { container } = render(
      <MenuCombobox>
        <MenuCombobox.Overflow direction="up" />
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox-overflow svg")).toBeInTheDocument();
  });

  it("Overflow direction down renderiza ChevronDown", () => {
    const { container } = render(
      <MenuCombobox>
        <MenuCombobox.Overflow direction="down" />
      </MenuCombobox>,
    );
    expect(container.querySelector(".ds-menu-combobox-overflow svg")).toBeInTheDocument();
  });

  it("displayName do componente principal e sub-componentes", () => {
    expect(MenuCombobox.displayName).toBe("MenuCombobox");
    expect(MenuCombobox.Item.displayName).toBe("MenuCombobox.Item");
    expect(MenuCombobox.GroupLabel.displayName).toBe("MenuCombobox.GroupLabel");
    expect(MenuCombobox.Search.displayName).toBe("MenuCombobox.Search");
    expect(MenuCombobox.Overflow.displayName).toBe("MenuCombobox.Overflow");
  });
});
