import type { TypedFlatConfigItem } from '../types';
import { GLOB_SRC, GLOB_SRC_EXT } from '../globs';
import { OFF } from '../rule-settings';

export async function disables(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      files: [`**/scripts/${GLOB_SRC}`],
      name: 'fino/disables/scripts',
      rules: {
        'fino/no-top-level-await': OFF,
        'no-console': OFF,
        'ts/explicit-function-return-type': OFF,
      },
    },
    {
      files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
      name: 'fino/disables/cli',
      rules: {
        'fino/no-top-level-await': OFF,
        'no-console': OFF,
      },
    },
    {
      files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
      name: 'fino/disables/bin',
      rules: {
        'fino/no-import-dist': OFF,
        'fino/no-import-node-modules-by-path': OFF,
      },
    },
    {
      files: ['**/*.d.?([cm])ts'],
      name: 'fino/disables/dts',
      rules: {
        'eslint-comments/no-unlimited-disable': OFF,
        'import/no-duplicates': OFF,
        'no-restricted-syntax': OFF,
        'unused-imports/no-unused-vars': OFF,
      },
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      name: 'fino/disables/cjs',
      rules: {
        'ts/no-require-imports': OFF,
      },
    },
    {
      files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
      name: 'fino/disables/config-files',
      rules: {
        'fino/no-top-level-await': OFF,
        'no-console': OFF,
        'ts/explicit-function-return-type': OFF,
      },
    },
  ];
}
