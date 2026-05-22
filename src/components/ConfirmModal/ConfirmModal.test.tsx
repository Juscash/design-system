import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ConfirmModal } from ".";

describe("ConfirmModal", () => {
  it("renderiza com título e descrição", () => {
    render(
      <ConfirmModal
        open
        title="Confirmar ação"
        description="Tem certeza?"
        onConfirm={() => {}}
      />,
    );
    expect(screen.getByText("Confirmar ação")).toBeInTheDocument();
    expect(screen.getByText("Tem certeza?")).toBeInTheDocument();
  });

  it("renderiza botão de confirmação", () => {
    render(
      <ConfirmModal
        open
        title="Título"
        confirmText="Excluir"
        onConfirm={() => {}}
      />,
    );
    expect(
      screen.getByRole("button", { name: /excluir/i }),
    ).toBeInTheDocument();
  });

  it("renderiza botão de cancelar quando cancelText é fornecido", () => {
    render(
      <ConfirmModal
        open
        title="Título"
        confirmText="OK"
        cancelText="Cancelar"
        onConfirm={() => {}}
      />,
    );
    expect(
      screen.getByRole("button", { name: /cancelar/i }),
    ).toBeInTheDocument();
  });

  it("não renderiza botão de cancelar quando cancelText não é fornecido", () => {
    render(
      <ConfirmModal
        open
        title="Título"
        confirmText="OK"
        onConfirm={() => {}}
      />,
    );
    expect(
      screen.queryByRole("button", { name: /cancelar/i }),
    ).not.toBeInTheDocument();
  });

  it("chama onConfirm ao clicar no botão de confirmação", () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmModal
        open
        title="Título"
        confirmText="Confirmar"
        onConfirm={onConfirm}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("chama onCancel ao clicar no botão de cancelar", () => {
    const onCancel = vi.fn();
    render(
      <ConfirmModal
        open
        title="Título"
        confirmText="OK"
        cancelText="Cancelar"
        onConfirm={() => {}}
        onCancel={onCancel}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(onCancel).toHaveBeenCalled();
  });

  it("não renderiza quando open é false", () => {
    render(
      <ConfirmModal open={false} title="Título oculto" onConfirm={() => {}} />,
    );
    expect(screen.queryByText("Título oculto")).not.toBeInTheDocument();
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
