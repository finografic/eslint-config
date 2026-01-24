import { defineConfig } from 'eslint/config';

import { base } from './src/layers/base.layer';
import { imports } from './src/layers/imports.layer';
import { node } from './src/layers/node.layer';
import { typescript } from './src/layers/typescript.layer';
import { typescriptTyped } from './src/layers/typescript-typed.layer';

export default defineConfig(
  { ignores: ['templates/**', 'dist/**', 'node_modules/**'] },
  ...base(),
  ...imports(),
  ...node(),
  ...typescript(),
  ...typescriptTyped({
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
    files: ['src/**/*.ts', 'eslint.config.ts'],
  }),
);
