import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Tooltip, type TooltipProps } from ".";

/** Abre o tooltip via hover no botão "Hover me" e aguarda o conteúdo visível. */
async function hoverTooltip(): Promise<void> {
  const user = userEvent.setup();
  const button = screen.getByRole("button", { name: "Hover me" });

  await user.hover(button);

  await waitFor(() => {
    expect(document.body).toHaveTextContent("Tooltip content");
  });
}

describe("Tooltip", () => {
  it("renderiza o children corretamente", () => {
    render(
      <Tooltip title="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("exibe o conteúdo do tooltip ao hover", async () => {
    render(
      <Tooltip title="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    await hoverTooltip();
  });

  it("renderiza o conteúdo quando title é informado e open=true", async () => {
    render(
      <Tooltip title="Visible tooltip" open>
        <button>Anchor</button>
      </Tooltip>,
    );

    await waitFor(() => {
      expect(document.body).toHaveTextContent("Visible tooltip");
    });

    const popup = document.body.querySelector(".ds-tooltip");
    expect(popup).toBeInTheDocument();
  });

  it("placement top aplica ant-tooltip-placement-top no popup", async () => {
    render(
      <Tooltip title="Placement top" placement="top" open>
        <button>Anchor</button>
      </Tooltip>,
    );

    await waitFor(() => {
      const popup = document.body.querySelector(".ds-tooltip");
      expect(popup).toHaveClass("ant-tooltip-placement-top");
    });
  });

  it("placement bottom aplica ant-tooltip-placement-bottom no popup", async () => {
    render(
      <Tooltip title="Placement bottom" placement="bottom" open>
        <button>Anchor</button>
      </Tooltip>,
    );

    await waitFor(() => {
      const popup = document.body.querySelector(".ds-tooltip");
      expect(popup).toHaveClass("ant-tooltip-placement-bottom");
    });
  });

  it("placement left aplica ant-tooltip-placement-left no popup", async () => {
    render(
      <Tooltip title="Placement left" placement="left" open>
        <button>Anchor</button>
      </Tooltip>,
    );

    await waitFor(() => {
      const popup = document.body.querySelector(".ds-tooltip");
      expect(popup).toHaveClass("ant-tooltip-placement-left");
    });
  });

  it("placement right aplica ant-tooltip-placement-right no popup", async () => {
    render(
      <Tooltip title="Placement right" placement="right" open>
        <button>Anchor</button>
      </Tooltip>,
    );

    await waitFor(() => {
      const popup = document.body.querySelector(".ds-tooltip");
      expect(popup).toHaveClass("ant-tooltip-placement-right");
    });
  });

  it("trigger padrão é hover — foco via teclado não abre o tooltip", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip title="Hover only" mouseEnterDelay={0}>
        <button>Anchor</button>
      </Tooltip>,
    );

    await user.tab();

    await act(async () => {
      await new Promise<void>((resolve) => setTimeout(resolve, 300));
    });

    expect(document.body.querySelector(".ds-tooltip")).toBeNull();
  });

  it("trigger=focus abre o tooltip ao receber foco", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip title="Focus trigger" trigger="focus">
        <button>Anchor</button>
      </Tooltip>,
    );

    await user.tab();

    await waitFor(() => {
      expect(document.body).toHaveTextContent("Focus trigger");
    });
  });

  it("mouseEnterDelay é repassado ao AntdTooltip sem erro", async () => {
    render(
      <Tooltip title="Delay prop" mouseEnterDelay={500} open>
        <button>Anchor</button>
      </Tooltip>,
    );

    await waitFor(() => {
      expect(document.body).toHaveTextContent("Delay prop");
    });

    expect(document.body.querySelector(".ds-tooltip")).toBeInTheDocument();
  });

  it("getPopupContainer direciona o popup para o container customizado", async () => {
    const customContainer = document.createElement("div");
    customContainer.id = "custom-container";
    document.body.appendChild(customContainer);

    render(
      <Tooltip
        title="Custom container"
        open
        getPopupContainer={() => customContainer}
      >
        <button>Anchor</button>
      </Tooltip>,
    );

    await waitFor(() => {
      expect(customContainer).toHaveTextContent("Custom container");
    });

    expect(customContainer.querySelector(".ds-tooltip")).toBeInTheDocument();

    customContainer.remove();
  });

  it("displayName é Tooltip", () => {
    expect(Tooltip.displayName).toBe("Tooltip");
  });

  it("mescla props semânticas de objeto com props overlay legadas", async () => {
    render(
      <Tooltip
        title="Tooltip content"
        overlayClassName="legacy-root"
        overlayStyle={{ maxWidth: 150, padding: 8 }}
        overlayInnerStyle={{ color: "rgb(255, 0, 0)", padding: 4 }}
        classNames={{
          root: "semantic-root",
          container: "semantic-container",
        }}
        styles={{
          root: { maxWidth: 240, padding: 12 },
          container: { color: "rgb(0, 0, 255)", padding: 10 },
        }}
      >
        <button>Hover me</button>
      </Tooltip>,
    );

    await hoverTooltip();

    const root = document.body.querySelector(".ds-tooltip") as HTMLElement | null;
    const container = document.body.querySelector(".semantic-container") as HTMLElement | null;

    expect(root).toBeInTheDocument();
    expect(root).toHaveClass("ds-tooltip", "legacy-root", "semantic-root");
    expect(root).toHaveStyle({ maxWidth: "240px", padding: "12px" });

    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle({ color: "rgb(0, 0, 255)", padding: "10px" });
  });

  it("suporta props semânticas no formato função", async () => {
    const classNames = vi.fn(({ props }: { props: TooltipProps }) => ({
      root: props.overlayClassName === "legacy-root" ? "semantic-root" : undefined,
      container: props.title === "Tooltip content" ? "semantic-container" : undefined,
      arrow: "semantic-arrow",
    }));
    const styles = vi.fn(({ props }: { props: TooltipProps }) => ({
      root: props.overlayStyle ? { maxWidth: 260, marginTop: 6 } : undefined,
      container: props.overlayInnerStyle ? { color: "rgb(0, 128, 0)", padding: 10 } : undefined,
      arrow: { color: "rgb(0, 128, 0)" },
    }));

    render(
      <Tooltip
        title="Tooltip content"
        overlayClassName="legacy-root"
        overlayStyle={{ maxWidth: 150 }}
        overlayInnerStyle={{ color: "rgb(255, 0, 0)" }}
        classNames={classNames}
        styles={styles}
      >
        <button>Hover me</button>
      </Tooltip>,
    );

    await hoverTooltip();

    expect(classNames).toHaveBeenCalledWith(
      expect.objectContaining({
        props: expect.objectContaining({
          overlayClassName: "legacy-root",
          title: "Tooltip content",
        }),
      }),
    );
    expect(styles).toHaveBeenCalledWith(
      expect.objectContaining({
        props: expect.objectContaining({
          overlayStyle: { maxWidth: 150 },
          overlayInnerStyle: { color: "rgb(255, 0, 0)" },
        }),
      }),
    );

    const root = document.body.querySelector(".ds-tooltip") as HTMLElement | null;
    const container = document.body.querySelector(".semantic-container") as HTMLElement | null;
    const arrow = document.body.querySelector(".semantic-arrow") as HTMLElement | null;

    expect(root).toHaveClass("ds-tooltip", "legacy-root", "semantic-root");
    expect(root).toHaveStyle({ maxWidth: "260px", marginTop: "6px" });
    expect(container).toHaveStyle({ color: "rgb(0, 128, 0)", padding: "10px" });
    expect(arrow).toBeInTheDocument();
  });

  it("suprime o tooltip do pai quando o filho abre e libera quando o filho fecha (regra aninhada)", async () => {
    const user = userEvent.setup();
    const parentOnChange = vi.fn();
    const childOnChange = vi.fn();

    render(
      <Tooltip title="Tooltip do pai" onOpenChange={parentOnChange}>
        <div>
          <span>pai content</span>
          <Tooltip title="Tooltip do filho" onOpenChange={childOnChange}>
            <button>Filho</button>
          </Tooltip>
        </div>
      </Tooltip>,
    );

    // Hover no pai abre o pai
    await user.hover(screen.getByText("pai content"));
    await waitFor(() => expect(parentOnChange).toHaveBeenCalledWith(true));
    await waitFor(() => expect(document.body).toHaveTextContent("Tooltip do pai"));

    // Hover no filho — abre o filho e suprime o pai (pai vira invisível)
    await user.hover(screen.getByRole("button", { name: "Filho" }));
    await waitFor(() => expect(childOnChange).toHaveBeenCalledWith(true));
    await waitFor(() => expect(document.body).toHaveTextContent("Tooltip do filho"));

    // Sai do filho — filho fecha, pai libera e re-aparece (mouse ainda no pai)
    await user.unhover(screen.getByRole("button", { name: "Filho" }));
    await waitFor(() => expect(childOnChange).toHaveBeenCalledWith(false));
    // O onOpenChange do pai NÃO é chamado com false pelo nosso supress (estado natural
    // do Antd permanece true durante toda a interação); ao liberar a supressão o pai
    // volta a ser exibido visualmente.
    await waitFor(() => expect(document.body).toHaveTextContent("Tooltip do pai"));
  });
});
