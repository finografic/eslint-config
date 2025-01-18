import type { OptionsComponentExts, OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from '../types';
import { mergeProcessors, processorPassThrough } from 'eslint-merge-processors';
import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE, GLOB_MARKDOWN_IN_MARKDOWN } from '../globs';
import { OFF } from '../rule-settings';
import { interopDefault, parserPlain } from '../utils';

export async function markdown(
  options: OptionsFiles & OptionsComponentExts & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    componentExts = [],
    files = [GLOB_MARKDOWN],
    overrides = {},
  } = options;

  const markdown = await interopDefault(import('@eslint/markdown'));

  return [
    {
      name: 'fino/markdown/setup',
      plugins: {
        markdown,
      },
    },
    {
      files,
      ignores: [GLOB_MARKDOWN_IN_MARKDOWN],
      name: 'fino/markdown/processor',
      // `eslint-plugin-markdown` only creates virtual files for code blocks,
      // but not the markdown file itself. We use `eslint-merge-processors` to
      // add a pass-through processor for the markdown file itself.
      processor: mergeProcessors([
        markdown.processors!.markdown,
        processorPassThrough,
      ]),
    },
    {
      files,
      languageOptions: {
        parser: parserPlain,
      },
      name: 'fino/markdown/parser',
    },
    {
      files: [
        GLOB_MARKDOWN_CODE,
        ...componentExts.map(ext => `${GLOB_MARKDOWN}/**/*.${ext}`),
      ],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      name: 'fino/markdown/disables',
      rules: {
        'fino/no-top-level-await': OFF,

        'import/newline-after-import': OFF,

        'no-alert': OFF,
        'no-console': OFF,
        'no-labels': OFF,
        'no-lone-blocks': OFF,
        'no-restricted-syntax': OFF,
        'no-undef': OFF,
        'no-unused-expressions': OFF,
        'no-unused-labels': OFF,

        'no-unused-vars': OFF,
        'node/prefer-global/process': OFF,
        'style/comma-dangle': OFF,

        'style/eol-last': OFF,
        'ts/consistent-type-imports': OFF,
        'ts/explicit-function-return-type': OFF,
        'ts/no-namespace': OFF,
        'ts/no-redeclare': OFF,
        'ts/no-require-imports': OFF,
        'ts/no-unused-expressions': OFF,
        'ts/no-unused-vars': OFF,
        'ts/no-use-before-define': OFF,

        'unicode-bom': OFF,
        'unused-imports/no-unused-imports': OFF,
        'unused-imports/no-unused-vars': OFF,

        ...overrides,
      },
    },
  ];
}
