import { createRequire } from 'node:module';

import type { Linter } from 'eslint';

import { ERROR, OFF, WARN } from 'constants/settings.constants';

const require = createRequire(import.meta.url);

const TS_FILES = ['**/*.ts', '**/*.tsx'];

export function typescript(): Linter.Config[] {
  return [
    {
      files: TS_FILES,

      languageOptions: {
        parser: require('@typescript-eslint/parser'),
        sourceType: 'module',
      },

      plugins: {
        '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
        '@stylistic': require('@stylistic/eslint-plugin'),
      },

      rules: {
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
        '@typescript-eslint/consistent-type-definitions': [ERROR, 'type'],
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

        '@stylistic/type-annotation-spacing': [
          ERROR,
          {
            before: false,
            after: true,
            overrides: {
              arrow: {
                before: true,
                after: true,
              },
            },
          },
        ],
      },
    },
  ];
}
