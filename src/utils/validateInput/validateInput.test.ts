import { describe, it, expect } from "vitest";
import { isValidCnj, isValidCpf, isValidEmail, getBuiltinValidator } from ".";

describe("isValidEmail", () => {
  it("accepts well-formed emails", () => {
    expect(isValidEmail("foo@bar.com")).toBe(true);
    expect(isValidEmail("user.name+tag@sub.dominio.com.br")).toBe(true);
  });

  it("rejects malformed inputs", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("plain")).toBe(false);
    expect(isValidEmail("no-at-sign.com")).toBe(false);
    expect(isValidEmail("no-domain@")).toBe(false);
    expect(isValidEmail("foo@bar")).toBe(false);
    expect(isValidEmail("with space@x.com")).toBe(false);
  });
});

describe("isValidCpf", () => {
  it("accepts valid CPFs", () => {
    expect(isValidCpf("11144477735")).toBe(true);
    expect(isValidCpf("111.444.777-35")).toBe(true);
  });

  it("rejects invalid DVs", () => {
    expect(isValidCpf("12345678900")).toBe(false);
    expect(isValidCpf("111.444.777-30")).toBe(false);
  });

  it("rejects wrong length", () => {
    expect(isValidCpf("1234567890")).toBe(false);
    expect(isValidCpf("123456789012")).toBe(false);
  });

  it("rejects repeated digits (00000000000 etc.)", () => {
    expect(isValidCpf("00000000000")).toBe(false);
    expect(isValidCpf("11111111111")).toBe(false);
    expect(isValidCpf("99999999999")).toBe(false);
  });
});

describe("isValidCnj", () => {
  it("accepts valid CNJ number", () => {
    expect(isValidCnj("1234567-13.2024.8.26.0100")).toBe(true);
  });

  it("rejects wrong DV", () => {
    expect(isValidCnj("1234567-99.2024.8.26.0100")).toBe(false);
  });

  it("rejects wrong length", () => {
    expect(isValidCnj("1234567")).toBe(false);
  });
});

describe("getBuiltinValidator", () => {
  it("returns email validator for type=email", () => {
    expect(getBuiltinValidator(undefined, "email")).toBe(isValidEmail);
  });

  it("returns cpf validator for mask=cpf", () => {
    expect(getBuiltinValidator("cpf", undefined)).toBe(isValidCpf);
  });

  it("returns cnj validator for mask=cnj", () => {
    expect(getBuiltinValidator("cnj", undefined)).toBe(isValidCnj);
  });

  it("returns undefined for other combinations", () => {
    expect(getBuiltinValidator("oab", undefined)).toBeUndefined();
    expect(getBuiltinValidator(undefined, "text")).toBeUndefined();
  });
});
