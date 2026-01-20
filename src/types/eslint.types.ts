import type { Linter } from 'eslint';

export interface ESLintConfig extends Linter.Config {}

export interface ESLintLayer {
  (): ESLintConfig[];
}
