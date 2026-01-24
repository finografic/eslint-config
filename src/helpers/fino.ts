import { base } from 'layers/base.layer';
import { imports } from 'layers/imports.layer';
import { markdown } from 'layers/markdown.layer';
import { node } from 'layers/node.layer';
import { typescript } from 'layers/typescript.layer';
import type { TypescriptTypedOptions } from 'layers/typescript-typed.layer';
import { typescriptTyped } from 'layers/typescript-typed.layer';

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

export interface FinoOptions {
  /**
   * Enable the base layer (recommended).
   * Default: true
   */
  base?: boolean;

  /**
   * Enable imports rules.
   * Default: true
   */
  imports?: boolean;

  /**
   * Enable markdown rules.
   * Default: true
   */
  markdown?: boolean;

  /**
   * Enable Node.js specific rules.
   * Default: false
   */
  node?: boolean;

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
  typed?: Pick<TypescriptTypedOptions, 'files' | 'project' | 'tsconfigRootDir' | 'parserOptions'>;

  /**
   * Allows end-user overrides at the end (escape hatch).
   * This is intentionally raw ESLint flat config.
   */
  overrides?: Linter.Config[];
}

/**
 * Convenience wrapper that composes layered configs.
 *
 * Useful for quick setup and migration from v1.
 * For explicit control, use individual layer exports instead.
 */
export function fino(options: FinoOptions = {}): Linter.Config[] {
  const {
    base: enableBase = true,
    imports: enableImports = true,
    markdown: enableMarkdown = true,
    node: enableNode = false,
    typescript: enableTypeScript = true,
    typed,
    overrides = [],
  } = options;

  return defineConfig(
    ...(enableBase ? base() : []),
    ...(enableImports ? imports() : []),
    ...(enableMarkdown ? markdown() : []),
    ...(enableNode ? node() : []),
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
