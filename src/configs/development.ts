import { OFF } from '../constants';
import { ESLintConfig } from '../types';

export const development = {
  relaxed: {
    rules: {
      // TypeScript
      '@typescript-eslint/ban-ts-comment': OFF,
      '@typescript-eslint/no-explicit-any': OFF,
      '@typescript-eslint/no-unused-vars': OFF,

      // General
      'no-console': OFF,
      'no-debugger': OFF,
      'no-unused-vars': OFF,

      // Import/Export
      'unused-imports/no-unused-vars': OFF,
      'unused-imports/no-unused-imports': OFF,

      // Other
      'perfectionist/sort-imports': OFF,
    },
  },
} satisfies Record<string, ESLintConfig>;
