declare module '@stylistic/eslint-plugin' {
  import type { ESLint, Linter } from 'eslint';

  export interface StylisticCustomizeOptions {
    flat?: boolean;
    indent?: number | 'tab';
    jsx?: boolean;
    pluginName?: string;
    quotes?: 'single' | 'double';
    semi?: boolean;
  }

  export interface StylisticConfig {
    rules: Record<string, Linter.RuleLevel | Linter.RuleLevelAndOptions>;
  }

  interface StylisticPlugin extends ESLint.Plugin {
    configs: {
      customize: (options: StylisticCustomizeOptions) => StylisticConfig;
      ['customize-flat']: (options: Omit<StylisticCustomizeOptions, 'flat'>) => StylisticConfig;
      recommended: StylisticConfig;
      ['recommended-flat']: StylisticConfig;
    };
  }

  const plugin: StylisticPlugin;
  export default plugin;
}

declare module '@stylistic/eslint-plugin/dist/configs/customize' {
  export { StylisticCustomizeOptions } from '@stylistic/eslint-plugin';
}
