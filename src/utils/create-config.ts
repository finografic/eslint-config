import type { CreateConfigOptions, ESLintConfig } from '../types';

export function createConfig(options: CreateConfigOptions): ESLintConfig {
  const config: ESLintConfig = {
    files: options.typescript
      ? ['**/*.ts', '**/*.tsx']
      : ['**/*.js', '**/*.jsx'],
    ignores: ['**/node_modules/**', '**/dist/**'],
    extends: options.extends || [],
    rules: options.rules || {},
  };

  return config;
}
