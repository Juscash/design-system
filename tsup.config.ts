/// <reference types="node" />
import { defineConfig } from "tsup";
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
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
  // `dayjs` é external (assim como `antd`): precisa ser uma única instância
  // compartilhada com o `antd` e o consumidor, senão o `JuscashProvider`
  // ajustaria o locale (`pt-br`) numa cópia bundleada que o calendário não usa —
  // e o DatePicker renderiza em inglês. `dayjs/*` cobre `dayjs/locale/pt-br`.
  external: ["react", "react-dom", "antd", "@ant-design/cssinjs", "dayjs", "dayjs/*"],
  platform: "browser",
  injectStyle: true,
  onSuccess: async () => {
    const distDir = join(projectRoot, "dist");

    // Self-host da fonte Inter inline como data URI no `@font-face`. Inline (em
    // vez de arquivo + `url()`) evita uma requisição separada do woff2: em dev
    // com a lib linkada por caminho (`LOCAL_DS_PATH`) o arquivo ficaria fora do
    // root do Vite e seria bloqueado por `server.fs.allow` (HTTP 403). Assim a
    // fonte viaja dentro do CSS e funciona em qualquer consumidor sem config
    // extra. Origem: @fontsource-variable/inter (subset latin, eixo de peso).
    const woff2 = readFileSync(
      join(projectRoot, "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"),
    );
    const interDataUri = `data:font/woff2;base64,${woff2.toString("base64")}`;

    // `dist/index.css` (consumido por `import
    // "@juscash/design-system/dist/index.css"`) = `@font-face` (fonts.css, com
    // o data URI injetado no placeholder) no topo + tokens/tema (global.css).
    // Verbatim, sem passar pelo esbuild.
    const fontsCss = readFileSync(join(projectRoot, "src/theme/fonts.css"), "utf8").replaceAll(
      "__INTER_WOFF2_DATA_URI__",
      interDataUri,
    );
    const globalCss = readFileSync(join(projectRoot, "src/theme/global.css"), "utf8");
    writeFileSync(join(distDir, "index.css"), `${fontsCss}\n${globalCss}`);

    // Pós-processar os bundles JS removendo o wrapper `:global(...)` dos
    // CSS embutidos como string. Sem isso o navegador ignora os seletores
    // declarados em `*.module.css` (apenas o Vite/Storybook entende a
    // sintaxe de CSS Modules nativamente).
    const bundleFiles = [...listFilesRecursive(distDir, ".mjs"), ...listFilesRecursive(distDir, ".js")];
    for (const file of bundleFiles) {
      const original = readFileSync(file, "utf8");
      if (!original.includes(":global(")) continue;
      const transformed = stripCssModulesGlobal(original);
      writeFileSync(file, transformed);
    }
  },
});
