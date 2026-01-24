import { ERROR } from '../constants/settings.constants';
import type { ESLintConfig } from 'types/eslint.types';

const NODE_FILES = ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.ts'];

/**
 * Node.js layer: Node.js-specific correctness rules.
 *
 * Prevents accidental process.exit() in application code.
 * Allow in scripts/config files via overrides if needed.
 */
export function node(): ESLintConfig[] {
  return [
    {
      name: '@finografic/node',

      files: NODE_FILES,

      rules: {
        'no-process-exit': ERROR,
      },
    },
  ];
}
