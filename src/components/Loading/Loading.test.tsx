import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Loading } from ".";

describe("Loading", () => {
  it("renders correctly", () => {
    const { container } = render(<Loading />);
    expect(container.querySelector(".ant-spin")).toBeInTheDocument();
  });

  it("renders tip when wrapping children", () => {
    render(
      <Loading tip="Loading..." spinning>
        <div>Conteúdo</div>
      </Loading>,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the lucide loader icon as indicator", () => {
    const { container } = render(<Loading />);
    expect(container.querySelector(".ds-loading-spinner svg")).toBeInTheDocument();
  });
});
