import type { TypescriptTypedOptions } from 'layers/typescript-typed.layer';
import { typescriptTyped } from 'layers/typescript-typed.layer';

import type { ESLintConfig } from 'types/eslint.types';

export interface TypescriptTypedWorkspaceOptions {
  projects: string[];
  files: string[];
  tsconfigRootDir?: string;
  parserOptions?: TypescriptTypedOptions['parserOptions'];
}

export function typescriptTypedWorkspace(
  options: TypescriptTypedWorkspaceOptions,
): ESLintConfig[] {
  return typescriptTyped({
    project: options.projects,
    files: options.files,
    tsconfigRootDir: options.tsconfigRootDir,
    parserOptions: options.parserOptions,
  });
}
