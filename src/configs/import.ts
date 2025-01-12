import type { ESLintConfig } from '../types';
import { ERROR, OFF } from '../constants';
import { loadPlugin } from '../utils/load-plugin.js';

const importPlugin = loadPlugin('eslint-plugin-import');
const rules = importPlugin.rules;

export const imports = {
  recommended: {
    plugins: {
      import: {
        rules: rules,
      },
    },
    rules: {
      'import/first': ERROR,
      'import/no-duplicates': ERROR,
      'import/no-mutable-exports': ERROR,
      'import/no-named-as-default': OFF,
      'import/no-named-as-default-member': OFF,
      'import/order': [
        ERROR,
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'always',
        },
      ],
    },
  },
} satisfies Record<string, ESLintConfig>;
