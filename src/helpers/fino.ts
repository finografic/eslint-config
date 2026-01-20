import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

import { base } from '../layers/base.layer';
import { typescript } from '../layers/typescript.layer';
import { typescriptTyped, type TypeScriptTypedOptions } from '../layers/typescript-typed.layer';

export type FinoOptions = {
  /**
   * Enable the base layer (recommended).
   * Default: true
   */
  base?: boolean;

  /**
   * Enable TypeScript (untyped) rules.
   * Default: true
   */
  typescript?: boolean;

  /**
   * Enable type-aware TypeScript rules.
   * Default: undefined (off)
   *
   * NOTE: typed linting must be scoped and have a tsconfig.
   */
  typed?: Pick<TypeScriptTypedOptions, 'files' | 'project' | 'tsconfigRootDir' | 'parserOptions'>;

  /**
   * Allows end-user overrides at the end (escape hatch).
   * This is intentionally raw ESLint flat config.
   */
  overrides?: Linter.Config[];
};

export function fino(options: FinoOptions = {}): Linter.Config[] {
  const {
    base: enableBase = true,
    typescript: enableTypeScript = true,
    typed,
    overrides = [],
  } = options;

  return defineConfig(
    ...(enableBase ? base() : []),
    ...(enableTypeScript ? typescript() : []),
    ...(typed
      ? typescriptTyped({
        files: typed.files,
        project: typed.project,
        tsconfigRootDir: typed.tsconfigRootDir,
        parserOptions: typed.parserOptions,
      })
      : []),
    ...overrides,
  );
}
