import { defineConfig } from "tsup";
import { copyFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
    // Copiar CSS para dist após o build
    copyFileSync(
      join(__dirname, "src/theme/global.css"),
      join(__dirname, "dist/index.css")
    );
  },
});
