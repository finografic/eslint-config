// @ts-expect-error
// @ts-nocheck
import { fino } from '@finografic/eslint-config';

export default fino({
  typed: {
    project: './tsconfig.json',
    files: ['**/*.ts', '**/*.tsx'],
  },
});
