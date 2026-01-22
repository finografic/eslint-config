import stylistic from '@stylistic/eslint-plugin';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

import { ERROR, OFF, WARN } from '../constants/settings.constants';
import type { ESLintConfig } from 'types/eslint.types';

const TS_FILES = ['**/*.ts', '**/*.tsx'];

export function typescript(): ESLintConfig[] {
  return [
    {
      name: '@finografic/typescript',

      files: TS_FILES,

      languageOptions: {
        parser: tsParser,
        sourceType: 'module',
      },

      plugins: {
        '@typescript-eslint': tseslint,
        '@stylistic': stylistic,
      },

      rules: {
        /*
         * ─────────────────────────────────────────────
         * Layer boundary enforcement
         * ─────────────────────────────────────────────
         */

        // Disable base unused vars in favor of TS variant
        'no-unused-vars': OFF,

        '@typescript-eslint/no-unused-vars': [
          WARN,
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],

        /*
         * ─────────────────────────────────────────────
         * TypeScript rules (NO type information required)
         * ─────────────────────────────────────────────
         */

        '@typescript-eslint/adjacent-overload-signatures': ERROR,
        '@typescript-eslint/array-type': [ERROR, { default: 'array-simple' }],
        '@typescript-eslint/ban-ts-comment': WARN,
        '@typescript-eslint/consistent-type-assertions': ERROR,

        // You said: prefer interface where possible
        '@typescript-eslint/consistent-type-definitions': [ERROR, 'interface'],

        '@typescript-eslint/method-signature-style': [ERROR, 'property'],
        '@typescript-eslint/no-array-constructor': ERROR,
        '@typescript-eslint/no-empty-interface': OFF,
        '@typescript-eslint/no-explicit-any': OFF,
        '@typescript-eslint/no-inferrable-types': OFF,
        '@typescript-eslint/no-namespace': OFF,
        '@typescript-eslint/no-non-null-assertion': OFF,
        '@typescript-eslint/no-redeclare': ERROR,
        '@typescript-eslint/no-require-imports': ERROR,
        '@typescript-eslint/no-this-alias': ERROR,
        '@typescript-eslint/prefer-as-const': ERROR,
        '@typescript-eslint/prefer-for-of': ERROR,
        '@typescript-eslint/prefer-function-type': ERROR,
        '@typescript-eslint/unified-signatures': ERROR,

        /*
         * ─────────────────────────────────────────────
         * Stylistic (non-formatting, TS-only)
         * ─────────────────────────────────────────────
         */

        '@stylistic/arrow-spacing': [ERROR, { before: true, after: true }],
        '@stylistic/type-annotation-spacing': [ERROR, {
          before: false,
          after: true,
          overrides: { arrow: { before: true, after: true } },
        }],
      },
    },
  ];
}
