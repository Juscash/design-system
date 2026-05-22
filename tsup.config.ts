import { defineConfig } from "tsup";
import { copyFileSync } from "fs";
import { join } from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
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
