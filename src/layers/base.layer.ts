import js from '@eslint/js';
import type { Linter } from 'eslint';
import globals from 'globals';

import { ERROR, OFF, WARN } from 'constants/settings.constants';

export function base(): Linter.Config[] {
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
        // correctness / safety
        'no-debugger': ERROR,
        'no-console': OFF,
        'no-constant-condition': [ERROR, { checkLoops: false }],

        // modern JS best-practice
        'prefer-const': ERROR,
        'no-var': ERROR,
        'object-shorthand': ERROR,

        // clarity (non-formatting)
        eqeqeq: [ERROR, 'always', { null: 'ignore' }],
        curly: [ERROR, 'all'],

        // unused
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
