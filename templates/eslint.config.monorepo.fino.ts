// @ts-expect-error
// @ts-nocheck
import { fino } from '@finografic/eslint-config';

export default fino({
  node: true,
  typed: {
    project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'],
    files: ['apps/**/*.ts', 'packages/**/*.ts'],
  },
});
