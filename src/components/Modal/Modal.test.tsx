import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Modal } from ".";
import { Button } from "../Button";

describe("Modal", () => {
  it("renderiza com título", () => {
    render(
      <Modal title="Título do Modal" open>
        <p>Conteúdo</p>
      </Modal>,
    );
    expect(screen.getByText("Título do Modal")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
  });

  it("renderiza conteúdo quando open é true", () => {
    render(
      <Modal title="Modal Aberto" open>
        <p>Conteúdo visível</p>
      </Modal>,
    );
    expect(screen.getByText("Conteúdo visível")).toBeInTheDocument();
  });

  it("não renderiza conteúdo quando open é false", () => {
    render(
      <Modal title="Modal Fechado" open={false}>
        <p>Conteúdo invisível</p>
      </Modal>,
    );
    expect(screen.queryByText("Conteúdo invisível")).not.toBeInTheDocument();
  });

  it("chama onCancel ao clicar no botão X", () => {
    const onCancel = vi.fn();
    render(
      <Modal title="Modal" open onCancel={onCancel}>
        <p>Conteúdo</p>
      </Modal>,
    );
    const closeButton = document.querySelector(".ant-modal-close");
    if (closeButton) {
      fireEvent.click(closeButton);
      expect(onCancel).toHaveBeenCalled();
    }
  });

  it("aplica dsSize s corretamente", () => {
    render(
      <Modal title="Modal Small" open dsSize="s">
        <p>Conteúdo</p>
      </Modal>,
    );
    const modal = document.querySelector(".ant-modal");
    expect(modal).toHaveStyle({ width: "400px" });
  });

  it("aplica dsSize m como padrão", () => {
    render(
      <Modal title="Modal Medium" open>
        <p>Conteúdo</p>
      </Modal>,
    );
    const modal = document.querySelector(".ant-modal");
    expect(modal).toHaveStyle({ width: "520px" });
  });

  it("aplica dsSize l corretamente", () => {
    render(
      <Modal title="Modal Large" open dsSize="l">
        <p>Conteúdo</p>
      </Modal>,
    );
    const modal = document.querySelector(".ant-modal");
    expect(modal).toHaveStyle({ width: "720px" });
  });

  it("renderiza com footer customizado", () => {
    render(
      <Modal
        title="Modal com Footer"
        open
        footer={
          <div>
            <Button>Cancelar</Button>
            <Button>Confirmar</Button>
          </div>
        }
      >
        <p>Conteúdo</p>
      </Modal>,
    );
    expect(
      screen.getByRole("button", { name: /cancelar/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /confirmar/i }),
    ).toBeInTheDocument();
  });

  it("renderiza sem footer quando footer é null", () => {
    render(
      <Modal title="Modal sem Footer" open footer={null}>
        <p>Conteúdo</p>
      </Modal>,
    );
    // Não deve haver botões OK/Cancel padrão
    expect(
      screen.queryByRole("button", { name: /ok/i }),
    ).not.toBeInTheDocument();
  });

  it("aceita okText e cancelText customizados", () => {
    render(
      <Modal title="Modal" open okText="Salvar" cancelText="Descartar">
        <p>Conteúdo</p>
      </Modal>,
    );
    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /descartar/i }),
    ).toBeInTheDocument();
  });

  it("responde a onOk", () => {
    const onOk = vi.fn();
    render(
      <Modal title="Modal" open onOk={onOk}>
        <p>Conteúdo</p>
      </Modal>,
    );
    const okButton = screen.getByRole("button", { name: /ok/i });
    fireEvent.click(okButton);
    expect(onOk).toHaveBeenCalled();
  });

  it("renderiza botão X para fechar", () => {
    render(
      <Modal title="Modal" open closable>
        <p>Conteúdo</p>
      </Modal>,
    );
    const closeButton = document.querySelector(".ant-modal-close");
    expect(closeButton).toBeInTheDocument();
  });
});
