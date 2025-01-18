import type {
  OptionsOverrides,
  StylisticConfig,
  TypedFlatConfigItem,
} from '../types';

import { pluginFino } from '../plugins';
import { interopDefault } from '../utils';

export const StylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false,
};

export interface StylisticOptions extends StylisticConfig, OptionsOverrides {
  lessOpinionated?: boolean;
}

export async function stylistic(
  options: StylisticOptions = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    indent,
    jsx,
    lessOpinionated = false,
    overrides = {},
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  };

  const pluginStylistic = await interopDefault(
    import('@stylistic/eslint-plugin'),
  );

  const config = pluginStylistic.configs.customize({
    flat: true,
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
  });

  return [
    {
      name: 'fino/stylistic/rules',
      plugins: {
        fino: pluginFino,
        style: pluginStylistic,
      },
      rules: {
        ...config.rules,

        'fino/consistent-chaining': 'error',
        'fino/consistent-list-newline': 'error',

        ...(lessOpinionated
          ? {
              curly: ['error', 'all'],
            }
          : {
              'fino/curly': 'error',
              'fino/if-newline': 'error',
              'fino/top-level-function': 'error',
            }),

        ...overrides,
      },
    },
  ];
}
