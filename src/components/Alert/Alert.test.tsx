import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Alert } from ".";
import { Button } from "../Button";

describe("Alert", () => {
  it("renderiza no estado padrao (neutral)", () => {
    render(<Alert message="Texto de alerta" />);
    // Alert geralmente tem role="alert" no Antd
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Texto de alerta")).toBeInTheDocument();
  });

  it("aplica variacao de erro", () => {
    // Antd alert type error usually renders an error icon if showIcon is true, or just styles.
    // Class name checking might be needed if role is same for all.
    const { container } = render(<Alert message="Erro" type="error" />);
    // Check if ant-alert-error class is applied (standard antd behavior)
    expect(container.querySelector(".ant-alert-error")).toBeInTheDocument();
  });

  it("aplica classe customizada para neutral", () => {
    const { container } = render(<Alert message="Neutral" type="neutral" />);
    // Check if custom class is applied
    expect(container.querySelector(".ant-alert-neutral")).toBeInTheDocument();
  });

  it("renderiza description quando showLine2 e description estao presentes", () => {
    render(
      <Alert
        message="Titulo"
        description="Descricao detalhada"
        showLine2={true}
      />,
    );
    expect(screen.getByText("Descricao detalhada")).toBeInTheDocument();
  });

  it("renderiza action quando showButton e action estao presentes", () => {
    render(
      <Alert
        message="Titulo"
        action={<Button>Acao</Button>}
        showButton={true}
      />,
    );
    expect(screen.getByRole("button", { name: /acao/i })).toBeInTheDocument();
  });

  it("renderiza icone quando showLeftIcon/showIcon eh true", () => {
    const { container } = render(<Alert message="Icone" showLeftIcon={true} />);
    // Verify icon presence (Antd renders .ant-alert-icon)
    expect(container.querySelector(".ant-alert-icon")).toBeInTheDocument();
  });
});
