import { ERROR } from '../constants.js';
import { loadPlugin } from '../utils/load-plugin.js';
const prettierPlugin = loadPlugin('eslint-plugin-prettier');
const rules = prettierPlugin.rules;
export const prettier = {
    config: {
        plugins: {
            prettier: {
                rules: rules,
            },
        },
        rules: {
            'prettier/prettier': [
                ERROR,
                {
                    printWidth: 100,
                    singleQuote: true,
                    trailingComma: 'all',
                    bracketSpacing: true,
                    semi: true,
                    useTabs: false,
                    tabWidth: 2,
                    quoteProps: 'consistent',
                },
            ],
        },
    },
};
//# sourceMappingURL=prettier.js.map