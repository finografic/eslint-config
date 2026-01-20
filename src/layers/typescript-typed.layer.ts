import { createRequire } from 'node:module';

import type { ParserOptions } from '@typescript-eslint/parser';

import { ERROR, OFF } from 'constants/settings.constants';
import type { ESLintConfig } from 'types/eslint.types';

const require = createRequire(import.meta.url);

type ForbiddenParserOptionKeys = 'project' | 'tsconfigRootDir';

export interface TypescriptTypedOptions {
  /**
   * Glob patterns to scope typed rules.
   * Strongly recommended in monorepos.
   */
  files?: string[];

  /**
   * REQUIRED.
   * Path(s) to the tsconfig used for typed linting.
   */
  project: string | string[];

  /**
   * Recommended in monorepos or when eslint.config.ts is not at repo root.
   */
  tsconfigRootDir?: string;

  /**
   * Escape hatch for rare advanced cases.
   * Restricted so the typed boundary stays enforceable.
   */
  parserOptions?: Omit<ParserOptions, ForbiddenParserOptionKeys>;
}

const DEFAULT_TS_FILES = ['**/*.ts', '**/*.tsx'];

function assertNoForbiddenParserOptions(
  parserOptions: Record<string, unknown> | undefined,
): void {
  if (!parserOptions) return;

  if ('project' in parserOptions) {
    throw new Error(
      '[typescriptTyped] parserOptions.project is not allowed (use options.project instead)',
    );
  }

  if ('tsconfigRootDir' in parserOptions) {
    throw new Error(
      '[typescriptTyped] parserOptions.tsconfigRootDir is not allowed (use options.tsconfigRootDir instead)',
    );
  }
}

export function typescriptTyped(options: TypescriptTypedOptions): ESLintConfig[] {
  const files = options.files ?? DEFAULT_TS_FILES;

  assertNoForbiddenParserOptions(options.parserOptions);

  const parserOptions: ParserOptions = {
    project: options.project,
    tsconfigRootDir: options.tsconfigRootDir ?? process.cwd(),
    ...options.parserOptions,
  };

  return [
    {
      files,

      languageOptions: {
        parser: require('@typescript-eslint/parser'),
        parserOptions,
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
