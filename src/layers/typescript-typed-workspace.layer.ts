import type { ESLintConfig } from 'types/eslint.types';

import { typescriptTyped, type TypescriptTypedOptions } from './typescript-typed.layer';

/**
 * Options for monorepo-friendly typed TypeScript linting.
 *
 * This layer exists to make typed linting ergonomic across multiple tsconfigs
 * without weakening the typed boundary.
 */
export interface TypescriptTypedWorkspaceOptions {
  /**
   * REQUIRED.
   *
   * One or more tsconfig paths used for type-aware linting.
   */
  projects: string | string[];

  /**
   * Glob patterns to scope typed linting.
   *
   * Strongly recommended in monorepos.
   * If omitted, the `typescriptTyped()` default file globs are used.
   */
  files?: string[];

  /**
   * Recommended in monorepos or when eslint.config.ts is not at repo root.
   */
  tsconfigRootDir?: string;

  /**
   * Escape hatch for rare advanced cases.
   *
   * This uses the same restricted parserOptions contract as `typescriptTyped()`.
   */
  parserOptions?: TypescriptTypedOptions['parserOptions'];
}

function normalizeProjects(projects: string | string[]): string[] {
  return Array.isArray(projects) ? projects : [projects];
}

/**
 * Monorepo-friendly typed TypeScript linting helper.
 *
 * Accepts multiple tsconfig projects and passes them to `typescriptTyped()`.
 * More ergonomic than manually constructing the project array.
 */
export function typescriptTypedWorkspace(
  options: TypescriptTypedWorkspaceOptions,
): ESLintConfig[] {
  const projects = normalizeProjects(options.projects);

  return typescriptTyped({
    files: options.files,
    project: projects,
    tsconfigRootDir: options.tsconfigRootDir,
    parserOptions: options.parserOptions,
  });
}
