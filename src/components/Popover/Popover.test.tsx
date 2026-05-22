import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Popover } from ".";
import { Button } from "../Button";
import { Info } from "lucide-react";

describe("Popover", () => {
  it("renderiza com conteúdo simples", () => {
    render(
      <Popover content="Conteúdo do popover" open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Conteúdo do popover")).toBeInTheDocument();
  });

  it("renderiza com title do Antd", () => {
    render(
      <Popover title="Título" content="Conteúdo" open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Título")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
  });

  it("renderiza com header customizado (2 slots)", () => {
    render(
      <Popover header="Header Customizado" content="Conteúdo principal" open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Header Customizado")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo principal")).toBeInTheDocument();
  });

  it("renderiza com footer customizado (3 slots)", () => {
    render(
      <Popover
        header="Header"
        content="Conteúdo"
        footer="Footer Customizado"
        open
      >
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
    expect(screen.getByText("Footer Customizado")).toBeInTheDocument();
  });

  it("renderiza com ícone customizado no header", () => {
    render(
      <Popover
        header="Header com ícone"
        content="Conteúdo"
        icon={<Info data-testid="custom-icon" size={16} />}
        open
      >
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(screen.getByText("Header com ícone")).toBeInTheDocument();
  });

  it("renderiza apenas conteúdo quando não há header ou footer", () => {
    render(
      <Popover content="Apenas conteúdo" open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Apenas conteúdo")).toBeInTheDocument();
  });

  it("prioriza header customizado sobre title do Antd", () => {
    render(
      <Popover
        header="Header Customizado"
        title="Título Antd"
        content="Conteúdo"
        open
      >
        <Button>Trigger</Button>
      </Popover>,
    );
    // Header customizado deve aparecer
    expect(screen.getByText("Header Customizado")).toBeInTheDocument();
    // Title do Antd não deve aparecer quando header está presente
    expect(screen.queryByText("Título Antd")).not.toBeInTheDocument();
  });

  it("renderiza trigger corretamente", () => {
    render(
      <Popover content="Conteúdo">
        <Button>Clique aqui</Button>
      </Popover>,
    );
    expect(
      screen.getByRole("button", { name: /clique aqui/i }),
    ).toBeInTheDocument();
  });

  it("aceita props do Antd (placement)", () => {
    render(
      <Popover content="Conteúdo" placement="bottom" open>
        <Button>Trigger</Button>
      </Popover>,
    );
    // Antd renderiza o popover em portal, fora do container do trigger.
    expect(document.querySelector(".ant-popover")).toBeInTheDocument();
  });

  it("aceita props do Antd (trigger)", () => {
    render(
      <Popover content="Conteúdo" trigger="click">
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renderiza com footer contendo botões", () => {
    render(
      <Popover
        header="Cabeçalho"
        content="Tem certeza?"
        footer={
          <div>
            <Button>Cancelar</Button>
            <Button>Confirmar</Button>
          </div>
        }
        open
      >
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Cabeçalho")).toBeInTheDocument();
    expect(screen.getByText("Tem certeza?")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /cancelar/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /confirmar/i }),
    ).toBeInTheDocument();
  });

  it("renderiza apenas header e content (sem footer)", () => {
    render(
      <Popover header="Apenas Header" content="E conteúdo" open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Apenas Header")).toBeInTheDocument();
    expect(screen.getByText("E conteúdo")).toBeInTheDocument();
  });
});
