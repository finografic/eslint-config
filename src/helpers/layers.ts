import { base } from 'layers/base.layer';
import { imports } from 'layers/imports.layer';
import { markdown } from 'layers/markdown.layer';
import { typescript } from 'layers/typescript.layer';
import { typescriptTyped } from 'layers/typescript-typed.layer';
import type { ESLintConfig } from 'types/eslint.types';

export const layers = {
  base,
  imports,
  markdown,
  typescript,
  typescriptTyped,
} satisfies Record<string, (...args: any[]) => ESLintConfig[]>;
