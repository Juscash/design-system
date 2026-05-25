import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from ".";

describe("Checkbox", () => {
  it("renders checkbox with label", () => {
    render(<Checkbox>Aceito os termos</Checkbox>);
    expect(screen.getByText("Aceito os termos")).toBeInTheDocument();
  });

  it("applies ds-checkbox base class to the wrapper", () => {
    const { container } = render(<Checkbox>Label</Checkbox>);
    const wrapper = container.querySelector("label.ant-checkbox-wrapper");
    expect(wrapper?.className).toMatch(/ds-checkbox/);
  });

  it("renders disabled checkbox (input not interactive)", () => {
    render(<Checkbox disabled>Disabled</Checkbox>);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("renders checked checkbox", () => {
    render(<Checkbox checked>Checked</Checkbox>);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("renders indeterminate visually", () => {
    const { container } = render(<Checkbox indeterminate>Indeterminate</Checkbox>);
    const innerCheckbox = container.querySelector(".ant-checkbox");
    expect(innerCheckbox?.className).toMatch(/ant-checkbox-indeterminate/);
  });

  it("applies ds-checkbox-error class when error prop is true", () => {
    const { container } = render(<Checkbox error>Erro</Checkbox>);
    const wrapper = container.querySelector("label.ant-checkbox-wrapper");
    expect(wrapper?.className).toMatch(/ds-checkbox-error/);
  });

  it("applies ds-checkbox--truncate class when truncate prop is true", () => {
    const { container } = render(<Checkbox truncate>Texto bem longo para truncar</Checkbox>);
    const wrapper = container.querySelector("label.ant-checkbox-wrapper");
    expect(wrapper?.className).toMatch(/ds-checkbox--truncate/);
  });

  it("does not apply truncate class when prop is omitted", () => {
    const { container } = render(<Checkbox>Default</Checkbox>);
    const wrapper = container.querySelector("label.ant-checkbox-wrapper");
    expect(wrapper?.className).not.toMatch(/ds-checkbox--truncate/);
  });

  it("applies max-width 240px by default when truncate is true and width is omitted", () => {
    const { container } = render(<Checkbox truncate>Texto</Checkbox>);
    const wrapper = container.querySelector("label.ant-checkbox-wrapper") as HTMLElement | null;
    expect(wrapper?.style.maxWidth).toBe("240px");
  });

  it("does not apply max-width when truncate=false and width is omitted", () => {
    const { container } = render(<Checkbox>Texto</Checkbox>);
    const wrapper = container.querySelector("label.ant-checkbox-wrapper") as HTMLElement | null;
    expect(wrapper?.style.maxWidth).toBe("");
  });

  it("accepts width as number (interpreted as pixels)", () => {
    const { container } = render(<Checkbox width={320}>Texto</Checkbox>);
    const wrapper = container.querySelector("label.ant-checkbox-wrapper") as HTMLElement | null;
    expect(wrapper?.style.maxWidth).toBe("320px");
  });

  it("accepts width as CSS string (used verbatim)", () => {
    const { container } = render(<Checkbox width="50%">Texto</Checkbox>);
    const wrapper = container.querySelector("label.ant-checkbox-wrapper") as HTMLElement | null;
    expect(wrapper?.style.maxWidth).toBe("50%");
  });

  it("width takes precedence over truncate default", () => {
    const { container } = render(
      <Checkbox truncate width={180}>
        Texto
      </Checkbox>,
    );
    const wrapper = container.querySelector("label.ant-checkbox-wrapper") as HTMLElement | null;
    expect(wrapper?.style.maxWidth).toBe("180px");
  });

  it("merges width with consumer-provided style", () => {
    const { container } = render(
      <Checkbox width={200} style={{ marginTop: 8 }}>
        Texto
      </Checkbox>,
    );
    const wrapper = container.querySelector("label.ant-checkbox-wrapper") as HTMLElement | null;
    expect(wrapper?.style.maxWidth).toBe("200px");
    expect(wrapper?.style.marginTop).toBe("8px");
  });

  it("calls onChange when toggled", () => {
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange}>Toggle</Checkbox>);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.checked).toBe(true);
  });

  it("does not call onChange when disabled", () => {
    const onChange = vi.fn();
    render(
      <Checkbox onChange={onChange} disabled>
        Disabled
      </Checkbox>,
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports controlled checked + onChange", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Checkbox checked={false} onChange={onChange}>
        Controlled
      </Checkbox>,
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalled();
    // Without prop update, still unchecked
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    rerender(
      <Checkbox checked onChange={onChange}>
        Controlled
      </Checkbox>,
    );
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("applies ds-checkbox--rich class when rich prop is true", () => {
    const { container } = render(<Checkbox rich label="Premium" secondaryText="Benefícios extras" />);
    const wrapper = container.querySelector("label.ant-checkbox-wrapper");
    expect(wrapper?.className).toMatch(/ds-checkbox--rich/);
  });

  it("renders rich content with label and secondary text", () => {
    render(<Checkbox rich label="Opção Premium" secondaryText="Inclui benefícios" />);
    expect(screen.getByText("Opção Premium")).toBeInTheDocument();
    expect(screen.getByText("Inclui benefícios")).toBeInTheDocument();
  });

  it("rich without secondaryText still renders the label", () => {
    render(<Checkbox rich label="Apenas título" />);
    expect(screen.getByText("Apenas título")).toBeInTheDocument();
  });

  it("falls back to children when rich label is omitted", () => {
    render(<Checkbox rich>Texto via children</Checkbox>);
    expect(screen.getByText("Texto via children")).toBeInTheDocument();
  });

  it("forwards custom className alongside ds-checkbox", () => {
    const { container } = render(<Checkbox className="custom-cls">Label</Checkbox>);
    const wrapper = container.querySelector("label.ant-checkbox-wrapper");
    expect(wrapper?.className).toMatch(/custom-cls/);
    expect(wrapper?.className).toMatch(/ds-checkbox/);
  });

  describe("Checkbox.Group", () => {
    it("renders options as checkboxes", () => {
      render(<Checkbox.Group options={["A", "B", "C"]} defaultValue={["A"]}></Checkbox.Group>);
      expect(screen.getAllByRole("checkbox")).toHaveLength(3);
    });

    it("emits onChange with selected values when toggled", () => {
      const onChange = vi.fn();
      render(<Checkbox.Group options={["A", "B"]} onChange={onChange} />);
      fireEvent.click(screen.getByLabelText("B"));
      expect(onChange).toHaveBeenCalledWith(["B"]);
    });

    it("respects defaultValue selecting initial items", () => {
      render(<Checkbox.Group options={["A", "B"]} defaultValue={["B"]} />);
      const checkboxA = screen.getByLabelText("A") as HTMLInputElement;
      const checkboxB = screen.getByLabelText("B") as HTMLInputElement;
      expect(checkboxA.checked).toBe(false);
      expect(checkboxB.checked).toBe(true);
    });

    it("disables all items when group disabled", () => {
      render(<Checkbox.Group options={["A", "B"]} disabled />);
      for (const cb of screen.getAllByRole("checkbox")) {
        expect(cb).toBeDisabled();
      }
    });
  });
});
