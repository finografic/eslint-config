import type { ESLintConfig } from '../types';
import type { TSESLint } from '@typescript-eslint/utils';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';

const flatConfigs = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
) as TSESLint.FlatConfig.ConfigArray;

export const base = {
  recommended: flatConfigs[0],
} satisfies Record<string, ESLintConfig>;
