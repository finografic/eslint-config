import type { OptionsStylistic, TypedFlatConfigItem } from '../types';
import { WARN } from '../rule-settings';
import { interopDefault } from '../utils';

export async function jsdoc(options: OptionsStylistic = {}): Promise<TypedFlatConfigItem[]> {
  const {
    stylistic = true,
  } = options;

  return [
    {
      name: 'fino/jsdoc/rules',
      plugins: {
        jsdoc: await interopDefault(import('eslint-plugin-jsdoc')),
      },
      rules: {
        'jsdoc/check-access': WARN,
        'jsdoc/check-param-names': WARN,
        'jsdoc/check-property-names': WARN,
        'jsdoc/check-types': WARN,
        'jsdoc/empty-tags': WARN,
        'jsdoc/implements-on-classes': WARN,
        'jsdoc/no-defaults': WARN,
        'jsdoc/no-multi-asterisks': WARN,
        'jsdoc/require-param-name': WARN,
        'jsdoc/require-property': WARN,
        'jsdoc/require-property-description': WARN,
        'jsdoc/require-property-name': WARN,
        'jsdoc/require-returns-check': WARN,
        'jsdoc/require-returns-description': WARN,
        'jsdoc/require-yields-check': WARN,

        ...stylistic
          ? {
              'jsdoc/check-alignment': WARN,
              'jsdoc/multiline-blocks': WARN,
            }
          : {},
      },
    },
  ];
}
