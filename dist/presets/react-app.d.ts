import type { CreateConfigOptions } from '../types';
export declare const reactAppPreset: (_options?: CreateConfigOptions) => ({
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
    files: (string | string[])[];
    ignores: string[];
    language?: string;
    languageOptions?: import("@typescript-eslint/utils/dist/ts-eslint").FlatConfig.LanguageOptions;
    linterOptions?: import("@typescript-eslint/utils/dist/ts-eslint").FlatConfig.LinterOptions;
    name?: string;
    processor?: string | import("@typescript-eslint/utils/dist/ts-eslint").FlatConfig.Processor;
    settings?: import("@typescript-eslint/utils/dist/ts-eslint").FlatConfig.Settings;
} | {
    plugins: {
        '@emotion': {
            rules: any;
        };
    };
    rules: {
        '@emotion/jsx-import': "off";
        '@emotion/no-vanilla': "error";
        '@emotion/import-from-emotion': "error";
        '@emotion/styled-import': "error";
    };
    settings: {
        react: {
            pragma: string;
            version: string;
        };
    };
    languageOptions: {
        parser: any;
        parserOptions: {
            ecmaVersion: "latest";
            sourceType: "module";
        };
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
