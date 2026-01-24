import type { ESLintConfig } from 'types/eslint.types';

import simpleImportSort from 'eslint-plugin-simple-import-sort';

import { ERROR } from '../constants/settings.constants';

export interface ImportsOptions {
  /**
   * Extra internal path “groups” that should be sorted *before* relative imports.
   *
   * Example: ['^layers', '^helpers']
   */
  internalGroups?: string[];
}

export function imports(options: ImportsOptions = {}): ESLintConfig[] {
  const internalGroups = options.internalGroups ?? [
    '^@finografic',
    '^@workspace',
    '^(layers|helpers|types|constants|config)(/|$)',
  ];

  return [
    {
      name: '@finografic/imports',

      plugins: {
        'simple-import-sort': simpleImportSort,
      },

      rules: {
        'simple-import-sort/imports': [
          ERROR,
          {
            groups: [
              ['^node:'],
              internalGroups,
              ['^\\u0000'],
              ['^(?!@finografic)(?!@workspace)@?[a-z]'],
              [
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
  ];
}
