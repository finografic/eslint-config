import type { OptionsFiles, OptionsIsInEditor, OptionsOverrides, TypedFlatConfigItem } from '../types';
import { GLOB_TESTS } from '../globs';
import { ERROR, OFF } from '../rule-settings';
import { interopDefault } from '../utils';

// Hold the reference so we don't redeclare the plugin on each call
let _pluginTest: any;

export async function test(
  options: OptionsFiles & OptionsIsInEditor & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    files = GLOB_TESTS,
    isInEditor = false,
    overrides = {},
  } = options;

  const [
    pluginVitest,
    pluginNoOnlyTests,
  ] = await Promise.all([
    interopDefault(import('@vitest/eslint-plugin')),
    // @ts-expect-error missing types
    interopDefault(import('eslint-plugin-no-only-tests')),
  ] as const);

  _pluginTest = _pluginTest || {
    ...pluginVitest,
    rules: {
      ...pluginVitest.rules,
      // extend `test/no-only-tests` rule
      ...pluginNoOnlyTests.rules,
    },
  };

  return [
    {
      name: 'fino/test/setup',
      plugins: {
        test: _pluginTest,
      },
    },
    {
      files,
      name: 'fino/test/rules',
      rules: {
        'test/consistent-test-it': [ERROR, { fn: 'it', withinDescribe: 'it' }],
        'test/no-identical-title': ERROR,
        'test/no-import-node-test': ERROR,
        'test/no-only-tests': isInEditor ? OFF : ERROR,

        'test/prefer-hooks-in-order': ERROR,
        'test/prefer-lowercase-title': ERROR,

        // Disables
        ...{
          'fino/no-top-level-await': OFF,
          'no-unused-expressions': OFF,
          'node/prefer-global/process': OFF,
          'ts/explicit-function-return-type': OFF,
        },

        ...overrides,
      },
    },
  ];
}
