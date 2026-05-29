import type { InputMask } from "../../types/utils/applyMask";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CPF_LENGTH = 11;
const CNJ_LENGTH = 20;

/**
 * Valida e-mail via regex (compatível com o checkValidity nativo do
 * `type="email"`, sem casos exóticos). Retorna `true` se válido.
 */
export function isValidEmail(value: string): boolean {
  if (value === "") return false;
  return EMAIL_REGEX.test(value);
}

/**
 * Valida CPF — checa comprimento (11 dígitos) e dígitos verificadores
 * via módulo 11. Aceita o valor formatado ou apenas dígitos.
 */
export function isValidCpf(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== CPF_LENGTH) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;
  const dv1 = computeCpfDigit(digits, 9);
  if (dv1 !== Number(digits[9])) return false;
  const dv2 = computeCpfDigit(digits, 10);
  return dv2 === Number(digits[10]);
}

function computeCpfDigit(digits: string, length: number): number {
  let sum = 0;
  for (let i = 0; i < length; i++) {
    sum += Number(digits[i]) * (length + 1 - i);
  }
  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

/**
 * Valida número CNJ — 20 dígitos no formato `NNNNNNN-DD.AAAA.J.TR.OOOO`.
 * Aceita o valor formatado ou apenas dígitos. Algoritmo módulo 97 conforme
 * Resolução CNJ nº 65/2008 (DD = 98 - ((NNNNNNN + AAAA + J + TR + OOOO) mod 97)).
 */
export function isValidCnj(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== CNJ_LENGTH) return false;
  const sequencial = digits.slice(0, 7);
  const dvInformed = digits.slice(7, 9);
  const ano = digits.slice(9, 13);
  const segmento = digits.slice(13, 14);
  const tribunal = digits.slice(14, 16);
  const origem = digits.slice(16, 20);
  // Anexar "00" antes do mod 97 conforme a Resolução CNJ 65/2008:
  // DV = 98 - ((NNNNNNN AAAA J TR OOOO) * 100 mod 97).
  const base = sequencial + ano + segmento + tribunal + origem + "00";
  const remainder = mod97(base);
  const dvComputed = 98 - remainder;
  return dvComputed === Number(dvInformed);
}

/**
 * Calcula `n mod 97` para strings numéricas longas (> Number.MAX_SAFE_INTEGER).
 * Processa em chunks de 9 dígitos preservando o resto entre iterações.
 */
function mod97(digits: string): number {
  const CHUNK_SIZE = 9;
  let remainder = "";
  for (let i = 0; i < digits.length; i += CHUNK_SIZE) {
    const chunk = remainder + digits.slice(i, i + CHUNK_SIZE);
    remainder = String(Number(chunk) % 97);
  }
  return Number(remainder);
}

/**
 * Retorna a função built-in de validação adequada para o `mask`/`type`.
 * Retorna `undefined` se não há validador automático para a combinação.
 */
export function getBuiltinValidator(
  mask: InputMask | undefined,
  type: string | undefined,
): ((raw: string) => boolean) | undefined {
  if (type === "email") return isValidEmail;
  if (mask === "cpf") return isValidCpf;
  if (mask === "cnj") return isValidCnj;
  return undefined;
}

/**
 * Mensagens default das validações built-in. Consumidor pode sobrescrever
 * passando `validate` próprio que retorne outra mensagem.
 */
export const BUILTIN_ERROR_MESSAGES = {
  email: "E-mail inválido",
  cpf: "CPF inválido",
  cnj: "Número CNJ inválido",
} as const;
