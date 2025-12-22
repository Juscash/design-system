import { defineConfig } from "tsup";

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
});
