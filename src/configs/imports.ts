import type { OptionsStylistic, TypedFlatConfigItem } from '../types';
import { pluginFino, pluginImport } from '../plugins';
import { ERROR } from '../rule-settings';

export async function imports(options: OptionsStylistic = {}): Promise<TypedFlatConfigItem[]> {
  const {
    stylistic = true,
  } = options;

  return [
    {
      name: 'fino/imports/rules',
      plugins: {
        antfu: pluginFino,
        import: pluginImport,
      },
      rules: {
        'fino/import-dedupe': ERROR,
        'fino/no-import-dist': ERROR,
        'fino/no-import-node-modules-by-path': ERROR,

        'import/first': ERROR,
        'import/no-duplicates': ERROR,
        'import/no-mutable-exports': ERROR,
        'import/no-named-default': ERROR,
        'import/no-self-import': ERROR,
        'import/no-webpack-loader-syntax': ERROR,

        ...stylistic
          ? {
              'import/newline-after-import': [ERROR, { count: 1 }],
            }
          : {},
      },
    },
  ];
}
