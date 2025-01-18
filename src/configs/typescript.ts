import type {
  OptionsComponentExts,
  OptionsFiles,
  OptionsOverrides,
  OptionsProjectType,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptWithTypes,
  TypedFlatConfigItem,
} from '../types';

import process from 'node:process';
import { GLOB_MARKDOWN, GLOB_TS, GLOB_TSX } from '../globs';
import { pluginFino } from '../plugins';
import { ERROR, OFF } from '../rule-settings';
import { interopDefault, renameRules } from '../utils';

export async function typescript(
  options: OptionsFiles &
    OptionsComponentExts &
    OptionsOverrides &
    OptionsTypeScriptWithTypes &
    OptionsTypeScriptParserOptions &
    OptionsProjectType = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    componentExts = [],
    overrides = {},
    overridesTypeAware = {},
    parserOptions = {},
    type = 'app',
  } = options;

  const files = options.files ?? [
    GLOB_TS,
    GLOB_TSX,
    ...componentExts.map(ext => `**/*.${ext}`),
  ];

  const filesTypeAware = options.filesTypeAware ?? [GLOB_TS, GLOB_TSX];
  const ignoresTypeAware = options.ignoresTypeAware ?? [`${GLOB_MARKDOWN}/**`];
  const tsconfigPath = options?.tsconfigPath ? options.tsconfigPath : undefined;
  const isTypeAware = !!tsconfigPath;

  const typeAwareRules: TypedFlatConfigItem['rules'] = {
    'dot-notation': OFF,
    'no-implied-eval': OFF,
    'ts/await-thenable': ERROR,
    'ts/dot-notation': [ERROR, { allowKeywords: true }],
    'ts/no-floating-promises': ERROR,
    'ts/no-for-in-array': ERROR,
    'ts/no-implied-eval': ERROR,
    'ts/no-misused-promises': ERROR,
    'ts/no-unnecessary-type-assertion': ERROR,
    'ts/no-unsafe-argument': ERROR,
    'ts/no-unsafe-assignment': ERROR,
    'ts/no-unsafe-call': ERROR,
    'ts/no-unsafe-member-access': ERROR,
    'ts/no-unsafe-return': ERROR,
    'ts/promise-function-async': ERROR,
    'ts/restrict-plus-operands': ERROR,
    'ts/restrict-template-expressions': ERROR,
    'ts/return-await': [ERROR, 'in-try-catch'],
    'ts/strict-boolean-expressions': [
      ERROR,
      { allowNullableBoolean: true, allowNullableObject: true },
    ],
    'ts/switch-exhaustiveness-check': ERROR,
    'ts/unbound-method': ERROR,
  };

  const [pluginTs, parserTs] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const);

  function makeParser(
    typeAware: boolean,
    files: string[],
    ignores?: string[],
  ): TypedFlatConfigItem {
    return {
      files,
      ...(ignores ? { ignores } : {}),
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          extraFileExtensions: componentExts.map(ext => `.${ext}`),
          sourceType: 'module',
          ...(typeAware
            ? {
                projectService: {
                  allowDefaultProject: ['./*.js'],
                  defaultProject: tsconfigPath,
                },
                tsconfigRootDir: process.cwd(),
              }
            : {}),
          ...(parserOptions as any),
        },
      },
      name: `antfu/typescript/${typeAware ? 'type-aware-parser' : 'parser'}`,
    };
  }

  return [
    {
      // Install the plugins without globs, so they can be configured separately.
      name: 'fino/typescript/setup',
      plugins: {
        antfu: pluginFino,
        ts: pluginTs as any,
      },
    },
    // assign type-aware parser for type-aware files and type-unaware parser for the rest
    ...(isTypeAware
      ? [
          makeParser(false, files),
          makeParser(true, filesTypeAware, ignoresTypeAware),
        ]
      : [makeParser(false, files)]),
    {
      files,
      name: 'fino/typescript/rules',
      rules: {
        ...renameRules(
          pluginTs.configs['eslint-recommended'].overrides![0].rules!,
          { '@typescript-eslint': 'ts' },
        ),
        ...renameRules(pluginTs.configs.strict.rules!, {
          '@typescript-eslint': 'ts',
        }),
        'no-dupe-class-members': OFF,
        'no-redeclare': OFF,
        'no-use-before-define': OFF,
        'no-useless-constructor': OFF,
        'ts/ban-ts-comment': [
          ERROR,
          { 'ts-expect-error': 'allow-with-description' },
        ],
        'ts/consistent-type-definitions': [ERROR, 'interface'],
        'ts/consistent-type-imports': [
          ERROR,
          {
            disallowTypeAnnotations: false,
            prefer: 'type-imports',
          },
        ],

        'ts/method-signature-style': [ERROR, 'property'], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        'ts/no-dupe-class-members': ERROR,
        'ts/no-dynamic-delete': OFF,
        'ts/no-empty-object-type': [ERROR, { allowInterfaces: 'always' }],
        'ts/no-explicit-any': OFF,
        'ts/no-extraneous-class': OFF,
        'ts/no-import-type-side-effects': ERROR,
        'ts/no-invalid-void-type': OFF,
        'ts/no-non-null-assertion': OFF,
        'ts/no-redeclare': [ERROR, { builtinGlobals: false }],
        'ts/no-require-imports': ERROR,
        'ts/no-unused-expressions': [
          ERROR,
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true,
          },
        ],
        'ts/no-unused-vars': OFF,
        'ts/no-use-before-define': [
          ERROR,
          { classes: false, functions: false, variables: true },
        ],
        'ts/no-useless-constructor': OFF,
        'ts/no-wrapper-object-types': ERROR,
        'ts/triple-slash-reference': OFF,
        'ts/unified-signatures': OFF,

        ...(type === 'lib'
          ? {
              'ts/explicit-function-return-type': [
                ERROR,
                {
                  allowExpressions: true,
                  allowHigherOrderFunctions: true,
                  allowIIFEs: true,
                },
              ],
            }
          : {}),
        ...overrides,
      },
    },
    ...(isTypeAware
      ? [
          {
            files: filesTypeAware,
            ignores: ignoresTypeAware,
            name: 'fino/typescript/rules-type-aware',
            rules: {
              ...typeAwareRules,
              ...overridesTypeAware,
            },
          },
        ]
      : []),
  ];
}
