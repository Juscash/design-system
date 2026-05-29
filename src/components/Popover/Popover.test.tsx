import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Popover } from ".";
import { Button } from "../Button";


describe("Popover", () => {
  it("renderiza sem crashar (default)", () => {
    render(
      <Popover>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByRole("button", { name: /trigger/i })).toBeInTheDocument();
  });

  it("slotNo=1 slot renderiza somente o mainSlot", () => {
    render(
      <Popover slotNo="1 slot" mainSlot={<span>Conteúdo principal</span>} open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Conteúdo principal")).toBeInTheDocument();
  });

  it("slotNo=1 slot não renderiza headerSlot mesmo quando informado", () => {
    render(
      <Popover
        slotNo="1 slot"
        headerSlot={<span>Não deve aparecer</span>}
        mainSlot={<span>Corpo</span>}
        open
      >
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.queryByText("Não deve aparecer")).not.toBeInTheDocument();
    expect(screen.getByText("Corpo")).toBeInTheDocument();
  });

  it("slotNo=2 slots renderiza headerSlot e mainSlot", () => {
    render(
      <Popover
        slotNo="2 slots"
        headerSlot={<span>Cabeçalho</span>}
        mainSlot={<span>Corpo</span>}
        open
      >
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Cabeçalho")).toBeInTheDocument();
    expect(screen.getByText("Corpo")).toBeInTheDocument();
  });

  it("slotNo=2 slots não renderiza footerSlot mesmo quando informado", () => {
    render(
      <Popover
        slotNo="2 slots"
        headerSlot={<span>Cabeçalho</span>}
        mainSlot={<span>Corpo</span>}
        footerSlot={<span>Rodapé não deve aparecer</span>}
        open
      >
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.queryByText("Rodapé não deve aparecer")).not.toBeInTheDocument();
  });

  it("slotNo=3 slots renderiza headerSlot, mainSlot e footerSlot", () => {
    render(
      <Popover
        slotNo="3 slots"
        headerSlot={<span>Cabeçalho</span>}
        mainSlot={<span>Corpo</span>}
        footerSlot={<span>Rodapé</span>}
        open
      >
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Cabeçalho")).toBeInTheDocument();
    expect(screen.getByText("Corpo")).toBeInTheDocument();
    expect(screen.getByText("Rodapé")).toBeInTheDocument();
  });

  it("placeholder interno aparece quando mainSlot é omitido (1 slot)", () => {
    render(
      <Popover slotNo="1 slot" open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getAllByTestId("ds-popover-slot-placeholder").length).toBeGreaterThanOrEqual(1);
  });

  it("placeholder aparece para headerSlot omitido em 2 slots", () => {
    render(
      <Popover slotNo="2 slots" mainSlot={<span>Corpo</span>} open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByTestId("ds-popover-slot-placeholder")).toBeInTheDocument();
  });

  it("placeholders aparecem para header e footer omitidos em 3 slots", () => {
    render(
      <Popover slotNo="3 slots" mainSlot={<span>Corpo</span>} open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getAllByTestId("ds-popover-slot-placeholder")).toHaveLength(2);
  });

  it("showArrow=true repassa arrow ao AntdPopover", () => {
    render(
      <Popover slotNo="1 slot" mainSlot={<span>Conteúdo</span>} showArrow open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(document.querySelector(".ant-popover-arrow")).toBeInTheDocument();
  });

  it("showArrow=false omite a seta do AntdPopover", () => {
    render(
      <Popover slotNo="1 slot" mainSlot={<span>Conteúdo</span>} showArrow={false} open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(document.querySelector(".ant-popover-arrow")).not.toBeInTheDocument();
  });

  it("fecha ao pressionar Escape quando aberto (dispara onOpenChange(false))", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Popover slotNo="1 slot" mainSlot={<span>Conteúdo</span>} open onOpenChange={onOpenChange}>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("displayName === Popover", () => {
    expect(Popover.displayName).toBe("Popover");
  });
});
