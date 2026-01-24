import type { ESLintConfig } from 'types/eslint.types';
import { GLOB_ESLINT_FILES, GLOB_JS } from '../constants/globs.constants';
import { ERROR, OFF } from '../constants/settings.constants';

/**
 * Node.js layer
 *
 * Minimal Node runtime correctness rules.
 *
 * Notes:
 * - Intentionally does not include TypeScript files.
 * - Keep TypeScript rules inside the TS layers.
 */
export function node(): ESLintConfig[] {
  return [
    {
      name: '@finografic/node',
      files: [GLOB_JS],
      rules: {
        // Production safety: prefer returning/throwing over exiting the process.
        'no-process-exit': ERROR,
      },
    },

    /**
     * Override: allow process.exit() in tooling / config files.
     *
     * If you later add script folders, add them here.
     * (Avoid writing glob patterns in comments to prevent spacing-rule conflicts.)
     */
    {
      name: '@finografic/node:overrides',
      files: [...GLOB_ESLINT_FILES],
      rules: {
        'no-process-exit': OFF,
      },
    },
  ];
}
