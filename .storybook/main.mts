// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const require = createRequire(import.meta.url);

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const designSystemSrc = resolve(rootDir, "src");
const designSystemDist = resolve(rootDir, "dist");
const designSystemCssSrc = resolve(rootDir, "src/theme/global.css");
const designSystemCssDist = resolve(rootDir, "dist/index.css");

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-designs"),
    getAbsolutePath("storybook-addon-pseudo-states"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/nextjs-vite"),
    options: {},
  },

  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import("vite");
    const designSystemAlias = configType === "DEVELOPMENT" ? designSystemSrc : designSystemDist;
    const designSystemCssAlias = configType === "DEVELOPMENT" ? designSystemCssSrc : designSystemCssDist;
    const aliases = [
      {
        find: "@ant-design/nextjs-registry",
        replacement: require.resolve("./AntdRegistryMock.js"),
      },
      {
        find: /^@juscash\/design-system$/,
        replacement: designSystemAlias,
      },
      {
        find: /^@juscash\/design-system\/dist\/index\.css$/,
        replacement: designSystemCssAlias,
      },
    ];

    return mergeConfig(config, {
      resolve: {
        alias: aliases,
      },
      build: {
        rollupOptions: {
          onwarn(warning: any, warn: any) {
            if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
              return;
            }
            warn(warning);
          },
        },
      },
    });
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(`${value}/package.json`));
}
