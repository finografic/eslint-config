declare module 'eslint-plugin-lodash' {
  import type { ESLint, Linter } from 'eslint';

  interface LodashRules {
    'lodash/callback-binding': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/chain-style': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/chaining': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/collection-method-value': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/collection-return': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/consistent-compose': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/identity-shorthand': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/import-scope': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/matches-prop-shorthand': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/matches-shorthand': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/no-commit': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/path-style': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-compact': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-constant': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-filter': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-find': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-flat-map': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-get': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-includes': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-is-nil': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-lodash-chain': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-lodash-method': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-lodash-typecheck': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-map': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-matches': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-noop': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-reject': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-some': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-startswith': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-thru': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-times': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prefer-wrapper-method': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/prop-shorthand': Linter.RuleLevel | Linter.RuleLevelAndOptions;
    'lodash/unwrap': Linter.RuleLevel | Linter.RuleLevelAndOptions;
  }

  interface LodashPlugin extends ESLint.Plugin {
    rules: Record<keyof LodashRules, ESLint.Rule.RuleModule>;
  }

  const plugin: LodashPlugin;
  export default plugin;
}
