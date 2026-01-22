import type { Linter } from 'eslint';

export interface ESLintConfig extends Linter.Config {}

export type ESLintLayer = () => ESLintConfig[];

export type ESLintProcessor = Linter.Processor;
