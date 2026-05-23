import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageHeader } from ".";

describe("PageHeader", () => {
  it("renders title as h1 by default", () => {
    render(<PageHeader title="Page title" />);
    const heading = screen.getByRole("heading", { level: 1, name: "Page title" });
    expect(heading).toBeInTheDocument();
  });

  it("does not render a heading when title is omitted", () => {
    render(<PageHeader description="Lonely description" />);
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByText("Lonely description")).toBeInTheDocument();
  });

  it("renders without any required prop", () => {
    const { container } = render(<PageHeader />);
    expect(container.querySelector(".ds-page-header")).not.toBeNull();
  });

  it("renders the description when provided", () => {
    render(<PageHeader title="Page title" description="Short description" />);
    expect(screen.getByText("Short description")).toBeInTheDocument();
  });

  it("does not render the description when omitted", () => {
    render(<PageHeader title="Page title" />);
    const paragraphs = screen.queryAllByRole("paragraph");
    expect(paragraphs).toHaveLength(0);
  });

  it("renders the actions slot", () => {
    render(<PageHeader title="Page title" actions={<button type="button">Primary</button>} />);
    expect(screen.getByRole("button", { name: "Primary" })).toBeInTheDocument();
  });

  it("renders the title at the requested semantic level", () => {
    render(<PageHeader title="Section" level={2} />);
    expect(screen.getByRole("heading", { level: 2, name: "Section" })).toBeInTheDocument();
  });

  it("does not introduce duplicate banner landmarks", () => {
    const { container } = render(<PageHeader title="Hello" />);
    expect(container.querySelector("header")).toBeNull();
  });

  it("merges the consumer className with the Card root", () => {
    const { container } = render(<PageHeader title="Hello" className="custom-class" />);
    expect(container.querySelector(".custom-class")).not.toBeNull();
  });

  it("accepts a ReactNode title", () => {
    render(<PageHeader title={<span data-testid="rich-title">Rich title</span>} />);
    expect(screen.getByTestId("rich-title")).toBeInTheDocument();
  });

  it("accepts a ReactNode description", () => {
    render(<PageHeader title="Hello" description={<span data-testid="rich-description">Rich description</span>} />);
    expect(screen.getByTestId("rich-description")).toBeInTheDocument();
  });
});
