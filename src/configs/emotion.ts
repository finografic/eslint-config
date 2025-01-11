import type { ESLintConfig } from '../types';
import { ERROR, OFF } from '../constants';
import { loadPlugin } from '../utils/load-plugin.js';
const emotionPlugin = loadPlugin('@emotion/eslint-plugin');
const rules = emotionPlugin.rules;

export const emotion = {
  recommended: {
    plugins: {
      '@emotion': {
        // ESLint flat config requires the actual plugin object
        rules: rules,
      },
    },
    rules: {
      // '@emotion/jsx-import': ERROR,
      '@emotion/jsx-import': OFF,
      '@emotion/no-vanilla': ERROR,
      '@emotion/import-from-emotion': ERROR,
      '@emotion/styled-import': ERROR,
    },
  },
} satisfies Record<string, ESLintConfig>;
