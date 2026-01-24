import { defineConfig } from 'eslint/config';

import { base } from 'layers/base.layer';
import { typescript } from 'layers/typescript.layer';
import { typescriptTyped, type TypescriptTypedOptions } from 'layers/typescript-typed.layer';
import type { ESLintConfig } from 'types/eslint.types';

export interface ComposeOptions {
  typed?: TypescriptTypedOptions;
  overrides?: ESLintConfig[];
}

export function compose(options: ComposeOptions = {}): ESLintConfig[] {
  return defineConfig(
    ...base(),
    ...typescript(),
    ...(options.typed ? typescriptTyped(options.typed) : []),
    ...(options.overrides ?? []),
  );
}
