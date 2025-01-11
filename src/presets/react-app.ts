import {
  base,
  development,
  emotion,
  imports,
  prettier,
  react,
  typescript,
} from '../configs';
import { IGNORES } from '../constants';
import type { CreateConfigOptions } from '../types';

export const reactAppPreset = (options: CreateConfigOptions = {}) => [
  {
    // Base config for all files
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [...IGNORES],
    ...base.recommended,
    ...imports.recommended,
    ...prettier.config,
  },
  {
    // TypeScript + React files
    files: ['**/*.{ts,tsx}'],
    ignores: [...IGNORES],
    ...typescript.recommended,
    ...react.recommended,
    ...emotion.recommended,
  },
  {
    // Development/Debug files
    files: [
      '**/*.dev.{ts,tsx}',
      '**/*.test.{ts,tsx}',
      '**/debug/**/*',
      '**/*-debug.*',
    ],
    ...development.relaxed,
  },
];
