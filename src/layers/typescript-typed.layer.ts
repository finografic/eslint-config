import type { ESLintConfig } from 'types/eslint.types';

import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser, { type ParserOptions } from '@typescript-eslint/parser';

import { DEFAULT_TS_FILES } from '../constants/globs.constants';
import { ERROR, OFF } from '../constants/settings.constants';

type ForbiddenParserOptionKeys = 'project' | 'tsconfigRootDir';

export interface TypescriptTypedOptions {
  /**
   * REQUIRED.
   * Glob patterns to scope typed rules.
   *
   * Typed linting should always be scoped (especially in monorepos).
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

/**
 * Type-aware TypeScript rules (requires type information).
 *
 * This layer requires `project` and should be scoped in monorepos.
 * Only includes rules that need type checking.
 */
export function typescriptTyped(options: TypescriptTypedOptions): ESLintConfig[] {
  assertNoForbiddenParserOptions(options.parserOptions);
  const files = options.files ?? DEFAULT_TS_FILES;

  const parserOptions: ParserOptions = {
    project: options.project,
    tsconfigRootDir: options.tsconfigRootDir ?? process.cwd(),
    ...options.parserOptions,
  };

  return [
    {
      name: '@finografic/typescript/typed',

      files,

      languageOptions: {
        parser: tsParser,
        parserOptions,
      },

      plugins: {
        '@typescript-eslint': tseslint,
      },

      rules: {
        '@typescript-eslint/await-thenable': ERROR,
        '@typescript-eslint/no-floating-promises': ERROR,
        '@typescript-eslint/no-for-in-array': ERROR,
        '@typescript-eslint/no-misused-promises': ERROR,
        '@typescript-eslint/no-unnecessary-condition': ERROR,

        // Start conservative on the "unsafe" family, then tighten later
        // (These can be noisy depending on codebase maturity.)
        '@typescript-eslint/no-unsafe-assignment': OFF,
        '@typescript-eslint/no-unsafe-call': OFF,
        '@typescript-eslint/no-unsafe-member-access': OFF,
        '@typescript-eslint/no-unsafe-return': OFF,
      },
    },
  ];
}
