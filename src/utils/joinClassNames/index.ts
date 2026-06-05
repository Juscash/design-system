/**
 * Junta classes CSS numa única string, filtrando valores falsy (`false`/
 * `undefined`) para evitar espaços duplicados. Helper compartilhado pelos
 * componentes que compõem `className` condicionalmente.
 */
export function joinClassNames(...tokens: Array<string | false | undefined>): string {
  return tokens.filter(Boolean).join(" ");
}
