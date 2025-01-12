import { ERROR, OFF, WARN } from '../constants.js';
import { loadPlugin } from '../utils/load-plugin.js';
const typescriptPlugin = loadPlugin('@typescript-eslint/eslint-plugin');
const typescriptParser = loadPlugin('@typescript-eslint/parser');
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
        'no-unused-vars': OFF,
        'no-undef': OFF,
        'no-redeclare': OFF,
        // TypeScript specific rules
        '@typescript-eslint/no-explicit-any': WARN,
        '@typescript-eslint/no-empty-interface': WARN,
        '@typescript-eslint/no-empty-function': OFF,
        '@typescript-eslint/no-non-null-assertion': OFF,
        '@typescript-eslint/explicit-module-boundary-types': OFF,
        '@typescript-eslint/ban-types': OFF,
        '@typescript-eslint/no-namespace': OFF,
        '@typescript-eslint/ban-ts-comment': OFF,
        // '@typescript-eslint/no-unused-vars': WARN,
        '@typescript-eslint/no-unused-vars': [
            WARN,
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
    },
};
export const typescript = {
    recommended: recommendedConfig,
    strict: {
        ...recommendedConfig,
        rules: {
            ...recommendedConfig.rules,
            '@typescript-eslint/no-explicit-any': ERROR,
            '@typescript-eslint/explicit-module-boundary-types': ERROR,
            '@typescript-eslint/no-non-null-assertion': ERROR,
        },
    },
};
//# sourceMappingURL=typescript.js.map