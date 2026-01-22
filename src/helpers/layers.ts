import { base } from 'layers/base.layer';
import { typescript } from 'layers/typescript.layer';
import { typescriptTyped } from 'layers/typescript-typed.layer';

import type { ESLintConfig } from 'types/eslint.types';

export const layers = {
  base,
  typescript,
  typescriptTyped,
} satisfies Record<string, (...args: any[]) => ESLintConfig[]>;
