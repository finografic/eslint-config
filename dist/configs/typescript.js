"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typescript = void 0;
const constants_1 = require("../constants");
const load_plugin_js_1 = require("../utils/load-plugin.js");
const typescriptPlugin = (0, load_plugin_js_1.loadPlugin)('@typescript-eslint/eslint-plugin');
const typescriptParser = (0, load_plugin_js_1.loadPlugin)('@typescript-eslint/parser');
const rules = typescriptPlugin.rules;
const recommendedConfig = {
    plugins: {
        '@typescript-eslint': {
            rules: rules,
        },
    },
    languageOptions: {
        parser: typescriptParser,
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
    rules: {
        // Core rules that conflict with TypeScript
        'no-unused-vars': constants_1.OFF,
        'no-undef': constants_1.OFF,
        'no-redeclare': constants_1.OFF,
        // TypeScript specific rules
        '@typescript-eslint/no-explicit-any': constants_1.WARN,
        '@typescript-eslint/no-empty-interface': constants_1.WARN,
        '@typescript-eslint/no-empty-function': constants_1.OFF,
        '@typescript-eslint/no-non-null-assertion': constants_1.OFF,
        '@typescript-eslint/explicit-module-boundary-types': constants_1.OFF,
        '@typescript-eslint/ban-types': constants_1.OFF,
        '@typescript-eslint/no-namespace': constants_1.OFF,
        '@typescript-eslint/ban-ts-comment': constants_1.OFF,
        // '@typescript-eslint/no-unused-vars': WARN,
        '@typescript-eslint/no-unused-vars': [
            constants_1.WARN,
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
    },
};
exports.typescript = {
    recommended: recommendedConfig,
    strict: {
        ...recommendedConfig,
        rules: {
            ...recommendedConfig.rules,
            '@typescript-eslint/no-explicit-any': constants_1.ERROR,
            '@typescript-eslint/explicit-module-boundary-types': constants_1.ERROR,
            '@typescript-eslint/no-non-null-assertion': constants_1.ERROR,
        },
    },
};
//# sourceMappingURL=typescript.js.map