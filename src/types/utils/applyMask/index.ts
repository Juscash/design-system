/**
 * Tipos do utilitário `applyMask`.
 *
 * Máscaras suportadas:
 * - `cpf` — `###.###.###-##` (11 dígitos)
 * - `cnj` — `#######-##.####.#.##.####` (20 dígitos, numeração única CNJ)
 * - `oab` — `[2-6 dígitos]/UF` (2 letras maiúsculas)
 * - `rg` — `##.###.###-#` (formato SP; outros estados via `custom`)
 * - `numero` — apenas dígitos, sem formatação
 * - `moeda` — `R$ X.XXX,XX` com formatação dinâmica de milhares e centavos
 * - `custom` — filtro caractere-a-caractere via regex em `maskPattern`;
 *   opcionalmente transforma o case via `maskTransform`.
 */
export type InputMask = "cnj" | "oab" | "numero" | "moeda" | "rg" | "cpf" | "custom";

/**
 * Transformação opcional aplicada após o filtro de `mask="custom"`.
 * - `upper` — converte todos os chars para maiúsculo.
 * - `lower` — converte todos os chars para minúsculo.
 */
export type MaskTransform = "upper" | "lower";

/**
 * Resultado da aplicação de uma máscara.
 * - `formatted` é o valor que vai para o `value` do input.
 * - `raw` é o valor sem formatação (apenas chars significativos).
 */
export interface ApplyMaskResult {
  formatted: string;
  raw: string;
}
