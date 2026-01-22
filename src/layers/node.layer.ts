import { ERROR } from '../constants/settings.constants';
import type { ESLintConfig } from 'types/eslint.types';

const NODE_FILES = ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.ts'];

export function node(): ESLintConfig[] {
  return [
    {
      name: '@finografic/node',

      files: NODE_FILES,

      rules: {
        /*
         * ─────────────────────────────────────────────
         * Node.js specific correctness
         * ─────────────────────────────────────────────
         */

        // Prevent accidental process.exit() in application code
        // Allow in scripts/config files via overrides if needed
        'no-process-exit': ERROR,
      },
    },
  ];
}
