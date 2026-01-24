// @ts-expect-error
// @ts-nocheck
import type { ESLintConfig } from '@finografic/eslint-config';
import { base, node, typescript, typescriptTyped } from '@finografic/eslint-config';

export default [
  ...base(),
  ...imports(),
  ...node(),
  ...typescript(),
  ...typescriptTyped({
    project: './tsconfig.json',
    files: ['**/*.ts', '**/*.tsx'],
  }),
] satisfies ESLintConfig[];
