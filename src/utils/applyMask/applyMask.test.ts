import { describe, it, expect } from "vitest";
import { applyMask } from ".";

describe("applyMask", () => {
  describe("cpf", () => {
    it("formats progressive CPF input", () => {
      expect(applyMask("1", "cpf").formatted).toBe("1");
      expect(applyMask("1234", "cpf").formatted).toBe("123.4");
      expect(applyMask("1234567", "cpf").formatted).toBe("123.456.7");
      expect(applyMask("12345678900", "cpf").formatted).toBe("123.456.789-00");
    });

    it("strips non-digits and caps at 11", () => {
      const { formatted, raw } = applyMask("abc12345678900xyz999", "cpf");
      expect(formatted).toBe("123.456.789-00");
      expect(raw).toBe("12345678900");
    });
  });

  describe("cnj", () => {
    it("formats full CNJ", () => {
      expect(applyMask("12345678901234567890", "cnj").formatted).toBe("1234567-89.0123.4.56.7890");
    });

    it("caps at 20 digits", () => {
      expect(applyMask("123456789012345678901234", "cnj").raw).toBe("12345678901234567890");
    });
  });

  describe("oab", () => {
    it("formats 6 digits + UF", () => {
      expect(applyMask("123456SP", "oab").formatted).toBe("123456/SP");
    });

    it("lowercase letters become uppercase", () => {
      expect(applyMask("123456rj", "oab").formatted).toBe("123456/RJ");
    });

    it("applies slash with 2 digits + UF (min allowed)", () => {
      expect(applyMask("12SP", "oab").formatted).toBe("12/SP");
    });

    it("does not apply slash with single digit + UF", () => {
      expect(applyMask("1SP", "oab").formatted).toBe("1");
    });

    it("caps digits at 6", () => {
      expect(applyMask("12345678SP", "oab").formatted).toBe("123456/SP");
    });
  });

  describe("rg", () => {
    it("formats SP RG with digit", () => {
      expect(applyMask("123456789", "rg").formatted).toBe("12.345.678-9");
    });

    it("accepts X as last char", () => {
      expect(applyMask("12345678X", "rg").formatted).toBe("12.345.678-X");
    });
  });

  describe("numero", () => {
    it("keeps only digits", () => {
      expect(applyMask("abc123def456", "numero").formatted).toBe("123456");
    });
  });

  describe("moeda", () => {
    it("formats progressive currency input", () => {
      expect(applyMask("1", "moeda").formatted).toBe("R$ 0,01");
      expect(applyMask("123", "moeda").formatted).toBe("R$ 1,23");
      expect(applyMask("123456", "moeda").formatted).toBe("R$ 1.234,56");
      expect(applyMask("1234567890", "moeda").formatted).toBe("R$ 12.345.678,90");
    });

    it("returns empty for empty input", () => {
      expect(applyMask("", "moeda").formatted).toBe("");
    });
  });

  describe("custom", () => {
    it("filters chars by regex", () => {
      expect(applyMask("a1b2c3", "custom", /[0-9]/).formatted).toBe("123");
    });

    it("accepts hex chars", () => {
      expect(applyMask("Hello-FF00CC", "custom", /[0-9A-Fa-f]/).formatted).toBe("eFF00CC");
    });

    it("accepts uppercase only", () => {
      expect(applyMask("AbCdEf", "custom", /[A-Z]/).formatted).toBe("ACE");
    });

    it("returns empty when no char matches", () => {
      expect(applyMask("abc", "custom", /[0-9]/).formatted).toBe("");
    });

    it("applies upper transform after filter", () => {
      expect(applyMask("Hello World", "custom", /[A-Za-z]/, "upper").formatted).toBe("HELLOWORLD");
    });

    it("applies lower transform after filter", () => {
      expect(applyMask("Hello World", "custom", /[A-Za-z]/, "lower").formatted).toBe("helloworld");
    });

    it("ignores transform for predefined masks", () => {
      expect(applyMask("123abc", "cpf", undefined, "upper").formatted).toBe("123");
    });
  });
});
