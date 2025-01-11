import { development, imports, prettier, typescript } from '../configs';
import type { CreateConfigOptions } from '../types';
import { IGNORES } from '../constants';

export const nodeAppPreset = (options: CreateConfigOptions = {}) => [
  {
    // Base config
    files: ['**/*.{js,ts}'],
    ignores: [...IGNORES],
    ...imports.recommended,
    ...prettier.config,
  },
  {
    // TypeScript files
    files: ['**/*.ts'],
    ignores: [...IGNORES],
    ...typescript.recommended,
  },
  {
    // Development files
    files: ['**/*.dev.ts', '**/*.test.ts', '**/debug/**/*'],
    ...development.relaxed,
  },
];
