import type { OptionsUnoCSS, TypedFlatConfigItem } from '../types';
import { ERROR, WARN } from '../rule-settings';
import { ensurePackages, interopDefault } from '../utils';

export async function unocss(
  options: OptionsUnoCSS = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    attributify = true,
    strict = false,
  } = options;

  await ensurePackages([
    '@unocss/eslint-plugin',
  ]);

  const [
    pluginUnoCSS,
  ] = await Promise.all([
    interopDefault(import('@unocss/eslint-plugin')),
  ] as const);

  return [
    {
      name: 'fino/unocss',
      plugins: {
        unocss: pluginUnoCSS,
      },
      rules: {
        'unocss/order': WARN,
        ...attributify
          ? {
              'unocss/order-attributify': WARN,
            }
          : {},
        ...strict
          ? {
              'unocss/blocklist': ERROR,
            }
          : {},
      },
    },
  ];
}
