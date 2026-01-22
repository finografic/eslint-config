import js from '@eslint/js';
import globals from 'globals';

import { ERROR, OFF, WARN } from '../constants/settings.constants';
import type { ESLintConfig } from 'types/eslint.types';

export function base(): ESLintConfig[] {
  return [
    js.configs.recommended,

    {
      name: '@finografic/base',

      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',

        globals: {
          ...globals.es2021,
          ...globals.node,
        },
      },

      linterOptions: {
        reportUnusedDisableDirectives: 'error',
      },

      rules: {
        /*
         * ─────────────────────────────────────────────
         * Correctness / safety
         * ─────────────────────────────────────────────
         */
        'no-debugger': ERROR,
        'no-console': OFF,
        'no-constant-condition': [ERROR, { checkLoops: false }],

        /*
         * ─────────────────────────────────────────────
         * Modern JS best-practice
         * ─────────────────────────────────────────────
         */
        'prefer-const': ERROR,
        'no-var': ERROR,
        'object-shorthand': ERROR,

        /*
         * ─────────────────────────────────────────────
         * Clarity (non-formatting)
         * ─────────────────────────────────────────────
         */
        eqeqeq: [ERROR, 'always', { null: 'ignore' }],
        curly: [ERROR, 'all'],

        /*
         * ─────────────────────────────────────────────
         * Unused
         * ─────────────────────────────────────────────
         */
        'no-unused-vars': [
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
      },
    },
  ];
}
