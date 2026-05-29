import type { ApplyMaskResult, InputMask, MaskTransform } from "../../types/utils/applyMask";

const CPF_DIGITS = 11;
const CNJ_DIGITS = 20;
const OAB_DIGITS_MIN = 2;
const OAB_DIGITS_MAX = 6;
const OAB_LETTERS = 2;
const RG_DIGITS = 9;
const MOEDA_DECIMALS = 2;

const ONLY_DIGITS = /\D/g;
const ONLY_DIGITS_OR_X = /[^\dXx]/g;
const ONLY_DIGITS_AND_UF = /[^\dA-Za-z]/g;

/**
 * Mantém apenas os caracteres que casam com a regex. Cada char é testado
 * individualmente — caracteres que falham são descartados. Usado em
 * `mask="custom"` e como helper interno das máscaras predefinidas.
 */
function filterByRegex(value: string, pattern: RegExp): string {
  let result = "";
  for (const char of value) {
    if (pattern.test(char)) result += char;
  }
  return result;
}

/** Aplica CPF — `###.###.###-##` sobre até 11 dígitos. */
function applyCpf(value: string): ApplyMaskResult {
  const raw = value.replace(ONLY_DIGITS, "").slice(0, CPF_DIGITS);
  const p1 = raw.slice(0, 3);
  const p2 = raw.slice(3, 6);
  const p3 = raw.slice(6, 9);
  const p4 = raw.slice(9, 11);
  let formatted = p1;
  if (raw.length > 3) formatted += `.${p2}`;
  if (raw.length > 6) formatted += `.${p3}`;
  if (raw.length > 9) formatted += `-${p4}`;
  return { formatted, raw };
}

/** Aplica CNJ — `#######-##.####.#.##.####` sobre até 20 dígitos. */
function applyCnj(value: string): ApplyMaskResult {
  const raw = value.replace(ONLY_DIGITS, "").slice(0, CNJ_DIGITS);
  const p1 = raw.slice(0, 7);
  const p2 = raw.slice(7, 9);
  const p3 = raw.slice(9, 13);
  const p4 = raw.slice(13, 14);
  const p5 = raw.slice(14, 16);
  const p6 = raw.slice(16, 20);
  let formatted = p1;
  if (raw.length > 7) formatted += `-${p2}`;
  if (raw.length > 9) formatted += `.${p3}`;
  if (raw.length > 13) formatted += `.${p4}`;
  if (raw.length > 14) formatted += `.${p5}`;
  if (raw.length > 16) formatted += `.${p6}`;
  return { formatted, raw };
}

/**
 * Aplica OAB — `[2-6 dígitos]/[UF]` (2 letras maiúsculas).
 * O usuário pode começar a digitar letras (UF) quando já houver pelo menos
 * 2 dígitos, sem precisar atingir o máximo de 6.
 */
function applyOab(value: string): ApplyMaskResult {
  const cleaned = value.replace(ONLY_DIGITS_AND_UF, "");
  const digits = cleaned.replace(/\D/g, "").slice(0, OAB_DIGITS_MAX);
  const letters = cleaned
    .replace(/[^A-Za-z]/g, "")
    .slice(0, OAB_LETTERS)
    .toUpperCase();
  let formatted = digits;
  if (digits.length >= OAB_DIGITS_MIN && letters.length > 0) formatted += `/${letters}`;
  return { formatted, raw: digits + letters };
}

/** Aplica RG — `##.###.###-#` (formato SP; aceita dígito ou X no final). */
function applyRg(value: string): ApplyMaskResult {
  const raw = value.replace(ONLY_DIGITS_OR_X, "").slice(0, RG_DIGITS).toUpperCase();
  const p1 = raw.slice(0, 2);
  const p2 = raw.slice(2, 5);
  const p3 = raw.slice(5, 8);
  const p4 = raw.slice(8, 9);
  let formatted = p1;
  if (raw.length > 2) formatted += `.${p2}`;
  if (raw.length > 5) formatted += `.${p3}`;
  if (raw.length > 8) formatted += `-${p4}`;
  return { formatted, raw };
}

/** Apenas dígitos — sem formatação. */
function applyNumero(value: string): ApplyMaskResult {
  const raw = value.replace(ONLY_DIGITS, "");
  return { formatted: raw, raw };
}

/** Adiciona separador de milhares (`.`) à parte inteira. */
function addThousands(intStr: string): string {
  return intStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Aplica moeda — `R$ X.XXX,XX` com 2 casas decimais fixas. */
function applyMoeda(value: string): ApplyMaskResult {
  const raw = value.replace(ONLY_DIGITS, "");
  if (raw.length === 0) return { formatted: "", raw: "" };
  const padded = raw.padStart(MOEDA_DECIMALS + 1, "0");
  const intPart = padded.slice(0, padded.length - MOEDA_DECIMALS);
  const decPart = padded.slice(padded.length - MOEDA_DECIMALS);
  const intNoLeadingZero = intPart.replace(/^0+(?=\d)/, "");
  const grouped = addThousands(intNoLeadingZero || "0");
  const formatted = `R$ ${grouped},${decPart}`;
  return { formatted, raw };
}

/**
 * Aplica a transformação opcional ao texto filtrado em `mask="custom"`.
 * `upper` força MAIÚSCULAS, `lower` força minúsculas, ausente mantém o case.
 */
function applyTransform(value: string, transform: MaskTransform | undefined): string {
  if (transform === "upper") return value.toUpperCase();
  if (transform === "lower") return value.toLowerCase();
  return value;
}

/**
 * Aplica a máscara ao valor. Retorna `{ formatted, raw }`. Quando
 * `mask="custom"`, `pattern` é obrigatório e funciona como filtro: cada
 * caractere é testado e mantido apenas se casar com a regex. O parâmetro
 * `transform` é aplicado **apenas** quando `mask="custom"` — máscaras
 * predefinidas ignoram esse argumento.
 */
export function applyMask(value: string, mask: InputMask, pattern?: RegExp, transform?: MaskTransform): ApplyMaskResult {
  if (mask === "cpf") return applyCpf(value);
  if (mask === "cnj") return applyCnj(value);
  if (mask === "oab") return applyOab(value);
  if (mask === "rg") return applyRg(value);
  if (mask === "numero") return applyNumero(value);
  if (mask === "moeda") return applyMoeda(value);
  const filter = pattern ?? /./;
  const filtered = filterByRegex(value, filter);
  const transformed = applyTransform(filtered, transform);
  return { formatted: transformed, raw: transformed };
}

export type { ApplyMaskResult, InputMask, MaskTransform } from "../../types/utils/applyMask";
