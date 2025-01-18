import type { OptionsStylistic, TypedFlatConfigItem } from '../types';

import { pluginFino, pluginImport } from '../plugins';

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
        'fino/import-dedupe': 'error',
        'fino/no-import-dist': 'error',
        'fino/no-import-node-modules-by-path': 'error',

        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',

        ...stylistic
          ? {
              'import/newline-after-import': ['error', { count: 1 }],
            }
          : {},
      },
    },
  ];
}
