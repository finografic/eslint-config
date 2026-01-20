import { createRequire } from 'node:module';

import type { ParserOptions } from '@typescript-eslint/parser';
import type { Linter } from 'eslint';

import { ERROR, OFF } from 'constants/settings.constants';

const require = createRequire(import.meta.url);

export type TypeScriptTypedOptions = {
  /**
   * Glob patterns to scope typed rules.
   * Strongly recommended in monorepos.
   */
  files?: string[];

  /**
   * REQUIRED.
   * Path to the tsconfig used for typed linting.
   */
  project: string;

  /**
   * Recommended in monorepos or when eslint.config.ts is not at repo root.
   */
  tsconfigRootDir?: string;

  /**
   * Escape hatch for rare advanced cases.
   * Restricted so the typed boundary stays enforceable.
   */
  parserOptions?: Omit<ParserOptions, 'project' | 'tsconfigRootDir'>;
};

const DEFAULT_TS_FILES = ['**/*.ts', '**/*.tsx'];

export function typescriptTyped(options: TypeScriptTypedOptions): Linter.Config[] {
  const files = options.files ?? DEFAULT_TS_FILES;

  return [
    {
      files,

      languageOptions: {
        parser: require('@typescript-eslint/parser'),
        parserOptions: {
          project: options.project,
          tsconfigRootDir: options.tsconfigRootDir,
          ...options.parserOptions,
        },
      },

      plugins: {
        '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      },

      rules: {
        /*
         * ─────────────────────────────────────────────
         * Type-aware TypeScript rules (REQUIRE project)
         * ─────────────────────────────────────────────
         */

        '@typescript-eslint/await-thenable': ERROR,
        '@typescript-eslint/no-floating-promises': ERROR,
        '@typescript-eslint/no-for-in-array': ERROR,
        '@typescript-eslint/no-misused-promises': ERROR,
        '@typescript-eslint/no-unnecessary-condition': ERROR,

        /**
         * Start conservative on the “unsafe” family, then tighten later.
         * (These can be noisy depending on codebase maturity.)
         */
        '@typescript-eslint/no-unsafe-assignment': OFF,
        '@typescript-eslint/no-unsafe-call': OFF,
        '@typescript-eslint/no-unsafe-member-access': OFF,
        '@typescript-eslint/no-unsafe-return': OFF,
      },
    },
  ];
}
