import type { ESLintConfig } from 'types/eslint.types';

import stylisticPlugin from '@stylistic/eslint-plugin';
import markdownlintPlugin from 'eslint-plugin-markdownlint';

import { DEFAULT_MD_FILES, GLOB_EXCLUDE } from '../constants/globs.constants';
import { OFF } from '../constants/settings.constants';

/**
 * Markdown layer.
 *
 * Runs markdownlint rules on .md files.
 *
 * Formatting is still owned by your formatter (dprint).
 * This layer only enforces linting / content style rules.
 */
export function markdown(): ESLintConfig[] {
  return [
    {
      name: '@finografic/markdown',

      files: DEFAULT_MD_FILES,

      ignores: [
        ...GLOB_EXCLUDE,
        '.cursor/**',
        '.github/instructions/**',
      ],

      plugins: {
        markdownlint: markdownlintPlugin,
        stylistic: stylisticPlugin,
      },

      rules: {
        ...(markdownlintPlugin.configs?.recommended?.rules ?? {}),

        // markdownlint exceptions (opinionated)
        'markdownlint/md001': OFF, // heading increment
        'markdownlint/md012': OFF, // multiple blank lines
        'markdownlint/md013': OFF, // line length
        'markdownlint/md024': OFF, // duplicate headings
        'markdownlint/md025': OFF, // single H1
        'markdownlint/md026': OFF, // punctuation in heading
        'markdownlint/md029': OFF, // list style
        'markdownlint/md036': OFF, // emphasis as heading
        'markdownlint/md040': OFF, // fenced code language
        'markdownlint/md041': OFF, // first line heading
        'markdownlint/md043': OFF, // required heading structure
        'markdownlint/md045': OFF, // images require alt text

        // Small non-formatting consistency checks
        // These are intentionally light (formatter remains source of truth)
        '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
        '@stylistic/no-trailing-spaces': 'error',
        '@stylistic/no-multi-spaces': ['error', { exceptions: { Property: true } }],
      },
    },
  ];
}
