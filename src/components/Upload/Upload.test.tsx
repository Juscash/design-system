import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Upload } from ".";

describe("Upload", () => {
  it("renders upload component", () => {
    render(<Upload>Upload file</Upload>);
    expect(screen.getByText("Upload file")).toBeInTheDocument();
  });
});
