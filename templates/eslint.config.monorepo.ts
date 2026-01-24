// @ts-expect-error
// @ts-nocheck
import type { ESLintConfig } from '@finografic/eslint-config';
import {
  base,
  imports,
  markdown,
  node,
  typescript,
  typescriptTypedWorkspace,
} from '@finografic/eslint-config';

export default [
  ...base(),
  ...imports(),
  ...markdown(),
  ...node(),
  ...typescript(),

  // Monorepo: typed linting scoped to specific apps/packages
  ...typescriptTypedWorkspace({
    projects: [
      './apps/client/tsconfig.json',
      './apps/server/tsconfig.json',
      './packages/*/tsconfig.json',
    ],
    files: ['apps/**/*.ts', 'packages/**/*.ts'],
  }),
] satisfies ESLintConfig[];
