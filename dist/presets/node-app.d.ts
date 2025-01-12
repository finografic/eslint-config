import type { CreateConfigOptions } from '../types';
export declare const nodeAppPreset: (options?: CreateConfigOptions) => ({
    plugins: {
        prettier: {
            rules: any;
        };
    };
    rules: {
        'prettier/prettier': ["error", {
            printWidth: number;
            singleQuote: boolean;
            trailingComma: string;
            bracketSpacing: boolean;
            semi: boolean;
            useTabs: boolean;
            tabWidth: number;
            quoteProps: string;
        }];
    };
    files: string[];
    ignores: string[];
} | {
    plugins: {
        '@typescript-eslint': {
            rules: any;
        };
    };
    languageOptions: {
        parser: any;
        parserOptions: {
            ecmaVersion: "latest";
            sourceType: "module";
        };
    };
    rules: {
        'no-unused-vars': "off";
        'no-undef': "off";
        'no-redeclare': "off";
        '@typescript-eslint/no-explicit-any': "warn";
        '@typescript-eslint/no-empty-interface': "warn";
        '@typescript-eslint/no-empty-function': "off";
        '@typescript-eslint/no-non-null-assertion': "off";
        '@typescript-eslint/explicit-module-boundary-types': "off";
        '@typescript-eslint/ban-types': "off";
        '@typescript-eslint/no-namespace': "off";
        '@typescript-eslint/ban-ts-comment': "off";
        '@typescript-eslint/no-unused-vars': ["warn", {
            argsIgnorePattern: string;
            varsIgnorePattern: string;
            caughtErrorsIgnorePattern: string;
        }];
    };
    files: string[];
    ignores: string[];
} | {
    rules: {
        '@typescript-eslint/ban-ts-comment': "off";
        '@typescript-eslint/no-explicit-any': "off";
        '@typescript-eslint/no-unused-vars': "off";
        'no-console': "off";
        'no-debugger': "off";
        'no-unused-vars': "off";
        'unused-imports/no-unused-vars': "off";
        'unused-imports/no-unused-imports': "off";
        'perfectionist/sort-imports': "off";
    };
    files: string[];
})[];
