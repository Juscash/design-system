import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Radio, RadioGroup } from ".";

describe("Radio", () => {
  it("renders radio with label", () => {
    render(<Radio>Option A</Radio>);
    expect(screen.getByText("Option A")).toBeInTheDocument();
  });

  it("applies ds-radio base class to the wrapper", () => {
    const { container } = render(<Radio>Label</Radio>);
    const wrapper = container.querySelector("label.ant-radio-wrapper");
    expect(wrapper?.className).toMatch(/ds-radio/);
  });

  it("renders disabled radio", () => {
    render(<Radio disabled>Disabled</Radio>);
    expect(screen.getByRole("radio")).toBeDisabled();
  });

  it("renders checked radio", () => {
    render(<Radio checked>Checked</Radio>);
    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("applies ds-radio-error class when error prop is true", () => {
    const { container } = render(<Radio error>Erro</Radio>);
    const wrapper = container.querySelector("label.ant-radio-wrapper");
    expect(wrapper?.className).toMatch(/ds-radio-error/);
  });

  it("applies ds-radio--truncate when truncate prop is true", () => {
    const { container } = render(<Radio truncate>Texto longo</Radio>);
    const wrapper = container.querySelector("label.ant-radio-wrapper");
    expect(wrapper?.className).toMatch(/ds-radio--truncate/);
  });

  it("applies max-width 240px by default when truncate is true and width is omitted", () => {
    const { container } = render(<Radio truncate>Texto</Radio>);
    const wrapper = container.querySelector("label.ant-radio-wrapper") as HTMLElement | null;
    expect(wrapper?.style.maxWidth).toBe("240px");
  });

  it("accepts width as number (interpreted as pixels)", () => {
    const { container } = render(<Radio width={320}>Texto</Radio>);
    const wrapper = container.querySelector("label.ant-radio-wrapper") as HTMLElement | null;
    expect(wrapper?.style.maxWidth).toBe("320px");
  });

  it("accepts width as CSS string", () => {
    const { container } = render(<Radio width="50%">Texto</Radio>);
    const wrapper = container.querySelector("label.ant-radio-wrapper") as HTMLElement | null;
    expect(wrapper?.style.maxWidth).toBe("50%");
  });

  it("width takes precedence over truncate default", () => {
    const { container } = render(
      <Radio truncate width={180}>
        Texto
      </Radio>,
    );
    const wrapper = container.querySelector("label.ant-radio-wrapper") as HTMLElement | null;
    expect(wrapper?.style.maxWidth).toBe("180px");
  });

  it("calls onChange when clicked", () => {
    const onChange = vi.fn();
    render(<Radio onChange={onChange}>Click</Radio>);
    fireEvent.click(screen.getByRole("radio"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("does not call onChange when disabled", () => {
    const onChange = vi.fn();
    render(
      <Radio onChange={onChange} disabled>
        Disabled
      </Radio>,
    );
    fireEvent.click(screen.getByRole("radio"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("applies ds-radio--rich class when rich prop is true", () => {
    const { container } = render(<Radio rich label="Premium" secondaryText="Benefícios extras" />);
    const wrapper = container.querySelector("label.ant-radio-wrapper");
    expect(wrapper?.className).toMatch(/ds-radio--rich/);
  });

  it("renders rich content with label and secondary text", () => {
    render(<Radio rich label="Opção Premium" secondaryText="Inclui benefícios" />);
    expect(screen.getByText("Opção Premium")).toBeInTheDocument();
    expect(screen.getByText("Inclui benefícios")).toBeInTheDocument();
  });

  it("falls back to children when rich label is omitted", () => {
    render(<Radio rich>Texto via children</Radio>);
    expect(screen.getByText("Texto via children")).toBeInTheDocument();
  });

  it("forwards custom className alongside ds-radio", () => {
    const { container } = render(<Radio className="custom-cls">Label</Radio>);
    const wrapper = container.querySelector("label.ant-radio-wrapper");
    expect(wrapper?.className).toMatch(/custom-cls/);
    expect(wrapper?.className).toMatch(/ds-radio/);
  });

  describe("Radio.Group", () => {
    it("renders multiple radios under a single group", () => {
      render(
        <RadioGroup>
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
          <Radio value="c">C</Radio>
        </RadioGroup>,
      );
      expect(screen.getAllByRole("radio")).toHaveLength(3);
    });

    it("applies ds-radio-group class to the container", () => {
      const { container } = render(
        <RadioGroup>
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
        </RadioGroup>,
      );
      const groupEl = container.querySelector(".ant-radio-group");
      expect(groupEl?.className).toMatch(/ds-radio-group/);
    });

    it("emits onChange with selected value", () => {
      const onChange = vi.fn();
      render(
        <RadioGroup onChange={onChange}>
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
        </RadioGroup>,
      );
      fireEvent.click(screen.getByLabelText("B"));
      expect(onChange).toHaveBeenCalled();
      const callArg = onChange.mock.calls[0][0];
      expect(callArg.target.value).toBe("b");
    });

    it("only one radio can be selected at a time", () => {
      render(
        <RadioGroup defaultValue="a">
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
        </RadioGroup>,
      );
      const radioA = screen.getByLabelText("A") as HTMLInputElement;
      const radioB = screen.getByLabelText("B") as HTMLInputElement;
      expect(radioA.checked).toBe(true);
      expect(radioB.checked).toBe(false);
      fireEvent.click(radioB);
      expect(radioA.checked).toBe(false);
      expect(radioB.checked).toBe(true);
    });

    it("disables all items when group disabled", () => {
      render(
        <RadioGroup disabled>
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
        </RadioGroup>,
      );
      for (const r of screen.getAllByRole("radio")) {
        expect(r).toBeDisabled();
      }
    });
  });
});
