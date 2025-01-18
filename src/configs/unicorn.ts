import type { OptionsUnicorn, TypedFlatConfigItem } from '../types';
import { pluginUnicorn } from '../plugins';
import { ERROR } from '../rule-settings';

export async function unicorn(options: OptionsUnicorn = {}): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'fino/unicorn/rules',
      plugins: {
        unicorn: pluginUnicorn,
      },
      rules: {
        ...(options.allRecommended
          ? pluginUnicorn.configs['flat/recommended'].rules
          : {
              'unicorn/consistent-empty-array-spread': ERROR,
              'unicorn/error-message': ERROR,
              'unicorn/escape-case': ERROR,
              'unicorn/new-for-builtins': ERROR,
              'unicorn/no-instanceof-array': ERROR,
              'unicorn/no-new-array': ERROR,
              'unicorn/no-new-buffer': ERROR,
              'unicorn/number-literal-case': ERROR,
              'unicorn/prefer-dom-node-text-content': ERROR,
              'unicorn/prefer-includes': ERROR,
              'unicorn/prefer-node-protocol': ERROR,
              'unicorn/prefer-number-properties': ERROR,
              'unicorn/prefer-string-starts-ends-with': ERROR,
              'unicorn/prefer-type-error': ERROR,
              'unicorn/throw-new-error': ERROR,
            }),
      },
    },
  ];
}
