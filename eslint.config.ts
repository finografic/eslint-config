import { defineConfig } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

import { ERROR } from './src/constants/settings.constants';
import { base } from './src/layers/base.layer';
import { node } from './src/layers/node.layer';
import { typescript } from './src/layers/typescript.layer';
import { typescriptTyped } from './src/layers/typescript-typed.layer';

export default defineConfig(
  { ignores: ['templates/**', 'dist/**', 'node_modules/**'] },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        ERROR,
        {
          groups: [
            ['^node:'],
            ['^@finografic', '^@workspace'],
            ['^\\u0000'],
            ['^(?!@finografic)(?!@workspace)@?[a-z]'],
            [
              '^(layers|helpers|types|constants|config)(/|$)',
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$',
            ],
          ],
        },
      ],
      'simple-import-sort/exports': ERROR,
    },
  },
  ...base(),
  ...node(),
  ...typescript(),
  ...typescriptTyped({
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
    files: ['src/**/*.ts', 'eslint.config.ts'],
  }),
);
