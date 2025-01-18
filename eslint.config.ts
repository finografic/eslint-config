// @ts-expect-error missing types
import styleMigrate from '@stylistic/eslint-plugin-migrate';
import { fino } from './src';
import { ERROR, OFF } from './src/rule-settings';

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
      'perfectionist/sort-objects': ERROR,
    },
  },
  {
    files: ['package.json'],
    rules: {
      'perfectionist/sort-objects': OFF,
      'jsonc/sort-keys': OFF,
    },
  },
  {
    files: ['src/configs/*.ts'],
    plugins: {
      'style-migrate': styleMigrate,
    },
    rules: {
      'style-migrate/migrate': [ERROR, { namespaceTo: 'style' }],
    },
  },
);
