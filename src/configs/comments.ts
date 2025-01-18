import type { TypedFlatConfigItem } from '../types';

import { pluginComments } from '../plugins';
import { ERROR } from '../rule-settings';

export async function comments(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'fino/eslint-comments/rules',
      plugins: {
        'eslint-comments': pluginComments,
      },
      rules: {
        'eslint-comments/no-aggregating-enable': ERROR,
        'eslint-comments/no-duplicate-disable': ERROR,
        'eslint-comments/no-unlimited-disable': ERROR,
        'eslint-comments/no-unused-enable': ERROR,
      },
    },
  ];
}
