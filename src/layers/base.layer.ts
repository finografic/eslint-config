import type { ESLintConfig } from 'types/eslint.types';

import js from '@eslint/js';
import globals from 'globals';

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../constants/globs.constants';
import { ERROR, OFF, WARN } from '../constants/settings.constants';

/**
 * Base layer: universal JavaScript safety and correctness.
 *
 * Provides ESLint recommended rules, modern ESM/Node globals, and basic correctness.
 * No TypeScript, no formatting rules, no React.
 */
export function base(): ESLintConfig[] {
  return [
    js.configs.recommended,

    {
      name: '@finografic/base',

      files: [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],

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
        'no-debugger': ERROR,
        'no-console': OFF,
        'no-constant-condition': [ERROR, { checkLoops: false }],

        'prefer-const': ERROR,
        'no-var': ERROR,
        'object-shorthand': ERROR,

        eqeqeq: [ERROR, 'always', { null: 'ignore' }],
        curly: [ERROR, 'multi-line'],

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
