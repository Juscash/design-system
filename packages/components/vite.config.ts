import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: {
      '@ds': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/*.stories.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        provider: resolve(__dirname, 'src/provider.tsx'),
      },
      name: 'DesignSystemComponents',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const extension = format === 'es' ? 'esm.js' : 'js';
        return `${entryName}.${extension}`;
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'antd', '@emotion/react', '@emotion/styled', 'next'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
          '@emotion/react': 'emotionReact',
          '@emotion/styled': 'emotionStyled',
          next: 'Next',
        },
        // Garantir compatibilidade com Next.js 15+ (ESM)
        preserveModules: false,
        interop: 'compat',
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    // Otimizações para Next.js
    target: 'esnext',
    minify: 'esbuild',
  },
});

