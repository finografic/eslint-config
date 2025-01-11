// @ts-nocheck

// NOTE: EXAMPLE ONLY TO INVESTIGATE ANOTHER DAY..
// TODO: INVESTIGATE ANOTHER DAY !!

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        presets: resolve(__dirname, 'src/presets/index.ts'),
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [
        // External dependencies from package.json
        '@eslint/js',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint-plugin-emotion',
        'eslint-plugin-import',
        'eslint-plugin-lodash',
        'eslint-plugin-prettier',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
      ],
      output: {
        // Preserve directory structure
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        // Ensure proper extensions in imports
        format: 'es',
      },
    },
  },
  plugins: [
    // Generate .d.ts files
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      // Ensure .d.ts files match our export structure
      staticImport: true,
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    // Handle TypeScript paths
    alias: {
      '@/': resolve(__dirname, 'src/'),
    },
  },
});
