import { defineConfig } from 'eslint/config';

import { base } from './src/layers/base.layer';
import { typescript } from './src/layers/typescript.layer';
import { typescriptTyped } from './src/layers/typescript-typed.layer';

export default defineConfig(
  { ignores: ['templates/**'] },
  ...base(),
  ...typescript(),
  ...typescriptTyped({
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
    files: ['src/**/*.ts', 'eslint.config.ts'],
  }),
);
