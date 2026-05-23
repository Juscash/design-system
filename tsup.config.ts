/// <reference types="node" />
import { defineConfig } from "tsup";
import { copyFileSync, readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

// Raiz do projeto. O `tsup` sempre é executado via npm script do
// `package.json`, portanto o cwd é o diretório que contém este arquivo —
// dispensa o uso de `fileURLToPath(import.meta.url)`, que exige tipos de
// Node carregados para o `tsup.config.ts` (este arquivo fica fora do
// `include` do `tsconfig.json`, então depender de `import.meta.url`
// confunde o type-checker em alguns IDEs).
const projectRoot = process.cwd();

/**
 * Substitui ocorrências de `:global(<seletor>)` por `<seletor>`,
 * respeitando parênteses balanceados (lida com seletores aninhados como
 * `:not(...)` dentro de `:global(...)`).
 *
 * Motivação: `tsup`/`esbuild` não processam a sintaxe `:global(...)` de
 * CSS Modules — o seletor permanece literal e o navegador o ignora. No
 * `Storybook` (Vite) a sintaxe é processada nativamente. Para que o mesmo
 * `*.module.css` funcione nos dois bundlers, removemos o wrapper aqui no
 * pós-build.
 */
function stripCssModulesGlobal(input: string): string {
  let output = "";
  let i = 0;
  const marker = ":global(";

  while (i < input.length) {
    const found = input.indexOf(marker, i);
    if (found === -1) {
      output += input.slice(i);
      break;
    }
    output += input.slice(i, found);
    let depth = 1;
    let j = found + marker.length;
    while (j < input.length && depth > 0) {
      const ch = input[j];
      if (ch === "(") depth++;
      else if (ch === ")") depth--;
      if (depth === 0) break;
      output += ch;
      j++;
    }
    i = j + 1;
  }
  return output;
}

/**
 * Lista recursivamente arquivos com a extensão alvo a partir de um
 * diretório raiz. Mantida síncrona porque o uso é pontual (post-build).
 */
function listFilesRecursive(root: string, extension: string): string[] {
  const result: string[] = [];
  const stack: string[] = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) break;
    const entries = readdirSync(current);
    for (const entry of entries) {
      const full = join(current, entry);
      const stats = statSync(full);
      if (stats.isDirectory()) {
        stack.push(full);
      } else if (full.endsWith(extension)) {
        result.push(full);
      }
    }
  }
  return result;
}

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  // Preserva extensões publicadas: CJS -> .js, ESM -> .mjs (override do default
  // do tsup que, com "type": "module" no package.json, emitiria .cjs / .js).
  outExtension: ({ format }) => ({
    js: format === "cjs" ? ".js" : ".mjs",
  }),
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  minify: false,
  target: "es2018",
  external: ["react", "react-dom", "antd", "@ant-design/cssinjs"],
  platform: "browser",
  injectStyle: true,
  onSuccess: async () => {
    // Copiar o CSS global do tema para dist (consumido pelo `import
    // "@juscash/design-system/dist/index.css"`).
    copyFileSync(join(projectRoot, "src/theme/global.css"), join(projectRoot, "dist/index.css"));

    // Pós-processar os bundles JS removendo o wrapper `:global(...)` dos
    // CSS embutidos como string. Sem isso o navegador ignora os seletores
    // declarados em `*.module.css` (apenas o Vite/Storybook entende a
    // sintaxe de CSS Modules nativamente).
    const distDir = join(projectRoot, "dist");
    const bundleFiles = [...listFilesRecursive(distDir, ".mjs"), ...listFilesRecursive(distDir, ".js")];
    for (const file of bundleFiles) {
      const original = readFileSync(file, "utf8");
      if (!original.includes(":global(")) continue;
      const transformed = stripCssModulesGlobal(original);
      writeFileSync(file, transformed);
    }
  },
});
