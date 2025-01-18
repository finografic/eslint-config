// @ts-expect-error missing types
import styleMigrate from '@stylistic/eslint-plugin-migrate';

import { fino } from './src';

export default fino(
  {
    react: true,
    typescript: true,
    formatters: true,
    type: 'lib',
    stylistic: {
      quotes: 'single',
      semi: true,
    },
  },
  {},
  {
    files: ['src/**/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
  {
    files: ['package.json'],
    rules: {
      'perfectionist/sort-objects': 'off',
      'jsonc/sort-keys': 'off',
    },
  },
  {
    files: ['src/configs/*.ts'],
    plugins: {
      'style-migrate': styleMigrate,
    },
    rules: {
      'style-migrate/migrate': ['error', { namespaceTo: 'style' }],
    },
  },
);
