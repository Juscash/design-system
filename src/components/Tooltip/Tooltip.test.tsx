import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Tooltip, type TooltipProps } from ".";

async function hoverTooltip() {
  const user = userEvent.setup();
  const button = screen.getByRole("button", { name: "Hover me" });

  await user.hover(button);

  await waitFor(() => {
    expect(document.body).toHaveTextContent("Tooltip content");
  });
}

describe("Tooltip", () => {
  it("renders children correctly", () => {
    render(
      <Tooltip title="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("shows tooltip content on hover", async () => {
    render(
      <Tooltip title="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    await hoverTooltip();
  });

  it("merges object-form semantic props with legacy overlay props", async () => {
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

  it("supports function-form semantic props", async () => {
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
});
