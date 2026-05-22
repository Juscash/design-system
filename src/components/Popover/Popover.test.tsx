import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Popover } from ".";
import { Button } from "../Button";
import { Info } from "lucide-react";

describe("Popover", () => {
  it("renderiza com conteÃºdo simples", () => {
    render(
      <Popover content="ConteÃºdo do popover" open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("ConteÃºdo do popover")).toBeInTheDocument();
  });

  it("renderiza com title do Antd", () => {
    render(
      <Popover title="TÃ­tulo" content="ConteÃºdo" open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("TÃ­tulo")).toBeInTheDocument();
    expect(screen.getByText("ConteÃºdo")).toBeInTheDocument();
  });

  it("renderiza com header customizado (2 slots)", () => {
    render(
      <Popover header="Header Customizado" content="ConteÃºdo principal" open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Header Customizado")).toBeInTheDocument();
    expect(screen.getByText("ConteÃºdo principal")).toBeInTheDocument();
  });

  it("renderiza com footer customizado (3 slots)", () => {
    render(
      <Popover
        header="Header"
        content="ConteÃºdo"
        footer="Footer Customizado"
        open
      >
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("ConteÃºdo")).toBeInTheDocument();
    expect(screen.getByText("Footer Customizado")).toBeInTheDocument();
  });

  it("renderiza com Ã­cone customizado no header", () => {
    render(
      <Popover
        header="Header com Ã­cone"
        content="ConteÃºdo"
        icon={<Info data-testid="custom-icon" size={16} />}
        open
      >
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(screen.getByText("Header com Ã­cone")).toBeInTheDocument();
  });

  it("renderiza apenas conteÃºdo quando nÃ£o hÃ¡ header ou footer", () => {
    render(
      <Popover content="Apenas conteÃºdo" open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Apenas conteÃºdo")).toBeInTheDocument();
  });

  it("prioriza header customizado sobre title do Antd", () => {
    render(
      <Popover
        header="Header Customizado"
        title="TÃ­tulo Antd"
        content="ConteÃºdo"
        open
      >
        <Button>Trigger</Button>
      </Popover>,
    );
    // Header customizado deve aparecer
    expect(screen.getByText("Header Customizado")).toBeInTheDocument();
    // Title do Antd nÃ£o deve aparecer quando header estÃ¡ presente
    expect(screen.queryByText("TÃ­tulo Antd")).not.toBeInTheDocument();
  });

  it("renderiza trigger corretamente", () => {
    render(
      <Popover content="ConteÃºdo">
        <Button>Clique aqui</Button>
      </Popover>,
    );
    expect(
      screen.getByRole("button", { name: /clique aqui/i }),
    ).toBeInTheDocument();
  });

  it("aceita props do Antd (placement)", () => {
    const { container } = render(
      <Popover content="ConteÃºdo" placement="bottom" open>
        <Button>Trigger</Button>
      </Popover>,
    );
    // Antd adiciona classes baseadas no placement
    expect(container.querySelector(".ant-popover")).toBeInTheDocument();
  });

  it("aceita props do Antd (trigger)", () => {
    render(
      <Popover content="ConteÃºdo" trigger="click">
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renderiza com footer contendo botÃµes", () => {
    render(
      <Popover
        header="Confirmar"
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
    expect(screen.getByText("Confirmar")).toBeInTheDocument();
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
      <Popover header="Apenas Header" content="E conteÃºdo" open>
        <Button>Trigger</Button>
      </Popover>,
    );
    expect(screen.getByText("Apenas Header")).toBeInTheDocument();
    expect(screen.getByText("E conteÃºdo")).toBeInTheDocument();
  });
});
