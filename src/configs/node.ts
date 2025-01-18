import type { TypedFlatConfigItem } from '../types';
import { pluginNode } from '../plugins';
import { ERROR } from '../rule-settings';

export async function node(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'fino/node/rules',
      plugins: {
        node: pluginNode,
      },
      rules: {
        'node/handle-callback-err': [ERROR, '^(err|error)$'],
        'node/no-deprecated-api': ERROR,
        'node/no-exports-assign': ERROR,
        'node/no-new-require': ERROR,
        'node/no-path-concat': ERROR,
        'node/prefer-global/buffer': [ERROR, 'never'],
        'node/prefer-global/process': [ERROR, 'never'],
        'node/process-exit-as-throw': ERROR,
      },
    },
  ];
}
