// Types
export type { Linter } from 'eslint';
export type { ESLintConfig } from 'types';

// Layers (primary API)
export { base } from 'layers/base.layer';
export { typescript } from 'layers/typescript.layer';
export type { TypescriptTypedOptions } from 'layers/typescript-typed.layer';
export { typescriptTyped } from 'layers/typescript-typed.layer';

// Convenience wrapper (optional)
export type { FinoOptions } from 'helpers/fino';
export { fino } from 'helpers/fino';

// Constants (if needed)
export { ERROR, OFF, WARN } from './constants/settings.constants';
