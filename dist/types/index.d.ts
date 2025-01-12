import type { Linter } from 'eslint';
import type { TSESLint } from '@typescript-eslint/utils';
export interface ESLintConfig extends TSESLint.FlatConfig.Config {
    extends?: Array<string | TSESLint.FlatConfig.Config>;
}
export type ESLintRules = Linter.RulesRecord;
export interface PresetOptions {
    typescript?: boolean;
    react?: boolean;
    emotion?: boolean;
    prettier?: boolean;
}
export interface CreateConfigOptions extends PresetOptions {
    extends?: ESLintConfig[];
    rules?: ESLintRules;
}
