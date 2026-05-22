import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ConfirmModal } from ".";

describe("ConfirmModal", () => {
  it("renderiza com tÃ­tulo e descriÃ§Ã£o", () => {
    render(
      <ConfirmModal
        open
        title="Confirmar aÃ§Ã£o"
        description="Tem certeza?"
        onConfirm={() => {}}
      />,
    );
    expect(screen.getByText("Confirmar aÃ§Ã£o")).toBeInTheDocument();
    expect(screen.getByText("Tem certeza?")).toBeInTheDocument();
  });

  it("renderiza botÃ£o de confirmaÃ§Ã£o", () => {
    render(
      <ConfirmModal
        open
        title="TÃ­tulo"
        confirmText="Excluir"
        onConfirm={() => {}}
      />,
    );
    expect(
      screen.getByRole("button", { name: /excluir/i }),
    ).toBeInTheDocument();
  });

  it("renderiza botÃ£o de cancelar quando cancelText Ã© fornecido", () => {
    render(
      <ConfirmModal
        open
        title="TÃ­tulo"
        confirmText="OK"
        cancelText="Cancelar"
        onConfirm={() => {}}
      />,
    );
    expect(
      screen.getByRole("button", { name: /cancelar/i }),
    ).toBeInTheDocument();
  });

  it("nÃ£o renderiza botÃ£o de cancelar quando cancelText nÃ£o Ã© fornecido", () => {
    render(
      <ConfirmModal
        open
        title="TÃ­tulo"
        confirmText="OK"
        onConfirm={() => {}}
      />,
    );
    expect(
      screen.queryByRole("button", { name: /cancelar/i }),
    ).not.toBeInTheDocument();
  });

  it("chama onConfirm ao clicar no botÃ£o de confirmaÃ§Ã£o", () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmModal
        open
        title="TÃ­tulo"
        confirmText="Confirmar"
        onConfirm={onConfirm}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("chama onCancel ao clicar no botÃ£o de cancelar", () => {
    const onCancel = vi.fn();
    render(
      <ConfirmModal
        open
        title="TÃ­tulo"
        confirmText="OK"
        cancelText="Cancelar"
        onConfirm={() => {}}
        onCancel={onCancel}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(onCancel).toHaveBeenCalled();
  });

  it("nÃ£o renderiza quando open Ã© false", () => {
    render(
      <ConfirmModal open={false} title="TÃ­tulo oculto" onConfirm={() => {}} />,
    );
    expect(screen.queryByText("TÃ­tulo oculto")).not.toBeInTheDocument();
  });

  it("aceita type danger", () => {
    render(
      <ConfirmModal
        open
        title="Excluir"
        type="danger"
        confirmText="Excluir"
        onConfirm={() => {}}
      />,
    );
    expect(
      screen.getByRole("button", { name: /excluir/i }),
    ).toBeInTheDocument();
  });
});
