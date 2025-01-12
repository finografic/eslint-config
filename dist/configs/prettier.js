"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettier = void 0;
const constants_1 = require("../constants");
const load_plugin_js_1 = require("../utils/load-plugin.js");
const prettierPlugin = (0, load_plugin_js_1.loadPlugin)('eslint-plugin-prettier');
const rules = prettierPlugin.rules;
exports.prettier = {
    config: {
        plugins: {
            prettier: {
                rules: rules,
            },
        },
        rules: {
            'prettier/prettier': [
                constants_1.ERROR,
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