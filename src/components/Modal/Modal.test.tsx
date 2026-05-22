import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Modal } from ".";
import { Button } from "../Button";

describe("Modal", () => {
  it("renderiza com tÃ­tulo", () => {
    render(
      <Modal title="TÃ­tulo do Modal" open>
        <p>ConteÃºdo</p>
      </Modal>,
    );
    expect(screen.getByText("TÃ­tulo do Modal")).toBeInTheDocument();
    expect(screen.getByText("ConteÃºdo")).toBeInTheDocument();
  });

  it("renderiza conteÃºdo quando open Ã© true", () => {
    render(
      <Modal title="Modal Aberto" open>
        <p>ConteÃºdo visÃ­vel</p>
      </Modal>,
    );
    expect(screen.getByText("ConteÃºdo visÃ­vel")).toBeInTheDocument();
  });

  it("nÃ£o renderiza conteÃºdo quando open Ã© false", () => {
    render(
      <Modal title="Modal Fechado" open={false}>
        <p>ConteÃºdo invisÃ­vel</p>
      </Modal>,
    );
    expect(screen.queryByText("ConteÃºdo invisÃ­vel")).not.toBeInTheDocument();
  });

  it("chama onCancel ao clicar no botÃ£o X", () => {
    const onCancel = vi.fn();
    render(
      <Modal title="Modal" open onCancel={onCancel}>
        <p>ConteÃºdo</p>
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
        <p>ConteÃºdo</p>
      </Modal>,
    );
    const modal = document.querySelector(".ant-modal");
    expect(modal).toHaveStyle({ width: "400px" });
  });

  it("aplica dsSize m como padrÃ£o", () => {
    render(
      <Modal title="Modal Medium" open>
        <p>ConteÃºdo</p>
      </Modal>,
    );
    const modal = document.querySelector(".ant-modal");
    expect(modal).toHaveStyle({ width: "520px" });
  });

  it("aplica dsSize l corretamente", () => {
    render(
      <Modal title="Modal Large" open dsSize="l">
        <p>ConteÃºdo</p>
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
        <p>ConteÃºdo</p>
      </Modal>,
    );
    expect(
      screen.getByRole("button", { name: /cancelar/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /confirmar/i }),
    ).toBeInTheDocument();
  });

  it("renderiza sem footer quando footer Ã© null", () => {
    render(
      <Modal title="Modal sem Footer" open footer={null}>
        <p>ConteÃºdo</p>
      </Modal>,
    );
    // NÃ£o deve haver botÃµes OK/Cancel padrÃ£o
    expect(
      screen.queryByRole("button", { name: /ok/i }),
    ).not.toBeInTheDocument();
  });

  it("aceita okText e cancelText customizados", () => {
    render(
      <Modal title="Modal" open okText="Salvar" cancelText="Descartar">
        <p>ConteÃºdo</p>
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
        <p>ConteÃºdo</p>
      </Modal>,
    );
    const okButton = screen.getByRole("button", { name: /ok/i });
    fireEvent.click(okButton);
    expect(onOk).toHaveBeenCalled();
  });

  it("renderiza botÃ£o X para fechar", () => {
    render(
      <Modal title="Modal" open closable>
        <p>ConteÃºdo</p>
      </Modal>,
    );
    const closeButton = document.querySelector(".ant-modal-close");
    expect(closeButton).toBeInTheDocument();
  });
});
