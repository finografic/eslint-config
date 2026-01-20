declare module '@eslint-community/eslint-plugin-eslint-comments' {
  import type { ESLint, Linter } from 'eslint';

  interface EslintCommentsRules {
    'eslint-comments/disable-enable-pair': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'eslint-comments/no-aggregating-enable': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'eslint-comments/no-duplicate-disable': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'eslint-comments/no-unlimited-disable': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'eslint-comments/no-unused-disable': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'eslint-comments/no-unused-enable': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'eslint-comments/no-restricted-disable': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'eslint-comments/no-use': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'eslint-comments/require-description': Linter.RuleLevel | Linter.RuleLevelAndOptions;
  }

  interface EslintCommentsPlugin extends ESLint.Plugin {
    rules: Record<keyof EslintCommentsRules, ESLint.Rule.RuleModule>;
    configs: {
      recommended: {
        rules: Partial<Record<keyof EslintCommentsRules, Linter.RuleLevel | Linter.RuleLevelAndOptions>>;
      };
    };
  }

  const plugin: EslintCommentsPlugin;
  export default plugin;
}
